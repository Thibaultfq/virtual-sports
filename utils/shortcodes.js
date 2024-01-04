const markdownIt = require('markdown-it')
const markdownItEmoji = require('markdown-it-emoji')
let options = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}
let markdownLib = markdownIt(options).use(markdownItEmoji)

module.exports = {
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
  typedjs: (typedJsStrings) => {
    let typedStringsParagraphs = ''

    // const random = Math.floor(Math.random() * typedJsStrings.length) //generate random between 0 and length-1
    // let i = random //random concat the typedstring into paragraphs
    // do {
    //   typedStringsParagraphs += `<p>${typedJsStrings[i]}</p>`
    //   i = (i + 1) % typedJsStrings.length
    // } while (i !== random)

    for (let i = 0; i < typedJsStrings.length; i++) {
      typedStringsParagraphs += `<p>${typedJsStrings[i]}</p>`
    }

    return `<div id="typed-strings" class="hidden">
    ${typedStringsParagraphs}
    </div>
    <div class="h-52 min-h-52" ><span id="typed"></span></div>
    `
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
  youtube: function (vid, vtitle, vratio, vstart) {
    const slug = vid ? vid : 'oHg5SJYRHA0'
    const title = vtitle ? vtitle : 'YouTube Video'
    const ratio = vratio ? vratio : '16:9'
    const start = vstart
      ? vstart
          .split(':')
          .reduce((minute, seconds) => Number(minute) * 60 + Number(seconds))
      : ''
    const padding = ratio
      .split(':')
      .reduce((first, second) => (second / first) * 100)

    return `<div id="${slug}" style="position:relative; width:100%; padding-bottom:${padding}%"><iframe style="position:absolute; top:0; right:0; bottom:0; left:0; width:100%; height:100%" width="100%" height="100%" title="${title}" src="https://www.youtube.com/embed/${slug}${
      start ? `?start=${start}` : ''
    }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
  },
}
