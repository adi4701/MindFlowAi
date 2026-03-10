export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
  reflection?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  recommendations?: {
    songRecommendations: { title: string; artist: string; genre?: string }[];
    wellnessTips: string[];
    activitySuggestions: { name: string; description: string }[];
  };
}