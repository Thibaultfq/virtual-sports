module.exports = {
  /** ===== Globals =====
   * In this section we can control Global structural items like
   * pageWidth, margins, paddings, etc.
   * Only structural elements that probably won't be changed by editors,
   * and won't be changed much/ever once the site is in production.
   * For example, "g_pageWidth" manages both the Nav and the Page content
   * across the entire site so there is consistency on margins, padding, max width
   * at all screen sizes.
   */
  g_pageWidth: 'max-w-screen-2xl px-4 md:px-10 lg:px-20 2xl:px-30',
  g_blogWidth: 'max-w-screen-lg px-4 md:px-10 lg:px-20 mb-4 md:mb-10 mx-auto',

  g_prose:
    'font-serif max-w-none prose lg:prose-lg prose-headings:font-sans prose-img:w-full md:prose-figure:w-11/12 prose-figure:mx-auto',

  /**
   * height of the navbar and the logo within when page is on top
   */
  nav_height_unscrolled: 'h-28 sm:h-32',
  logo_height_unscrolled: 'h-16 sm:h-16',

  /**
   * height of the navbar and the logo within once scrolled
   */
  nav_height_scrolled: 'h-14 sm:h-20',
  logo_height_scrolled: 'h-10 sm:h-12',

  /**
   * Globally disable display of Tag pills/links
   */
  g_showTagPills: true,

  /**
   * Set alignment of Pagination links on Post Listing views.
   * NOTE: Pagination tabs don't display if not required.
   * This is controled in the Frontmatter of the listing template
   *
   * Options = start, center, end
   */
  g_alignPagination: 'center',

  /**
   * ===== Display Post Excerpt on Posts List =====
   * Set below to 'false' to globally disable Excerpt on the Posts List (/blog)
   *
   */
  g_showExcerpt: true,

  /**
   * ===== Display member Blocks =====
   * Set below to 'false' to globally disable member Avatars
   * and links to member's page on Post/Blog listings.
   *
   * Add and Manage member data in src/members/*.md, one file per member
   */
  g_showAuthors: true,

  /**
   * ===== Display Footer & Social Share Icons =====
   *
   * Set to fully disable display of the Social Links in the footer.
   * These social platform links are managed in the _data/social.json file.
   * *** It may have made sense to just put them here....but they were in social.json
   * *** before this file existed. :-)
   * I might move stuff around on the next version...
   */
  g_showFooterSocialIcons: true,
  /**
   * Set to 'false' to disable the "Share:" icons on the Post Detail views.
   * You can also set individual platforms to 'false' to disable just those platforms.
   * NOTE: We don't support Facebook (and deleted our Profiles and Pages in 2017) so
   * if you want Facebook support you'll have to build it yourself.
   * https://deletefacebook.com/
   */
  g_showSocialShareIcons: true,
  // Display individual Share Icons. Above must be 'true' for items below to display.
  g_showShareLinkedIn: true,
  g_showSharePinterest: false,
  g_showShareReddit: false,
  g_showShareX: true,
  g_showShareEmail: true,

  /**
   * ===== Home Page Carousel & Hero Controls =====
   */

  /**
   * ===== Post List Style Options =====
   * You can currently set one of the following 4 options for how
   * the posts/blog listing page displays.
   * The templates are located in /src/_includes/components/[name].njk
   *  1. postslist = Text link list, just Title, Date/Member, excerpt
   *  2. postslistblocks = Simple listing w/ Title, Date, Tags, Member (if set)
   *  3. postslistthumbs = Same as above with thumbnails
   *  4. postslistcards = Nice cards with Member/Date block
   *
   *  ONLY postlistthumbs are updated to subgrid atm, others TODO. Deprecated for now!
   *
   * NOTE: If you want to make your own list layouts, you can duplicate
   *        any of the existing layouts and modify as you want.
   *        Then just add them to the list above
   *        (makeing sure to name correctly)
   *        and they'll then be available for using below in
   *        'postListStyle' and 'tagListStyle.'
   *
   * */
  postListStyle: 'postslistthumbs',

  /**
   * ===== Tag List Style Options =====
   * You can set the Tag List style separately from Post List above.
   * If you want Tag List to use the same layout as Post List,
   * you can leave it empty below.
   *
   * For example, given tag "frontmatter", the Tag List would be found at
   * http://localhost:8080/tags/frontmatter/ during development and
   * https://your-domain/tags/frontmatter/ in production
   *
   */
  tagListStyle: '',

  /**
   * Set the classes of the markdownItAnchor plugin, because this file is watched by tailwind and .eleventy.js not.
   */
  g_markdownItAnchor_classes: 'text-transparent not-prose hover:text-vs-blue-600 focus:text-vs-blue-600',
}
