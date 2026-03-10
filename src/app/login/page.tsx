
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-12">
        <header className="space-y-4 text-center">
          <div className="mono-label mb-2">Authentication</div>
          <h2 className="text-4xl text-white font-serif italic">Welcome back.</h2>
          <p className="text-white/30 text-sm">Enter your digital signature to continue.</p>
        </header>

        <div className="space-y-6">
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

          <Button className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-none font-mono uppercase tracking-widest text-xs">
            Authenticate <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5"></span>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 mono-label">or</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-14 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-none font-mono uppercase tracking-widest text-xs">
            Continue with Google
          </Button>
        </div>

        <footer className="pt-12 text-center">
          <Link href="/" className="text-white/20 hover:text-white/40 transition-colors text-[10px] uppercase tracking-widest">
            ← Return to Silence
          </Link>
        </footer>
      </div>
    </div>
  );
}
