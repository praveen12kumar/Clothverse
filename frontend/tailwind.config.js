
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      roboto:'roboto',
      poppins:'poppins'
    },
    extend: {
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        zoomIn: 'zoomIn 2000ms ease-in-out',
        fadeIn: 'fadeIn 2000ms ease-in-out',
        slideInFromLeft: 'slideInFromLeft 2000ms ease-in-out',
        slideUp: 'slideUp 2000ms ease-in-out',
      },
    },
  },
  plugins: [],
}