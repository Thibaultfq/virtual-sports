const SVGSprite = require('./utils/svg-sprite/SVGSprite.js')
const config = require('./utils/svg-sprite/options.js')

let idCounter = 0
let spriteSet = {}

module.exports = (eleventyConfig) => {
  // eleventyConfig.on('beforeBuild', async () => {
  //   await svgSpriteInstance.compile()
  // })

  eleventyConfig.addFilter(config.svgSpriteShortcode, async (paths) => {
    //the sprites are made during build because the folders to generate the sprites from are provided in the frontmatter data. There is no beforeBuild in this case.
    // the spritemap cache still gets used during build
    //only create a new SVGSprite instance for every new unique path combination (pathkey)

    if (!Array.isArray(paths) && new Set(paths).size !== paths.length) {
      throw new Error('must provide array of unique paths')
    }

    //check if provided paths are not subdirectories. All should be unqiue

    if (paths.some((p) => p.replace(/^\/|\/$/g, '').split('/').length > 1)) {
      for (let i = 0; i < paths.length - 1; i++) {
        const path_i = paths[i]
        for (let j = i + 1; j < paths.length; j++) {
          const path_j = paths[j]
          if (path_i.startsWith(path_j) || path_j.startsWith(path_i)) {
            throw new Error(`subdirectories detected${path_i} & ${path_j}`)
          }
        }
      }
    }

    pathsKey = paths.join('|') // create a unique key for every array of provided paths

    // if the pathsKey does not exist, add new svgSprite instance to cache set and build it once
    if (spriteSet.hasOwnProperty(pathsKey)) {
      return spriteSet[pathsKey].svgSpriteInstance.getSvgSprite()
    } else {
      let spriteInstance = new SVGSprite(paths, config)
      await spriteInstance.compile()

      spriteSet[pathsKey] = {
        svgSpriteInstance: spriteInstance,
      }
      return spriteSet[pathsKey].svgSpriteInstance.getSvgSprite()
    }

    // if the pathsKey exists, return cached instance (that is already compiled) and no need to rebuild svgSprite instance
  })

  //todo: change params to attributes object
  eleventyConfig.addShortcode(config.svgShortcode, (name, classes, desc, attrs) => {
    if (!name) {
      throw new Error('svgSprite Plugin: name of SVG must be specified')
    }

    let attributes
    if (attrs) {
      attributes = Object.entries(attrs)
        .map(([name, value]) => `${name}="${value}"`)
        .join(' ')
    }

    const nameAttr = name
    const classesAttr = `${config.globalClasses} ${classes || config.defaultClasses}`
    // "desc" is required for accessibility and Lighthouse validations
    const descAttr = desc || `${nameAttr} icon`
    // a unique id is generated so that the svg references the correct description in aria-labelledby
    const uniqueID = (idCounter++).toString(36)

    return `<svg class="${classesAttr}" ${
      attributes ? attributes : ''
    } aria-labelledby="symbol-${nameAttr}-desc-${uniqueID}" role="group">
    <desc id="symbol-${nameAttr}-desc-${uniqueID}">${descAttr}</desc>
    <use xlink:href="#svg-${nameAttr}"></use>
    </svg>`
  })
}
