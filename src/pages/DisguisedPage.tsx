import React from 'react';
import { ArrowLeft, Sun, Cloud, CloudRain, Wind, Thermometer } from 'lucide-react';
import { usePanic } from '../contexts/PanicContext';
import { Link } from 'react-router-dom';

type DisguisedPageProps = {
  type: 'weather' | 'notes';
};

const DisguisedPage: React.FC<DisguisedPageProps> = ({ type }) => {
  const { isInDisguiseMode } = usePanic();

  if (!isInDisguiseMode) {
    return <Link to="/">Return to NariSuraksha</Link>;
  }

  return (
    <div className="min-h-screen bg-white">
      {type === 'weather' ? <WeatherDisguise /> : <NotesDisguise />}
    </div>
  );
};

const WeatherDisguise: React.FC = () => {
  const { activatePanic } = usePanic();

  // This is fake weather data for the disguise
  const weatherData = [
    { day: 'Today', temp: '32°C', condition: 'Sunny', icon: <Sun className="w-8 h-8 text-yellow-500" /> },
    { day: 'Tomorrow', temp: '30°C', condition: 'Partly Cloudy', icon: <Cloud className="w-8 h-8 text-gray-500" /> },
    { day: 'Wednesday', temp: '27°C', condition: 'Cloudy', icon: <Cloud className="w-8 h-8 text-gray-500" /> },
    { day: 'Thursday', temp: '25°C', condition: 'Rain', icon: <CloudRain className="w-8 h-8 text-blue-500" /> },
    { day: 'Friday', temp: '28°C', condition: 'Windy', icon: <Wind className="w-8 h-8 text-blue-400" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link to="/" className="mr-4" onClick={(e) => {
            // Secret way to exit disguise while looking like just checking weather
            e.preventDefault();
            activatePanic();
          }}>
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Weather Forecast</h1>
        </div>
        <div className="text-gray-500 text-sm">Last updated: {new Date().toLocaleTimeString()}</div>
      </header>

      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">New Delhi</h2>
            <p className="text-gray-600">Current Location</p>
          </div>
          <div className="flex items-center">
            <Sun className="w-10 h-10 text-yellow-500 mr-3" />
            <div>
              <p className="text-3xl font-bold text-gray-800">32°C</p>
              <p className="text-gray-600">Sunny</p>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Thermometer className="w-5 h-5 text-red-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Feels like</p>
              <p className="text-gray-800 font-medium">34°C</p>
            </div>
          </div>
          <div className="flex items-center">
            <Wind className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="text-gray-800 font-medium">10 km/h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b border-gray-200">5-Day Forecast</h2>
        <div className="divide-y divide-gray-200">
          {weatherData.map((day, index) => (
            <div key={index} className="flex justify-between items-center p-4">
              <p className="text-gray-800 font-medium">{day.day}</p>
              <div className="flex items-center">
                {day.icon}
                <p className="ml-2 text-gray-600">{day.condition}</p>
              </div>
              <p className="text-gray-800 font-semibold">{day.temp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NotesDisguise: React.FC = () => {
  const { activatePanic } = usePanic();

  // Fake notes for the disguise
  const notes = [
    { title: 'Shopping List', content: 'Milk, Bread, Eggs, Vegetables', date: '2 hours ago' },
    { title: 'Meeting Notes', content: 'Discuss project timeline, Assign tasks, Schedule follow-up', date: 'Yesterday' },
    { title: 'Ideas', content: 'App feature ideas, Book recommendations', date: 'Aug 15' },
    { title: 'Reminders', content: 'Call mom, Pay electricity bill, Doctor appointment', date: 'Aug 10' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
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
        <button className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center">
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
        {notes.map((note, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
              <span className="text-xs text-gray-500">{note.date}</span>
            </div>
            <p className="text-gray-600">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisguisedPage;