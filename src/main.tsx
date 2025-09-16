import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Ensure this is a default import
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PanicProvider } from './contexts/PanicContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PanicProvider>
          <App /> 
        </PanicProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
