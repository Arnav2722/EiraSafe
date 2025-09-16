

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PanicProvider } from './contexts/PanicContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Import the ThemeProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PanicProvider>
          <ThemeProvider>
            <App /> 
          </ThemeProvider>
        </PanicProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);