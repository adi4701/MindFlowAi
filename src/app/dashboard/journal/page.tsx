"use client";

import { useState } from 'react';
import { aiJournalReflection } from '@/ai/flows/ai-journal-reflection-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, Sparkles, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function JournalPage() {
  const [content, setContent] = useState('');
  const [reflection, setReflection] = useState<string | null>(null);
  const [isReflecting, setIsReflecting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleReflect = async () => {
    if (!content.trim() || isReflecting) return;

    setIsReflecting(true);
    try {
      const response = await aiJournalReflection({ journalEntry: content });
      setReflection(response.reflection);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Reflection failed",
        description: "Could not generate an AI insight for this entry."
      });
    } finally {
      setIsReflecting(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Mock save
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Entry Saved",
        description: "Your journal entry has been securely stored."
      });
      setContent('');
      setReflection(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4 md:p-8 space-y-8 overflow-y-auto custom-scrollbar">
      <header className="space-y-2">
        <h2 className="text-3xl font-headline font-bold">Secure Digital Journal</h2>
        <p className="text-muted-foreground font-body">Write your thoughts freely. Only you can see them.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="font-body text-xs px-3 py-1 border-primary/20 bg-primary/5 text-primary">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Badge>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReflect} 
                disabled={!content.trim() || isReflecting}
                className="gap-2 font-headline border-primary/50 hover:bg-primary/10"
              >
                {isReflecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-primary" />}
                Get AI Insight
              </Button>
            </div>
          </div>
          
          <div className="relative group">
            <Textarea 
              placeholder="What's on your mind? Don't hold back..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] p-8 text-lg leading-relaxed bg-card border-border rounded-2xl focus:ring-primary/20 font-body resize-none"
            />
            <BookOpen className="absolute bottom-6 right-6 w-8 h-8 text-muted/30 pointer-events-none" />
          </div>

          <div className="flex justify-end">
            <Button 
              size="lg" 
              onClick={handleSave} 
              disabled={!content.trim() || isSaving}
              className="px-10 rounded-xl gap-2 h-12 shadow-lg shadow-primary/10"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Entry
            </Button>
          </div>
        </div>

        {reflection && (
          <Card className="bg-primary/5 border-primary/20 animate-fade-in shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 font-headline text-primary">
                <Sparkles className="w-5 h-5" /> MindFlow Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed font-body italic">
                "{reflection}"
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}