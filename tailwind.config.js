const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.njk',
    './src/**/*.md',
    './src/_data/colors.js',
    './src/_data/structure.js',
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
        'light-blue': '#c7ddef',
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
