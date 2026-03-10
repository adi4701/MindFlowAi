"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, ChevronRight, Filter } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data
const mockEntries = [
  {
    id: '1',
    date: 'Oct 24, 2023',
    preview: "Today was surprisingly calm. I spent some time walking through the park and thinking about my future goals...",
    mood: 'Peaceful',
    reflection: 'Focus on small steps rather than the whole journey.'
  },
  {
    id: '2',
    date: 'Oct 23, 2023',
    preview: "Feeling a bit overwhelmed with the new project at work. Too many moving pieces and tight deadlines...",
    mood: 'Anxious',
    reflection: 'Break tasks into manageable chunks.'
  },
  {
    id: '3',
    date: 'Oct 20, 2023',
    preview: "Great session at the gym today. Really pushed myself and reached a new personal best on squats...",
    mood: 'Energetic',
    reflection: 'Physical strength leads to mental resilience.'
  },
  {
    id: '4',
    date: 'Oct 18, 2023',
    preview: "It's raining outside. There's something very therapeutic about the sound of raindrops against the glass...",
    mood: 'Melancholic',
    reflection: 'Find beauty in the quiet, overcast moments.'
  },
  {
    id: '5',
    date: 'Oct 15, 2023',
    preview: "Finished that book I've been reading for weeks. The ending was unexpected but really thought-provoking...",
    mood: 'Contemplative',
    reflection: 'Learning never truly ends.'
  }
];

export default function HistoryPage() {
  const [search, setSearch] = useState('');

  const filteredEntries = mockEntries.filter(entry => 
    entry.preview.toLowerCase().includes(search.toLowerCase()) ||
    entry.mood.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-4 md:p-8 space-y-8 overflow-hidden">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold">Journal History</h2>
          <p className="text-muted-foreground font-body">Reflect on your growth over time.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search entries..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 bg-card border-border rounded-xl"
            />
          </div>
          <Badge variant="outline" className="h-11 px-4 cursor-pointer hover:bg-muted transition-colors border-border rounded-xl">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Badge>
        </div>
      </header>

      <ScrollArea className="flex-1 pr-4 custom-scrollbar">
        <div className="grid grid-cols-1 gap-4 pb-8">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <Card key={entry.id} className="group bg-card/40 border-border hover:bg-card hover:border-primary/30 transition-all cursor-pointer shadow-sm">
                <div className="flex items-stretch">
                  <div className="w-1.5 bg-muted group-hover:bg-primary transition-colors" />
                  <div className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm font-body text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {entry.date}
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1">
                        {entry.mood}
                      </Badge>
                    </div>
                    
                    <CardHeader className="p-0 mb-2">
                      <CardTitle className="text-lg font-headline line-clamp-1">{entry.preview}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                        {entry.preview}
                      </p>
                      {entry.reflection && (
                        <div className="flex items-start gap-2 text-xs font-body text-primary/80 italic mt-2 border-l-2 border-primary/20 pl-3">
                          Insight: {entry.reflection}
                        </div>
                      )}
                    </CardContent>
                  </div>
                  <div className="flex items-center px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
              <div className="p-4 rounded-full bg-muted">
                <Search className="w-8 h-8" />
              </div>
              <p className="font-headline text-lg">No entries found matching your search.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}