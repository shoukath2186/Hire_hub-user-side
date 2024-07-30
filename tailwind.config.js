/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '1-color': '#FAF6F2',
        '2-color': '#DED1BD',
        '3-color': '#D49E8D',
        '4-color': '#683B2B'
        
      },
    },
  },
  plugins: [],
}

