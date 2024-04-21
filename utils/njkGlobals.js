module.exports = {
  init: (eleventyConfig) => {
    return {
      NODE_ENV: process.env.NODE_ENV?.trim() || 'development',
    }
  },
}
