/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#457b9d",
        secondary: "#a8dadc",
        tertiary: "#e63946",
        primarySupport: "#03045E",
        secondarySupport: "#1b4965",
        u_gray: "#f2f5f6",
        u_darkblue: "#180a6b",
        u_skyblue: "#5993ef",
        u_lightblue: '#b8d1ef',
        u_orange: "#f09834",
        u_brown: "#e7c692",
      },

      screens: {
        'phone': '300px',
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },

      fontFamily: {
        primary: ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
