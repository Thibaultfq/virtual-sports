import { basename } from 'path'
import { SVGSprite } from './utils/svg-sprite/SVGSprite.js'
import { config } from './utils/svg-sprite/options.js'

const globalClasses = 'fill-current'
const defaultClasses = ''
let idCounter = 0
let spriteSet = {}

export function pluginSprite(eleventyConfig) {
  // eleventyConfig.on('beforeBuild', async () => {
  //   await svgSpriteInstance.compile()
  // })

  eleventyConfig.addFilter('svgsprite', async (paths) => {
    if (!paths) return ''

    let pathsArray = Array.isArray(paths) ? [...paths] : [paths]

    // Normalize paths: strip whitespace, remove empty
    pathsArray = pathsArray
      .filter(Boolean)
      .map((p) => p.trim())
      .filter((p) => p.length > 0)

    if (pathsArray.length === 0) return ''

    // If more than 1 path is provided and one of them is '/site' or 'site',
    // remove 'site' because site is already included globally via the base layout
    if (pathsArray.length > 1) {
      pathsArray = pathsArray.filter((p) => p.replace(/^\/+|\/+$/g, '') !== 'site')
    }

    // Deduplicate
    pathsArray = Array.from(new Set(pathsArray))

    if (pathsArray.length === 0) return ''

    // Check if provided paths are not subdirectories. All should be unique
    if (pathsArray.some((p) => p.replace(/^\/|\/$/g, '').split('/').length > 1)) {
      for (let i = 0; i < pathsArray.length - 1; i++) {
        const path_i = pathsArray[i]
        for (let j = i + 1; j < pathsArray.length; j++) {
          const path_j = pathsArray[j]
          if (path_i.startsWith(path_j) || path_j.startsWith(path_i)) {
            throw new Error(`subdirectories detected: ${path_i} & ${path_j}`)
          }
        }
      }
    }

    const pathsKey = pathsArray.join('|') // create a unique key for every array of provided paths

    // if the pathsKey does not exist, add new svgSprite instance to cache set
    if (!spriteSet[pathsKey]) {
      spriteSet[pathsKey] = {
        svgSpriteInstance: new SVGSprite(pathsArray, config),
      }
    }

    // compile() checks internal file mtime cache and rebuilds only if an SVG file changed
    await spriteSet[pathsKey].svgSpriteInstance.compile()
    return spriteSet[pathsKey].svgSpriteInstance.getSvgSprite()
  })

  eleventyConfig.addShortcode('svg', (name, classes, desc, attrs) => {
    if (!name) {
      throw new Error('svgSprite Plugin: name of SVG must be specified')
    }

    const nameAttr = basename(name, '.svg')
    const customAttrs = attrs && typeof attrs === 'object' ? { ...attrs } : {}

    // Auto-detect viewBox if not explicitly provided
    if (!customAttrs.viewBox) {
      const autoViewBox = SVGSprite.getViewBox(nameAttr, config.base)
      if (autoViewBox) {
        customAttrs.viewBox = autoViewBox
      }
    }

    const attributes = Object.entries(customAttrs)
      .map(([attrName, value]) => `${attrName}="${value}"`)
      .join(' ')

    const classesAttr = `${globalClasses} ${classes || defaultClasses}`
    // "desc" is required for accessibility and Lighthouse validations
    const descAttr = desc || `${nameAttr} icon`
    // a unique id is generated so that the svg references the correct description in aria-labelledby
    const uniqueID = (idCounter++).toString(36)

    return `<svg class="${classesAttr}" ${
      attributes ? attributes : ''
    } aria-labelledby="symbol-${nameAttr}-desc-${uniqueID}" role="group">
    <desc id="symbol-${nameAttr}-desc-${uniqueID}">${descAttr}</desc>
    <use href="#svg-${nameAttr}" xlink:href="#svg-${nameAttr}"></use>
    </svg>`
  })
}
