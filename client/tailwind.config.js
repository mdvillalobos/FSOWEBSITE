/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'NuButton': '#4b538f',
        'NuButtonHover': '#5d69c6',
        'NuBlue': '#35408e',
        'NuYellow': '#ffd41c',
        'nav': '#4b538f',
        'borderColor': '#f0f0f0',
        'highlight': '#c0454c',
        'backgroundColor': '#274546',
        'active': '#e3f2fd',
        'text-active': '#37a0f4',
      },

      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
        'Montserrat': ['Montserrat', 'sans-serif'],
        'Quicksand': ['Quicksand', 'sans-serif'],
        'DM-Sans': ['DM Sans', 'sans-serif']
      },

      backgroundImage: {
        'nuLogo': "url('./src/assets/images/tae.png')"
      }
    },
  },
  plugins: [],
}

