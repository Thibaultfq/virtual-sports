const { DateTime } = require('luxon')
const slugify = require('slugify')

module.exports = {
  init: (eleventyConfig, markdownLib) => {
    return {
      /**
       * Filters
       * @link https://www.11ty.dev/docs/filters/
       */

      /**
       * dateToFormat allows specifiying display format at point of use.
       * Example in footer: {{ build.timestamp | dateToFormat('yyyy') }} uses .timestamp
       *  from the _data/build.js export and formats it via dateToFormat.
       * Another usage example used in layouts: {{ post.date | dateToFormat("LLL dd, yyyy") }}
       * And finally, example used in /src/posts/posts.json to format the permalink
       *  when working with old /yyyy/MM/dd/slug format from Wordpress exports
       */
      dateToFormat: (date, format) => {
        if (typeof date === 'string') {
          return DateTime.fromISO(date, {
            zone: 'utc',
          }).toFormat(String(format))
        }
        if (date instanceof Date) {
          return DateTime.fromJSDate(date, {
            zone: 'utc',
          }).toFormat(String(format))
        }
        return date
      },

      /**
   // Universal slug filter strips unsafe chars from URLs
   */
      slugify: (string) => {
        return slugify(string, {
          lower: true,
          replacement: '-',
          remove: /[*+~.·,()'"`´%!?¿:@]/g,
        })
      },

      getProp: (data, prop) => {
        if (!data || !prop || typeof prop !== 'string') {
          return null
        }
        return prop.split('.').reduce((acc, item) => acc[item], data)
      },

      /**
       * Unslugifies a slugified string.
       *
       * @param {string} slug slugified string.
       * @returns {string} un-slugified string.
       */
      unslugify: (slug) => {
        if (slug == undefined || !slug.length) return ''
        return slug
          .replace(/\-/g, ' ')
          .replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())
      },

      /**
       * Pass ` | limit(x)` to a Collection loop to limit the number returned
       * Alt = ` | reverse | limit(x)` to return X most recent
       * Took the following filters from
       * @link https://www.youtube.com/watch?v=wV77GwOY22w&feature=share
       */
      limit: (array, n = 5) => {
        if (!Array.isArray(array) || array.length === 0) {
          return []
        }
        if (n < 0) {
          return array.slice(n)
        }

        return array.slice(0, n)
      },

      /**
       *
       * @param {*} members data json members
       * @returns members that are experts to be shown on the homepage.
       */
      getHomepageExperts: (members, homePageMembersSlugsSorted) => {
        return members
          .filter((member) => homePageMembersSlugsSorted.indexOf(member.data.slug) !== -1) //filter method makes shallow copy, safe to sort afterwards.
          .sort(
            (a, b) => homePageMembersSlugsSorted.indexOf(a.data.slug) - homePageMembersSlugsSorted.indexOf(b.data.slug)
          )
      },

      /**
       * Get Member from  src/members/*.md  to use in Post Lists and Detail
       */
      getMember: (members, key) => {
        if (!Array.isArray(members) || members.length === 0 || !key || key.length === 0) {
          return ''
        }

        return members.filter((member) => member.data.slug === key)[0]
      },

      /**
       * Check if author is member from src/members/*.md to use in Post Lists and Detail
       * key: author name or auhtor slug.
       */
      authorIsMember: (members, key) => {
        if (!Array.isArray(members) || members.length === 0 || !key || key.length === 0) {
          console.warn('no member array or atuhor name/slug provided')
          return false
        }

        return members.some((member) => member.data.slug === key)
      },

      /**
       * Check if member is author. Authors are those who have made a post (can me member but not required and vice versa).
       * memberSlug: slug attribute of member.
       */
      memberIsAuthor: (posts, memberSlug) => {
        if (!Array.isArray(posts) || posts.length === 0 || !memberSlug || memberSlug.length === 0) {
          console.warn('no posts array or member slug provided')
          return false
        }

        return posts.some((p) => p.data.author === memberSlug)
      },

      /**
       * Get Array of Posts by Author (slug) for the Author detail page
       */
      getPostsByAuthor: (posts, key) => {
        return posts.filter((a) => a.data.author === key)
      },

      getMostRecentPost: (posts) => {
        if (!Array.isArray(posts) || posts.length === 0) {
          console.warn('no posts array provided')
          return null
        }
        return posts.reduce((acc, curr, index) => (curr.page.date > acc.page.date && index ? curr : acc))
        //.data.date
      },

      /**
       *
       * @param {*} number
       * @returns the number in words up to 'ten'. Usefull when using numbers in text (see apa guidelines).
       */
      numberToWords: (number) => {
        if (number > 10) return number
        return ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][number]
      },

      getAllTagsOfPostsOfMember: (posts, memberSlug) => {
        const postsByMember = eleventyConfig.getFilter('getPostsByAuthor')(posts, memberSlug)

        if (postsByMember.length === 0) {
          return []
        }
        return Array.from(new Set(postsByMember.flatMap((p) => p.data.tags)))
          .filter((tag) => ['post'].indexOf(tag) === -1)
          .sort()
        //filter from tags that are used to define main collections
      },

      // Return all the tags used in a collection
      getAllTags: (collection) => {
        let tagSet = new Set()
        for (let item of collection) {
          ;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
        }
        //checks if contains case sensitive doubles because of slugify filter so that's handeled automatically.
        return Array.from(tagSet)
      },

      // filter an array of tags to get only the "custom" tags in a post and not the default tags that define a collection such as 'all' or 'post'
      getOnlyCustomTags: (tags) => {
        return (tags || []).filter((tag) => ['all', 'nav', 'post', 'tag', 'all', 'pages', 'member'].indexOf(tag) === -1)
      },

      /**
       * use markdown in a .njk file and in the front matter (e.g. with emoji)
       */
      renderMarkdown: (rawString) => {
        if (!rawString) {
          return ''
        }
        return markdownLib.render(rawString)
      },

      /**
       * use markdown in a .njk file and in the front matter (e.g. with emoji)
       */
      renderInlineMarkdown: (rawString) => {
        if (!rawString) {
          return ''
        }
        return markdownLib.renderInline(rawString)
      },

      debugger: (...args) => {
        console.log(...args)
        debugger
      },
    }
  },
}
