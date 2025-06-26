// import React from 'react';
// import { ArrowLeft, Sun, Cloud, CloudRain, Wind, Thermometer } from 'lucide-react';
// import { usePanic } from '../contexts/PanicContext';
// import { Link } from 'react-router-dom';

// type DisguisedPageProps = {
//   type: 'weather' | 'notes';
// };

// const DisguisedPage: React.FC<DisguisedPageProps> = ({ type }) => {
//   const { isInDisguiseMode } = usePanic();

//   if (!isInDisguiseMode) {
//     // return <Link to="/">Return to EiraSafe</Link>;
//     window.location.href = '/';
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {type === 'weather' ? <WeatherDisguise /> : <NotesDisguise />}
//     </div>
//   );
// };

// const WeatherDisguise: React.FC = () => {
//   const { activatePanic } = usePanic();

//   // This is fake weather data for the disguise
//   const weatherData = [
//     { day: 'Today', temp: '32°C', condition: 'Sunny', icon: <Sun className="w-8 h-8 text-yellow-500" /> },
//     { day: 'Tomorrow', temp: '30°C', condition: 'Partly Cloudy', icon: <Cloud className="w-8 h-8 text-gray-500" /> },
//     { day: 'Wednesday', temp: '27°C', condition: 'Cloudy', icon: <Cloud className="w-8 h-8 text-gray-500" /> },
//     { day: 'Thursday', temp: '25°C', condition: 'Rain', icon: <CloudRain className="w-8 h-8 text-blue-500" /> },
//     { day: 'Friday', temp: '28°C', condition: 'Windy', icon: <Wind className="w-8 h-8 text-blue-400" /> },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <header className="flex justify-between items-center mb-8">
//         <div className="flex items-center">
//           <Link to="/" className="mr-4" onClick={(e) => {
//             // Secret way to exit disguise while looking like just checking weather
//             e.preventDefault();
//             activatePanic();
//           }}>
//             <ArrowLeft className="w-6 h-6 text-gray-600" />
//           </Link>
//           <h1 className="text-2xl font-bold text-gray-800">Weather Forecast</h1>
//         </div>
//         <div className="text-gray-500 text-sm">Last updated: {new Date().toLocaleTimeString()}</div>
//       </header>

//       <div className="bg-blue-50 rounded-xl p-6 mb-8">
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800">New Delhi</h2>
//             <p className="text-gray-600">Current Location</p>
//           </div>
//           <div className="flex items-center">
//             <Sun className="w-10 h-10 text-yellow-500 mr-3" />
//             <div>
//               <p className="text-3xl font-bold text-gray-800">32°C</p>
//               <p className="text-gray-600">Sunny</p>
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 grid grid-cols-2 gap-4">
//           <div className="flex items-center">
//             <Thermometer className="w-5 h-5 text-red-500 mr-2" />
//             <div>
//               <p className="text-sm text-gray-500">Feels like</p>
//               <p className="text-gray-800 font-medium">34°C</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <Wind className="w-5 h-5 text-blue-500 mr-2" />
//             <div>
//               <p className="text-sm text-gray-500">Wind</p>
//               <p className="text-gray-800 font-medium">10 km/h</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <h2 className="text-lg font-semibold p-4 border-b border-gray-200">5-Day Forecast</h2>
//         <div className="divide-y divide-gray-200">
//           {weatherData.map((day, index) => (
//             <div key={index} className="flex justify-between items-center p-4">
//               <p className="text-gray-800 font-medium">{day.day}</p>
//               <div className="flex items-center">
//                 {day.icon}
//                 <p className="ml-2 text-gray-600">{day.condition}</p>
//               </div>
//               <p className="text-gray-800 font-semibold">{day.temp}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const NotesDisguise: React.FC = () => {
//   const { activatePanic } = usePanic();

