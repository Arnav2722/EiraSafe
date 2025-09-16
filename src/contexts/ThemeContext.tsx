// // contexts/ThemeContext.tsx
// import { createContext, useState, useContext, useEffect } from 'react';

// const ThemeContext = createContext(null);

// export const ThemeProvider = ({ children }) => {
//     const [theme, setTheme] = useState('light'); // Initial theme

//     const toggleTheme = () => {
//         setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
//     };

//     useEffect(() => {
//         document.documentElement.className = theme;
//     }, [theme]);

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => useContext(ThemeContext);