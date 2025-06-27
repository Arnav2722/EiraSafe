// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, Shield, BookOpen, Heart, MapPin, Settings, Moon } from 'lucide-react';
// import { usePanic } from '../contexts/PanicContext';

// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
//   const { disguiseAs } = usePanic();

//   const navLinks = [
//     { name: 'Home', path: '/', icon: <Shield className="w-5 h-5" /> },
//     { name: 'Journal', path: '/journal', icon: <BookOpen className="w-5 h-5" /> },
//     { name: 'Resources', path: '/resources', icon: <MapPin className="w-5 h-5" /> },
//     { name: 'Safety Plan', path: '/safety-plan', icon: <Heart className="w-5 h-5" /> },
//     { name: 'Mood', path: '/mood', icon: <Moon className="w-5 h-5" /> },
//     { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
//   ];

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-white shadow-md transition-all duration-300">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <Shield className="h-8 w-8 text-purple-600" />
//               <span className="ml-2 text-xl font-semibold text-purple-800">EiraSafe</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
//                   location.pathname === link.path
//                     ? 'text-purple-700 bg-purple-100'
//                     : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
//                 }`}
//               >
//                 {link.icon}
//                 <span className="ml-1">{link.name}</span>
//               </Link>
//             ))}
//             <div className="border-l border-gray-300 h-6 mx-2" />
//             <button 
//               onClick={() => disguiseAs('weather')}
//               className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200"
//             >
//               Weather Mode
//             </button>
//             <button 
//               onClick={() => disguiseAs('notes')}
//               className="px-3 py-2 rounded-md text-sm font-medium text-green-600 hover:bg-green-50 transition-colors duration-200"
//             >
//               Notes Mode
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50 focus:outline-none"
//             >
//               {isMenuOpen ? (
//                 <X className="block h-6 w-6" />
//               ) : (
//                 <Menu className="block h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
//                 location.pathname === link.path
//                   ? 'text-purple-700 bg-purple-100'
//                   : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {link.icon}
//               <span className="ml-2">{link.name}</span>
//             </Link>
//           ))}
//           <div className="border-t border-gray-200 my-2 pt-2">
//             <button 
//               onClick={() => {
//                 disguiseAs('weather');
//                 setIsMenuOpen(false);
//               }}
//               className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
//             >
//               Weather Mode
//             </button>
//             <button 
//               onClick={() => {
//                 disguiseAs('notes');
//                 setIsMenuOpen(false);
//               }}
//               className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50"
//             >
//               Notes Mode
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.tsx
// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Menu, X, Shield, BookOpen, Heart, MapPin, Settings, Moon, LogIn, LogOut } from 'lucide-react';
// import { usePanic } from '../contexts/PanicContext'; // Assuming this context still exists
// import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook

// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const { disguiseAs } = usePanic(); // Assuming usePanic is still relevant

//   // Destructure properties from your updated AuthContext
//   const { isAuthenticated, signOut, loading } = useAuth();

