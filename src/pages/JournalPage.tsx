// import React, { useState, useEffect } from 'react';
// import { BookOpen, Mic, Send, Volume2, PauseCircle } from 'lucide-react';
// import { useLocalStorage } from '../hooks/useLocalStorage';

// type JournalEntry = {
//   id: string;
//   content: string;
//   timestamp: number;
//   aiResponse?: string;
// };

// const THERAPY_PROMPTS = [
//   "How are you feeling today? Can you describe your emotions in detail?",
//   "What brought you moments of peace today, even if they were brief?",
//   "Is there something that's been worrying you that you'd like to express?",
//   "What would you like to remind yourself of when you're feeling vulnerable?",
//   "What is one small step you could take today toward your safety or wellbeing?",
//   "What strengths have helped you survive difficult situations in the past?",
//   "If you could speak to your younger self, what would you say?",
//   "What boundaries do you want to establish or maintain in your relationships?",
//   "You are in a safe space here. Your voice matters, and your feelings are welcome.", 
//   "Whatever you’re carrying, you don’t have to hold it alone. This is a space for release and renewal.",
//   "You deserve to be heard without judgment. Thank you for showing up and sharing.",
//   "There is strength in expressing what’s heavy on your heart. You’re not alone here.",
//   "Take a deep breath—you’ve made it to a place where your emotions are respected and protected.",
//   "Your experiences are valid. There is no need to filter your truth in this space.",
//   "This is your moment to let go, even if just for a while. You are safe, supported, and seen.",
//   "Sharing what hurts is a powerful act of self-care. You’re doing more than you know by opening up.",
//   "You’re not expected to have it all together here. This is a space for real, raw, and human emotions.",
//   "You deserve rest, softness, and the freedom to just be. Thank you for entrusting this space with your story.",
// ];

// const JournalPage: React.FC = () => {
//   const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal-entries', []);
//   const [currentEntry, setCurrentEntry] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [currentPrompt, setCurrentPrompt] = useState('');
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Get a therapy prompt when the component mounts
//   useEffect(() => {
//     getRandomPrompt();
//   }, []);

//   const getRandomPrompt = () => {
//     const randomIndex = Math.floor(Math.random() * THERAPY_PROMPTS.length);
//     setCurrentPrompt(THERAPY_PROMPTS[randomIndex]);
//   };

//   const handleSubmitEntry = () => {
//     if (!currentEntry.trim()) return;

//     const newEntry: JournalEntry = {
//       id: Date.now().toString(),
//       content: currentEntry,
//       timestamp: Date.now(),
//       aiResponse: generateSupportiveResponse(currentEntry),
//     };

//     setEntries([newEntry, ...entries]);
//     setCurrentEntry('');
//     getRandomPrompt();
//   };

//   // Simulated AI response function
//   const generateSupportiveResponse = (_content: string): string => {
//     const supportiveResponses = [
      // "Thank you for sharing that. It takes courage to express your feelings.",
      // "I hear you. Your feelings are valid, and you deserve support and safety.",
      // "You've shown incredible resilience. Remember to be gentle with yourself.",
      // "That sounds challenging. Remember that you're not alone in this journey.",
      // "I appreciate your honesty. Acknowledging these feelings is an important step.",
      // "Your strength shows through your words. Take things one moment at a time.",
      // "Thank you for trusting this space. You’re not alone in how you feel.",
      // "It's okay to feel overwhelmed—what you're experiencing is real and valid.",
      // "Your courage to open up speaks volumes. Take all the time you need.",
      // "Even in the hardest moments, your strength is still present.",
      // "You deserve to be heard, supported, and treated with care.",
      // "No feeling is too small or too big—your emotions matter here.",
      // "Taking this step toward reflection is an act of self-care and bravery.",
      // "You’ve come so far already. Don’t forget to acknowledge that progress.",
      // "Healing is not linear. Some days are harder, and that’s okay.",
      // "It's okay to ask for help—reaching out is a sign of strength, not weakness.",
      // "Whatever you're carrying, you don’t have to carry it all alone.",
      // "You matter. Your voice matters. And your journey matters.",
      // "Allow yourself grace in this moment. You're doing the best you can.",
      // "You're showing up—and that in itself is powerful.",
      // "Breathe. You’re safe here. One step at a time is enough.",
//     ];
    
//     return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
//   };

