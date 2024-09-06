/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scrollRightToLeft: {
          '0%': { transform: 'translateX(100%)' }, // Start offscreen right
          '100%': { transform: 'translateX(-100%)' }, // End offscreen left
        },
      },
      animation: {
        scrollRightToLeft: 'scrollRightToLeft 10s linear infinite',
      },
    },
  },
  fontFamily:{
    body: ['Poppins', 'sans-serif']
  },
  textColor:{
    default:'#0000'
  },
  plugins: [
    require('tailwind-scrollbar'),
    

  ],
}