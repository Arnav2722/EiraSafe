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

// N number of Fcking Attempts 😭😭😭

// src/contexts/AuthContext.tsx
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase'; // Import the supabase client you just created
// import { User, Session } from '@supabase/supabase-js'; // Import Supabase types for better type safety

// // Define the shape of the context's value
// interface AuthContextType {
//   user: User | null;      // The current authenticated user object
//   session: Session | null; // The current session object
//   loading: boolean;       // <--- ADDED THIS PROPERTY
// }

// // Create the context with an undefined default value, as it will be set by the provider
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // AuthProvider component to wrap your application and provide authentication state
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true); // Initial loading state is true

//   useEffect(() => {
//     // Function to get the initial session on component mount
//     const getInitialSession = async () => {
//       try {
//         // Attempt to retrieve the existing session from Supabase (from localStorage)
//         const { data: { session }, error } = await supabase.auth.getSession();
//         if (error) {
//           console.error("Error retrieving initial session:", error);
//           // Don't throw here, just log and proceed with null user/session
//         }
//         setSession(session);
//         setUser(session?.user || null); // Set user if session exists, otherwise null
//       } catch (e) {
//         console.error("Unexpected error during initial session check:", e);
//       } finally {
//         setLoading(false); // Finished checking initial session, set loading to false
//       }
//     };

//     getInitialSession(); // Call the function to get the session immediately

//     // Set up a listener for real-time authentication state changes from Supabase
//     // This will fire on login, logout, token refresh, and initial session detection
//     const { data: { subscription: authListenerSubscription } } = supabase.auth.onAuthStateChange( // Correctly destructure
//       (_event, currentSession) => {
//         setSession(currentSession);
//         setUser(currentSession?.user || null);
//         setLoading(false); // Ensure loading is false after any state change
//       }
//     );

//     // Cleanup function: Unsubscribe from the auth listener when the component unmounts
//     return () => {
//       // Check if the subscription object exists before trying to unsubscribe
//       if (authListenerSubscription) {
//         authListenerSubscription.unsubscribe(); // Corrected: access unsubscribe from the subscription object
//       }
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   // Provide the current auth state (user, session, loading) to children
//   return (
//     <AuthContext.Provider value={{ user, session, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to consume the AuthContext easily in any functional component
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   // Throw an error if useAuth is used outside of an AuthProvider
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// Pata nhi konsa attempt hai 
// src/contexts/AuthContext.tsx
// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
// import { supabase } from '../lib/supabase';
// import { User, Session } from '@supabase/supabase-js';

// interface AuthContextType {
//   user: User | null;
//   session: Session | null;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Define the inactivity timeout (30 minutes in milliseconds)
// const INACTIVITY_TIMEOUT_MS = 1 * 60 * 1000; // 1 minute * 60 seconds/minute * 1000 milliseconds/second
// const CHECK_INTERVAL_MS = 60 * 1000; // Check every 1 minute

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);
//   const lastActivityTimeRef = useRef<number>(Date.now()); // Use ref to keep track of last activity time without re-rendering

//   useEffect(() => {
//     // --- Supabase Session Management ---
//     const getInitialSession = async () => {
//       try {
//         const { data: { session }, error } = await supabase.auth.getSession();
//         if (error) {
//           console.error("Error retrieving initial session:", error);
//         }
//         setSession(session);
//         setUser(session?.user || null);
//       } catch (e) {
//         console.error("Unexpected error during initial session check:", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getInitialSession();

//     const { data: { subscription: authListenerSubscription } } = supabase.auth.onAuthStateChange(
//       (_event, currentSession) => {
//         setSession(currentSession);
//         setUser(currentSession?.user || null);
//         setLoading(false);
//         // Reset activity time on any auth state change (login/logout/refresh)
//         lastActivityTimeRef.current = Date.now();
//       }
//     );

//     // --- Inactivity Logout Logic ---

//     // Function to update last activity time
//     const updateLastActivityTime = () => {
//       lastActivityTimeRef.current = Date.now();
//     };

//     // Add activity listeners
//     document.addEventListener('mousemove', updateLastActivityTime);
//     document.addEventListener('keydown', updateLastActivityTime);
//     document.addEventListener('click', updateLastActivityTime);
//     document.addEventListener('scroll', updateLastActivityTime);
//     // You can add more events like 'touchstart', 'touchend' for mobile devices