//   const toggleRecording = () => {
//     setIsRecording(!isRecording);
//     // In a real implementation, this would use the Web Speech API
//     if (!isRecording) {
//       // Start recording
//       setTimeout(() => {
//         setIsRecording(false);
//         setCurrentEntry(currentEntry + " [Voice transcription would appear here]");
//       }, 3000);
//     }
//   };

//   const playCalming = () => {
//     setIsPlaying(!isPlaying);
//     // In a real implementation, this would play actual audio
//   };

//   const formatDate = (timestamp: number): string => {
//     return new Date(timestamp).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8 text-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-purple-800 flex items-center justify-center">
//           <BookOpen className="w-6 h-6 mr-2" />
//           Your Safe Space Journal
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Express your thoughts freely. Everything you write stays private on your device.
//         </p>
//       </div>

//       {/* Prompt and Journal Input */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <div className="mb-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
//           <p className="text-purple-800 font-medium mb-1">Reflection Prompt:</p>
//           <p className="text-gray-700">{currentPrompt}</p>
//           <button 
//             onClick={getRandomPrompt}
//             className="mt-2 text-sm text-purple-600 hover:text-purple-800"
//           >
//             Get another prompt
//           </button>
//         </div>

//         <div className="mb-4">
//           <textarea
//             value={currentEntry}
//             onChange={(e) => setCurrentEntry(e.target.value)}
//             placeholder="How are you feeling today? Your thoughts are safe here..."
//             className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 min-h-[150px]"
//           />
//         </div>

//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={toggleRecording}
//               className={`flex items-center px-4 py-2 rounded-lg ${
//                 isRecording 
//                   ? 'bg-red-100 text-red-700' 
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               <Mic className="w-5 h-5 mr-1" />
//               {isRecording ? 'Recording...' : 'Voice Entry'}
//             </button>
            
