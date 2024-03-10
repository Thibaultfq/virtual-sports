const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const markdownIt = require('markdown-it')
const markdownItEmoji = require('markdown-it-emoji')
const markdownItAnchor = require('markdown-it-anchor')
const pluginSvgSprite = require('eleventy-plugin-svg-sprite')
const structure = require('./src/_data/structure.js')
const filterFactory = require('./utils/filters.js')
const shortcodes = require('./utils/shortcodes.js')
const pairedshortcodes = require('./utils/paired-shortcodes.js')
const pluginDrafts = require('./eleventy.config.drafts.js')
const { minify } = require('terser')

module.exports = function (eleventyConfig) {
  const filters = filterFactory.init(eleventyConfig) //use a factory so we can pass the eleventyConfig, which could be used in filters to access other filters. see https://www.11ty.dev/docs/filters/
  /**
   * Plugins
   * @link https://www.11ty.dev/docs/plugins/
   */

  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginNavigation)
  eleventyConfig.addPlugin(pluginDrafts)

  /*
   * use: {% svg "subdir1--subdir2--filename", "classes", "content for <desc/>" %}
   * @link https://github.com/patrickxchong/eleventy-plugin-svg-sprite#eleventy-plugin-svg-sprite
   */
  eleventyConfig.addPlugin(pluginSvgSprite, [
    {
      path: './src/assets/svg/site', // relative path to SVG directory
      svgSpriteShortcode: 'svgsprite',
      globalClasses: 'fill-current',
    },
    {
      path: './src/assets/svg/memberLogos', // relative path to SVG directory
      svgSpriteShortcode: 'svgspriteMemberLogos',
      globalClasses: 'fill-current',
    },
  ])
  // {
  //   path: './src/assets/svg',
  //   globalClasses: 'fill-current',
  // })

  /**
   * Filters
   * @link https://www.11ty.io/docs/filters/
   */
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  /**
	 * Transforms
	 * @link https://www.11ty.io/docs/config/#transforms
   Object.keys(transforms).forEach((transformName) => {
     eleventyConfig.addTransform(transformName, transforms[transformName])
    })
    */

  /**
   * Shortcodes
   * @link https://www.11ty.io/docs/shortcodes/
   */
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
  })

  /**
   * Paired Shortcodes
   * @link https://www.11ty.dev/docs/languages/nunjucks/#paired-shortcode
   */
  Object.keys(pairedshortcodes).forEach((shortcodeName) => {
    eleventyConfig.addPairedShortcode(shortcodeName, pairedshortcodes[shortcodeName])
  })

  /**
   * Collections
   * ============================
   *
   * POST Collection set so we can check status of "draft:" frontmatter.
   * If set "true" then post will NOT be processed in PRODUCTION env.
   * If "false" or NULL it will be published in PRODUCTION.
   * Every Post will ALWAYS be published in DEVELOPMENT so you can preview locally.
   */
  // eleventyConfig.addCollection('post', (collection) => {
  //   if (process.env.ELEVENTY_ENV !== 'production') return [...collection.getFilteredByGlob('./src/posts/*.md')]
  //   else return [...collection.getFilteredByGlob('./src/posts/*.md')].filter((post) => !post.data.draft)
  // })

  // TAGLIST used from the official eleventy-base-blog
  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set()
    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case 'member':
            case 'pages':
            case 'post':
              return false
          }

          return true
        })

        for (const tag of tags) {
          tagSet.add(tag)
        }
      }
    })

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet]
  })

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
    try {
      const minified = await minify(code, {})
      callback(null, minified.code)
    } catch (err) {
      console.error('JS minify failed to minify')
      console.error('Terser error: ', err)
      // Fail gracefully.
      callback(null, code)
    }
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
  let markdownLib = markdownIt(options).use(markdownItEmoji)
  eleventyConfig.setLibrary('md', markdownLib)

  // Customize Markdown library settings:
  eleventyConfig.amendLibrary('md', (mdLib) => {
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: 'after',
        class: structure.g_markdownItAnchor_classes,
        symbol: '#',
        ariaHidden: false,
      }),
      level: [1, 2, 3, 4],
      slugify: eleventyConfig.getFilter('slugify'),
    })
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
