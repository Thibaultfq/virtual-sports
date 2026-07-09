import readingTime from 'reading-time'

const readingTimeCache = new Map()

export function init(eleventyConfig, markdownLib) {
  return {
    /**
     * @param {any} postOrContent
     * @returns reading time of a page or post collection object
     */
    readingTime: (postOrContent) => {
      if (!postOrContent) {
        return ''
      }

      // If raw content string is passed directly
      if (typeof postOrContent === 'string') {
        return readingTime(postOrContent).text
      }

      // If post/page object, cache by inputPath to prevent redundant template parsing
      const cacheKey = postOrContent.inputPath
      if (cacheKey && readingTimeCache.has(cacheKey)) {
        return readingTimeCache.get(cacheKey)
      }

      const content = postOrContent.content || ''
      const result = readingTime(content).text

      if (cacheKey) {
        readingTimeCache.set(cacheKey, result)
      }

      return result
    },
  }
}
