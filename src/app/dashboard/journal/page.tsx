
"use client";

import { useState } from 'react';
import { aiJournalReflection } from '@/ai/flows/ai-journal-reflection-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function JournalPage() {
  const [content, setContent] = useState('');
  const [reflection, setReflection] = useState<string | null>(null);
  const [isReflecting, setIsReflecting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const db = useFirestore();

  const handleReflect = async () => {
    if (!content.trim() || isReflecting) return;

    setIsReflecting(true);
    try {
      const response = await aiJournalReflection({ journalEntry: content });
      setReflection(response.reflection);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Insight Disrupted",
        description: "The AI could not synchronize with this entry."
      });
    } finally {
      setIsReflecting(false);
    }
  };

  const handleSave = () => {
    if (!user || !content.trim()) return;
    setIsSaving(true);
    
    const journalRef = collection(db, 'users', user.uid, 'journal');
    const data = {
      userId: user.uid,
      content,
      reflection: reflection || "",
      createdAt: serverTimestamp(),
      tags: [],
    };

    addDoc(journalRef, data)
      .then(() => {
        toast({
          title: "Entry Archived",
          description: "Securely stored in your archive."
        });
        setContent('');
        setReflection(null);
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: journalRef.path,
          operation: 'create',
          requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto w-full p-8 md:p-16 space-y-16 overflow-y-auto custom-scrollbar">
      <header className="space-y-4">
        <div className="mono-label">Private Journaling Interface</div>
        <h2 className="text-5xl font-serif italic text-white">Write into the void.</h2>
        <p className="text-white/30 font-mono text-xs uppercase tracking-widest">Only you and the silence know these words.</p>
      </header>

      <div className="space-y-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <span className="mono-label">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReflect} 
              disabled={!content.trim() || isReflecting}
              className="mono-label hover:text-white transition-colors gap-2"
            >
              {isReflecting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              Request AI Insight
            </Button>
          </div>
          
          <Textarea 
            placeholder="Let the thoughts flow..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] w-full bg-transparent border-none text-white/80 font-serif italic text-3xl leading-relaxed p-0 focus-visible:ring-0 resize-none placeholder:text-white/5"
          />

          <div className="flex justify-end pt-8">
            <Button 
              onClick={handleSave} 
              disabled={!content.trim() || isSaving}
              className="h-16 px-12 bg-white text-black hover:bg-white/90 rounded-none font-mono uppercase tracking-widest text-xs shadow-2xl transition-all duration-700"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Commit to Memory"}
            </Button>
          </div>
        </div>

        {reflection && (
          <div className="p-12 glass-panel space-y-4 reveal-text">
            <span className="mono-label block text-white/40 mb-4">Neural Reflection</span>
            <p className="text-white font-serif italic text-2xl leading-relaxed">
              "{reflection}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
