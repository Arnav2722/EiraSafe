// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import { supabase } from '../lib/supabase';

// const AuthPage: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       if (isLogin) {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         navigate('/');
//       } else {
//         const { error } = await supabase.auth.signUp({
//           email,
//           password,
//         });
//         if (error) throw error;
//         navigate('/');
//       }
//     } catch (err: any) {
//       setError(err.message || 'An error occurred');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <Shield className="w-12 h-12 text-purple-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Welcome to EiraSafe
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Your safe space for healing and support
//           </p>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleAuth} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
//           >
//             {isLogin ? 'Sign In' : 'Sign Up'}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-purple-600 hover:text-purple-800"
//           >
//             {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
//           </button>
//         </div>

//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>
//             Your safety is our priority. All data is encrypted and stored securely.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Shield, Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';
// import { supabase } from '../lib/supabase';

// const AuthPage: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password visibility
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     // Password and Confirm Password matching logic (only for signup)
//     if (!isLogin && password !== confirmPassword) {
//       setError('Password and Confirm Password do not match.');
//       return; // Stop the function if passwords don't match
//     }

//     try {
//       if (isLogin) {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         navigate('/');
//       } else {
//         const { error } = await supabase.auth.signUp({
//           email,
//           password,
//         });
//         if (error) throw error;
//         navigate('/');
//       }
//     } catch (err: any) {
//       setError(err.message || 'An error occurred');
//     }
//   };

//   const handleGoogleAuth = async () => {
//     setError('');
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: window.location.origin, // Or a specific callback URL
//         },
//       });
//       if (error) throw error;
//       // Supabase will handle redirection to Google for authentication,
//       // and then redirect back to your app, triggering an auth state change.
//     } catch (err: any) {
//       setError(err.message || 'An error occurred during Google sign-in');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <Shield className="w-12 h-12 text-purple-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Welcome to EiraSafe
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Your safe space for healing and support
//           </p>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleAuth} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 id='email'
//                 autoComplete='email'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                 placeholder="Enter your email"
//                 // placeholder="Eg:- johndoe@gmail.com"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 autoComplete='current-password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {!isLogin && ( // Only show Confirm Password when signing up
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                   placeholder="Confirm your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
//           >
//             {isLogin ? 'Sign In' : 'Sign Up'}
//           </button>
//         </form>

//         <div className="relative flex items-center py-4">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

//         {/* Google Login Button */}
//         <button
//           onClick={handleGoogleAuth}
//           className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
//         >
//           {/* Using Chrome icon as a placeholder, ideally use a dedicated Google icon */}
//           <Chrome className="w-5 h-5 mr-3 text-red-500" />
//           {isLogin ? 'Sign In with Google' : 'Sign Up with Google'}
//         </button>

//         <div className="mt-6 text-center">
//           <button
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setError(''); 
//               setEmail(''); 
//               setPassword('');
//               setConfirmPassword('');
//             }}
//             className="text-purple-600 hover:text-purple-800"
//           >
//             {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
//           </button>
//         </div>

//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>
//             Your safety is our priority. All data is encrypted and stored securely.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Define a key for storing the email in local storage
const LOCAL_STORAGE_EMAIL_KEY = 'lastLoggedInEmail';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // useEffect to retrieve email from local storage when the component mounts
  useEffect(() => {
    const savedEmail = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
    if (savedEmail) {
      setEmail(savedEmail); // Pre-fill the email input with the saved email
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Password and Confirm Password matching logic (only for signup)
    if (!isLogin && password !== confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email); // Store email on successful login
        navigate('/');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email); // Store email on successful signup
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin, // Or a specific callback URL
        },
      });
      if (error) throw error;
      // Note: Google OAuth handles redirects. The email might not be immediately available here
      // for direct storage in localStorage. Supabase handles the session after redirect.
      // For Google, the browser's own autocomplete will likely handle remembering.
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google sign-in');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to EiraSafe
          </h1>
          <p className="text-gray-600 mt-2">
            Your safe space for healing and support
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email" // Ensure consistent ID for label and input
                autoComplete="email" // Good for browser's built-in autocomplete too
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password" // Added ID
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {!isLogin && ( // Only show Confirm Password when signing up
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password" // Added ID
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
        >
          {/* Using Chrome icon as a placeholder, ideally use a dedicated Google icon */}
          <Chrome className="w-5 h-5 mr-3 text-red-500" />
          {isLogin ? 'Sign In with Google' : 'Sign Up with Google'}
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail(''); // Clear email when switching to ensure clean state or allow new input
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-purple-600 hover:text-purple-800"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Your safety is our priority. All data is encrypted and stored securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;