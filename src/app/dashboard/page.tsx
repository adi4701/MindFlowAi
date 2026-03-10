
"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/lib/types';
import { aiChatbotRecommendations } from '@/ai/flows/ai-chatbot-recommendations-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Loader2 } from 'lucide-react';

export default function ChatDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Speak freely. I am listening to the spaces between your words.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiChatbotRecommendations({ moodDescription: currentInput });
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I sense a resonance in your ${currentInput}. Here is what I've prepared for your current atmosphere.`,
        timestamp: new Date(),
        recommendations: response,
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "The connection flickered. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background p-6 md:p-12">
      <header className="flex items-center justify-between mb-12 shrink-0">
        <div>
          <h2 className="text-2xl font-serif italic text-white">The Atmosphere</h2>
          <p className="mono-label">MindFlow Neural Link Active</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
      </header>

      <ScrollArea className="flex-1 -mx-4 px-4 mb-8" viewportRef={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-16 py-8">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-4 reveal-text`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-white/60 text-right font-serif italic text-2xl' : 'text-white font-serif italic text-2xl'}`}>
                {msg.content}
              </div>
              
              {msg.recommendations && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8 animate-reveal">
                  <div className="space-y-4">
                    <span className="mono-label block border-b border-white/5 pb-2">Harmonics</span>
                    {msg.recommendations.songRecommendations.map((song, i) => (
                      <div key={i} className="group">
                        <p className="text-white text-sm font-medium">{song.title}</p>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider">{song.artist}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <span className="mono-label block border-b border-white/5 pb-2">Wellness</span>
                    {msg.recommendations.wellnessTips.map((tip, i) => (
                      <p key={i} className="text-white/50 text-sm leading-relaxed">
                        {tip}
                      </p>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <span className="mono-label block border-b border-white/5 pb-2">Practice</span>
                    {msg.recommendations.activitySuggestions.map((act, i) => (
                      <div key={i}>
                        <p className="text-white text-sm font-medium">{act.name}</p>
                        <p className="text-white/30 text-[10px] leading-relaxed mt-1">{act.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 items-center text-white/20 mono-label animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin" />
              Processing thought patterns...
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="max-w-3xl mx-auto w-full shrink-0">
        <div className="relative group glass-panel p-1 rounded-none">
          <Textarea 
            placeholder="Describe your current state..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="min-h-[100px] max-h-[300px] w-full bg-transparent border-none text-white font-serif italic text-xl p-6 focus-visible:ring-0 resize-none placeholder:text-white/10"
          />
          <div className="absolute bottom-4 right-6 flex items-center gap-4">
            <span className="mono-label opacity-0 group-hover:opacity-100 transition-opacity duration-500">Press Enter to Analyze</span>
            <Button 
              onClick={() => handleSubmit()} 
              disabled={!input.trim() || isLoading}
              variant="ghost"
              size="icon" 
              className="text-white/20 hover:text-white hover:bg-transparent transition-colors"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
