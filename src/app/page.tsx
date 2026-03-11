
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, Zap, Book, Users, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center relative overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-white/[0.02] rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-8 py-12 flex justify-between items-center relative z-10 reveal-text" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-serif italic text-xl text-white">MindFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-12">
          <Link href="#architecture" className="mono-label hover:text-white transition-colors">Architecture</Link>
          <Link href="#resonances" className="mono-label hover:text-white transition-colors">Resonances</Link>
          <Button asChild variant="ghost" className="mono-label !text-white/40 hover:!text-white">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </nav>

      <main className="w-full relative z-10 flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 space-y-12 max-w-5xl mx-auto">
          <header className="space-y-8 reveal-text" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-center">
              <div className="mono-label border border-white/5 bg-white/[0.02] px-4 py-1.5 rounded-full backdrop-blur-md">
                Neural Link Protocol v1.0.4 • ACTIVE
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-serif italic leading-[1.1] tracking-tight">
              Step into your <br />
              <span className="text-white/20 hover:text-white transition-colors duration-1000 cursor-default">resonance.</span>
            </h1>
            <p className="text-white/30 max-w-2xl mx-auto text-xl md:text-2xl font-light leading-relaxed font-serif italic">
              A sanctuary for the silent hours. Speak your mind into the void and find the architecture in your chaos.
            </p>
          </header>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 reveal-text" style={{ animationDelay: '0.5s' }}>
            <Button asChild className="h-20 px-16 bg-white text-black hover:bg-white/90 rounded-none font-mono uppercase tracking-[0.3em] text-xs shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-700">
              <Link href="/login">Initialize Session</Link>
            </Button>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="w-full border-y border-white/5 bg-white/[0.01] py-24 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-2 reveal-text" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl text-white font-mono tracking-tighter">12,402</div>
              <div className="mono-label">Minds Synchronized</div>
            </div>
            <div className="space-y-2 reveal-text" style={{ animationDelay: '0.7s' }}>
              <div className="text-4xl text-white font-mono tracking-tighter">1.2M+</div>
              <div className="mono-label">Reflections Generated</div>
            </div>
            <div className="space-y-2 reveal-text" style={{ animationDelay: '0.8s' }}>
              <div className="text-4xl text-white font-mono tracking-tighter">100%</div>
              <div className="mono-label">Private Architecture</div>
            </div>
          </div>
        </section>

        {/* Features / Architecture Section */}
        <section id="architecture" className="w-full py-32 px-8 max-w-7xl mx-auto space-y-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <div className="mono-label">Process 01</div>
              <h2 className="text-5xl text-white font-serif italic">Atmospheric Analysis.</h2>
              <p className="text-white/40 text-lg leading-relaxed font-serif italic">
                Our neural link doesn't just read words; it senses resonance. Describe your current state, and MindFlow generates a sonic and wellness atmosphere tailored to your frequency.
              </p>
              <div className="flex gap-4">
                <Zap className="w-5 h-5 text-white/20" />
                <span className="mono-label !text-white/60">Real-time Mood Harmonics</span>
              </div>
            </div>
            <div className="glass-panel p-1 aspect-video relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-pulse" />
               <div className="h-full w-full flex items-center justify-center border border-white/5">
                 <span className="mono-label opacity-20">Visualization Matrix</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center md:flex-row-reverse">
            <div className="glass-panel p-1 aspect-video relative order-2 md:order-1">
               <div className="h-full w-full flex items-center justify-center border border-white/5 bg-white/[0.02]">
                 <Book className="w-12 h-12 text-white/5" />
               </div>
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <div className="mono-label">Process 02</div>
              <h2 className="text-5xl text-white font-serif italic">Neural Reflection.</h2>
              <p className="text-white/40 text-lg leading-relaxed font-serif italic">
                Commit your thoughts to the void. Our AI assistant provides concise, reflective insights that help you see the hidden patterns in your internal dialogue.
              </p>
              <div className="flex gap-4">
                <Users className="w-5 h-5 text-white/20" />
                <span className="mono-label !text-white/60">Human-AI Cognitive Bridge</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials / Resonances */}
        <section id="resonances" className="w-full py-32 px-8 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto space-y-24">
            <div className="text-center space-y-4">
              <div className="mono-label">Social Resonance</div>
              <h2 className="text-5xl text-white font-serif italic">Voices from the Silence.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  quote: "It feels like the website is breathing with me. The reflection helped me understand a pattern I've had for years.",
                  author: "Elena V.",
                  role: "Architect"
                },
                {
                  quote: "Finally, an AI that doesn't talk back too much. It just listens and mirrors. It's the digital studio I've always wanted.",
                  author: "Marcus K.",
                  role: "Sound Designer"
                },
                {
                  quote: "The interface is so quiet it forces me to be honest. There's nowhere to hide from your own thoughts here.",
                  author: "Sarah L.",
                  role: "Writer"
                }
              ].map((t, i) => (
                <div key={i} className="glass-panel p-12 space-y-8 hover:bg-white/[0.04] transition-all duration-700">
                  <Star className="w-4 h-4 text-white/10" />
                  <p className="text-white/60 text-xl font-serif italic leading-relaxed">"{t.quote}"</p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-white text-sm font-medium">{t.author}</p>
                    <p className="mono-label !text-[8px] mt-1">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-48 px-8 text-center space-y-12">
          <div className="space-y-4">
            <div className="mono-label">Ready to begin?</div>
            <h2 className="text-6xl text-white font-serif italic">Your void is waiting.</h2>
          </div>
          <Button asChild className="h-20 px-16 bg-white text-black hover:bg-white/90 rounded-none font-mono uppercase tracking-[0.3em] text-xs transition-all duration-700">
            <Link href="/login">Initialize Session</Link>
          </Button>
          <div>
             <Link href="#top" className="mono-label !text-white/10 hover:!text-white transition-colors">Return to Top</Link>
          </div>
        </section>

      </main>

      <footer className="w-full py-12 px-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="mono-label">© 2024 MindFlow AI • Neural Aesthetics Division</p>
          <div className="flex gap-8">
            <span className="mono-label">Privacy Registry</span>
            <span className="mono-label">Terms of Resonance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
