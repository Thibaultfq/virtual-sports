const pluginSvgSprite = require('eleventy-plugin-svg-sprite')

module.exports = {
  initSpritePlugin: function (eleventyConfig) {
    /*
     * use: {% svg "subdir1--subdir2--filename", "classes", "content for <desc/>" %}
     * @link https://github.com/patrickxchong/eleventy-plugin-svg-sprite#eleventy-plugin-svg-sprite
     */
    const spriteConfig = [
      {
        path: './src/assets/svg/site', // relative path to SVG directory
        svgSpriteShortcode: 'svgsprite',
      },
      {
        path: './src/assets/svg/memberLogos', // relative path to SVG directory
        svgSpriteShortcode: 'svgspriteMemberLogos',
        globalClasses: 'fill-current', //only the last one is applied (see https://github.com/patrickxchong/eleventy-plugin-svg-sprite/issues/17)
      },
    ]
    eleventyConfig.addPlugin(pluginSvgSprite, spriteConfig)

    let spriteIdCounter = -99 //sprite lib starts at 0, don't overlap
    eleventyConfig.addShortcode('svgViewBox', (name, classes, desc, viewBox) => {
      if (!name) {
        throw new Error('[eleventy-plugin-svg-sprite] name of SVG must be specified')
      }
      const nameAttr = name
      const classesAttr = `${spriteConfig[spriteConfig.length - 1].globalClasses} ${
        classes || spriteConfig[spriteConfig.length - 1].defaultClasses
      }`
      // "desc" is required for accessibility and Lighthouse validations
      const descAttr = desc || `${nameAttr} icon`
      // a unique id is generated so that the svg references the correct description in aria-labelledby
      const uniqueID = (spriteIdCounter++).toString(36)

      return `<svg class="${classesAttr}" aria-labelledby="symbol-${nameAttr}-desc-${uniqueID}" role="group" viewBox="${viewBox}">
                <desc id="symbol-${nameAttr}-desc-${uniqueID}">${descAttr}</desc>
                <use xlink:href="#svg-${nameAttr}"></use>
            </svg>`
    })
  },
}
