import pluginRss from '@11ty/eleventy-plugin-rss'
import pluginNavigation from '@11ty/eleventy-navigation'
import markdownIt from 'markdown-it'
import { full as markdownItEmoji } from 'markdown-it-emoji'
import markdownItFigureCaption from 'markdown-it-image-figures'
import markdownItAnchor from 'markdown-it-anchor'
import structure from './src/_data/structure.js'
import { init as filterFactory } from './utils/filters.js'
import { init as njkFiltersFactory } from './utils/njkFilters.js'
import { init as njkGlobalsFactory } from './utils/njkGlobals.js'
import { init as shortcodesFactory } from './utils/shortcodes.js'
import { init as pairedshortcodesFactory } from './utils/paired-shortcodes.js'
import { pluginDrafts } from './eleventy.config.drafts.js'
import { pluginSprite } from './eleventy.config.sprite.js'
import { minify } from 'terser'
import { minify as html_minifier } from 'html-minifier-terser'

export default function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    showAllHosts: true, // Show local network IP addresses for device testing (e.g. use devServer on mobile devices)
  })

  /**
   * Plugins
   * @link https://www.11ty.dev/docs/plugins/
   */
  //eleventyConfig.addPlugin(UpgradeHelper)
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginNavigation)
  eleventyConfig.addPlugin(pluginDrafts)
  eleventyConfig.addPlugin(pluginSprite)

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
  eleventyConfig.addPassthroughCopy({ 'seo_config/*.html': '/' })
  eleventyConfig.addPassthroughCopy({ 'netlify_config/**/*': '/' })
  eleventyConfig.addPassthroughCopy('src/assets/images/')
  eleventyConfig.addPassthroughCopy('src/assets/video/')

  /**
   * Add JS minified. Call this filter in a (e.g. base) NJK file to include minified JS file
   */
  eleventyConfig.addNunjucksAsyncFilter('jsmin', async function (code, callback) {
    if (process.env.NODE_ENV?.trim() === 'production') {
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
    if (process.env.NODE_ENV?.trim() === 'production') {
      if ((this.page.outputPath || '').endsWith('.html')) {
        let minified = html_minifier(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
          customEventAttributes: [/x-init/], //minify custom Alpine.js x-init attribute
        })

        return minified
      }
      // If not an HTML output, return content as-is
      return content
    }
    //if not production, return content.
    return content
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

  const njkGlobals = njkGlobalsFactory(eleventyConfig)
  Object.keys(njkGlobals).forEach((filterName) => {
    eleventyConfig.addNunjucksGlobal(filterName, njkGlobals[filterName])
  })

  const njkFilters = njkFiltersFactory(eleventyConfig, markdownLib)
  Object.keys(njkFilters).forEach((filterName) => {
    eleventyConfig.addNunjucksFilter(filterName, njkFilters[filterName])
  })

  const filters = filterFactory(eleventyConfig, markdownLib) //use a factory so we can pass the eleventyConfig, which could be used in filters to access other filters. see https://www.11ty.dev/docs/filters/
  /**
   * Filters
   * @link https://www.11ty.io/docs/filters/
   */
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  const shortcodes = shortcodesFactory(eleventyConfig, markdownLib)
  /**
   * Shortcodes
   * @link https://www.11ty.io/docs/shortcodes/
   */
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
  })

  const pairedshortcodes = pairedshortcodesFactory(eleventyConfig, markdownLib)

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
