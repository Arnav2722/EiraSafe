import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, Chrome, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LOCAL_STORAGE_EMAIL_KEY = 'lastLoggedInEmail';

interface PasswordRequirementsStatus {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  digit: boolean;
  specialChar: boolean;
  overallValid: boolean; 
}

const checkPasswordRequirementsLive = (password: string): PasswordRequirementsStatus => {
  const status = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
    overallValid: false, 
  };
  status.overallValid = status.length && status.uppercase && status.lowercase && status.digit && status.specialChar;
  return status;
};

const validatePasswordForSubmission = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one digit.';
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
    return 'Password must contain at least one special character (e.g., !@#$%).';
  }
  return null; 
};


const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirementsStatus>({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
    overallValid: false,
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []); 

  useEffect(() => {
    if (!isLogin) {
      setPasswordRequirements(checkPasswordRequirementsLive(password));
    } else {
      setPasswordRequirements({
        length: false, uppercase: false, lowercase: false, digit: false, specialChar: false, overallValid: false,
      });
    }
  }, [password, isLogin]); 

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Password and Confirm Password do not match.');
        return;
      }

      const passwordValidationError = validatePasswordForSubmission(password);
      if (passwordValidationError) {
        setError(passwordValidationError);
        return;
      }
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
        navigate('/');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
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
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
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
                id="email"
                autoComplete="email"
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
                id="password"
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

            {!isLogin && (
              <ul className="text-sm mt-2 space-y-1">
                <li className={`flex items-center ${passwordRequirements.length ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordRequirements.length ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                  At least 8 characters
                </li>
                <li className={`flex items-center ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordRequirements.uppercase ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                  One uppercase letter
                </li>
                <li className={`flex items-center ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordRequirements.lowercase ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                  One lowercase letter
                </li>
                <li className={`flex items-center ${passwordRequirements.digit ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordRequirements.digit ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                  One digit
                </li>
                <li className={`flex items-center ${passwordRequirements.specialChar ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordRequirements.specialChar ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                  One special character
                </li>
              </ul>
            )}
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password"
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
          <Chrome className="w-5 h-5 mr-3 text-red-500" />
          {isLogin ? 'Sign In with Google' : 'Sign Up with Google'}
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              setPasswordRequirements({
                length: false,
                uppercase: false,
                lowercase: false,
                digit: false,
                specialChar: false,
                overallValid: false,
              });
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


// After I buy a new number for this

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Shield, Mail, Lock, Eye, EyeOff, Chrome, CheckCircle, XCircle, Phone } from 'lucide-react'; // Import Phone icon
// import { supabase } from '../lib/supabase';

// // Define a key for storing the email in local storage
// const LOCAL_STORAGE_EMAIL_KEY = 'lastLoggedInEmail';

// // Define an interface for the password requirements state
// interface PasswordRequirementsStatus {
//   length: boolean;
//   uppercase: boolean;
//   lowercase: boolean;
//   digit: boolean;
//   specialChar: boolean;
//   overallValid: boolean; // Indicates if all current requirements are met
// }

// // Helper function to check individual password requirements for live feedback
// const checkPasswordRequirementsLive = (password: string): PasswordRequirementsStatus => {
//   const status = {
//     length: password.length >= 8,
//     uppercase: /[A-Z]/.test(password),
//     lowercase: /[a-z]/.test(password),
//     digit: /[0-9]/.test(password),
//     specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
//     overallValid: false, // Will be set below
//   };
//   status.overallValid = status.length && status.uppercase && status.lowercase && status.digit && status.specialChar;
//   return status;
// };

// // Helper function for final password validation for submission (returns specific error string or null)
// const validatePasswordForSubmission = (password: string): string | null => {
//   if (password.length < 8) {
//     return 'Password must be at least 8 characters long.';
//   }
//   if (!/[A-Z]/.test(password)) {
//     return 'Password must contain at least one uppercase letter.';
//   }
//   if (!/[a-z]/.test(password)) {
//     return 'Password must contain at least one lowercase letter.';
//   }
//   if (!/[0-9]/.test(password)) {
//     return 'Password must contain at least one digit.';
//   }
//   if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
//     return 'Password must contain at least one special character (e.g., !@#$%).';
//   }
//   return null; // Password is valid for submission
// };

// const AuthPage: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email'); // Can now be chosen for both login/signup
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirementsStatus>({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     digit: false,
//     specialChar: false,
//     overallValid: false,
//   });

//   useEffect(() => {
//     const savedEmail = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
//     if (savedEmail) {
//       setEmail(savedEmail);
//     }
//   }, []);

//   useEffect(() => {
//     // Password requirements only apply for email signup
//     if (!isLogin && authMethod === 'email') {
//       setPasswordRequirements(checkPasswordRequirementsLive(password));
//     } else {
//       setPasswordRequirements({
//         length: false, uppercase: false, lowercase: false, digit: false, specialChar: false, overallValid: false,
//       });
//     }
//   }, [password, isLogin, authMethod]);

//   // Removed the useEffect that forced authMethod to email on login mode

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (authMethod === 'email') {
//       if (!isLogin) { // Signup specific validations
//         if (password !== confirmPassword) {
//           setError('Password and Confirm Password do not match.');
//           return;
//         }
//         const passwordValidationError = validatePasswordForSubmission(password);
//         if (passwordValidationError) {
//           setError(passwordValidationError);
//           return;
//         }
//       }

//       try {
//         if (isLogin) {
//           const { error } = await supabase.auth.signInWithPassword({
//             email,
//             password,
//           });
//           if (error) throw error;
//           localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
//           navigate('/');
//         } else {
//           const { error } = await supabase.auth.signUp({
//             email,
//             password,
//           });
//           if (error) throw error;
//           localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
//           navigate('/');
//         }
//       } catch (err: any) {
//         setError(err.message || 'An error occurred');
//       }
//     } else if (authMethod === 'phone') {
//       if (!phoneNumber) {
//         setError('Please enter your phone number.');
//         return;
//       }

//       // Supabase supports signInWithOtp for both login (if user exists) and signup (if user doesn't exist)
//       // The `verifyOtp` function will handle creating a new user or signing in an existing one.
//       // So, the logic here is largely the same for login/signup, just the 'type' in verifyOtp changes for signup.

//       try {
//         if (!isOtpSent) {
//           // Step 1: Send OTP for login or signup
//           const fullPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`; // Adjust country code as needed
//           const { data, error: otpError } = await supabase.auth.signInWithOtp({
//             phone: fullPhoneNumber,
//             options: {
//               shouldCreateUser: !isLogin, // Set to true if it's a signup attempt
//             }
//           });
//           if (otpError) throw otpError;
//           setIsOtpSent(true);
//           setError('OTP sent to your phone number!');
//           console.log('OTP Data:', data);
//         } else {
//           // Step 2: Verify OTP
//           if (!otp) {
//             setError('Please enter the OTP.');
//             return;
//           }
//           const { error: verifyError } = await supabase.auth.verifyOtp({
//             phone: phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`,
//             token: otp,
//             type: isLogin ? 'sms' : 'sms', // 'sms' for login, 'signup' for signup. Supabase will infer based on `shouldCreateUser` in signInWithOtp
//                                             // However, 'sms' is generally robust for both.
//           });
//           if (verifyError) throw verifyError;
//           navigate('/');
//         }
//       } catch (err: any) {
//         setError(err.message || 'Phone authentication failed. Please try again.');
//       }
//     }
//   };

//   const handleGoogleAuth = async () => {
//     setError('');
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: window.location.origin,
//         },
//       });
//       if (error) throw error;
//     } catch (err: any) {
//       setError(err.message || 'An error occurred during Google sign-in');
//     }
//   };

//   const resetAuthState = () => {
//     setError('');
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setPhoneNumber('');
//     setOtp('');
//     setIsOtpSent(false);
//     setPasswordRequirements({
//       length: false, uppercase: false, lowercase: false, digit: false, specialChar: false, overallValid: false,
//     });
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

//         {/* Auth Method Toggle - now always visible */}
//         <div className="mb-6 flex justify-center space-x-4">
//           <button
//             type="button"
//             onClick={() => { setAuthMethod('email'); resetAuthState(); }}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               authMethod === 'email' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Email
//           </button>
//           <button // Phone button is now always visible
//             type="button"
//             onClick={() => { setAuthMethod('phone'); resetAuthState(); }}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               authMethod === 'phone' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Phone
//           </button>
//         </div>

//         <form onSubmit={handleAuth} className="space-y-6">
//           {authMethod === 'email' && (
//             <>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="email"
//                     id="email"
//                     autoComplete="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     autoComplete="current-password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                     placeholder="Enter your password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Password Requirements List (only for signup) */}
//                 {!isLogin && (
//                   <ul className="text-sm mt-2 space-y-1">
//                     <li className={`flex items-center ${passwordRequirements.length ? 'text-green-600' : 'text-gray-500'}`}>
//                       {passwordRequirements.length ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
//                       At least 8 characters
//                     </li>
//                     <li className={`flex items-center ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
//                       {passwordRequirements.uppercase ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
//                       One uppercase letter
//                     </li>
//                     <li className={`flex items-center ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
//                       {passwordRequirements.lowercase ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
//                       One lowercase letter
//                     </li>
//                     <li className={`flex items-center ${passwordRequirements.digit ? 'text-green-600' : 'text-gray-500'}`}>
//                       {passwordRequirements.digit ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
//                       One digit
//                     </li>
//                     <li className={`flex items-center ${passwordRequirements.specialChar ? 'text-green-600' : 'text-gray-500'}`}>
//                       {passwordRequirements.specialChar ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
//                       One special character
//                     </li>
//                   </ul>
//                 )}
//               </div>

//               {!isLogin && ( // Only show Confirm Password when signing up
//                 <div>
//                   <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       id="confirm-password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                       placeholder="Confirm your password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="w-5 h-5" />
//                       ) : (
//                         <Eye className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {authMethod === 'phone' && ( // Phone fields are now always visible if authMethod is phone
//             <>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                     placeholder="e.g., +919876543210"
//                     required
//                     disabled={isOtpSent}
//                   />
//                 </div>
//               </div>

//               {isOtpSent && (
//                 <div>
//                   <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
//                     OTP
//                   </label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       id="otp"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
//                       placeholder="Enter the 6-digit OTP"
//                       required
//                     />
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
//           >
//             {authMethod === 'email'
//               ? (isLogin ? 'Sign In' : 'Sign Up')
//               : (isOtpSent ? 'Verify OTP' : 'Send OTP')}
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
//           {isLogin ? 'Sign In with Google' : 'Sign Up with Google'}
//         </button>

//         <div className="mt-6 text-center">
//           <button
//             onClick={() => {
//               setIsLogin(!isLogin);
//               resetAuthState();
//               // No need to force authMethod to email here, as phone is allowed for both
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