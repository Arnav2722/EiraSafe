import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';

const AFFIRMATIONS_FOR_WOMEN = [
  "I am strong, capable, and resilient. I can overcome any challenge.",
  "My voice matters, and my opinions are valuable. I deserve to be heard.",
  "I am worthy of love, respect, and kindness. I radiate inner peace.",
  "My body is beautiful and strong, and I am grateful for all it does.",
  "I am a source of creativity and inspiration. My ideas are impactful.",
  "I trust my intuition and inner wisdom to guide me on my path.",
  "I embrace my unique qualities and celebrate my individuality.",
  "I am enough, exactly as I am, with all my strengths and vulnerabilities.",
  "I choose joy, peace, and abundance in every aspect of my life.",
  "I release all self-doubt and step into my power with confidence.",
  "I am a compassionate woman, and I extend that compassion to myself.",
  "Every day, I am growing, learning, and becoming the best version of myself.",
  "My contributions make a difference in the world.",
  "I am surrounded by love and support, and I give love freely.",
  "I allow myself to rest and recharge without guilt. My well-being is a priority.",
  "I am resilient in the face of adversity. I rise stronger each time.",
  "I am capable of achieving my dreams and aspirations.",
  "My potential is limitless, and I am constantly evolving.",
  "I forgive myself for past mistakes and learn from them with grace.",
  "I am beautiful from the inside out, radiating confidence and grace.",
  "My worth is not defined by external validation, but by my inner spirit.",
  "I am creating the life of my dreams with intention and joy.",
  "I am filled with courage and grace.",
  "I am powerful, gentle, and wise.",
];

const SelfAffirmationPage: React.FC = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState('');

  const getRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * AFFIRMATIONS_FOR_WOMEN.length);
    setCurrentAffirmation(AFFIRMATIONS_FOR_WOMEN[randomIndex]);
  };

  useEffect(() => {
    getRandomAffirmation();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 flex items-center justify-center">
          <Heart className="w-8 h-8 mr-2 text-red-500" />
          Self-Love & Affirmations
          <Sparkles className="w-8 h-8 ml-2 text-yellow-400" />
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Embrace your strength, beauty, and worth.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center border-2 border-pink-100">
        {currentAffirmation ? (
          <p className="text-gray-800 text-xl md:text-2xl font-semibold italic">
            "{currentAffirmation}"
          </p>
        ) : (
          <p className="text-gray-500 text-xl">Loading affirmation...</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={getRandomAffirmation}
          className="flex items-center px-6 py-3 rounded-full bg-pink-600 text-white font-semibold text-lg hover:bg-pink-700 transition-colors shadow-md"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          New Affirmation
        </button>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Take a moment to truly feel these words. Your well-being matters.</p>
      </div>
    </div>
  );
};

export default SelfAffirmationPage;