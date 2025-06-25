import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type PanicContextType = {
  activatePanic: () => void;
  disguiseAs: (type: 'weather' | 'notes') => void;
  isInDisguiseMode: boolean;
  disguiseType: 'weather' | 'notes' | null;
};

const PanicContext = createContext<PanicContextType | undefined>(undefined);

export const PanicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isInDisguiseMode, setIsInDisguiseMode] = useState(false);
  const [disguiseType, setDisguiseType] = useState<'weather' | 'notes' | null>(null);

  // Safe sites to redirect to when panic button is pressed
  const safeSites = [
    'https://www.google.com',
    'https://web.archive.org/',
    'https://www.wikipedia.org',
    'https://www.youtube.com',
    'https://www.mail.google.com',
  ];

  const activatePanic = () => {
    // Quickly redirect to a safe site
    const randomSafeUrl = safeSites[Math.floor(Math.random() * safeSites.length)];
    window.location.href = randomSafeUrl;
  };

  const disguiseAs = (type: 'weather' | 'notes') => {
    setIsInDisguiseMode(true);
    setDisguiseType(type);
    navigate(`/${type}`);
    
    // Change the document title to match the disguise
    document.title = type === 'weather' ? 'Weather Forecast' : 'Quick Notes';
  };

  // Reset title when component unmounts
  useEffect(() => {
    const defaultTitle = document.querySelector('title[data-default]')?.textContent || 'EiraSafe';
    
    return () => {
      document.title = defaultTitle;
    };
  }, []);

  return (
    <PanicContext.Provider value={{ activatePanic, disguiseAs, isInDisguiseMode, disguiseType }}>
      {children}
    </PanicContext.Provider>
  );
};

export const usePanic = (): PanicContextType => {
  const context = useContext(PanicContext);
  if (context === undefined) {
    throw new Error('usePanic must be used within a PanicProvider');
  }
  return context;
};