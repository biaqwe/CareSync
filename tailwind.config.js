/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        one: '#0fb8a7',
        two: '#046157',
        backgr: 'bbf1f1'
      }
    },
  },
  plugins: [],
}
