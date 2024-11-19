/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        kiranghaerang: ['KirangHaerang', 'sans-serif'], // Override default sans font
        rem: ['REM', 'sans-serif'], // Add a custom font family
      },
      colors: {
        primary: {
          DEFAULT: '#89CF3D',
        },
        secondary: {
          DEFAULT: '#8CE2AB',
        },
        background: {
          Default: '#F6FBF0',
        },
        text: {
          Default: '#090E04',
        },
        accent: {
          Default: '#6FDBA9',
        },
      },
    },
  },
  plugins: [],
};

