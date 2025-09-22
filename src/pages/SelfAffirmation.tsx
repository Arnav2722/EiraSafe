import React, { useState, useEffect } from "react";
import { Heart, Sparkles, RefreshCw } from "lucide-react";

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
  "I am a gentle soul, capable of enduring and finding peace.",
  "My feelings are valid, and I deserve kindness, always.",
  "I am worthy of comfort and care, just as I am.",
  "I treat my body with love and gratitude, for simply being here.",
  "I am a quiet source of creativity, unfolding naturally.",
  "I listen to my inner voice with tenderness and trust.",
  "I embrace my true self, with all my beautiful imperfections.",
  "I am perfectly enough, exactly in this moment.",
  "I invite joy and calm into my life, letting them flow effortlessly.",
  "I gently release worries and embrace a sense of inner peace.",
  "I offer myself the same compassion I would offer a dear friend.",
  "Each day, I am learning and growing, softly blooming at my own pace.",
  "My presence itself is a gift to the world.",
  "I am surrounded by gentle support and a warm embrace.",
  "Rest is a gift I deserve to give myself, without guilt.",
  "I navigate challenges with quiet strength and resilience.",
  "I am capable of gentle progress towards my hopes and dreams.",
  "My journey is unfolding beautifully, one kind step at a time.",
  "I extend grace and forgiveness to myself for all my experiences.",
  "I radiate a soft beauty that comes from within.",
  "My worth is inherent, a quiet truth within my heart.",
  "I am gently creating a life that feels aligned and peaceful.",
  "I am filled with a quiet courage and a gentle spirit.",
  "I am a wise and gentle being, deserving of all good things.",
  "I allow myself to feel, heal, and simply be.",
  "My imperfections make me uniquely wonderful.",
  "Today, I choose peace over perfection.",
  "I am finding my calm, one breath at a time.",
  "I trust the timing of my life and embrace my path.",
  "I am held in gentle acceptance, just as I am.",
];

const SelfAffirmationPage: React.FC = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState("");

  const getRandomAffirmation = () => {
    const randomIndex = Math.floor(
      Math.random() * AFFIRMATIONS_FOR_WOMEN.length
    );
    setCurrentAffirmation(AFFIRMATIONS_FOR_WOMEN[randomIndex]);
  };

  useEffect(() => {
    getRandomAffirmation();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 dark:text-pink-400 flex items-center justify-center">
          <Heart className="w-8 h-8 mr-2 text-red-500 dark:text-red-400" />
          Self-Love & Affirmations
          <Sparkles className="w-8 h-8 ml-2 text-yellow-400 dark:text-yellow-300" />
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
          Embrace your strength, beauty, and worth.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 text-center border-2 border-pink-100 dark:border-pink-900">
        {currentAffirmation ? (
          <p className="text-gray-800 dark:text-white text-xl md:text-2xl font-semibold italic">
            "{currentAffirmation}"
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-xl">
            Loading affirmation...
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={getRandomAffirmation}
          className="flex items-center px-6 py-3 rounded-full bg-pink-600 dark:bg-pink-800 text-white font-semibold text-lg hover:bg-pink-700 dark:hover:bg-pink-900 transition-colors shadow-md"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          New Affirmation
        </button>
      </div>

      <div className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Take a moment to truly feel these words. Your well-being matters.</p>
      </div>
    </div>
  );
};

export default SelfAffirmationPage;