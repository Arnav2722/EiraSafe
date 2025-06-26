// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { PanicProvider } from './contexts/PanicContext';
// import Layout from './components/Layout';
// import AuthPage from './pages/AuthPage';
// import HomePage from './pages/HomePage';
// import JournalPage from './pages/JournalPage';
// import ResourcesPage from './pages/ResourcesPage';
// import SafetyPlanPage from './pages/SafetyPlanPage';
// import SettingsPage from './pages/SettingsPage';
// import MoodTrackerPage from './pages/MoodTrackerPage';
// import DisguisedPage from './pages/DisguisedPage';

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { session } = useAuth();
//   return session ? <>{children}</> : <Navigate to="/auth" />;
// };

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <PanicProvider>
//           <Routes>
//             <Route path="/auth" element={<AuthPage />} />
//             <Route
//               path="/"
//               element={
//                 <PrivateRoute>
//                   <Layout />
//                 </PrivateRoute>
//               }
//             >
//               <Route index element={<HomePage />} />
//               <Route path="journal" element={<JournalPage />} />
//               <Route path="resources" element={<ResourcesPage />} />
//               <Route path="safety-plan" element={<SafetyPlanPage />} />
//               <Route path="mood" element={<MoodTrackerPage />} />
//               <Route path="settings" element={<SettingsPage />} />
//             </Route>
//             <Route path="/weather" element={<DisguisedPage type="weather" />} />
//             <Route path="/notes" element={<DisguisedPage type="notes" />} />
//           </Routes>
//         </PanicProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext'; // Import useAuth from AuthContext
// import { PanicProvider } from './contexts/PanicContext';
// import Layout from './components/Layout';

// // Import all your page components
// import AuthPage from './pages/AuthPage';
// import HomePage from './pages/HomePage';
// import JournalPage from './pages/JournalPage';
// import ResourcesPage from './pages/ResourcesPage';
// import SafetyPlanPage from './pages/SafetyPlanPage';
// import SettingsPage from './pages/SettingsPage';
// import MoodTrackerPage from './pages/MoodTrackerPage';
// import DisguisedPage from './pages/DisguisedPage';

// // PrivateRoute component now ensures a session exists before rendering children.
// // It relies on AuthProvider correctly setting the session and loading state.
// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { session, loading } = useAuth(); // Get session and loading state from AuthContext

//   // If still loading, don't make a decision yet. The top-level App component
//   // handles the overall app loading screen.
//   if (loading) {
//     return null; // Or a very minimal loading indicator if this component renders before the main app one
//   }

//   // If session exists (user is logged in), render the children.
//   // Otherwise, navigate to the authentication page.
//   return session ? <>{children}</> : <Navigate to="/auth" replace />;
// };

// function App() {
//   // We place AuthProvider and PanicProvider here because they wrap the entire routing logic.
//   // The useAuth hook can then be used within components rendered by Routes.
//   return (
//     <Router>
//       <AuthProvider> {/* AuthProvider must wrap all components that use useAuth */}
//         <PanicProvider>
//           {/* Main App Content: This inner component handles the loading state check and routing */}
//           <AppContent />
//         </PanicProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// // New component to handle the actual content and loading state after AuthProvider is ready
// const AppContent: React.FC = () => {
//   const { user, loading } = useAuth(); // Get user and loading state from AuthContext

//   // Show a loading indicator while the authentication state is being determined.
//   // This is crucial to prevent flickering or immediate redirects on page load.
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
//         <div className="flex items-center text-purple-700 text-xl font-medium">
//           <svg className="animate-spin h-6 w-6 mr-3 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Loading application...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       {/* AuthPage: If user is already logged in, navigate to home. Otherwise, show AuthPage. */}
//       {/* 'replace' prop ensures the current history entry is replaced, preventing back button issues */}
//       <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />

