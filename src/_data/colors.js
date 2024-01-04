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
    barBg: 'sm:bg-white',
    text: 'sm:text-midnight-blue-950',
    textActive: 'sm:text-white',
    textHover: 'sm:hover:text-midnight-blue-600',
    textActiveBg:
      'sm:bg-gradient-to-r from-midnight-blue-600 to-midnight-blue-800',
    textFocus: 'sm:focus:text-midnight-blue-500',
    mobileBarBg: 'bg-white',
    mobileBg: 'bg-white',
    mobileBgActive: 'bg-midnight-blue-700',
    mobileBgHover: 'hover:bg-midnight-blue-100',
    mobileBgFocus: 'focus:bg-midnight-blue-300',
    mobileText: 'text-midnight-blue-500',
    mobileTextActive: 'text-midnight-blue-300',
    mobileTextHover: 'hover:text-midnight-blue-600',
    mobileTextFocus: 'focus:midnight-blue-700',
    mobileButton: 'midnight-blue-500',
    mobileButtonHover: 'hover:midnight-blue-600',
    mobileButtonBgHover: 'hover:bg-teal-100',
  },
  /**
   *  NOTE: You MUST keep all Custom variable keys, even if their values are empty and you don't intend to use them.
   *  If you delete any variable keys, 11ty won't work.
   *  navCustom is here when the navbar is not scrolled: overlaying with hero.
   */
  navCustom: {
    barBg: 'sm:bg-transparent',
    text: 'sm:text-gray-100',
    textActive: 'sm:text-white',
    textHover: 'sm:hover:text-gray-800',
    textActiveBg: 'sm:bg-gradient-to-r from-bright-sun-400 to-bright-sun-600',
    textFocus: 'sm:focus:text-gray-500',
    mobileBarBg: 'bg-transparent',
    mobileBg: 'bg-transparent',
    mobileBgActive: 'bg-gray-700',
    mobileBgHover: 'hover:bg-gray-100',
    mobileBgFocus: 'focus:bg-gray-300',
    mobileText: 'text-gray-500',
    mobileTextActive: 'text-gray-300',
    mobileTextHover: 'hover:text-gray-600',
    mobileTextFocus: 'focus:text-gray-700',
    mobileButton: 'text-gray-500',
    mobileButtonHover: 'hover:text-gray-600',
    mobileButtonBgHover: 'hover:bg-gray-100',
  },

  /**
   * ===== Logo / SVG =====
   */
  logoDefault: {
    desktop: 'text-bright-sun-500',
    mobile: 'text-bright-sun-500',
    hover: 'hover:text-bright-sun-300',
  },
  logoCustom: {
    desktop: 'text-dark-blue',
    mobile: 'text-dark-blue',
    hover: '',
  },

  /**
   * ===== Headings: H1, H2, H3, H4, H5, H6
   *
   * NOTE: These are for headings controled in templates.
   * For content headings added by Editors in .md files,
   * manage those in /src/assets/css/tailwind.css
   */
  headingsDefault: 'text-teal-500',
  headingsCustom: 'text-gray-700',

  /**
   * ===== Excerpts on Post Lists
   */
  excerptDefault: 'text-gray-700',
  excerptCustom: 'text-sm leading-relaxed italic text-gray-700',

  /**
   * ===== Author / Date Block and their Social Icons =====
   *
   * Manage the global Footer Icons below in the Footer section
   */
  authorDefault: {
    name: 'text-gray-700',
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
    text: 'text-white font-semibold text-xl',
    textHover: 'hover:text-white',
    bg: 'bg-gradient-to-r from-bright-sun-400 to-bright-sun-600',
    bgHover: 'hover:bg-gradient-to-r from-bright-sun-300 to-bright-sun-500',
    border: 'border-teal-900',
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
    linkTextActive: 'text-gray-500',
    linkTextHover: 'hover:text-gray-700',
    linkBg: 'bg-white',
    linkBgActive: 'bg-gray-100',
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
    text: 'text-gray-700',
    textHover: 'hover:text-gray-800',
    bg: '',
    bgHover: '',
  },
  prevNextCustom: {
    text: '',
    textHover: '',
    bg: '',
    bgHover: '',
  },

  /**
   * ===== Tag Pills on Post Listings and Details
   * You can disable these globally in /src/_data/structure.js
   */
  tagPillDefault: {
    text: 'text-gray-700',
    textHover: 'hover:text-gray-800',
    bg: 'bg-gray-200',
    bgHover: 'hover:bg-gray-300',
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
    barBg: 'bg-white',
    text: 'text-teal-500',
  },
  footerCustom: {
    barBg: 'bg-gray-900',
    text: 'text-gray-100',
  },

  /**
   * === Footer social icons
   * Manage the Author social icons above in the Author section
   */
  socialIconsDefault: 'text-teal-400',
  socialIconsHoverDefault: 'hover:text-teal-500',

  socialIconsCustom: 'text-gray-100',
  socialIconsHoverCustom: 'hover:text-gray-200',

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