//   const navLinks = [
//     { name: 'Home', path: '/', icon: <Shield className="w-5 h-5" /> },
//     { name: 'Journal', path: '/journal', icon: <BookOpen className="w-5 h-5" /> },
//     { name: 'Resources', path: '/resources', icon: <MapPin className="w-5 h-5" /> },
//     { name: 'Safety Plan', path: '/safety-plan', icon: <Heart className="w-5 h-5" /> },
//     { name: 'Mood', path: '/mood', icon: <Moon className="w-5 h-5" /> },
//     { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
//   ];

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = async () => {
//     await signOut(); // Call the signOut function from AuthContext
//     navigate('/auth'); // Redirect to login page after logout
//     setIsMenuOpen(false); // Close mobile menu if open
//   };

//   if (loading) {
//     // Optionally render a skeleton or nothing while authentication status is being checked
//     return null;
//   }

//   return (
//     <nav className="bg-white shadow-md transition-all duration-300">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <Shield className="h-8 w-8 text-purple-600" />
//               <span className="ml-2 text-xl font-semibold text-purple-800">EiraSafe</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
//                   location.pathname === link.path
//                     ? 'text-purple-700 bg-purple-100'
//                     : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
//                 }`}
//               >
//                 {link.icon}
//                 <span className="ml-1">{link.name}</span>
//               </Link>
//             ))}
//             <div className="border-l border-gray-300 h-6 mx-2" />

//             {/* Conditional rendering for Login/Logout */}
//             {isAuthenticated ? ( // Use isAuthenticated from context
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
//               >
//                 <LogOut className="w-5 h-5 mr-1" />
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors duration-200"
//               >
//                 <LogIn className="w-5 h-5 mr-1" />
//                 Login
//               </Link>
//             )}

//             {/* Existing Weather and Notes Mode buttons */}
//             <button
//               onClick={() => disguiseAs('weather')}
//               className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200"
//             >
//               Weather Mode
//             </button>
//             <button
//               onClick={() => disguiseAs('notes')}
//               className="px-3 py-2 rounded-md text-sm font-medium text-green-600 hover:bg-green-50 transition-colors duration-200"
//             >
//               Notes Mode
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50 focus:outline-none"
//             >
//               {isMenuOpen ? (
//                 <X className="block h-6 w-6" />
//               ) : (
//                 <Menu className="block h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
//                 location.pathname === link.path
//                   ? 'text-purple-700 bg-purple-100'
//                   : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {link.icon}
//               <span className="ml-2">{link.name}</span>
//             </Link>
//           ))}
//           <div className="border-t border-gray-200 my-2 pt-2">
//             {/* Conditional rendering for Login/Logout in Mobile Menu */}
//             {isAuthenticated ? ( // Use isAuthenticated from context
//               <button
//                 onClick={handleLogout}
//                 className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
//               >
//                 <LogOut className="w-5 h-5 mr-2" />
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <LogIn className="w-5 h-5 mr-2" />
//                 Login
//               </Link>
//             )}

//             {/* Existing Weather and Notes Mode buttons for mobile */}
//             <button
//               onClick={() => {
//                 disguiseAs('weather');
//                 setIsMenuOpen(false);
//               }}
//               className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
//             >
//               Weather Mode
//             </button>
//             <button
//               onClick={() => {
//                 disguiseAs('notes');
//                 setIsMenuOpen(false);
//               }}
//               className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50"
//             >
//               Notes Mode
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom'; // Added NavLink
import { Menu, X, Shield, BookOpen, Heart, MapPin, Settings, Moon, LogIn, LogOut, Sparkles } from 'lucide-react'; // Added Sparkles
import { usePanic } from '../contexts/PanicContext'; // Assuming this context still exists
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { disguiseAs } = usePanic();

  const { isAuthenticated, signOut, loading } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Shield className="w-5 h-5" /> },
    { name: 'Journal', path: '/journal', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Affirmations', path: '/affirmations', icon: <Sparkles className="w-5 h-5" /> }, // <-- ADD THIS NEW LINK
    { name: 'Resources', path: '/resources', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Safety Plan', path: '/safety-plan', icon: <Heart className="w-5 h-5" /> },
    { name: 'Mood', path: '/mood', icon: <Moon className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
    setIsMenuOpen(false);
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-semibold text-purple-800">EiraSafe</span>
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
                      ? 'text-purple-700 bg-purple-100'
                      : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                  }`
                }
              >
                {link.icon}
                <span className="ml-1">{link.name}</span>
              </NavLink>
            ))}
            <div className="border-l border-gray-300 h-6 mx-2" />

            {/* Conditional rendering for Login/Logout */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            ) : (
              <Link
                to="/auth" // Changed to /auth as per your AuthPage path
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors duration-200"
              >
                <LogIn className="w-5 h-5 mr-1" />
                Login
              </Link>
            )}

            {/* Existing Weather and Notes Mode buttons */}
            <button
              onClick={() => disguiseAs('weather')}
              className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              Weather Mode
            </button>
            <button
              onClick={() => disguiseAs('notes')}
              className="px-3 py-2 rounded-md text-sm font-medium text-green-600 hover:bg-green-50 transition-colors duration-200"
            >
              Notes Mode
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50 focus:outline-none"
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
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? 'text-purple-700 bg-purple-100'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon}
              <span className="ml-2">{link.name}</span>
            </NavLink>
          ))}
          <div className="border-t border-gray-200 my-2 pt-2">
            {/* Conditional rendering for Login/Logout in Mobile Menu */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/auth" // Changed to /auth
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Link>
            )}

            {/* Existing Weather and Notes Mode buttons for mobile */}
            <button
              onClick={() => {
                disguiseAs('weather');
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
            >
              Weather Mode
            </button>
            <button
              onClick={() => {
                disguiseAs('notes');
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50"
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