"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const syncUserProfile = async (userId: string, userUsername: string) => {
    if (!db) return;
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        uid: userId,
        username: userUsername,
        displayName: userUsername,
        createdAt: serverTimestamp(),
      }, { merge: true });
    } catch (e) {
      console.warn("Profile synchronization failed:", e);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || isLoading || !auth) return;
    
    // Firebase requires an email format, so we map the username to an internal domain.
    const internalEmail = `${username.toLowerCase().trim()}@mindflow.ai`;

    setIsLoading(true);
    try {
      if (isRegistering) {
        const cred = await createUserWithEmailAndPassword(auth, internalEmail, password);
        await syncUserProfile(cred.user.uid, username);
        toast({ title: "Sanctuary Initialized", description: "Your digital space is ready." });
      } else {
        await signInWithEmailAndPassword(auth, internalEmail, password);
        toast({ title: "Link Restored", description: "Welcome back to the silence." });
      }
    } catch (error: any) {
      let message = error.message.replace('Firebase: ', '');
      if (message.includes('auth/user-not-found') || message.includes('auth/wrong-password') || message.includes('auth/invalid-credential')) {
        message = "Identity not recognized or secret is incorrect.";
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

  if (!auth) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-6">
        <h2 className="text-2xl font-serif italic text-white">System Offline</h2>
        <p className="mono-label">The neural link configuration is missing.</p>
        <Link href="/" className="mono-label hover:text-white transition-colors">← Return to menu</Link>
      </div>
    );
  }

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
            {isRegistering ? "Begin Resonance." : "Resume Session."}
          </h2>
          <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">
            {isRegistering ? "Create your neural signature." : "Authenticate to continue."}
          </p>
        </header>

        <form onSubmit={handleAuth} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="mono-label block ml-1">Username</label>
              <Input 
                type="text" 
                placeholder="choose_identity" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-14 bg-white/[0.02] border-white/5 text-white rounded-none focus-visible:ring-white/10 placeholder:text-white/5 font-mono text-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="mono-label block ml-1">Secret</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-14 bg-white/[0.02] border-white/5 text-white rounded-none focus-visible:ring-white/10 placeholder:text-white/5 font-mono text-xs"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-16 bg-white text-black hover:bg-white/90 rounded-none font-mono uppercase tracking-[0.3em] text-[10px] transition-all duration-700 shadow-2xl"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRegistering ? "Create Link" : "Authenticate")} 
            {!isLoading && <ArrowRight className="ml-2 w-3 h-3" />}
          </Button>

          <div className="pt-4">
            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full text-center mono-label !text-white/20 hover:!text-white transition-colors py-2 lowercase"
            >
              {isRegistering ? "already registered? login" : "need access? register"}
            </button>
          </div>
        </form>

        <footer className="pt-12 text-center">
          <Link href="/" className="mono-label !text-white/10 hover:!text-white transition-colors lowercase">
            ← Return to silence
          </Link>
        </footer>
      </div>
    </div>
  );
}
