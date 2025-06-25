import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PanicProvider } from './contexts/PanicContext';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import ResourcesPage from './pages/ResourcesPage';
import SafetyPlanPage from './pages/SafetyPlanPage';
import SettingsPage from './pages/SettingsPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import DisguisedPage from './pages/DisguisedPage';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session } = useAuth();
  return session ? <>{children}</> : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PanicProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
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
            </Route>
            <Route path="/weather" element={<DisguisedPage type="weather" />} />
            <Route path="/notes" element={<DisguisedPage type="notes" />} />
          </Routes>
        </PanicProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;