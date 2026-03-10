"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/lib/types';
import { aiChatbotRecommendations } from '@/ai/flows/ai-chatbot-recommendations-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Music, Activity, Leaf, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ChatDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm MindFlow AI. How are you feeling today? Describe your mood, and I'll recommend some music, wellness tips, and activities to help you find your flow.",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiChatbotRecommendations({ moodDescription: input });
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've put together some recommendations based on you feeling "${input}". I hope these help you find a bit of balance today.`,
        timestamp: new Date(),
        recommendations: response,
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I couldn't process your mood right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-4 md:p-8 space-y-4">
      <header className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-headline font-bold">MindFlow Companion</h2>
          <p className="text-sm text-muted-foreground font-body">AI-driven mood support & wellness.</p>
        </div>
        <Badge variant="outline" className="border-primary/50 text-primary px-3 py-1 flex gap-2">
          <Sparkles className="w-3 h-3" /> AI Active
        </Badge>
      </header>

      <ScrollArea className="flex-1 pr-4 custom-scrollbar" viewportRef={scrollRef}>
        <div className="flex flex-col gap-6 py-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2 animate-fade-in`}>
              <div className={msg.role === 'user' ? 'chat-bubble-user font-body' : 'chat-bubble-ai font-body'}>
                {msg.content}
              </div>
              
              {msg.recommendations && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
                  <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 font-headline">
                        <Music className="w-4 h-4 text-primary" /> Music
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {msg.recommendations.songRecommendations.map((song, i) => (
                        <div key={i} className="text-xs group">
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{song.title}</p>
                          <p className="text-muted-foreground">{song.artist}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 font-headline">
                        <Leaf className="w-4 h-4 text-primary" /> Wellness
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {msg.recommendations.wellnessTips.map((tip, i) => (
                        <p key={i} className="text-xs text-muted-foreground leading-relaxed">
                          • {tip}
                        </p>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 font-headline">
                        <Activity className="w-4 h-4 text-primary" /> Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {msg.recommendations.activitySuggestions.map((act, i) => (
                        <div key={i} className="text-xs">
                          <p className="font-semibold text-foreground">{act.name}</p>
                          <p className="text-muted-foreground line-clamp-2">{act.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 items-center text-muted-foreground text-sm animate-pulse px-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              MindFlow is thinking...
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="relative mt-auto">
        <Input 
          placeholder="How are you feeling today?" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-14 pl-6 pr-14 rounded-2xl bg-card border-border focus:ring-primary focus:border-primary font-body"
        />
        <Button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          size="icon" 
          className="absolute right-2 top-2 h-10 w-10 rounded-xl"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}