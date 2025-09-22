import React, { useState, useEffect } from "react";
import {
  Moon,
  Calendar,
  TrendingUp,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
} from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type MoodEntry = {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  notes: string;
};

type Affirmation = {
  text: string;
  category: "strength" | "healing" | "safety" | "hope";
};

const affirmations: Affirmation[] = [
  { text: "You are stronger than you think.", category: "strength" },
  { text: "You deserve peace and safety.", category: "safety" },
  { text: "One step at a time, You are healing.", category: "healing" },
  { text: "Your feelings are valid and important.", category: "healing" },
  { text: "You are worthy of respect and kindness.", category: "safety" },
  { text: "You must trust your instincts.", category: "strength" },
  {
    text: "You have the power to create change in your life.",
    category: "hope",
  },
  { text: "I am not alone, even when I feel lonely.", category: "hope" },
  { text: "You can ask for help when you need it.", category: "safety" },
  { text: "Each day contains possibilities for healing.", category: "healing" },
  {
    text: "You are resilient and can overcome challenges.",
    category: "strength",
  },
  { text: "Your story matters and has meaning.", category: "hope" },
];

const selectTargetedAffirmation = (mood: number): Affirmation => {
  let category: "strength" | "healing" | "safety" | "hope";

  if (mood <= 2) {
    category = Math.random() > 0.5 ? "safety" : "hope";
  } else if (mood === 3) {
    category = Math.random() > 0.5 ? "strength" : "hope";
  } else {
    category = Math.random() > 0.5 ? "healing" : "strength";
  }

  const filteredAffirmations = affirmations.filter(
    (a) => a.category === category
  );
  if (filteredAffirmations.length === 0) {
    return {
      text: "Your feelings are valid. Be gentle with yourself today.",
      category: "healing",
    };
  }
  const randomIndex = Math.floor(Math.random() * filteredAffirmations.length);
  return filteredAffirmations[randomIndex];
};

const MoodTrackerPage: React.FC = () => {
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>(
    "mood-entries",
    []
  );
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState("");
  const [dailyAffirmation, setDailyAffirmation] = useState<Affirmation | null>(
    null
  );
  const [targetedMoodAffirmation, setTargetedMoodAffirmation] = useState<
    string | null
  >(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setDailyAffirmation(affirmations[randomIndex]);
  }, []);

  useEffect(() => {
    if (currentMood !== null) {
      const selectedAffirmation = selectTargetedAffirmation(currentMood);
      setTargetedMoodAffirmation(selectedAffirmation.text);
    } else {
      setTargetedMoodAffirmation(null);
    }
  }, [currentMood]);

  const addMoodEntry = () => {
    if (currentMood === null) return;
    const today = new Date().toISOString().split("T")[0];
    const existingEntryIndex = moodEntries.findIndex(
      (entry) => entry.date === today
    );
    if (existingEntryIndex >= 0) {
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        mood: currentMood,
        notes: moodNote,
      };
      setMoodEntries(updatedEntries);
    } else {
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        date: today,
        mood: currentMood,
        notes: moodNote,
      };
      setMoodEntries([...moodEntries, newEntry]);
    }
    setMoodNote("");
    setCurrentMood(null);
  };

  const getMoodIcon = (mood: number) => {
    switch (mood) {
      case 1:
        return (
          <CloudLightning className="w-8 h-8 text-gray-700 dark:text-gray-300" />
        );
      case 2:
        return (
          <CloudRain className="w-8 h-8 text-gray-600 dark:text-gray-400" />
        );
      case 3:
        return <Cloud className="w-8 h-8 text-gray-500 dark:text-gray-500" />;
      case 4:
        return (
          <Sun className="w-8 h-8 text-yellow-500 dark:text-yellow-400 opacity-75" />
        );
      case 5:
        return <Sun className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500 dark:text-gray-500" />;
    }
  };

  const getMoodColor = (mood: number) => {
    switch (mood) {
      case 1:
        return "bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700";
      case 2:
        return "bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-900";
      case 3:
        return "bg-purple-100 dark:bg-purple-950 border-purple-200 dark:border-purple-900";
      case 4:
        return "bg-yellow-100 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-900";
      case 5:
        return "bg-yellow-200 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-800";
      default:
        return "bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800";
    }
  };

  const getMoodText = (mood: number) => {
    switch (mood) {
      case 1:
        return "Very Difficult";
      case 2:
        return "Struggling";
      case 3:
        return "Okay";
      case 4:
        return "Good";
      case 5:
        return "Strong";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const sortedEntries = [...moodEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-800 dark:text-gray-200">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 dark:text-purple-400 flex items-center justify-center">
          <Moon className="w-6 h-6 mr-2 dark:text-purple-400" />
          Mood Tracker
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track how you're feeling over time to recognize patterns and progress.
        </p>
      </div>
      {dailyAffirmation && (
        <div className="bg-gradient-to-r from-purple-50 dark:from-purple-900 to-blue-50 dark:to-blue-900 rounded-xl p-6 mb-8 text-center">
          <h2 className="text-sm uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
            Daily Affirmation
          </h2>
          <p className="text-xl font-medium text-purple-800 dark:text-purple-200">
            "{dailyAffirmation.text}"
          </p>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          How are you feeling today?
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((mood) => (
            <button
              key={mood}
              onClick={() => setCurrentMood(mood)}
              className={`flex flex-col items-center p-4 rounded-lg border ${
                currentMood === mood
                  ? "ring-2 ring-purple-500 dark:ring-purple-400 border-purple-300 dark:border-purple-500"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
              } bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300`}
            >
              {getMoodIcon(mood)}
              <span className="mt-2 text-sm font-medium">
                {getMoodText(mood)}
              </span>
            </button>
          ))}
        </div>
        {currentMood !== null && (
          <>
            <div className="mb-4">
              <label
                htmlFor="mood-notes"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Add notes about your day (optional)
              </label>
              <textarea
                id="mood-notes"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="What contributed to how you're feeling today?"
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 focus:border-purple-300 dark:focus:border-purple-600 min-h-[100px] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setCurrentMood(null);
                  setMoodNote("");
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Reset
              </button>
              <button
                onClick={addMoodEntry}
                className="px-6 py-2 bg-purple-600 dark:bg-purple-800 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-900"
              >
                Save Entry
              </button>
            </div>
            {targetedMoodAffirmation && (
              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-100 dark:border-purple-900">
                <p className="text-purple-800 dark:text-purple-200 font-medium">
                  {targetedMoodAffirmation}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Your Mood History
          </h2>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Past entries
            </span>
          </div>
        </div>
        {sortedEntries.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Your mood entries will appear here. Start by recording how you
              feel today.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedEntries.map((entry) => (
              <div
                key={entry.id}
                className={`rounded-lg p-4 ${getMoodColor(entry.mood)}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    {getMoodIcon(entry.mood)}
                    <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                      {getMoodText(entry.mood)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(entry.date)}
                  </span>
                </div>
                {entry.notes && (
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {entry.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {sortedEntries.length >= 5 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Mood Insights
            </h2>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <p className="text-purple-800 dark:text-purple-200">
              {sortedEntries.length > 0
                ? `You've tracked your mood ${sortedEntries.length} times. Noticing patterns in your emotions can help you understand what affects your wellbeing.`
                : "Start tracking your mood to see insights about your emotional patterns."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTrackerPage;
