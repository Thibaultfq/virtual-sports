module.exports = {
  breakpointInspector: function ({ addBase, theme }) {
    if (process.env.NODE_ENV?.trim() === 'production') return

    const screens = theme('screens', {})
    const breakpoints = Object.keys(screens)

    addBase({
      'body::after': {
        content: `"Current breakpoint default (< ${screens[breakpoints[0]]})"`,
        position: 'fixed',
        right: '.5rem', // could replace with theme('spacing.2', '.5rem'), same for most of the other values
        bottom: '.5rem',
        padding: '.5rem .5rem .5rem 2rem',
        background: 'no-repeat .5rem center / 1.25rem url(https://tailwindcss.com/favicons/favicon.ico?v=3), #edf2f7',
        border: '1px solid #cbd5e0',
        color: '#d53f8c',
        fontSize: '.875rem',
        fontWeight: '600',
        zIndex: '99999',
      },
      ...breakpoints.reduce((acc, current) => {
        acc[`@media (min-width: ${screens[current]})`] = {
          'body::after': {
            content: `"Current breakpoint ${current}"`,
          },
        }
        return acc
      }, {}),
    })
  },
}
