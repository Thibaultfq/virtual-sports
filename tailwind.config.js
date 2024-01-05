const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.njk',
    './src/**/*.md',
    './src/_data/colors.js',
    './src/_data/structure.js',
    './utils/**/*.js',
  ],
  theme: {
    extend: {
      opacity: (theme) => ({
        5: '.05',
        10: '.1',
        15: '.15',
        20: '.2',
      }),
      // created my own heights so can specify for Heros
      height: (theme) => ({
        '1/2': '50vh',
        '3/4': '75vh',
        '9/10': '90vh',
        '1/1': '100vh',
        '1/3': 'calc(100vh / 3)',
        '1/4': 'calc(100vh / 4)',
        '1/5': 'calc(100vh / 5)',
        96: '24rem',
        128: '32rem',
        '1/1-navbar': `calc(100vh - ${theme('spacing.20')})`,
      }),
      colors: (theme) => ({
        'dark-blue': '#071303',
        'gold-yellow': '#f7cb2d',
        'bright-sun': {
          50: '#fefce8',
          100: '#fdf7c4',
          200: '#fced8c',
          300: '#fadb4a',
          400: '#f7cb2d',
          500: '#e6ad0c',
          600: '#c78607',
          700: '#9e5f0a',
          800: '#834b10',
          900: '#6f3d14',
          950: '#411f07',
        },
        'midnight-blue': {
          50: '#a3e7ff',
          100: '#8edeff',
          200: '#6ad8ff',
          300: '#37ceff',
          400: '#00b4fb',
          500: '#0081cd',
          600: '#0062b9',
          700: '#0053b9',
          800: '#003c85',
          900: '#052e5c',
          950: '#04142a',
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant }) {
      addVariant(
        'mobile-only',
        "@media screen and (max-width: theme('screens.sm'))"
      ) // instead of hard-coded 640px use sm breakpoint value from config. Or anything
    }),
  ],
}
