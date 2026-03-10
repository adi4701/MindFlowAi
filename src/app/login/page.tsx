"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { useFirebase, useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc } from 'firebase/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useFirebase();
  const db = useFirestore();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const syncUserProfile = async (userId: string, email: string, displayName?: string) => {
    const userRef = doc(db, 'users', userId);
    setDoc(userRef, {
      uid: userId,
      email: email,
      displayName: displayName || email.split('@')[0],
      createdAt: new Date().toISOString(),
    }, { merge: true });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    try {
      if (isRegistering) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await syncUserProfile(cred.user.uid, email);
        toast({ title: "Welcome", description: "Your digital sanctuary is ready." });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Authentication Failed", 
        description: error.message 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      await syncUserProfile(cred.user.uid, cred.user.email!, cred.user.displayName || undefined);
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Google Auth Failed", 
        description: error.message 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md space-y-12 relative z-10">
        <header className="space-y-4 text-center">
          <div className="mono-label mb-2">Authentication</div>
          <h2 className="text-4xl text-white font-serif italic">
            {isRegistering ? "Begin Journey." : "Welcome back."}
          </h2>
          <p className="text-white/30 text-sm">
            {isRegistering ? "Create your neural signature." : "Enter your digital signature to continue."}
          </p>
        </header>

        <form onSubmit={handleEmailAuth} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="mono-label block ml-1">Email Address</label>
              <Input 
                type="email" 
                placeholder="name@domain.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 text-white rounded-none focus-visible:ring-white/20 placeholder:text-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="mono-label block ml-1">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 text-white rounded-none focus-visible:ring-white/20 placeholder:text-white/10"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-none font-mono uppercase tracking-widest text-xs transition-all duration-500"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRegistering ? "Create Session" : "Authenticate")} 
            {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
          </Button>

          <button 
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full text-center mono-label !text-white/20 hover:!text-white transition-colors py-2"
          >
            {isRegistering ? "Already registered? Login" : "Need access? Register"}
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
            className="w-full h-14 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-none font-mono uppercase tracking-widest text-xs"
          >
            Continue with Google
          </Button>
        </form>

        <footer className="pt-12 text-center">
          <Link href="/" className="text-white/20 hover:text-white/40 transition-colors text-[10px] uppercase tracking-widest">
            ← Return to Silence
          </Link>
        </footer>
      </div>
    </div>
  );
}
