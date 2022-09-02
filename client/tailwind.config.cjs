/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        red: '#fd2d01',
        'red-light': '#ffd7d7',
        'grey': '#4E5166',
        'grey-light': '#8F8F8F',
        'grey-dark': '#2E3144',
      },
    },
  },
  plugins: [],
};
