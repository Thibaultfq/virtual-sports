export function breakpointInspector({ addBase, theme }) {
  if (process.env.NODE_ENV?.trim() === 'production') return

  const screens = theme('screens', {})
  const breakpoints = Object.keys(screens)

  if (breakpoints.length === 0) return

  const firstBreakpoint = breakpoints[0]
  const firstScreen = screens[firstBreakpoint]
  const firstValue = typeof firstScreen === 'string' ? firstScreen : (firstScreen?.min || firstScreen?.max || '')

  addBase({
    'body::after': {
      content: `"Current breakpoint default (< ${firstValue})"`,
      position: 'fixed',
      right: '.5rem',
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
      const screen = screens[current]
      let mediaQuery = ''
      if (typeof screen === 'string') {
        mediaQuery = `@media (min-width: ${screen})`
      } else if (screen && typeof screen === 'object') {
        const parts = []
        if (screen.min) parts.push(`(min-width: ${screen.min})`)
        if (screen.max) parts.push(`(max-width: ${screen.max})`)
        if (screen.raw) {
          mediaQuery = `@media ${screen.raw}`
        } else if (parts.length > 0) {
          mediaQuery = `@media ${parts.join(' and ')}`
        }
      }
      if (mediaQuery) {
        acc[mediaQuery] = {
          'body::after': {
            content: `"Current breakpoint ${current}"`,
          },
        }
      }
      return acc
    }, {}),
  })
}