//   // Fake notes for the disguise
//   const notes = [
//     { title: 'Shopping List', content: 'Milk, Bread, Eggs, Vegetables', date: '2 hours ago' },
//     { title: 'Meeting Notes', content: 'Discuss project timeline, Assign tasks, Schedule follow-up', date: 'Yesterday' },
//     { title: 'Ideas', content: 'App feature ideas, Book recommendations', date: 'Aug 15' },
//     { title: 'Reminders', content: 'Call mom, Pay electricity bill, Doctor appointment', date: 'Aug 10' },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <header className="flex justify-between items-center mb-8">
//         <div className="flex items-center">
//           <Link to="/" className="mr-4" onClick={(e) => {
//             // Secret way to exit disguise while looking like just checking notes
//             e.preventDefault();
//             activatePanic();
//           }}>
//             <ArrowLeft className="w-6 h-6 text-gray-600" />
//           </Link>
//           <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
//         </div>
//         <button className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//           </svg>
//         </button>
//       </header>

//       <div className="mb-6">
//         <div className="relative">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//           <input
//             type="text"
//             placeholder="Search notes..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300"
//           />
//         </div>
//       </div>

//       <div className="space-y-4">
//         {notes.map((note, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//             <div className="flex justify-between items-start mb-2">
//               <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
//               <span className="text-xs text-gray-500">{note.date}</span>
//             </div>
//             <p className="text-gray-600">{note.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DisguisedPage;



// 2nd attempt




import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sun, Cloud, CloudRain, Wind, Thermometer, Search, Trash2 } from 'lucide-react'; // Added Trash2 icon
import { usePanic } from '../contexts/PanicContext';
import { Link } from 'react-router-dom';

// Define types for weather data
type CurrentWeather = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string; // e.g., 'Clouds', 'Rain', 'Clear'
  }>;
  wind: {
    speed: number;
  };
};

type ForecastDay = {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
};

// Define type for a single note
type Note = {
  id: string; // Added a unique ID for easier deletion
  title: string;
  content: string;
  date: string;
};

type DisguisedPageProps = {
  type: 'weather' | 'notes';
};

const DisguisedPage: React.FC<DisguisedPageProps> = ({ type }) => {
  const { isInDisguiseMode } = usePanic();

  if (!isInDisguiseMode) {
    // Redirects to the main page (root) if not in disguise mode
    // This provides a layer of security, forcing a return to a "safe" state.
    window.location.href = '/';
    return null; // Return null to prevent rendering anything before redirection
  }

  return (
    <div className="min-h-screen bg-white">
      {type === 'weather' ? <WeatherDisguise /> : <NotesDisguise />}
    </div>
  );
};

