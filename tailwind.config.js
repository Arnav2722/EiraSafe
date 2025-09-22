/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // This creates a `font-unbounded` utility class
        unbounded: ['Unbounded', 'sans-serif'],
      },
    },
  },
  plugins: [],
};