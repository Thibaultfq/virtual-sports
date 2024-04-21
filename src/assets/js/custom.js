;(function (document, history, location) {
  const HISTORY_SUPPORT = !!(history && history.pushState)

  const anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,
    PADDING_TO_OFFSET_HEIGHT_PX: 10,

    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function () {
      if (window.location.hash) {
        this.scrollToCurrent()
      }
      window.addEventListener('hashchange', this.scrollToCurrent.bind(this))
      document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => anchor.addEventListener('click', this.delegateAnchors.bind(this)))
    },

    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function () {
      return document.querySelector('nav').offsetHeight + this.PADDING_TO_OFFSET_HEIGHT_PX
    },

    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function (href, pushToHistory) {
      let match, rect, anchorOffset

      if (!this.ANCHOR_REGEX.test(href)) {
        return false
      }

      match = document.getElementById(href.slice(1))

      if (match) {
        rect = match.getBoundingClientRect()
        anchorOffset = window.scrollY + rect.top - this.getFixedOffset()
        window.scrollTo(window.scrollX, anchorOffset)

        // Add the state to history as-per normal anchor links
        if (HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href)
        }
      }

      return !!match
    },

    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function () {
      this.scrollIfAnchor(window.location.hash)
    },

    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function (e) {
      if (this.scrollIfAnchor(e.currentTarget.getAttribute('href'), true)) {
        e.preventDefault()
      }
    },
  }

  window.addEventListener('DOMContentLoaded', anchorScrolls.init.bind(anchorScrolls))
})(window.document, window.history, window.location)