//     // Set up the inactivity check interval
//     const inactivityInterval = setInterval(() => {
//       // Only check for inactivity if a user is currently logged in and not in a loading state
//       if (session && !loading && Date.now() - lastActivityTimeRef.current > INACTIVITY_TIMEOUT_MS) {
//         console.log('User inactive for 30 minutes. Logging out...');
//         supabase.auth.signOut(); // Trigger Supabase logout
//         // The authListener will pick this up, update session/user to null,
//         // and App.tsx's PrivateRoute will handle the navigation to /auth.
//       }
//     }, CHECK_INTERVAL_MS); // Check every minute

//     // --- Logout on Browser/Tab Close Logic ---
//     const handleLogoutOnClose = async () => {
//       // Only attempt to sign out if there's an active session
//       if (session) {
//         // Use navigator.sendBeacon or a synchronous XMLHttpRequest for a more reliable logout on unload
//         // However, for most cases, a simple signOut() might suffice locally,
//         // as browser behavior for async operations on beforeunload/unload is unreliable.
//         // Supabase will primarily clear the local session.
//         try {
//           await supabase.auth.signOut();
//           console.log("User signed out on browser/tab close.");
//         } catch (error) {
//           console.error("Error signing out on browser/tab close:", error);
//         }
//       }
//     };

//     // Add the event listener for beforeunload
//     window.addEventListener('beforeunload', handleLogoutOnClose);


//     // Cleanup function for all listeners and intervals
//     return () => {
//       if (authListenerSubscription) {
//         authListenerSubscription.unsubscribe();
//       }
//       document.removeEventListener('mousemove', updateLastActivityTime);
//       document.removeEventListener('keydown', updateLastActivityTime);
//       document.removeEventListener('click', updateLastActivityTime);
//       document.removeEventListener('scroll', updateLastActivityTime);
//       clearInterval(inactivityInterval); // Clear the inactivity interval
//       window.removeEventListener('beforeunload', handleLogoutOnClose); // Clean up beforeunload listener
//     };
//   }, [session, loading]); // Depend on session and loading to re-evaluate inactivity logic if they change

//   return (
//     <AuthContext.Provider value={{ user, session, loading }}>
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
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the inactivity timeout (30 minutes in milliseconds)
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes * 60 seconds/minute * 1000 milliseconds/second
const CHECK_INTERVAL_MS = 60 * 1000; // Check every 1 minute

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const lastActivityTimeRef = useRef<number>(Date.now()); // Use ref to keep track of last activity time without re-rendering

  useEffect(() => {
    // --- Supabase Session Management ---
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error retrieving initial session:", error);
        }
        setSession(session);
        setUser(session?.user || null);
      } catch (e) {
        console.error("Unexpected error during initial session check:", e);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription: authListenerSubscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);
        // Reset activity time on any auth state change (login/logout/refresh)
        lastActivityTimeRef.current = Date.now();
      }
    );

    // --- Inactivity Logout Logic ---

    // Function to update last activity time
    const updateLastActivityTime = () => {
      lastActivityTimeRef.current = Date.now();
    };

    // Add activity listeners
    document.addEventListener('mousemove', updateLastActivityTime);
    document.addEventListener('keydown', updateLastActivityTime);
    document.addEventListener('click', updateLastActivityTime);
    document.addEventListener('scroll', updateLastActivityTime);
    // You can add more events like 'touchstart', 'touchend' for mobile devices

    // Set up the inactivity check interval
    const inactivityInterval = setInterval(() => {
      // Only check for inactivity if a user is currently logged in and not in a loading state
      if (session && !loading && Date.now() - lastActivityTimeRef.current > INACTIVITY_TIMEOUT_MS) {
        console.log('User inactive for 30 minutes. Logging out...');
        supabase.auth.signOut(); // Trigger Supabase logout
        // The authListener will pick this up, update session/user to null,
        // and App.tsx's PrivateRoute will handle the navigation to /auth.
      }
    }, CHECK_INTERVAL_MS); // Check every minute

    // --- REMOVED: Logout on Browser/Tab Close Logic ---
    // The previous 'handleLogoutOnClose' function and 'window.addEventListener('beforeunload', ...)'
    // are removed from here and the cleanup. This allows the session to persist
    // across browser/tab closures as per Supabase's default behavior.


    // Cleanup function for all listeners and intervals
    return () => {
      if (authListenerSubscription) {
        authListenerSubscription.unsubscribe();
      }
      document.removeEventListener('mousemove', updateLastActivityTime);
      document.removeEventListener('keydown', updateLastActivityTime);
      document.removeEventListener('click', updateLastActivityTime);
      document.removeEventListener('scroll', updateLastActivityTime);
      clearInterval(inactivityInterval); // Clear the inactivity interval
      // REMOVED: window.removeEventListener('beforeunload', handleLogoutOnClose);
    };
  }, [session, loading]); // Depend on session and loading to re-evaluate inactivity logic if they change

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
