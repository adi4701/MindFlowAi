
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockEntries = [
  {
    id: '1',
    date: 'OCT 24, 2023',
    preview: "Today was surprisingly calm. I spent some time walking through the park...",
    mood: 'Peaceful',
    reflection: 'Focus on small steps rather than the whole journey.'
  },
  {
    id: '2',
    date: 'OCT 23, 2023',
    preview: "Feeling a bit overwhelmed with the new project at work. Too many moving pieces...",
    mood: 'Anxious',
    reflection: 'Break tasks into manageable chunks.'
  },
  {
    id: '3',
    date: 'OCT 20, 2023',
    preview: "Great session at the gym today. Really pushed myself and reached a new personal best...",
    mood: 'Energetic',
    reflection: 'Physical strength leads to mental resilience.'
  }
];

export default function HistoryPage() {
  const [search, setSearch] = useState('');

  const filteredEntries = mockEntries.filter(entry => 
    entry.preview.toLowerCase().includes(search.toLowerCase()) ||
    entry.mood.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto w-full p-8 md:p-16 space-y-16 overflow-hidden">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="mono-label">Archive Registry</div>
          <h2 className="text-5xl font-serif italic text-white">Your timeline.</h2>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
          <Input 
            placeholder="Search entries..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 pl-10 bg-white/[0.03] border-white/10 text-white rounded-none focus-visible:ring-white/20 font-mono text-xs uppercase tracking-widest placeholder:text-white/10"
          />
        </div>
      </header>

      <ScrollArea className="flex-1 -mx-4 px-4 custom-scrollbar">
        <div className="space-y-12 pb-24">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="group cursor-pointer py-8 border-b border-white/5 hover:border-white/20 transition-all duration-700">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-6">
                      <span className="mono-label !text-white/60">{entry.date}</span>
                      <span className="mono-label text-white/20">— {entry.mood}</span>
                    </div>
                    <p className="text-2xl text-white/40 group-hover:text-white font-serif italic transition-colors duration-700 line-clamp-2">
                      {entry.preview}
                    </p>
                    {entry.reflection && (
                      <div className="mono-label text-[9px] !text-white/20 border-l border-white/10 pl-4 py-1 italic">
                        Insight: {entry.reflection}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white group-hover:translate-x-2 transition-all duration-700 mt-2" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center space-y-4">
              <div className="mono-label">No matches found in archive.</div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
