const structure = require('./../src/_data/structure')

module.exports = {
  init: (eleventyConfig, markdownLib) => {
    return {
      /**
       * use typedjs for typewriter effect in the hero-text-overlay.njk
       * to use
       * 1. add script code to the bottom of the page
       * <!-- <script>
       *     var typed = new Typed('#typed', {
       *      stringsElement: '#typed-strings'
       *     });
       * </script> -->
       * 2. add typedJsStrings variable in page frontmatter
       */
      typedjs: (typedJsStrings, typedJsBase) => {
        if (!typedJsStrings || typedJsStrings.length == 0 || !typedJsBase) return ''
        let typedStringsParagraphs = ''

        for (let i = 0; i < typedJsStrings.length; i++) {
          typedStringsParagraphs += `<p>${typedJsStrings[i]}</p>`
        }

        return `<div id="typed-strings" class="hidden">
              ${typedStringsParagraphs}
              </div>
              <span>${typedJsBase}</span><span id="typed"></span>
              `
      },

      ctaButton: function (content, classes, type = 'button', href = '') {
        //to access variables in nunjuncks, use this.ctx in filters and shortcodes
        return `${
          href ? '<a href=' + href + '>' : ''
        }<button type="${type}" class="text-2xl md:text-3xl px-3 py-2 text-balance font-medium rounded-md ${
          this.ctx.colors.buttonDefault.text || this.ctx.colors.buttonCustom.text
        } ${this.ctx.colors.buttonDefault.textHover || this.ctx.colors.buttonCustom.textHover} ${
          this.ctx.colors.buttonDefault.bg || this.ctx.colors.buttonCustom.bg
        } ${this.ctx.colors.buttonDefault.bgHover || this.ctx.colors.buttonCustom.bgHover} ${
          this.ctx.colors.buttonDefault.border || this.ctx.colors.buttonCustom.border
        } ${classes ? classes : ''}">${content}
        </button>
        ${href ? '</a>' : ''}`
      },

      heading: function (content, subheading, classes = '', anchorLink = true) {
        const h3 = subheading
          ? `<h3 class="${
              this.ctx.colors.headingsCustom || this.ctx.colors.headingsDefault
            } mb-6 text-center italic font-normal text-2xl ">${markdownLib.renderInline(subheading.trim())}</h3>`
          : ''

        const a = anchorLink
          ? `<a class="${
              structure.g_markdownItAnchor_classes
            } absolute inset-y-50	 left-100 ml-2" href="#${eleventyConfig.getFilter('slugify')(content)}"
            title="link to the subtitle: ${content.trim()}">#</a>`
          : ''

        return `<h2 class="w-full mb-6 text-5xl font-bold text-center text-balance ${
          this.ctx.colors.headingsCustom || this.ctx.colors.headingsDefault
        } ${anchorLink ? 'relative px-10' : ''} ${classes}"
        ${anchorLink ? `tabindex="-1"` : ''} 
        ${anchorLink ? `id="${eleventyConfig.getFilter('slugify')(content)}"` : ''}>
        ${markdownLib.renderInline(content.trim())}
        ${a}
        </h2>
        ${h3}
        <div class="w-full mb-8 md:mb-28"><div class="h-1 mx-auto bg-gradient-to-r from-vs-yellow-400 to-vs-yellow-600 w-48 sm:w-64 md:w-96 my-0 py-0 rounded-t"></div></div>`
      },

      /**
       * My YouTube embed with Title, Start (optional) and Ratio (optional)
       * vid     = "youtubeID" : required : default = "oHg5SJYRHA0"
       * vtitle  = "Your title for this video" : required : default = "YouTube Video"
       * vratio  = "w:h" : optional : default = "16:9"
       * vstart  = "4:20" : optional
       *
       * Usage in .md file
       *  {% youtube "1234567", "Your Custom Title", "4:3", "1:23" %}
       *
       * If you'd like the default title = "YouTube Video", 16:9 ratio, and start at the beginning,
       * you only need the following:
       *  {% youtube "1234567" %}
       */
      youtube: function (vid, vtitle, vclasses, vratio, vstart) {
        const slug = vid ? vid : 'oHg5SJYRHA0'
        const title = vtitle ? vtitle : 'YouTube Video'
        const ratio = vratio ? vratio : '16:9'
        const classes = vclasses ? classes : ''
        const start = vstart ? vstart.split(':').reduce((minute, seconds) => Number(minute) * 60 + Number(seconds)) : ''
        const padding = ratio.split(':').reduce((first, second) => (second / first) * 100)

        return `
        <div class="lg:w-3/4 2xl:w-4/6 mx-auto ${classes}" >
        <div id="${slug}" style="position:relative; width:100%; padding-bottom:${padding}%"><iframe style="position:absolute; top:0; right:0; bottom:0; left:0; width:100%; height:100%" width="100%" height="100%" title="${title}" src="https://www.youtube.com/embed/${slug}${
          start ? `?start=${start}` : ''
        }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div></div>`
      },
    }
  },
}
