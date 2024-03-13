const { DateTime } = require('luxon')
const slugify = require('slugify')
// const cleanCSS = require('clean-css')

module.exports = {
  init: (eleventyConfig) => {
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
        return DateTime.fromJSDate(date, {
          zone: 'utc',
        }).toFormat(String(format))
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
      getHomepageExperts: (members) => {
        return members
          .filter(
            (member) =>
              member.data.homepageExpert !== undefined &&
              member.data.homepageExpert == true &&
              member.data.homepageExpertOrder !== undefined &&
              !isNaN(member.data.homepageExpertOrder)
          )
          .sort((a, b) => a.data.homepageExpertOrder - b.data.homepageExpertOrder)
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

      getAmountOfPostByMember: (posts, memberSlug) => {
        if (!eleventyConfig.getFilter('memberIsAuthor')(posts, memberSlug)) {
          return 'None yet' //If a member isn't an author (i.e. has no posts), return 0
        }
        return eleventyConfig.getFilter('getPostsByAuthor')(posts, memberSlug).length
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
        return (tags || []).filter((tag) => ['all', 'nav', 'post'].indexOf(tag) === -1)
      },

      debugger: (...args) => {
        console.log(...args)
        debugger
      },
    }
  },
}
