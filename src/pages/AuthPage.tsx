import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  CheckCircle,
  XCircle,
  Moon,
  Sun,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useTheme } from "../contexts/ThemeContext";

const LOCAL_STORAGE_EMAIL_KEY = "lastLoggedInEmail";

interface PasswordRequirementsStatus {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  digit: boolean;
  specialChar: boolean;
  overallValid: boolean;
}

const checkPasswordRequirementsLive = (
  password: string
): PasswordRequirementsStatus => {
  const status = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password),
    overallValid: false,
  };
  status.overallValid =
    status.length &&
    status.uppercase &&
    status.lowercase &&
    status.digit &&
    status.specialChar;
  return status;
};

const validatePasswordForSubmission = (password: string): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one digit.";
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password)) {
    return "Password must contain at least one special character (e.g., !@#$%).";
  }
  return null;
};

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Use the theme context

  const [passwordRequirements, setPasswordRequirements] =
    useState<PasswordRequirementsStatus>({
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
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
        specialChar: false,
        overallValid: false,
      });
    }
  }, [password, isLogin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError("Password and Confirm Password do not match.");
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
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
        navigate("/");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during Google sign-in";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-950 dark:to-gray-800 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl p-8 relative transition-colors duration-300">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {/* <Shield className="w-12 h-12 text-purple-600 dark:text-purple-400" /> */}
            {theme === "light" ? (
              <img
                src="/assets/blackTxxtLogo.png"
                className="w-48 h-48"
                alt=""
              />
            ) : (
              <img
                src="/assets/whiteTextLogo.png"
                className="w-48 h-48"
                alt=""/>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to EiraSafe
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Your safe space for healing and support
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 border border-red-100 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                id="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
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
                <li
                  className={`flex items-center ${
                    passwordRequirements.length
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {passwordRequirements.length ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  At least 8 characters
                </li>
                <li
                  className={`flex items-center ${
                    passwordRequirements.uppercase
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {passwordRequirements.uppercase ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  One uppercase letter
                </li>
                <li
                  className={`flex items-center ${
                    passwordRequirements.lowercase
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {passwordRequirements.lowercase ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  One lowercase letter
                </li>
                <li
                  className={`flex items-center ${
                    passwordRequirements.digit
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {passwordRequirements.digit ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  One digit
                </li>
                <li
                  className={`flex items-center ${
                    passwordRequirements.specialChar
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {passwordRequirements.specialChar ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  One special character
                </li>
              </ul>
            )}
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
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
            className="w-full bg-purple-600 dark:bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-200"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-500 text-sm">
            OR
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
        >
          <Chrome className="w-5 h-5 mr-3 text-red-500" />
          {isLogin ? "Sign In with Google" : "Sign Up with Google"}
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setPasswordRequirements({
                length: false,
                uppercase: false,
                lowercase: false,
                digit: false,
                specialChar: false,
                overallValid: false,
              });
            }}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Your safety is our priority. All data is encrypted and stored
            securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
