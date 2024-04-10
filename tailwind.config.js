/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#4b5563',
      },
      fontFamily: {
        sans: ['Lato', 'Roboto', 'sans-serif'], // Lato as the primary, Roboto as secondary
      },
    },
  },
  plugins: [],
}

