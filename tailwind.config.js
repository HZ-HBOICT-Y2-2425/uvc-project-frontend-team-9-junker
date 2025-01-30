/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}", // Combined content paths
    "./public/index.html",           // Added this from stashed changes
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        kiranghaerang: ['KirangHaerang', 'sans-serif'], // Kept this from "Updated upstream"
        rem: ['REM', 'sans-serif'], // Kept this from "Updated upstream"
      },
      colors: {
        // only the following colors include light variants:
        // - primary
        // - secondary
        // - accent
        'primary': {
          50: '#071505',
          100: '#0f2a09',
          200: '#1d5412',
          300: '#2c7d1c',
          400: '#3aa725',
          500: '#49d12e', // default
          600: '#6dda58',
          700: '#92e382',
          800: '#b6edab',
          900: '#dbf6d5',
          950: '#edfaea',
        },
        'secondary': {
          50: '#061410',
          100: '#0b281f',
          200: '#174f3e',
          300: '#22775d',
          400: '#2e9e7c',
          500: '#39c69c', // default
          600: '#61d1af',
          700: '#88ddc3',
          800: '#b0e8d7',
          900: '#d7f4eb',
          950: '#ebf9f5',
        },
        'accent': {
          50: '#001a0c',
          100: '#003319',
          200: '#006631',
          300: '#00994a',
          400: '#00cc63',
          500: '#00ff7b', // default
          600: '#33ff96',
          700: '#66ffb0',
          800: '#99ffca',
          900: '#ccffe5',
          950: '#e5fff2',
        },

        // All dark mode color variants use the suffix '-dark'
        // e.g. 'primary-dark-500' instead of 'primary-500' or 'background-dark' instead of 'background'
        'primary-dark': {
          50: '#edfaea',
          100: '#dbf6d5',
          200: '#b6edab',
          300: '#92e382',
          400: '#6dda58',
          500: '#49d12e', // default dark mode primary color
          600: '#3aa725',
          700: '#2c7d1c',
          800: '#1d5412',
          900: '#0f2a09',
          950: '#071505',
        },
        'secondary-dark': {
          50: '#ebf9f5',
          100: '#d7f4eb',
          200: '#b0e8d7',
          300: '#88ddc3',
          400: '#61d1af',
          500: '#39c69c', // default dark mode secondary color
          600: '#2e9e7c',
          700: '#22775d',
          800: '#174f3e',
          900: '#0b281f',
          950: '#061410',
        },
        'accent-dark': {
          50: '#e5fff2',
          100: '#ccffe5',
          200: '#99ffca',
          300: '#66ffb0',
          400: '#33ff96',
          500: '#00ff7b', // default dark mode accent color
          600: '#00cc63',
          700: '#00994a',
          800: '#006631',
          900: '#003319',
          950: '#001a0c',
        },
        background: {
          DEFAULT: '#e5fff2', // default light mode background
          dark: '#002512', // default dark mode background
        },
        text: {
          DEFAULT: '#040b04', // default light mode text color
          dark: '#f4fbf4', // default dark mode text color
        },
        black: "#000000", // Added from "Stashed changes"
        white: "#ffffff", // Added from "Stashed changes"
      },
    },
  },
  plugins: [],
};
