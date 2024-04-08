module.exports = {
  /**
   * ************************ IMPORTANT *********************************
   *  A few colors for links, blockquotes, code, etc. are set in the
   *  /src/assets/css/tailwind.css file.
   *  So if you can't find what you're looking for below,
   *  check out that tailwind.css file.
   * ********************************************************************
   *
   *
   * ===== Global Site Text Color =====
   */
  siteTextDefault: 'text-gray-900',
  siteTextCustom: '',

  /**
   * Reason for both 'xxxDefault' and 'xxxCustom'
   *  I could have only provided ONE set of settings. But knowing how users
   *  actually use a system, at some point they'll want to revert to the
   *  original color set...or at least reference it.
   *  Providing a 'Default' and 'Custom' set allows you to keep the original
   *  colors for future reference while setting 'Custom' overrides for entire
   *  sets or individual elements.
   *
   *    If you don't care about keeping them as reference, you can just
   *      change the "xxxDefault" key values.
   *
   *    "xxxCustom" values will always override "xxxDefault" values.
   *
   * ~~~~~ Cusomization tip ~~~~~
   *    To quickly create a full set of custom colors,
   *    simply select and copy the set of "Default" elements
   *    and 'replace paste' them in the "Custom" area.
   *    Then just change the "color" value in the middle.
   *    This will help keep the customization values looking correct
   *    and wil ensure no errors in "text", "bg", and "border" values.
   */
  navDefault: {
    barBg: 'bg-white',
    text: 'sm:text-vs-blue-900',
    textActive: 'sm:text-white',
    textHover: 'sm:hover:text-vs-blue-800',
    textActiveBg: 'sm:bg-gradient-to-r from-vs-yellow-400 to-vs-yellow-600 rounded-md',
    textFocus: 'sm:focus:text-vs-blue-700',
    mobileBarBg: 'bg-white',
    mobileBg: 'bg-white',
    mobileBgActive: 'bg-vs-yellow-50',
    mobileBgHover: 'hover:bg-vs-yellow-100',
    mobileBgFocus: 'focus:bg-vs-yellow-100',
    mobileText: 'text-vs-blue-900',
    mobileTextActive: 'text-vs-blue-950',
    mobileTextHover: 'hover:text-vs-blue-800',
    mobileTextFocus: 'focus:vs-blue-800',
    mobileButton: 'bg-white',
    mobileButtonHover: 'hover:text-vs-blue-900',
    mobileButtonBgHover: 'hover:bg-vs-yellow-50',
  },

  transparentNav: {
    text: 'sm:text-vs-yellow-50',
    textHover: 'sm:hover:text-vs-yellow-400',
  },

  /**
   *  NOTE: You MUST keep all Custom variable keys, even if their values are empty and you don't intend to use them.
   *  If you delete any variable keys, 11ty won't work.
   *  navCustom is here when the navbar is not scrolled: overlaying with hero.
   */
  navCustom: {
    barBg: '',
    text: '',
    textActive: '',
    textHover: '',
    textActiveBg: '',
    textFocus: '',
    mobileBarBg: '',
    mobileBg: '',
    mobileBgActive: '',
    mobileBgHover: '',
    mobileBgFocus: '',
    mobileText: '',
    mobileTextActive: '',
    mobileTextHover: '',
    mobileTextFocus: '',
    mobileButton: '',
    mobileButtonHover: '',
    mobileButtonBgHover: '',
  },

  /**
   * ===== Logo / SVG =====
   */
  logoDefault: {
    desktop: 'text-vs-yellow-500',
    mobile: 'text-vs-yellow-500',
    hover: 'hover:text-vs-yellow-300',
  },
  logoCustom: {
    desktop: '',
    mobile: '',
    hover: '',
  },

  /**
   * ===== Headings: H1, H2, H3, H4, H5, H6
   *
   * NOTE: These are for headings controled in templates.
   * For content headings added by Editors in .md files,
   * manage those in /src/assets/css/tailwind.css
   */
  headingsDefault: 'text-vs-blue-900',
  headingsCustom: '',

  /**
   * prose classes colors
   */
  headingsProseDefault: 'prose-headings:text-vs-blue-900',
  headingsProseCustom: '',
  linksProseDefault: 'prose-a:text-vs-blue-700 hover:prose-a:text-vs-blue-600',
  linksProseCustom: '',

  /**
   * ===== Excerpts on Post Lists
   */
  excerptDefault: 'text-base italic text-gray-700',
  excerptCustom: '',

  /**
   * ===== Author & Member / Date Block and their Social Icons =====
   *
   * Manage the global Footer Icons below in the Footer section
   */
  authorDefault: {
    name: 'text-vs-blue-900',
    date: 'text-gray-700',
    socialIcons: 'text-gray-500',
    socialIconsHover: 'hover:text-gray-600',
  },
  authorCustom: {
    name: '',
    date: '',
    socialIcons: '',
    socialIconsHover: '',
  },

  /**
   * ===== Social Share Icons =====
   *
   * Manage the colors of the Social Share icons at the bottom of
   * Posts detail views
   *
   * Manage display in /src/_data/structure.js
   */
  socialShareDefault: {
    color: 'text-gray-700',
    hover: 'hover:text-gray-800',
  },
  socialShareCustom: {
    color: '',
    hover: '',
  },

  /**
   * ===== Buttons =====
   */
  buttonDefault: {
    text: 'text-white',
    textHover: '',
    bg: 'bg-gradient-to-r from-vs-yellow-400 to-vs-yellow-600',
    bgHover: 'hover:from-vs-yellow-500 hover:to-vs-yellow-700',
    border: 'border-vs-yellow-900',
  },
  buttonCustom: {
    text: '',
    textHover: '',
    bg: '',
    bgHover: '',
    border: '',
  },

  /**
   * ===== Pagination Settings =====
   *
   * === Post Listing Pills ===
   */
  paginateDefault: {
    blockBg: '',
    blockBorder: 'border-gray-200',
    linkText: 'text-gray-600',
    linkTextActive: 'active:text-gray-500',
    linkTextHover: 'hover:text-gray-700',
    linkBg: 'bg-white',
    linkBgActive: 'active:bg-gray-100',
    linkBgHover: 'hover:bg-gray-200',
    linkBorder: 'border-gray-300',
    linkFocusBorder: 'focus:border-blue-300',
  },
  paginateCustom: {
    blockBg: '',
    blockBorder: '',
    linkText: '',
    linkTextActive: '',
    linkTextHover: '',
    linkBg: '',
    linkBgActive: '',
    linkBgHover: '',
    linkBorder: '',
    linkFocusBorder: '',
  },

  /**
   * === Previous / Next Post Detail Links
   */
  prevNextDefault: {
    text: 'text-vs-blue-700',
    textHover: 'hover:text-vs-blue-500 hover:font-semibold',
    bg: '',
    bgHover: '',
  },
  prevNextCustom: {
    text: 'text-vs-blue-700',
    textHover: 'hover:text-vs-blue-500 hover:font-semibold',
    bg: '',
    bgHover: '',
  },

  /**
   * ===== Tag Pills on Post Listings and Details
   * You can disable these globally in /src/_data/structure.js
   */
  tagPillDefault: {
    text: 'vs-blue-900',
    textHover: 'hover:vs-blue-900',
    bg: 'bg-vs-yellow-50',
    bgHover: 'hover:bg-vs-yellow-200',
  },
  tagPillCustom: {
    text: '',
    textHover: '',
    bg: '',
    bgHover: '',
  },

  /**
   * ===== Footer =====
   *
   * === Text and Background
   */
  footerDefault: {
    barBg: 'bg-vs-blue-950',
    text: 'text-gray-500',
  },
  footerCustom: {
    barBg: '',
    text: '',
  },

  /**
   * === Footer social icons
   * Manage the Members social icons above in the Members section
   */
  socialIconsDefault: 'text-white',
  socialIconsHoverDefault: 'hover:text-vs-yellow-500',

  socialIconsCustom: '',
  socialIconsHoverCustom: '',

  // Generally I use borders as replacements for <hr> tags.
  // You may need to update Layouts and Templates if you want to use these
  // border settings in other contexts.
  borderDefault: {
    borders: 'border-b',
    color: 'border-gray-300',
  },
  borderCustom: {
    border: '',
    color: '',
  },
}
