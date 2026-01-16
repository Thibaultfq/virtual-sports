import { sep, basename } from 'path'
import { format } from 'util'

const base = './src/assets/svg'
const spriteConfig = {
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
        const pathname = file['relative'].split(sep).join(path_separator)
        return format(template, basename(pathname.replace(/\s+/g, whitespace_separator), '.svg'))
      },
    },
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false,
  },
}

// default config expected by eleventy.config.sprite.js
export const config = {
  base,
  spriteConfig,
}
