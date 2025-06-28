import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

// Define the type for the context value
type PanicContextType = {
  activatePanic: () => void;
  disguiseAs: (type: 'weather' | 'notes') => void;
  isInDisguiseMode: boolean;
  disguiseType: 'weather' | 'notes' | null;
  exitDisguiseMode: () => void; // Added for explicit exit if needed
};

// Create the context
const PanicContext = createContext<PanicContextType | undefined>(undefined);

// Define the default title for your application
const APP_DEFAULT_TITLE = 'EiraSafe'; 

// PanicProvider component to wrap your application
export const PanicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL location

  // Initialize state based on the current URL path.
  // This is crucial for handling direct URL access and browser history navigation.
  const [isInDisguiseMode, setIsInDisguiseMode] = useState(() => {
    const path = location.pathname.substring(1); // Get path without leading slash
    return path === 'weather' || path === 'notes';
  });
  const [disguiseType, setDisguiseType] = useState<'weather' | 'notes' | null>(() => {
    const path = location.pathname.substring(1);
    if (path === 'weather' || path === 'notes') {
      return path as 'weather' | 'notes'; // Cast to ensure correct type
    }
    return null;
  });

  // Array of safe websites for the panic button redirection
  const safeSites = [
    'https://www.google.com',
    'https://web.archive.org/',
    'https://www.wikipedia.org',
    // 'https://www.youtube.com', // This URL is often broken or leads to an empty page. Consider removing or replacing.
    'https://www.mail.google.com',
  ];

  // Function to activate the panic redirection
  const activatePanic = () => {
    // Select a random safe URL from the list
    const randomSafeUrl = safeSites[Math.floor(Math.random() * safeSites.length)];
    // Redirect the current window location, effectively leaving the app
    window.location.href = randomSafeUrl;
  };

  // Function to enter a specific disguise mode
  const disguiseAs = (type: 'weather' | 'notes') => {
    setIsInDisguiseMode(true);
    setDisguiseType(type);
    navigate(`/${type}`); // Navigate to the corresponding disguise route
    // The document.title update is now handled by the useEffect below
  };

  // Function to explicitly exit disguise mode
  // This can be called from a button or other UI element within the disguise page
  const exitDisguiseMode = () => {
    setIsInDisguiseMode(false);
    setDisguiseType(null);
    // Optionally, navigate back to a default non-disguise page, e.g., home
    // navigate('/'); 
    // The document.title will be reset by the useEffect when navigation occurs
  };

  // Effect to synchronize panic context state and document title with the URL
  useEffect(() => {
    const path = location.pathname.substring(1); // Get the path without leading '/'

    if (path === 'weather' || path === 'notes') {
      // If the current URL path corresponds to a disguise mode
      if (!isInDisguiseMode || disguiseType !== path) {
        // Only update state if it's not already in the correct state
        setIsInDisguiseMode(true);
        setDisguiseType(path as 'weather' | 'notes');
      }
      // Set the document title specific to the disguise mode
      document.title = path === 'weather' ? 'Weather Forecast' : 'Quick Notes';
    } else {
      // If the current URL path is not a disguise mode
      if (isInDisguiseMode) {
        // Reset state if it was previously in disguise mode
        setIsInDisguiseMode(false);
        setDisguiseType(null);
      }
      // Reset the document title to the application's default title
      document.title = APP_DEFAULT_TITLE; 
    }
  }, [location.pathname]); // This effect re-runs whenever the URL path changes

  // The return value of the context provider
  return (
    <PanicContext.Provider value={{ activatePanic, disguiseAs, isInDisguiseMode, disguiseType, exitDisguiseMode }}>
      {children}
    </PanicContext.Provider>
  );
};

// Custom hook to consume the PanicContext
export const usePanic = (): PanicContextType => {
  const context = useContext(PanicContext);
  if (context === undefined) {
    // Throw an error if the hook is used outside of a PanicProvider
    throw new Error('usePanic must be used within a PanicProvider');
  }
  return context;
};