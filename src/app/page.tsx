import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, BookOpen, ChevronRight, Shield, Zap, Moon, Sun } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const featureReflectImg = PlaceHolderImages.find(img => img.id === 'feature-reflection');
  const featureMusicImg = PlaceHolderImages.find(img => img.id === 'feature-music');
  const featurePrivacyImg = PlaceHolderImages.find(img => img.id === 'feature-privacy');

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-8 max-w-7xl mx-auto w-full animate-reveal stagger-1">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-6 h-6" />
          <span className="text-xl font-headline font-bold text-foreground tracking-tight">MindFlow AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-body font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </div>
        <Button asChild variant="outline" className="rounded-full px-6 border-primary/20 hover:bg-primary/5">
          <Link href="/dashboard">Launch App</Link>
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        <div className="animate-reveal stagger-2 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
            <Zap className="w-3 h-3" /> The Future of Mental Wellness
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-headline font-bold text-foreground leading-[1.1] mb-8 animate-reveal stagger-3">
          Find your flow, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
            nurture your mind.
          </span>
        </h1>
        
        <p className="max-w-2xl text-muted-foreground text-xl font-body leading-relaxed mb-12 animate-reveal stagger-4">
          A tranquil digital sanctuary powered by AI. Experience personalized mood tracking, 
          intelligent journaling, and wellness recommendations tailored uniquely to you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-reveal stagger-5">
          <Button asChild size="lg" className="rounded-full px-10 h-16 text-lg font-headline font-semibold gap-3 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
            <Link href="/dashboard">
              Start Your Journey <ChevronRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="lg" className="rounded-full px-10 h-16 text-lg font-headline font-semibold text-muted-foreground hover:text-foreground">
            Watch the Video
          </Button>
        </div>

        {/* Floating App Mockup Preview */}
        <div className="mt-20 relative w-full max-w-4xl mx-auto animate-reveal stagger-5 animate-float">
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-[0_0_80px_rgba(var(--primary),0.1)] bg-card/40 backdrop-blur-xl aspect-video group">
            <Image 
              src={heroImg?.imageUrl || ''} 
              alt="App Preview" 
              fill 
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
              data-ai-hint={heroImg?.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div className="space-y-2 text-left">
                <div className="h-2 w-32 bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-primary animate-pulse" />
                </div>
                <p className="text-sm font-body text-foreground/70 italic">"MindFlow suggests a 10-minute meditation based on your current morning calm..."</p>
              </div>
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Intelligent features for a <br/><span className="text-primary">balanced life</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our AI understands your emotions and helps you navigate them with care.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">AI Reflections</h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">Advanced models analyze your journal entries to provide deep, empathetic insights into your growth.</p>
              <div className="relative h-40 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image src={featureReflectImg?.imageUrl || ''} alt="Reflection" fill className="object-cover" data-ai-hint={featureReflectImg?.imageHint} />
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-card border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors" />
              <div className="p-4 rounded-2xl bg-accent/10 text-accent w-fit mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Mood Curation</h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">Receive personalized music, activity, and wellness suggestions based on your real-time mood.</p>
              <div className="relative h-40 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image src={featureMusicImg?.imageUrl || ''} alt="Music" fill className="object-cover" data-ai-hint={featureMusicImg?.imageHint} />
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Total Privacy</h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">Your thoughts are yours alone. We use end-to-end encryption to ensure your data stays private and secure.</p>
              <div className="relative h-40 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image src={featurePrivacyImg?.imageUrl || ''} alt="Privacy" fill className="object-cover" data-ai-hint={featurePrivacyImg?.imageHint} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <p className="text-4xl font-headline font-bold text-primary">50k+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Active Seekers</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-headline font-bold text-primary">1M+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Reflections Made</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-headline font-bold text-primary">4.9/5</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">User Rating</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-headline font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Private & Secure</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-primary/20 via-card to-accent/20 p-12 md:p-24 text-center relative overflow-hidden border border-primary/20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.05),transparent)] pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 relative z-10 leading-tight">
            Ready to find your <br/><span className="text-primary italic">inner flow?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto relative z-10">
            Join thousands of users who are transforming their mental well-being with AI-guided reflection.
          </p>
          <div className="relative z-10">
            <Button asChild size="lg" className="rounded-full px-12 h-16 text-lg font-headline font-semibold shadow-xl shadow-primary/20">
              <Link href="/dashboard">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-primary opacity-70">
            <Sparkles className="w-5 h-5" />
            <span className="font-headline font-bold text-foreground">MindFlow AI</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MindFlow AI. Built for tranquility.
          </p>
        </div>
      </footer>
    </div>
  );
}