// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        twitterBlue: '#1da1f2',
        twitterDark: '#14171a',
        twitterLight: '#e6ecf0',
        twitterLighter: '#f7f9fa',
        twitterBorder: '#e1e8ed',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