const WeatherDisguise: React.FC = () => {
  const { activatePanic } = usePanic();
  const [city, setCity] = useState<string>('Delhi'); 
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const API_KEY: string = '576b7c4930c0ab080621f01e4f673602'; // Explicitly set type to string

  // Function to map OpenWeatherMap icons/conditions to Lucide icons
  const getWeatherIcon = (iconCode: string, conditionMain: string) => {
    // Example mapping - you might need to refine this based on specific icon codes
    if (iconCode.includes('01')) return <Sun className="w-8 h-8 text-yellow-500" />; // Clear sky
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return <Cloud className="w-8 h-8 text-gray-500" />; // Few clouds, scattered clouds, broken clouds
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="w-8 h-8 text-blue-500" />; // Shower rain, rain
    if (iconCode.includes('11')) return <CloudRain className="w-8 h-8 text-purple-500" />; // Thunderstorm
    if (iconCode.includes('13')) return <Cloud className="w-8 h-8 text-blue-200" />; // Snow (using Cloud for now)
    if (iconCode.includes('50')) return <Wind className="w-8 h-8 text-gray-400" />; // Mist
    
    // Fallback based on main condition if icon code is not specific
    if (conditionMain === 'Rain') return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (conditionMain === 'Clouds') return <Cloud className="w-8 h-8 text-gray-500" />;
    if (conditionMain === 'Clear') return <Sun className="w-8 h-8 text-yellow-500" />;
    if (conditionMain === 'Thunderstorm') return <CloudRain className="w-8 h-8 text-purple-500" />;
    if (conditionMain === 'Drizzle') return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (conditionMain === 'Snow') return <Cloud className="w-8 h-8 text-blue-200" />;


    return <Sun className="w-8 h-8 text-gray-400" />; // Default icon
  };

  const fetchWeatherData = async () => {
    // Check if the API_KEY is still the placeholder or empty
    if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY' || API_KEY === '') { 
      setError('Error: Please replace YOUR_OPENWEATHERMAP_API_KEY with your actual OpenWeatherMap API key from openweathermap.org.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!currentResponse.ok) {
        const errorData = await currentResponse.json(); 
        let errorMessage = `Failed to fetch current weather for "${city}".`;
        if (currentResponse.status === 401) {
            errorMessage = 'Error: Invalid API Key. Please check your OpenWeatherMap API key.';
        } else if (currentResponse.status === 404) {
            errorMessage = `Error: City "${city}" not found. Please check the spelling.`;
        } else {
            errorMessage = `Error: ${errorData.message || currentResponse.statusText}`;
        }
        throw new Error(errorMessage);
      }
      const currentData: CurrentWeather = await currentResponse.json();
      setCurrentWeather(currentData);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        let errorMessage = `Failed to fetch forecast for "${city}".`;
        if (forecastResponse.status === 401) {
            errorMessage = 'Error: Invalid API Key. Please check your OpenWeatherMap API key.';
        } else if (forecastResponse.status === 404) {
            errorMessage = `Error: City "${city}" not found for forecast.`;
        } else {
            errorMessage = `Error: ${errorData.message || forecastResponse.statusText}`;
        }
        throw new Error(errorMessage);
      }
      const forecastData = await forecastResponse.json();

      // Filter forecast to get one entry per day (e.g., around noon)
      const dailyForecasts: ForecastDay[] = [];
      const seenDates = new Set<string>();

      for (const item of forecastData.list) {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        // Take one reading per day, ideally around midday (12 PM - 3 PM)
        const hour = new Date(item.dt * 1000).getHours();
        if (!seenDates.has(date) && hour >= 12 && hour <= 15) {
          dailyForecasts.push(item);
          seenDates.add(date);
        }
        if (dailyForecasts.length >= 5) break; // Get up to 5 days
      }
      setForecast(dailyForecasts);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching weather data.');
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city, API_KEY]); // Refetch when city or API_KEY changes (added API_KEY to dependency for error check)

  // Function to format day names for forecast
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    if (date.toLocaleDateString() === today.toLocaleDateString()) {
      return 'Today';
    }
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (date.toLocaleDateString() === tomorrow.toLocaleDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };


  return (
    <div className="container mx-auto px-4 py-8 font-inter"> {/* Added font-inter class */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link to="/" className="mr-4" onClick={(e) => {
            // Secret way to exit disguise while looking like just checking weather
            e.preventDefault();
            activatePanic(); // This redirects to a random safe site
          }}>
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Weather Forecast</h1>
        </div>
        <div className="text-gray-500 text-sm">Last updated: {new Date().toLocaleTimeString()}</div>
      </header>

      {/* City search input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter city name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                fetchWeatherData(); // Trigger fetch on Enter key press
              }
            }}
          />
          <button
            onClick={fetchWeatherData}
            className="absolute right-0 top-0 h-full px-3 rounded-r-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {loading && <div className="text-center text-gray-600">Loading weather data...</div>}
      {error && <div className="text-center text-red-500 p-4 rounded-lg bg-red-50 border border-red-200">{error}</div>}

      {!loading && !error && currentWeather && (
        <>
          <div className="bg-blue-50 rounded-xl p-6 mb-8 shadow-md"> {/* Added shadow-md */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{currentWeather.name}</h2>
                <p className="text-gray-600">Current Location</p> {/* This assumes the city is the current location */}
              </div>
              <div className="flex items-center">
                {getWeatherIcon(currentWeather.weather[0]?.icon, currentWeather.weather[0]?.main)}
                <div className="ml-3">
                  <p className="text-3xl font-bold text-gray-800">{Math.round(currentWeather.main.temp)}°C</p>
                  <p className="text-gray-600 capitalize">{currentWeather.weather[0]?.description}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 text-red-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Feels like</p>
                  <p className="text-gray-800 font-medium">{Math.round(currentWeather.main.feels_like)}°C</p>
                </div>
              </div>
              <div className="flex items-center">
                <Wind className="w-5 h-5 text-blue-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Wind</p>
                  <p className="text-gray-800 font-medium">{Math.round(currentWeather.wind.speed * 3.6)} km/h</p> {/* Convert m/s to km/h */}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"> {/* Added shadow-md */}
            <h2 className="text-lg font-semibold p-4 border-b border-gray-200">5-Day Forecast</h2>
            <div className="divide-y divide-gray-200">
              {forecast.length > 0 ? (
                forecast.map((day, index) => (
                  <div key={index} className="flex justify-between items-center p-4">
                    <p className="text-gray-800 font-medium">{getDayName(day.dt_txt)}</p>
                    <div className="flex items-center">
                      {getWeatherIcon(day.weather[0]?.icon, day.weather[0]?.main)}
                      <p className="ml-2 text-gray-600 capitalize">{day.weather[0]?.description}</p>
                    </div>
                    <p className="text-gray-800 font-semibold">{Math.round(day.main.temp)}°C</p>
                  </div>
                ))
              ) : (
                <p className="p-4 text-center text-gray-500">No 5-day forecast available.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const NotesDisguise: React.FC = () => {
  const { activatePanic } = usePanic();
  // Initial fake notes moved to state
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Shopping List', content: 'Milk, Bread, Eggs, Vegetables', date: '2 hours ago' },
    { id: '2', title: 'Meeting Notes', content: 'Discuss project timeline, Assign tasks, Schedule follow-up', date: 'Yesterday' },
    { id: '3', title: 'Ideas', content: 'App feature ideas, Book recommendations', date: 'Aug 15' },
    { id: '4', title: 'Reminders', content: 'Call mom, Pay electricity bill, Doctor appointment', date: 'Aug 10' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleAddNote = () => {
    if (newNoteTitle.trim() === '' || newNoteContent.trim() === '') {
      // Basic validation: prevent adding empty notes
      // Replaced alert with a simple message in the modal or a temporary message on screen for better UX
      // For this example, I'll use a console.log, but you'd show a UI message normally.
      console.log('Please enter both title and content for the note.');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(), // Simple unique ID based on timestamp
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      date: 'Just now', // Simple date for newly added notes
    };

    setNotes([newNote, ...notes]); // Add new note to the beginning of the list
    setNewNoteTitle('');
    setNewNoteContent(''); // Corrected variable name from setNoteContent
    setIsModalOpen(false); // Close the modal
  };

  const handleDeleteNote = (idToDelete: string) => {
    setNotes(notes.filter(note => note.id !== idToDelete));
  };

  return (
    <div className="container mx-auto px-4 py-8 font-inter"> {/* Added font-inter class */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link to="/" className="mr-4" onClick={(e) => {
            // Secret way to exit disguise while looking like just checking notes
            e.preventDefault();
            activatePanic();
          }}>
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-green-200 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </header>

      <div className="mb-6">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300"
          />
        </div>
      </div>

      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note) => ( // Removed index from key as we now have unique id
            <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{note.title}</h2>
                <p className="text-gray-600">{note.content}</p>
                <span className="text-xs text-gray-500 mt-2 block">{note.date}</span>
              </div>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="ml-4 p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                aria-label={`Delete note: ${note.title}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">No notes yet. Click the '+' button to add one!</p>
        )}
      </div>

      {/* Add Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Note</h3>
            <div className="mb-4">
              <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                id="noteTitle"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Enter note title"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                id="noteContent"
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300 resize-y"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Write your note here..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisguisedPage;

