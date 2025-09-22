// import React, { useState } from "react";
// import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Shield,
//   BookOpen,
//   Heart,
//   MapPin,
//   Settings,
//   Moon,
//   Sun,
//   LogIn,
//   LogOut,
//   Sparkles,
// } from "lucide-react";
// import { usePanic } from "../contexts/PanicContext";
// import { useAuth } from "../contexts/AuthContext";
// import { useTheme } from "../contexts/ThemeContext";

// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { disguiseAs } = usePanic();
//   const { isAuthenticated, signOut, loading } = useAuth();
//   const { theme, toggleTheme } = useTheme();

//   const navLinks = [
//     { name: "Home", path: "/", icon: <Shield className="w-5 h-5" /> },
//     {
//       name: "Journal",
//       path: "/journal",
//       icon: <BookOpen className="w-5 h-5" />,
//     },
//     {
//       name: "Affirmations",
//       path: "/affirmations",
//       icon: <Sparkles className="w-5 h-5" />,
//     },
//     {
//       name: "Resources",
//       path: "/resources",
//       icon: <MapPin className="w-5 h-5" />,
//     },
//     {
//       name: "Safety Plan",
//       path: "/safety-plan",
//       icon: <Heart className="w-5 h-5" />,
//     },
//     { name: "Mood", path: "/mood", icon: <Moon className="w-5 h-5" /> },
//     {
//       name: "Settings",
//       path: "/settings",
//       icon: <Settings className="w-5 h-5" />,
//     },
//   ];

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = async () => {
//     await signOut();
//     navigate("/auth");
//     setIsMenuOpen(false);
//   };

//   if (loading) {
//     return null;
//   }

//   return (
//     // Navbar container styling for dark mode
//     <nav className="bg-white dark:bg-gray-800 shadow-md transition-all duration-300">
//       {" "}
//       <div className="container mx-auto px-4">
//         {" "}
//         <div className="flex justify-between items-center h-16">
//           {" "}
//           <div className="flex items-center">
//             {" "}
//             <Link to="/" className="flex items-center">
//               {" "}
//               {/* Logo text styling for dark mode */}{" "}
//               <Shield className="h-8 w-8 text-purple-600" />{" "}
//               <span className="ml-2 text-xl font-semibold text-purple-800 dark:text-purple-300">
//                 EiraSafe
//               </span>{" "}
//             </Link>{" "}
//           </div>
//           {/* Desktop Navigation */}{" "}
//           <div className="hidden md:flex items-center space-x-4">
//             {" "}
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path} // NavLink styling for both light and dark modes
//                 className={({ isActive }) =>
//                   `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
//                     isActive
//                       ? "text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900"
//                       : "text-gray-600 hover:text-purple-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:text-purple-300 dark:hover:bg-gray-700"
//                   }`
//                 }
//               >
//                 {link.icon}
//                 <span className="ml-1">{link.name}</span>{" "}
//               </NavLink>
//             ))}
//             {/* Divider styling for dark mode */}{" "}
//             <div className="border-l border-gray-300 dark:border-gray-600 h-6 mx-2" />
//             {/* Theme Toggle Button */}{" "}
//             <button
//               onClick={toggleTheme} // Icon styling for dark mode
//               className="flex items-center p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
//               aria-label="Toggle theme"
//             >
//               {" "}
//               {theme === "light" ? (
//                 <Moon className="w-5 h-5" />
//               ) : (
//                 <Sun className="w-5 h-5" />
//               )}{" "}
//             </button>
//             {/* Divider styling for dark mode */}{" "}
//             <div className="border-l border-gray-300 dark:border-gray-600 h-6 mx-2" />{" "}
//             {/* Conditional rendering for Login/Logout */}{" "}
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout} // Button styling for dark mode
//                 className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900 transition-colors duration-200"
//               >
//                 {" "}
//                 <LogOut className="w-5 h-5 mr-1" />
//                 Logout{" "}
//               </button>
//             ) : (
//               <Link
//                 to="/auth" // Button styling for dark mode
//                 className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900 transition-colors duration-200"
//               >
//                 {" "}
//                 <LogIn className="w-5 h-5 mr-1" />
//                 Login{" "}
//               </Link>
//             )}
//             {/* Panic button styling for dark mode */}{" "}
//             <button
//               onClick={() => disguiseAs("weather")}
//               className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900 transition-colors duration-200"
//             >
//               Weather Mode{" "}
//             </button>{" "}
//             <button
//               onClick={() => disguiseAs("notes")}
//               className="px-3 py-2 rounded-md text-sm font-medium text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900 transition-colors duration-200"
//             >
//               Notes Mode{" "}
//             </button>{" "}
//           </div>
//           {/* Mobile menu button and theme toggle */}{" "}
//           <div className="md:hidden flex items-center">
//             {/* Theme Toggle Button for Mobile */}{" "}
//             <button
//               onClick={toggleTheme} // Icon styling for dark mode
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none mr-2"
//               aria-label="Toggle theme"
//             >
//               {" "}
//               {theme === "light" ? (
//                 <Moon className="block h-6 w-6" />
//               ) : (
//                 <Sun className="block h-6 w-6" />
//               )}{" "}
//             </button>{" "}
//             <button
//               onClick={toggleMenu} // Icon styling for dark mode
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-300 dark:hover:text-purple-300 dark:hover:bg-purple-900 focus:outline-none"
//             >
//               {" "}
//               {isMenuOpen ? (
//                 <X className="block h-6 w-6" />
//               ) : (
//                 <Menu className="block h-6 w-6" />
//               )}{" "}
//             </button>{" "}
//           </div>{" "}
//         </div>{" "}
//       </div>
//       {/* Mobile Menu */} {/* Mobile menu container styling for dark mode */}{" "}
//       <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
//         {" "}
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800">
//           {" "}
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path} // NavLink styling for both light and dark modes
//               className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
//                 location.pathname === link.path
//                   ? "text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900"
//                   : "text-gray-600 hover:text-purple-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:text-purple-300 dark:hover:bg-gray-700"
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {link.icon} <span className="ml-2">{link.name}</span>{" "}
//             </NavLink>
//           ))}
//           {/* Divider styling for dark mode */}{" "}
//           <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
//             {" "}
//             {/* Conditional rendering for Login/Logout in Mobile Menu */}{" "}
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout} // Button styling for dark mode
//                 className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
//               >
//                 {" "}
//                 <LogOut className="w-5 h-5 mr-2" />
//                 Logout{" "}
//               </button>
//             ) : (
//               <Link
//                 to="/auth" // Button styling for dark mode
//                 className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {" "}
//                 <LogIn className="w-5 h-5 mr-2" />
//                 Login{" "}
//               </Link>
//             )}
//             {/* Panic button styling for dark mode */}{" "}
//             <button
//               onClick={() => {
//                 disguiseAs("weather");
//                 setIsMenuOpen(false);
//               }}
//               className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900"
//             >
//               Weather Mode{" "}
//             </button>{" "}
//             <button
//               onClick={() => {
//                 disguiseAs("notes");
//                 setIsMenuOpen(false);
//               }}
//               className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900"
//             >
//               Notes Mode{" "}
//             </button>{" "}
//           </div>{" "}
//         </div>{" "}
//       </div>{" "}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  BookOpen,
  Heart,
  MapPin,
  Settings,
  Moon,
  Sun,
  LogIn,
  LogOut,
  Sparkles,
} from "lucide-react";
import { usePanic } from "../contexts/PanicContext";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Import your logo files
import lightLogo from "/assets/blackTxxtLogo.png";
import darkLogo from "/assets/whiteTextLogo.png";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { disguiseAs } = usePanic();
  const { isAuthenticated, signOut, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Journal",
      path: "/journal",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      name: "Affirmations",
      path: "/affirmations",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      name: "Resources",
      path: "/resources",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      name: "Safety Plan",
      path: "/safety-plan",
      icon: <Heart className="w-5 h-5" />,
    },
    { name: "Mood", path: "/mood", icon: <Moon className="w-5 h-5" /> },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
    setIsMenuOpen(false);
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 my-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {/* Conditional rendering for the logo */}
              {theme === "light" ? (
                <img
                  src={lightLogo}
                  alt="EiraSafe Logo"
                  className="h-24 "
                />
              ) : (
                <img
                  src={darkLogo}
                  alt="EiraSafe Logo"
                  className="h-8 w-auto"
                />
              )}
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900"
                      : "text-gray-600 hover:text-purple-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:text-purple-300 dark:hover:bg-gray-700"
                  }`
                }
              >
                {link.icon}
                <span className="ml-1">{link.name}</span>
              </NavLink>
            ))}
            <div className="border-l border-gray-300 dark:border-gray-600 h-6 mx-2" />
            <button
              onClick={toggleTheme}
              className="flex items-center p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <div className="border-l border-gray-300 dark:border-gray-600 h-6 mx-2" />
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900 transition-colors duration-200"
              >
                <LogIn className="w-5 h-5 mr-1" />
                Login
              </Link>
            )}
            <button
              onClick={() => disguiseAs("weather")}
              className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900 transition-colors duration-200"
            >
              Weather Mode
            </button>
            <button
              onClick={() => disguiseAs("notes")}
              className="px-3 py-2 rounded-md text-sm font-medium text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900 transition-colors duration-200"
            >
              Notes Mode
            </button>
          </div>
          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none mr-2"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="block h-6 w-6" />
              ) : (
                <Sun className="block h-6 w-6" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-300 dark:hover:text-purple-300 dark:hover:bg-purple-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? "text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900"
                  : "text-gray-600 hover:text-purple-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:text-purple-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon} <span className="ml-2">{link.name}</span>
            </NavLink>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Link>
            )}
            <button
              onClick={() => {
                disguiseAs("weather");
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900"
            >
              Weather Mode
            </button>
            <button
              onClick={() => {
                disguiseAs("notes");
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900"
            >
              Notes Mode
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
