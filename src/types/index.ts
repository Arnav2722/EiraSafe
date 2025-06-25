export type JournalEntry = {
  id: string;
  content: string;
  timestamp: number;
  aiResponse?: string;
};

export type SafetyItem = {
  id: string;
  category: string;
  content: string;
};

export type MoodEntry = {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  notes: string;
};

export type Resource = {
  id: string;
  name: string;
  category: 'helpline' | 'shelter' | 'legal' | 'counseling' | 'medical';
  description: string;
  contact: string;
  hours: string;
  address?: string;
  website?: string;
};

export type Affirmation = {
  text: string;
  category: 'strength' | 'healing' | 'safety' | 'hope';
};