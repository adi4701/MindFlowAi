
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <main className="max-w-4xl w-full text-center space-y-12 relative z-10">
        <header className="space-y-4 reveal-text" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-center mb-8">
            <div className="mono-label border border-white/10 px-3 py-1 rounded-full">
              MindFlow AI v1.0.4
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif italic leading-tight">
            Step into your resonance.
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            A sanctuary for the silent hours. Speak your mind, find the architecture in your chaos.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal-text" style={{ animationDelay: '0.4s' }}>
          <Button asChild variant="outline" className="h-14 px-10 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono uppercase tracking-widest text-xs transition-all duration-700">
            <Link href="/login">Initialize Session</Link>
          </Button>
          <Link href="#principles" className="text-white/30 hover:text-white/60 transition-colors font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            The Principles <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-12 left-0 right-0 flex justify-center reveal-text" style={{ animationDelay: '0.8s' }}>
        <p className="mono-label">Privacy is the only default.</p>
      </footer>
    </div>
  );
}
