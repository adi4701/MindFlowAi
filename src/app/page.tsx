import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, BookOpen, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12">
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <Sparkles className="w-8 h-8" />
          <span className="text-2xl font-headline font-bold">MindFlow AI</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground">
          Find your flow, <br />
          <span className="text-primary">nurture your mind.</span>
        </h1>
        <p className="max-w-xl mx-auto text-muted-foreground text-lg font-body">
          A tranquil space for introspection. AI-guided journaling, mood-based recommendations, and daily wellness insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="p-6 rounded-2xl bg-card border border-border space-y-3 text-left hover:border-primary/50 transition-colors">
          <Sparkles className="w-6 h-6 text-primary" />
          <h3 className="font-headline font-semibold">AI Insights</h3>
          <p className="text-sm text-muted-foreground">Deep reflections on your journal entries powered by advanced AI models.</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border space-y-3 text-left hover:border-primary/50 transition-colors">
          <Heart className="w-6 h-6 text-primary" />
          <h3 className="font-headline font-semibold">Mood Therapy</h3>
          <p className="text-sm text-muted-foreground">Personalized song lists and activities based on how you feel right now.</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border space-y-3 text-left hover:border-primary/50 transition-colors">
          <BookOpen className="w-6 h-6 text-primary" />
          <h3 className="font-headline font-semibold">Secure Journal</h3>
          <p className="text-sm text-muted-foreground">A private, encrypted digital space for your most personal thoughts.</p>
        </div>
      </div>

      <div className="pt-8">
        <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg font-headline font-semibold gap-2 shadow-lg shadow-primary/20">
          <Link href="/dashboard">
            Get Started <ChevronRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      <footer className="fixed bottom-8 text-sm text-muted-foreground opacity-50">
        MindFlow AI &copy; {new Date().getFullYear()} — Cultivating inner peace.
      </footer>
    </div>
  );
}