//             <button
//               onClick={playCalming}
//               className={`flex items-center px-4 py-2 rounded-lg ${
//                 isPlaying 
//                   ? 'bg-blue-100 text-blue-700' 
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {isPlaying ? (
//                 <>
//                   <PauseCircle className="w-5 h-5 mr-1" />
//                   Pause Audio
//                 </>
//               ) : (
//                 <>
//                   <Volume2 className="w-5 h-5 mr-1" />
//                   Calming Audio
//                 </>
//               )}
//             </button>
//           </div>
          
//           <button
//             onClick={handleSubmitEntry}
//             disabled={!currentEntry.trim()}
//             className={`flex items-center px-6 py-2 rounded-lg ${
//               currentEntry.trim() 
//                 ? 'bg-purple-600 text-white hover:bg-purple-700' 
//                 : 'bg-purple-300 text-white cursor-not-allowed'
//             }`}
//           >
//             <Send className="w-5 h-5 mr-2" />
//             Save Entry
//           </button>
//         </div>
//       </div>

//       {/* Journal Entries */}
//       <div className="space-y-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Journal Entries</h2>
        
//         {entries.length === 0 ? (
//           <div className="bg-gray-50 rounded-lg p-8 text-center">
//             <p className="text-gray-500">
//               Your journal entries will appear here. Start by writing your first entry above.
//             </p>
//           </div>
//         ) : (
//           entries.map((entry) => (
//             <div key={entry.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <div className="text-sm text-gray-500 mb-3">
//                 {formatDate(entry.timestamp)}
//               </div>
//               <p className="text-gray-800 whitespace-pre-wrap mb-4">{entry.content}</p>
              
//               {entry.aiResponse && (
//                 <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
//                   <p className="text-sm text-purple-800 font-medium mb-1">Supportive Response:</p>
//                   <p className="text-gray-700">{entry.aiResponse}</p>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default JournalPage;

// 2nd Atttempt of code




// import React, { useState, useEffect, useRef } from 'react';
// import { BookOpen, Mic, Send, Volume2, PauseCircle } from 'lucide-react';
// import { useLocalStorage } from '../hooks/useLocalStorage';

// type JournalEntry = {
//   id: string;
//   content: string;
//   timestamp: number;
//   aiResponse?: string;
// };

// const THERAPY_PROMPTS = [
//   "How are you feeling today? Can you describe your emotions in detail?",
//   "What brought you moments of peace today, even if they were brief?",
//   "Is there something that's been worrying you that you'd like to express?",
//   "What would you like to remind yourself of when you're feeling vulnerable?",
//   "What is one small step you could take today toward your safety or wellbeing?",
//   "What strengths have helped you survive difficult situations in the past?",
//   "If you could speak to your younger self, what would you say?",
//   "What boundaries do you want to establish or maintain in your relationships?",
//   "You are in a safe space here. Your voice matters, and your feelings are welcome.", 
//   "Whatever you’re carrying, you don’t have to hold it alone. This is a space for release and renewal.",
//   "You deserve to be heard without judgment. Thank you for showing up and sharing.",
//   "There is strength in expressing what’s heavy on your heart. You’re not alone here.",
//   "Take a deep breath—you’ve made it to a place where your emotions are respected and protected.",
//   "Your experiences are valid. There is no need to filter your truth in this space.",
//   "This is your moment to let go, even if just for a while. You are safe, supported, and seen.",
//   "Sharing what hurts is a powerful act of self-care. You’re doing more than you know by opening up.",
//   "You’re not expected to have it all together here. This is a space for real, raw, and human emotions.",
//   "You deserve rest, softness, and the freedom to just be. Thank you for entrusting this space with your story.",
// ];

// const JournalPage: React.FC = () => {
//   const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal-entries', []);
//   const [currentEntry, setCurrentEntry] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [currentPrompt, setCurrentPrompt] = useState('');
//   const [isPlaying, setIsPlaying] = useState(false);

//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     getRandomPrompt();
//   }, []);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = 0.5;
//       if (isPlaying) {
//         const playPromise = audioRef.current.play();
//         if (playPromise !== undefined) {
//           playPromise.catch((err) => console.warn('Autoplay blocked:', err));
//         }
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [isPlaying]);

//   const getRandomPrompt = () => {
//     const index = Math.floor(Math.random() * THERAPY_PROMPTS.length);
//     setCurrentPrompt(THERAPY_PROMPTS[index]);
//   };

//   const handleSubmitEntry = () => {
//     if (!currentEntry.trim()) return;

//     const newEntry: JournalEntry = {
//       id: Date.now().toString(),
//       content: currentEntry,
//       timestamp: Date.now(),
//       aiResponse: generateSupportiveResponse(currentEntry),
//     };

//     setEntries([newEntry, ...entries]);
//     setCurrentEntry('');
//     getRandomPrompt();
//   };


//   const generateSupportiveResponse = (_content: string): string => {
//     const supportiveResponses = [
//       "Thank you for sharing that. It takes courage to express your feelings.",
//       "I hear you. Your feelings are valid, and you deserve support and safety.",
//       "You've shown incredible resilience. Remember to be gentle with yourself.",
//       "That sounds challenging. Remember that you're not alone in this journey.",
//       "I appreciate your honesty. Acknowledging these feelings is an important step.",
//       "Your strength shows through your words. Take things one moment at a time.",
//       "Thank you for trusting this space. You’re not alone in how you feel.",
//       "It's okay to feel overwhelmed—what you're experiencing is real and valid.",
//       "Your courage to open up speaks volumes. Take all the time you need.",
//       "Even in the hardest moments, your strength is still present.",
//       "You deserve to be heard, supported, and treated with care.",
//       "No feeling is too small or too big—your emotions matter here.",
//       "Taking this step toward reflection is an act of self-care and bravery.",
//       "You’ve come so far already. Don’t forget to acknowledge that progress.",
//       "Healing is not linear. Some days are harder, and that’s okay.",
//       "It's okay to ask for help—reaching out is a sign of strength, not weakness.",
//       "Whatever you're carrying, you don’t have to carry it all alone.",
//       "You matter. Your voice matters. And your journey matters.",
//       "Allow yourself grace in this moment. You're doing the best you can.",
//       "You're showing up—and that in itself is powerful.",
//       "Breathe. You’re safe here. One step at a time is enough.",
//     ];
  
//     return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
//   };

//   const toggleRecording = () => {
//     setIsRecording(true);
//     setTimeout(() => {
//       setIsRecording(false);
//       setCurrentEntry(prev => prev + "\n[Voice transcription would appear here]");
//     }, 3000);
//   };

//   const toggleMusic = () => {
//     setIsPlaying(prev => !prev);
//   };

//   const formatDate = (timestamp: number): string =>
//     new Date(timestamp).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     }
//   );

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8 text-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-purple-800 flex items-center justify-center">
//           <BookOpen className="w-6 h-6 mr-2" />
//           Your Safe Space Journal
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Express your thoughts freely. Everything you write stays private on your device.
//         </p>
//       </div>

//       {/* Audio Player */}
//       <audio ref={audioRef} loop preload="auto">
//         <source src="/src/public/audio/calmingMusic.mp3" type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>

//       {/* Prompt and Input */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <div className="mb-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
//           <p className="text-purple-800 font-medium mb-1">Reflection Prompt:</p>
//           <p className="text-gray-700">{currentPrompt}</p>
//           <button
//             onClick={getRandomPrompt}
//             className="mt-2 text-sm text-purple-600 hover:text-purple-800"
//           >
//             Get another prompt
//           </button>
//         </div>

//         <textarea
//           value={currentEntry}
//           onChange={(e) => setCurrentEntry(e.target.value)}
//           placeholder="How are you feeling today? Your thoughts are safe here..."
//           className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 min-h-[150px] mb-4"
//         />

//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={toggleRecording}
//               className={`flex items-center px-4 py-2 rounded-lg ${
//                 isRecording
//                   ? 'bg-red-100 text-red-700'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               <Mic className="w-5 h-5 mr-1" />
//               {isRecording ? 'Recording...' : 'Voice Entry'}
//             </button>

//             <button
//               onClick={toggleMusic}
//               className={`flex items-center px-4 py-2 rounded-lg ${
//                 isPlaying
//                   ? 'bg-blue-100 text-blue-700'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {isPlaying ? (
//                 <>
//                   <PauseCircle className="w-5 h-5 mr-1" />
//                   Pause Audio
//                 </>
//               ) : (
//                 <>
//                   <Volume2 className="w-5 h-5 mr-1" />
//                   Calming Audio
//                 </>
//               )}
//             </button>
//           </div>

//           <button
//             onClick={handleSubmitEntry}
//             disabled={!currentEntry.trim()}
//             className={`flex items-center px-6 py-2 rounded-lg ${
//               currentEntry.trim()
//                 ? 'bg-purple-600 text-white hover:bg-purple-700'
//                 : 'bg-purple-300 text-white cursor-not-allowed'
//             }`}
//           >
//             <Send className="w-5 h-5 mr-2" />
//             Save Entry
//           </button>
//         </div>
//       </div>

//       {/* Entry List */}
//       <div className="space-y-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Journal Entries</h2>

//         {entries.length === 0 ? (
//           <div className="bg-gray-50 rounded-lg p-8 text-center">
//             <p className="text-gray-500">
//               Your journal entries will appear here. Start by writing your first entry above.
//             </p>
//           </div>
//         ) : (
//           entries.map((entry) => (
//             <div key={entry.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <div className="text-sm text-gray-500 mb-3">
//                 {formatDate(entry.timestamp)}
//               </div>
//               <p className="text-gray-800 whitespace-pre-wrap mb-4">{entry.content}</p>
  
//               {entry.aiResponse && (
//                 <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
//                   <p className="text-sm text-purple-800 font-medium mb-1">Supportive Response:</p>
//                   <p className="text-gray-700">{entry.aiResponse}</p>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default JournalPage;


// 3rd attempt

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Mic, Send, Volume2, PauseCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type JournalEntry = {
  id: string;
  content: string;
  timestamp: number;
  aiResponse?: string;
};

const THERAPY_PROMPTS = [
  "How are you feeling today? Can you describe your emotions in detail?",
  "What brought you moments of peace today, even if they were brief?",
  "Is there something that's been worrying you that you'd like to express?",
  "What would you like to remind yourself of when you're feeling vulnerable?",
  "What is one small step you could take today toward your safety or wellbeing?",
  "What strengths have helped you survive difficult situations in the past?",
  "If you could speak to your younger self, what would you say?",
  "What boundaries do you want to establish or maintain in your relationships?",
  "You are in a safe space here. Your voice matters, and your feelings are welcome.",
  "Whatever you’re carrying, you don’t have to hold it alone. This is a space for release and renewal.",
  "You deserve to be heard without judgment. Thank you for showing up and sharing.",
  "There is strength in expressing what’s heavy on your heart. You’re not alone here.",
  "Take a deep breath—you’ve made it to a place where your emotions are respected and protected.",
  "Your experiences are valid. There is no need to filter your truth in this space.",
  "This is your moment to let go, even if just for a while. You are safe, supported, and seen.",
  "Sharing what hurts is a powerful act of self-care. You’re doing more than you know by opening up.",
  "You’re not expected to have it all together here. This is a space for real, raw, and human emotions.",
  "You deserve rest, softness, and the freedom to just be. Thank you for entrusting this space with your story.",
];

const JournalPage: React.FC = () => {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal-entries', []);
  const [currentEntry, setCurrentEntry] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    getRandomPrompt();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;

      if (isPlaying) {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Autoplay started successfully
            })
            .catch((error) => {
              console.warn('Autoplay was prevented:', error);
              // Reflect the paused state in UI
              setIsPlaying(false);
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const getRandomPrompt = () => {
    const index = Math.floor(Math.random() * THERAPY_PROMPTS.length);
    setCurrentPrompt(THERAPY_PROMPTS[index]);
  };

  const handleSubmitEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: currentEntry,
      timestamp: Date.now(),
      aiResponse: generateSupportiveResponse(currentEntry),
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry('');
    getRandomPrompt();
  };

  const generateSupportiveResponse = (_content: string): string => {
    const supportiveResponses = [
      "Thank you for sharing that. It takes courage to express your feelings.",
      "I hear you. Your feelings are valid, and you deserve support and safety.",
      "You've shown incredible resilience. Remember to be gentle with yourself.",
      "That sounds challenging. Remember that you're not alone in this journey.",
      "I appreciate your honesty. Acknowledging these feelings is an important step.",
      "Your strength shows through your words. Take things one moment at a time.",
      "Thank you for trusting this space. You’re not alone in how you feel.",
      "It's okay to feel overwhelmed—what you're experiencing is real and valid.",
      "Your courage to open up speaks volumes. Take all the time you need.",
      "Even in the hardest moments, your strength is still present.",
      "You deserve to be heard, supported, and treated with care.",
      "No feeling is too small or too big—your emotions matter here.",
      "Taking this step toward reflection is an act of self-care and bravery.",
      "You’ve come so far already. Don’t forget to acknowledge that progress.",
      "Healing is not linear. Some days are harder, and that’s okay.",
      "It's okay to ask for help—reaching out is a sign of strength, not weakness.",
      "Whatever you're carrying, you don’t have to carry it all alone.",
      "You matter. Your voice matters. And your journey matters.",
      "Allow yourself grace in this moment. You're doing the best you can.",
      "You're showing up—and that in itself is powerful.",
      "Breathe. You’re safe here. One step at a time is enough.",
    ];

    return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
  };

  const toggleRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setCurrentEntry(prev => prev + "\n[Voice transcription would appear here]");
    }, 3000);
  };

  const toggleMusic = () => {
    setIsPlaying(prev => !prev);
  };

  const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 flex items-center justify-center">
          <BookOpen className="w-6 h-6 mr-2" />
          Your Safe Space Journal
        </h1>
        <p className="text-gray-600 mt-2">
          Express your thoughts freely. Everything you write stays private on your device.
        </p>
      </div>

      {/* Audio Player */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/src/public/audio/calmingMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Prompt and Input */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="mb-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-purple-800 font-medium mb-1">Reflection Prompt:</p>
          <p className="text-gray-700">{currentPrompt}</p>
          <button
            onClick={getRandomPrompt}
            className="mt-2 text-sm text-purple-600 hover:text-purple-800"
          >
            Get another prompt
          </button>
        </div>

        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="How are you feeling today? Your thoughts are safe here..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 min-h-[150px] mb-4"
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleRecording}
              className={`flex items-center px-4 py-2 rounded-lg ${
                isRecording
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Mic className="w-5 h-5 mr-1" />
              {isRecording ? 'Recording...' : 'Voice Entry'}
            </button>

            <button
              onClick={toggleMusic}
              className={`flex items-center px-4 py-2 rounded-lg ${
                isPlaying
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isPlaying ? (
                <>
                  <PauseCircle className="w-5 h-5 mr-1" />
                  Pause Audio
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 mr-1" />
                  Calming Audio
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleSubmitEntry}
            disabled={!currentEntry.trim()}
            className={`flex items-center px-6 py-2 rounded-lg ${
              currentEntry.trim()
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-purple-300 text-white cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5 mr-2" />
            Save Entry
          </button>
        </div>
      </div>

      {/* Entry List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Journal Entries</h2>

        {entries.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              Your journal entries will appear here. Start by writing your first entry above.
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-sm text-gray-500 mb-3">
                {formatDate(entry.timestamp)}
              </div>
              <p className="text-gray-800 whitespace-pre-wrap mb-4">{entry.content}</p>

              {entry.aiResponse && (
                <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-sm text-purple-800 font-medium mb-1">Supportive Response:</p>
                  <p className="text-gray-700">{entry.aiResponse}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JournalPage;
