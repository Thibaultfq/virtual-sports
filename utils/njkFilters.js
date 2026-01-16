import readingTime from 'reading-time'

export function init(eleventyConfig, markdownLib) {
  return {
    /**
     * @param {any} postOrContent
     * @returns reading time of a page or post collection object
     */
    readingTime: (postOrContent) => {
      const content = typeof postOrContent === 'string' ? postOrContent : postOrContent.content
      return readingTime(content).text
    },
  }
}
