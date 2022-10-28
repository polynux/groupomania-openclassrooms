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
        'grey-light': '#717695',
        'grey-dark': '#2E3144',
      },
      zIndex: {
        '100': '100',
        '1000': '1000',
      },
      padding: {
        '2.5': '0.625rem',
      },
      keyframes: {
        'hide': {
          '0%': { opacity: 1, display: 'block' },
          '99%': { opacity: 0, display: 'block' },
          '100%': { opacity: 0, display: 'none' },
        },
        'show': {
          '0%': { opacity: 0, display: 'none' },
          '1%': { opacity: 0, display: 'block' },
          '100%': { opacity: 1, display: 'block' },
        },
      },
      animation: {
        'hide': 'hide 0.2s ease-in-out',
        'show': 'show 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
}
