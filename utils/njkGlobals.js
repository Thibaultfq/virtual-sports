export function init(eleventyConfig) {
  return {
    NODE_ENV: process.env.NODE_ENV?.trim() || 'development',
  }
}
