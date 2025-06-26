// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { Session, User } from '@supabase/supabase-js';
// import { supabase } from '../lib/supabase';

// type AuthContextType = {
//   session: Session | null;
//   user: User | null;
//   signOut: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [session, setSession] = useState<Session | null>(null);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     // Get initial session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user ?? null);
//     });

//     // Listen for auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const signOut = async () => {
//     await supabase.auth.signOut();
//   };

//   return (
//     <AuthContext.Provider value={{ session, user, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Import the supabase client you just created
import { User, Session } from '@supabase/supabase-js'; // Import Supabase types for better type safety

// Define the shape of the context's value
interface AuthContextType {
  user: User | null;      // The current authenticated user object
  session: Session | null; // The current session object
  loading: boolean;       // <--- ADDED THIS PROPERTY
}

// Create the context with an undefined default value, as it will be set by the provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap your application and provide authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading state is true

  useEffect(() => {
    // Function to get the initial session on component mount
    const getInitialSession = async () => {
      try {
        // Attempt to retrieve the existing session from Supabase (from localStorage)
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error retrieving initial session:", error);
          // Don't throw here, just log and proceed with null user/session
        }
        setSession(session);
        setUser(session?.user || null); // Set user if session exists, otherwise null
      } catch (e) {
        console.error("Unexpected error during initial session check:", e);
      } finally {
        setLoading(false); // Finished checking initial session, set loading to false
      }
    };

    getInitialSession(); // Call the function to get the session immediately

    // Set up a listener for real-time authentication state changes from Supabase
    // This will fire on login, logout, token refresh, and initial session detection
    const { data: { subscription: authListenerSubscription } } = supabase.auth.onAuthStateChange( // Correctly destructure
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false); // Ensure loading is false after any state change
      }
    );

    // Cleanup function: Unsubscribe from the auth listener when the component unmounts
    return () => {
      // Check if the subscription object exists before trying to unsubscribe
      if (authListenerSubscription) {
        authListenerSubscription.unsubscribe(); // Corrected: access unsubscribe from the subscription object
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Provide the current auth state (user, session, loading) to children
  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext easily in any functional component
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Throw an error if useAuth is used outside of an AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
