import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { usePanic } from '../contexts/PanicContext';

const PanicButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { activatePanic, disguiseAs } = usePanic();

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-2">
      {isExpanded && (
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-2 mb-2 transition-all duration-300 transform origin-bottom-right">
          <button
            onClick={() => activatePanic()}
            className="flex items-center justify-start px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors duration-200 w-full mb-2"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Quick Exit
          </button>
          <button
            onClick={() => disguiseAs('weather')}
            className="flex items-center justify-start px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors duration-200 w-full mb-2"
          >
            Weather App
          </button>
          <button
            onClick={() => disguiseAs('notes')}
            className="flex items-center justify-start px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors duration-200 w-full"
          >
            Notes App
          </button>
        </div>
      )}
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300 ${
          isExpanded ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'
        }`}
        aria-label="Emergency options"
      >
        <AlertTriangle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default PanicButton;