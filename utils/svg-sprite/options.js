const path = require('path')
const util = require('util')

module.exports = {
  base: './src/assets/svg',
  svgSpriteShortcode: 'svgsprite',
  svgShortcode: 'svg',
  globalClasses: 'fill-current',
  defaultClasses: '',
  svgShortCodeConfig: {
    svgShortcode: 'svg',
    globalClasses: '',
    defaultClasses: '',
  },
  spriteConfig: {
    mode: {
      inline: true,
      symbol: {
        sprite: 'sprite.svg',
        example: false,
      },
    },
    shape: {
      transform: ['svgo'],
      id: {
        generator: (_, file) => {
          const path_separator = '--'
          const whitespace_separator = '_'
          const template = 'svg-%s'
          const pathname = file['relative'].split(path.sep).join(path_separator)
          return util.format(template, path.basename(pathname.replace(/\s+/g, whitespace_separator), '.svg'))
        },
      },
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },
  },
}
