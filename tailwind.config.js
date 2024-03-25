const plugin = require('tailwindcss/plugin')
const structure = require('./src/_data/structure.js')
const tailwind_custom_plugins = require('./utils/tailwind-plugins.js')

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.njk',
    './src/**/*.md',
    './src/_data/colors.js',
    './src/_data/structure.js',
    './utils/shortcodes.js',
    './utils/paired-shortcodes.js',
    './utils/**/*.js',
  ],
  // safelist: [], //create a safelist entry for pt-x based on the h-x defined in structure. We may than call this dynamic generated class (based on string h-x) and it will be included in the css, see hero-text-overlay.
  theme: {
    extend: {
      screens: {
        // we work mobile-first and use no breakpoint variant for mobile classes. This works for most modern mobile devices. However, some older devices (eg iPhone 5/SE) have a much smaller viewport than modern devices, for which we want to target only these devices specifically to do minor tweaks. This is thus only used sparsely if the standard mobile-first design does not fit these smaller viewport devices.
        //mso: mobile-xs-only
        mxsonly: { max: '374px' },
        // => @media (min-width: 640px and max-width: 767px) { ... }
      },
      opacity: (theme) => ({
        5: '.05',
        10: '.1',
        15: '.15',
        20: '.2',
      }),
      // created my own heights so can specify for Heros
      height: (theme) => ({
        'screen-1/2': '50vh',
        'screen-3/4': '75vh',
        'screen-9/10': '90vh',
        'screen-1/3': 'calc(100vh / 3)',
        'screen-1/4': 'calc(100vh / 4)',
        'screen-1/5': 'calc(100vh / 5)',
        'screen-minus-navbar': `calc(100vh - ${theme(
          `spacing.${Math.max(...structure.nav_height_unscrolled.match(/\d+/gi).map(Number))}`
        )})`,
      }),
      minHeight: (theme) => ({
        'screen-minus-navbar': `calc(100vh - ${theme(
          `spacing.${Math.max(...structure.nav_height_unscrolled.match(/\d+/gi).map(Number))}`
        )})`,
      }),
      width: (theme) => ({
        '2-full': '200%',
      }),
      colors: (theme) => ({
        'vs-yellow': {
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
        'vs-blue': {
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
      animation: {
        'infinite-scroll': 'infinite-scroll 20s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant }) {
      addVariant('mobile-only', "@media screen and (max-width: theme('screens.sm'))") // instead of hard-coded 640px use sm breakpoint value from config. Or anything
    }),
    plugin(tailwind_custom_plugins.breakpointInspector), //adds current breakpoint to bottom of screen
  ],
}
