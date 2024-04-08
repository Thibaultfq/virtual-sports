---
title: Blockquotes - Shortcodes
date: 2020-09-05T17:44:03.000Z
excerpt: Blockquotes are easy, even in Markdown. But what if you want to style them?
author: shane-robinson
draft: 
seo:
  title:
  description:
  image: 2020/09/blockquote.jpg
images: # relative to /src/assets/images/
  feature: 2020/09/blockquote.jpg
  thumb: 2020/09/blockquote.jpg
tags:
  - blockquote
  - shortcodes
  - emoji
  - markdown
---

## Basic Markdown Blockquote

Below is a basic blockquote in Markdown.

```md
> this is a blockquote. this is a blockquote.
```

Which generates this:

> this is a blockquote. this is a blockquote.

The minimal styling is managed in `/src/assets/css/tailwind.css` which sets left padding and margins of 1rem _(16px)_ and a left border of 4px colored gray-500:

```css
blockquote {
	@apply pl-4 m-4 border-l-4 border-gray-500;
}
```

## Adding Emoji to Blockquotes _(or anywhere you want)_

Because this system uses [markdown-it-emoji](https://www.npmjs.com/package/markdown-it-emoji) we can insert Emojis anywhere by using their `:code:` as in the exmaple below:

```md
> :bulb: **NOTE:** A blockquote with a nice Emoji to draw attention.
```

Generates the following blockquote:

> :bulb: **NOTE:** A blockquote with a nice Emoji to draw attention.
