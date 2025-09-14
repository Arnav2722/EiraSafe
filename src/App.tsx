import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import ResourcesPage from './pages/ResourcesPage';
import SafetyPlanPage from './pages/SafetyPlanPage';
import SettingsPage from './pages/SettingsPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import DisguisedPage from './pages/DisguisedPage';
import SelfAffirmationPage from './pages/SelfAffirmation'; 

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  return session ? <>{children}</> : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <AppContent />
  );
}

const AppContent: React.FC = () => {
  const { user, loading } = useAuth(); 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="flex items-center text-purple-700 text-xl font-medium">
          <svg className="animate-spin h-6 w-6 mr-3 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading application...
        </div>
      </div>
    );
  }

  return (
    <Routes>
  
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="safety-plan" element={<SafetyPlanPage />} />
        <Route path="mood" element={<MoodTrackerPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="affirmations" element={<SelfAffirmationPage />} /> 
      </Route>

      <Route path="/weather" element={<DisguisedPage type="weather" />} />
      <Route path="/notes" element={<DisguisedPage type="notes" />} />

      <Route path="*" element={<p className="text-center mt-20 text-xl text-gray-700">Oops! Page not found.</p>} />
    </Routes>
  );
};

export default App;