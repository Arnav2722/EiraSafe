import React, { useState, useEffect } from 'react';
import { Moon, Calendar, TrendingUp, Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type MoodEntry = {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  notes: string;
};

type Affirmation = {
  text: string;
  category: 'strength' | 'healing' | 'safety' | 'hope';
};

const affirmations: Affirmation[] = [
  { text: "I am stronger than I think.", category: 'strength' },
  { text: "I deserve peace and safety.", category: 'safety' },
  { text: "One step at a time, I am healing.", category: 'healing' },
  { text: "My feelings are valid and important.", category: 'healing' },
  { text: "I am worthy of respect and kindness.", category: 'safety' },
  { text: "I trust my instincts.", category: 'strength' },
  { text: "I have the power to create change in my life.", category: 'hope' },
  { text: "I am not alone, even when I feel lonely.", category: 'hope' },
  { text: "I can ask for help when I need it.", category: 'safety' },
  { text: "Each day contains possibilities for healing.", category: 'healing' },
  { text: "I am resilient and can overcome challenges.", category: 'strength' },
  { text: "My story matters and has meaning.", category: 'hope' },
];

const MoodTrackerPage: React.FC = () => {
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('mood-entries', []);
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [dailyAffirmation, setDailyAffirmation] = useState<Affirmation | null>(null);
  
  useEffect(() => {
    // Set a random affirmation when component mounts
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setDailyAffirmation(affirmations[randomIndex]);
  }, []);

  const addMoodEntry = () => {
    if (currentMood === null) return;

    const today = new Date().toISOString().split('T')[0];
    const existingEntryIndex = moodEntries.findIndex(entry => entry.date === today);

    if (existingEntryIndex >= 0) {
      // Update existing entry for today
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        mood: currentMood,
        notes: moodNote,
      };
      setMoodEntries(updatedEntries);
    } else {
      // Add new entry
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        date: today,
        mood: currentMood,
        notes: moodNote,
      };
      setMoodEntries([...moodEntries, newEntry]);
    }

    // Reset form
    setMoodNote('');
  };

  const getMoodIcon = (mood: number) => {
    switch (mood) {
      case 1: return <CloudLightning className="w-8 h-8 text-gray-700" />;
      case 2: return <CloudRain className="w-8 h-8 text-gray-600" />;
      case 3: return <Cloud className="w-8 h-8 text-gray-500" />;
      case 4: return <Sun className="w-8 h-8 text-yellow-500 opacity-75" />;
      case 5: return <Sun className="w-8 h-8 text-yellow-500" />;
      default: return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  const getMoodColor = (mood: number) => {
    switch (mood) {
      case 1: return 'bg-gray-200 border-gray-300';
      case 2: return 'bg-blue-100 border-blue-200';
      case 3: return 'bg-purple-100 border-purple-200';
      case 4: return 'bg-yellow-100 border-yellow-200';
      case 5: return 'bg-yellow-200 border-yellow-300';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const getMoodText = (mood: number) => {
    switch (mood) {
      case 1: return 'Very Difficult';
      case 2: return 'Struggling';
      case 3: return 'Okay';
      case 4: return 'Good';
      case 5: return 'Strong';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Sort entries by date (newest first)
  const sortedEntries = [...moodEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get random affirmation based on current mood
  const getTargetedAffirmation = () => {
    if (currentMood === null) return null;
    
    let category: 'strength' | 'healing' | 'safety' | 'hope';
    
    if (currentMood <= 2) {
      // For low moods, focus on safety and hope
      category = Math.random() > 0.5 ? 'safety' : 'hope';
    } else if (currentMood === 3) {
      // For neutral moods, focus on strength
      category = 'strength';
    } else {
      // For positive moods, focus on healing
      category = 'healing';
    }
    
    const filteredAffirmations = affirmations.filter(a => a.category === category);
    const randomIndex = Math.floor(Math.random() * filteredAffirmations.length);
    return filteredAffirmations[randomIndex];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 flex items-center justify-center">
          <Moon className="w-6 h-6 mr-2" />
          Mood Tracker
        </h1>
        <p className="text-gray-600 mt-2">
          Track how you're feeling over time to recognize patterns and progress.
        </p>
      </div>

      {/* Daily Affirmation */}
      {dailyAffirmation && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8 text-center">
          <h2 className="text-sm uppercase tracking-wider text-purple-600 mb-2">Daily Affirmation</h2>
          <p className="text-xl font-medium text-purple-800">"{dailyAffirmation.text}"</p>
        </div>
      )}

      {/* Add Mood Entry */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">How are you feeling today?</h2>
        
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map(mood => (
            <button
              key={mood}
              onClick={() => setCurrentMood(mood)}
              className={`flex flex-col items-center p-4 rounded-lg border ${
                currentMood === mood 
                  ? 'ring-2 ring-purple-500 border-purple-300' 
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              {getMoodIcon(mood)}
              <span className="mt-2 text-sm font-medium text-gray-700">{getMoodText(mood)}</span>
            </button>
          ))}
        </div>
        
        {currentMood !== null && (
          <>
            <div className="mb-4">
              <label htmlFor="mood-notes" className="block text-sm font-medium text-gray-700 mb-1">
                Add notes about your day (optional)
              </label>
              <textarea
                id="mood-notes"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="What contributed to how you're feeling today?"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentMood(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Reset
              </button>
              
              <button
                onClick={addMoodEntry}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Entry
              </button>
            </div>
            
            {/* Targeted affirmation based on mood */}
            {currentMood && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-purple-800 font-medium">
                  {getTargetedAffirmation()?.text || "Your feelings are valid. Be gentle with yourself today."}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Mood History</h2>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">Past entries</span>
          </div>
        </div>
        
        {sortedEntries.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              Your mood entries will appear here. Start by recording how you feel today.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedEntries.map(entry => (
              <div key={entry.id} className={`rounded-lg p-4 ${getMoodColor(entry.mood)}`}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    {getMoodIcon(entry.mood)}
                    <span className="ml-2 font-medium text-gray-800">{getMoodText(entry.mood)}</span>
                  </div>
                  <span className="text-sm text-gray-600">{formatDate(entry.date)}</span>
                </div>
                {entry.notes && (
                  <p className="text-gray-700 mt-2">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mood Insights */}
      {sortedEntries.length >= 5 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Mood Insights</h2>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-800">
              {sortedEntries.length > 0 ? (
                `You've tracked your mood ${sortedEntries.length} times. Noticing patterns in your emotions can help you understand what affects your wellbeing.`
              ) : (
                "Start tracking your mood to see insights about your emotional patterns."
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTrackerPage;