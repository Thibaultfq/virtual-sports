module.exports = {
  init: (eleventyConfig, markdownLib) => {
    const explainerVideo = (
      align = 'sm:flex-row',
      content,
      heading,
      videoFileNamewithoutExtension,
      videoAlt,
      videoSource
    ) => {
      return `
      <section class="flex flex-col ${align} [&_p]:text-xl [&_p]:mb-4 sm:gap-x-8 mb-4 sm:mb-8 lg:mb-16 xl:mb-24">
        <div class="grow sm:basis-7/12 ">
          <h3 class="text-3xl mt-6 sm:mt-0 mb-3 font-semibold text-vs-blue-900">${heading}</h3>
          ${content}
        </div>
        <div class="grow sm:basis-5/12 relative self-center">
          <video muted loop
          x-data="{}" x-intersect:enter.margin.-35%.0="$el.play()" x-intersect:leave.margin.-35%.0="$el.pause()" onclick="this.paused?this.play():this.pause()" ontouchend="this.paused?this.play():this.pause()" 
          class="object-cover w-full rounded-2xl [clip-path:inset(1px_1px)]" 
          alt="${videoAlt}" >
          <source src="/assets/video/explainers/${videoFileNamewithoutExtension}.webm" type='video/webm; codecs="vp9"'>
          <source src="/assets/video/explainers/${videoFileNamewithoutExtension}.mp4" type='video/mp4; codecs="avc1.42401E"'>
          </video>
          <span class="absolute backdrop-blur-sm bg-white bg-opacity-50 text-xs bottom-0 right-0 p-1 rounded text-gray-700">${videoSource}</span>
        </div>
      </section>`
      //  onmouseover="this.play()" onmouseout="this.pause()"
    }

    return {
      /**
       * ===== Wrapper =====
       *
       * You can't add DIVs to native Markdown. Using this wrapper you can
       * wrap any content, or other shortcodes, in a block you can style however you want.
       * It also inserts a "wrapper" class you can style for externally in /src/assets/css/tailwind.css
       * And a padding of 1rem (16px) which you may or may not want to delete depending on your design updates.
       *
       * Usage in .md files:
       *  {% wrap "tailwind classes here" %} Content goes here {% endwrap %}
       */
      wrap: function (content, classes = '') {
        return `<div class="${classes}">${content}</div>`
      },

      /**
       * ===== Column Wrapper & Cols - REQUIRED =====
       *
       * Using this column wrapper and 'cols' below
       * you can create columnar content in your .md files.
       *
       * Usage in .md files:
       *  {% columns "optional additional tailwind classes" %}
       *    {% cols "optional add'l tailwind classes" %} Content for left column {% endcols %}
       *    {% cols "optional add'l tailwind classes" %} Content for right column {% endcols %}
       *  {% endcolumns %}
       */
      columns: function (content, classes = '') {
        return `<div class="flex flex-col md:flex-row ${classes}">${content}</div>`
      },

      /** See usage example above.
       * You can add as many 'cols' as you want columns
       */
      cols: function (content, classes = '') {
        return `<div class="flex-1 px-2 ${classes}">${markdownLib.render(content.trim())}</div>`
      },

      /** ===== Description List Wrapper, Term, and Description
       *
       * Native Markdown doesn't support Description Lists
       * which you may want to use for FAQs or other listed content for which
       * regular UL and OL lists are not appropriate.
       *
       * Much like Columns above, you'll need to use the 'dl' wrapper around
       * a series of 'dt' and 'dd' shortcodes.
       *
       * Also you may want to adjust the TailwindCSS colors and paddings attached
       * to the 'dt' and 'dd' shortcodes for your specific display requirements.
       *
       * Example post: /2020/09/04/description-list-shortcodes/
       *
       * Usage in .md files
       *  {% dl %}
       *    {% dt %} Question one. {% enddt %}
       *    {% dd %} The answer for question one. {% enddd %}
       *
       *    {% dt %} Question two. {% enddt %}
       *    {% dd %} The answer for question two. {% enddd %}
       *
       *    {% dt %} Question three. {% enddt %}
       *    {% dd %} The answer for question three. {% enddd %}
       *  {% enddl %}
       */
      dl: function (content, classes = '') {
        return `<dl class="${classes}">${content}</dl>`
      },

      /** Description List: Term/Question
       *    See example usage above
       */
      dt: function (content, classes = '') {
        return `<div class="border-t border-gray-300 mt-4 pt-4 md:grid md:grid-cols-12 md:gap-8"><dt class="font-semibold md:col-span-5 ${classes}">${markdownLib.render(
          content.trim()
        )}</dt>`
      },

      /** Description List: Description/Answer
       *    See example usage above
       */
      dd: function (content, classes = '') {
        return `<dd class="pb-4 md:col-span-7 md:mt-0  ${classes}">${markdownLib.render(content.trim())}</dd></div>`
      },

      explainerVideoRight: function (content, heading, videoFileName, videoAlt, videoSource) {
        return explainerVideo('sm:flex-row', content, heading, videoFileName, videoAlt, videoSource)
      },

      explainerVideoLeft: function (content, heading, videoFileName, videoAlt, videoSource) {
        return explainerVideo('sm:flex-row-reverse', content, heading, videoFileName, videoAlt, videoSource)
      },
    }
  },
}