//       {/* Main protected routes, wrapped by PrivateRoute. */}
//       {/* Nested routes inside Layout will automatically get the Layout component. */}
//       <Route
//         path="/"
//         element={
//           <PrivateRoute>
//             <Layout />
//           </PrivateRoute>
//         }
//       >
//         {/* Index route for '/' when user is authenticated */}
//         <Route index element={<HomePage />} />
//         <Route path="journal" element={<JournalPage />} />
//         <Route path="resources" element={<ResourcesPage />} />
//         <Route path="safety-plan" element={<SafetyPlanPage />} />
//         <Route path="mood" element={<MoodTrackerPage />} />
//         <Route path="settings" element={<SettingsPage />} />
//       </Route>

//       {/* Disguised pages: These can be public or private based on your app's design.
//           If they should be protected, wrap them in PrivateRoute as well.
//           For now, assuming they might be public or handle their own access. */}
//       <Route path="/weather" element={<DisguisedPage type="weather" />} />
//       <Route path="/notes" element={<DisguisedPage type="notes" />} />

//       {/* Catch-all for any undefined routes. Users will see a "Page not found" or similar. */}
//       {/* If these should also be protected and redirect to auth, wrap them in PrivateRoute. */}
//       <Route path="*" element={<p className="text-center mt-20 text-xl text-gray-700">Oops! Page not found.</p>} />
//     </Routes>
//   );
// };

// export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Remove BrowserRouter import here
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';

// Import all your page components
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import ResourcesPage from './pages/ResourcesPage';
import SafetyPlanPage from './pages/SafetyPlanPage';
import SettingsPage from './pages/SettingsPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import DisguisedPage from './pages/DisguisedPage';

// PrivateRoute component now ensures a session exists before rendering children.
// It relies on AuthProvider correctly setting the session and loading state.
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth(); // Get session and loading state from AuthContext

  // If still loading, don't make a decision yet. The top-level App component
  // handles the overall app loading screen.
  if (loading) {
    return null; // Or a very minimal loading indicator if this component renders before the main app one
  }

  // If session exists (user is logged in), render the children.
  // Otherwise, navigate to the authentication page.
  return session ? <>{children}</> : <Navigate to="/auth" replace />;
};

function App() {
  // The AuthProvider and PanicProvider are now handled in main.tsx, wrapping App.
  // We no longer need to render <Router> here as it's already done in main.tsx.
  return (
    <AppContent /> // Directly render AppContent which contains the Routes
  );
}

// New component to handle the actual content and loading state after AuthProvider is ready
const AppContent: React.FC = () => {
  const { user, loading } = useAuth(); // Get user and loading state from AuthContext

  // Show a loading indicator while the authentication state is being determined.
  // This is crucial to prevent flickering or immediate redirects on page load.
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
      {/* AuthPage: If user is already logged in, navigate to home. Otherwise, show AuthPage. */}
      {/* 'replace' prop ensures the current history entry is replaced, preventing back button issues */}
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />

      {/* Main protected routes, wrapped by PrivateRoute. */}
      {/* Nested routes inside Layout will automatically get the Layout component. */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* Index route for '/' when user is authenticated */}
        <Route index element={<HomePage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="safety-plan" element={<SafetyPlanPage />} />
        <Route path="mood" element={<MoodTrackerPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Disguised pages: These can be public or private based on your app's design.
          If they should be protected, wrap them in PrivateRoute as well.
          For now, assuming they might be public or handle their own access. */}
      <Route path="/weather" element={<DisguisedPage type="weather" />} />
      <Route path="/notes" element={<DisguisedPage type="notes" />} />

      {/* Catch-all for any undefined routes. Users will see a "Page not found" or similar. */}
      {/* If these should also be protected and redirect to auth, wrap them in PrivateRoute. */}
      <Route path="*" element={<p className="text-center mt-20 text-xl text-gray-700">Oops! Page not found.</p>} />
    </Routes>
  );
};

export default App;
