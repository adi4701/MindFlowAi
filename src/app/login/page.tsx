"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
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

  const syncUserProfile = async (userId: string, userEmail: string, displayName?: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        uid: userId,
        email: userEmail,
        displayName: displayName || userEmail.split('@')[0],
        createdAt: serverTimestamp(),
      }, { merge: true });
    } catch (e) {
      // Silent fail on profile sync to ensure login proceeds
      console.warn("Profile sync non-critical failure:", e);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || isLoading) return;
    
    setIsLoading(true);
    try {
      if (isRegistering) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await syncUserProfile(cred.user.uid, email);
        toast({ title: "Sanctuary Initialized", description: "Your digital space is ready." });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Link Interrupted", 
        description: error.message.replace('Firebase: ', '') 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      await syncUserProfile(cred.user.uid, cred.user.email!, cred.user.displayName || undefined);
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Google Link Failed", 
        description: error.message.replace('Firebase: ', '')
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
            {isRegistering ? "Begin Resonance." : "Resume Session."}
          </h2>
          <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">
            {isRegistering ? "Create your neural signature." : "Authenticate to continue."}
          </p>
        </header>

        <form onSubmit={handleAuth} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="mono-label block ml-1">Email</label>
              <Input 
                type="email" 
                placeholder="identity@resonance.io" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          <div className="space-y-4">
            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full text-center mono-label !text-white/20 hover:!text-white transition-colors py-2 lowercase"
            >
              {isRegistering ? "already registered? login" : "need access? register"}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 mono-label">or</span>
              </div>
            </div>

            <Button 
              type="button"
              variant="outline" 
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full h-14 border-white/5 bg-transparent hover:bg-white/5 text-white/40 hover:text-white rounded-none font-mono uppercase tracking-widest text-[9px] transition-all duration-500"
            >
              Continue with Google
            </Button>
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
