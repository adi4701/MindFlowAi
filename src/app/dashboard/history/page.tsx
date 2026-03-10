
"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const { user } = useUser();
  const db = useFirestore();

  const journalQuery = useMemo(() => {
    if (!user || !db) return null;
    return query(
      collection(db, 'users', user.uid, 'journal'),
      orderBy('createdAt', 'desc')
    );
  }, [user, db]);

  const { data: entries, loading } = useCollection(journalQuery);

  const filteredEntries = useMemo(() => {
    if (!entries) return [];
    return entries.filter(entry => 
      entry.content.toLowerCase().includes(search.toLowerCase()) ||
      (entry.reflection && entry.reflection.toLowerCase().includes(search.toLowerCase()))
    );
  }, [entries, search]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '...';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  };

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
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-6 h-6 animate-spin text-white/20" />
              <div className="mono-label">Syncing Archive...</div>
            </div>
          ) : filteredEntries.length > 0 ? (
            filteredEntries.map((entry: any) => (
              <div key={entry.id} className="group cursor-pointer py-8 border-b border-white/5 hover:border-white/20 transition-all duration-700">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-6">
                      <span className="mono-label !text-white/60">{formatDate(entry.createdAt)}</span>
                    </div>
                    <p className="text-2xl text-white/40 group-hover:text-white font-serif italic transition-colors duration-700 line-clamp-2">
                      {entry.content}
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
