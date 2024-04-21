const readingTime = require('reading-time')

module.exports = {
  init: (eleventyConfig, markdownLib) => {
    return {
      /**
       *
       * @param {any} postOrContent
       * @returns reading time of a page or post collection object
       */
      readingTime: (postOrContent) => {
        const content = typeof postOrContent === 'string' ? postOrContent : postOrContent.templateContent
        return readingTime(content).text
      },
    }
  },
}
