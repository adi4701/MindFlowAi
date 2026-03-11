"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user && !userLoading) {
      router.push('/dashboard');
    }
  }, [user, userLoading, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || isLoading || !auth) {
      if (!auth) {
        toast({ 
          variant: "destructive", 
          title: "System Offline", 
          description: "Neural link parameters are not configured. Please check environment configuration." 
        });
      }
      return;
    }
    
    // Map username to an internal email format for Firebase Auth
    const internalEmail = `${username.toLowerCase().trim().replace(/[^a-z0-9]/g, '')}@mindflow.ai`;

    setIsLoading(true);
    try {
      if (isRegistering) {
        const cred = await createUserWithEmailAndPassword(auth, internalEmail, password);
        if (db) {
          await setDoc(doc(db, 'users', cred.user.uid), {
            uid: cred.user.uid,
            username: username,
            displayName: username,
            createdAt: serverTimestamp(),
          }, { merge: true });
        }
        toast({ title: "Neural Link Established", description: "Identity registry complete." });
      } else {
        await signInWithEmailAndPassword(auth, internalEmail, password);
        toast({ title: "Welcome Back", description: "Resuming neural session." });
      }
    } catch (error: any) {
      let message = "Could not authenticate signature.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = "Identity or secret does not match.";
      } else if (error.code === 'auth/email-already-in-use') {
        message = "This identity is already taken.";
      }
      toast({ 
        variant: "destructive", 
        title: "Authentication Failed", 
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md space-y-12 relative z-10 reveal-text">
        <header className="space-y-6 text-center">
          <div className="flex justify-center">
            <Sparkles className="w-6 h-6 text-white/20" />
          </div>
          <h2 className="text-4xl text-white font-serif italic">
            {isRegistering ? "Register Identity." : "Authenticate."}
          </h2>
          <p className="mono-label !text-white/20">
            Username and Secret required.
          </p>
        </header>

        {!auth && !userLoading && (
          <Alert variant="destructive" className="bg-red-950/20 border-red-900/50 text-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Hardware Disconnected</AlertTitle>
            <AlertDescription className="text-xs">
              The neural link is missing configuration keys. Authentication services are currently inactive.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleAuth} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="mono-label block ml-1 text-white/40">Username</label>
              <Input 
                type="text" 
                placeholder="identity_token" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={!auth}
                className="h-14 bg-white/[0.02] border-white/10 text-white rounded-none focus-visible:ring-white/10 font-mono text-xs tracking-widest disabled:opacity-30"
              />
            </div>
            <div className="space-y-2">
              <label className="mono-label block ml-1 text-white/40">Secret</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={!auth}
                className="h-14 bg-white/[0.02] border-white/10 text-white rounded-none focus-visible:ring-white/10 font-mono text-xs tracking-widest disabled:opacity-30"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !auth}
            className="w-full h-16 bg-white text-black hover:bg-white/90 rounded-none font-mono uppercase tracking-[0.3em] text-[10px] transition-all duration-700 shadow-2xl"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRegistering ? "Create Profile" : "Login")} 
            {!isLoading && <ArrowRight className="ml-2 w-3 h-3" />}
          </Button>

          <div className="pt-4 flex justify-center">
            <button 
              type="button"
              disabled={!auth}
              onClick={() => setIsRegistering(!isRegistering)}
              className="mono-label !text-white/20 hover:!text-white transition-colors py-2 lowercase disabled:pointer-events-none"
            >
              {isRegistering ? "existing identity? authenticate" : "no identity? register new"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
