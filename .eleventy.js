const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const readingTime = require('reading-time')
const markdownIt = require('markdown-it')
const markdownItEmoji = require('markdown-it-emoji')
const markdownItFigureCaption = require('markdown-it-image-figures')
const markdownItAnchor = require('markdown-it-anchor')
const structure = require('./src/_data/structure.js')
const filterFactory = require('./utils/filters.js')
const sprite = require('./utils/sprite.js')
const shortcodesFactory = require('./utils/shortcodes.js')
const pairedshortcodesFactory = require('./utils/paired-shortcodes.js')
const pluginDrafts = require('./eleventy.config.drafts.js')
const { minify } = require('terser')
const htmlmin = require('html-minifier')

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    showAllHosts: true, // Show local network IP addresses for device testing (e.g. use devServer on mobile devices)
  })

  /**
   * Plugins
   * @link https://www.11ty.dev/docs/plugins/
   */

  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginNavigation)
  eleventyConfig.addPlugin(pluginDrafts)
  sprite.initSpritePlugin(eleventyConfig)

  /**
   * Custom Watch Targets
   * for when the Tailwind config or .css files change...
   * by default not watched by 11ty
   * @link https://www.11ty.dev/docs/config/#add-your-own-watch-targets
   */
  eleventyConfig.addWatchTarget('./src/assets')
  eleventyConfig.addWatchTarget('./utils/*.js')
  eleventyConfig.addWatchTarget('./tailwind.config.js')

  /**
   * Passthrough File Copy
   * @link https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy('src/*.ico')
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  eleventyConfig.addPassthroughCopy('src/assets/images/')
  eleventyConfig.addPassthroughCopy('src/assets/video/')

  /**
   * Add JS minified. Call this filter in a (e.g. base) NJK file to include minified JS file
   */
  eleventyConfig.addNunjucksAsyncFilter('jsmin', async function (code, callback) {
    if (process.env.NODE_ENV === 'production') {
      try {
        const minified = await minify(code, {})
        callback(null, minified.code)
      } catch (err) {
        console.error('JS minify failed to minify')
        console.error('Terser error: ', err)
        // Fail gracefully.
        callback(null, code)
      }
    } else {
      callback(null, code)
    }
  })

  eleventyConfig.addTransform('htmlmin', function (content) {
    if (process.env.NODE_ENV === 'production') {
      if ((this.page.outputPath || '').endsWith('.html')) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        })

        return minified
      }
      // If not an HTML output, return content as-is
      return content
    }
    //if not production, return content.
    return content
  })

  eleventyConfig.addNunjucksFilter('readingTime', function (postOrContent) {
    const content = typeof postOrContent === 'string' ? postOrContent : postOrContent.templateContent
    return readingTime(content).text
  })

  /**
   * Set custom markdown library instance...
   * and support for Emojis in markdown...
   * ...because why not control our .MD files and have Emojis built in?
   * @link https://www.11ty.dev/docs/languages/markdown/#optional-set-your-own-library-instance
   * @link https://www.npmjs.com/package/markdown-it-emoji
   *
   */
  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }
  let markdownLib = markdownIt(options)
    .use(markdownItEmoji)
    .use(markdownItFigureCaption, { figcaption: 'alt' })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: 'after',
        class: structure.g_markdownItAnchor_classes,
        symbol: '#',
        ariaHidden: false,
      }),
      level: [1, 2, 3, 4],
      slugify: eleventyConfig.getFilter('slugify'),
    })
  eleventyConfig.setLibrary('md', markdownLib)

  const filters = filterFactory.init(eleventyConfig, markdownLib) //use a factory so we can pass the eleventyConfig, which could be used in filters to access other filters. see https://www.11ty.dev/docs/filters/

  /**
   * Filters
   * @link https://www.11ty.io/docs/filters/
   */
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  const shortcodes = shortcodesFactory.init(eleventyConfig, markdownLib)
  /**
   * Shortcodes
   * @link https://www.11ty.io/docs/shortcodes/
   */
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
  })

  const pairedshortcodes = pairedshortcodesFactory.init(eleventyConfig, markdownLib)

  /**
   * Paired Shortcodes
   * @link https://www.11ty.dev/docs/languages/nunjucks/#paired-shortcode
   */
  Object.keys(pairedshortcodes).forEach((shortcodeName) => {
    eleventyConfig.addPairedShortcode(shortcodeName, pairedshortcodes[shortcodeName])
  })

  /**
   * Add layout aliases
   * @link https://www.11ty.dev/docs/layouts/#layout-aliasing
   */
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk')
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')
  eleventyConfig.addLayoutAlias('member', 'layouts/member.njk')

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data',
    },
    passthroughFileCopy: true,
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
