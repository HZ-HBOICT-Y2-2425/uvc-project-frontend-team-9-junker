/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}", // Combined content paths
    "./public/index.html",           // Added this from stashed changes
  ],
  theme: {
    extend: {
      fontFamily: {
        kiranghaerang: ['KirangHaerang', 'sans-serif'], // Kept this from "Updated upstream"
        rem: ['REM', 'sans-serif'], // Kept this from "Updated upstream"
      },
      colors: {
        primary: {
          DEFAULT: '#89CF3D',
        },
        secondary: {
          DEFAULT: '#8CE2AB',
        },
        background: {
          DEFAULT: '#F6FBF0',
        },
        text: {
          DEFAULT: '#090E04',
        },
        accent: {
          DEFAULT: '#6FDBA9',
        },
        black: "#000000", // Added from "Stashed changes"
        white: "#ffffff", // Added from "Stashed changes"
      },
    },
  },
  plugins: [],
};
