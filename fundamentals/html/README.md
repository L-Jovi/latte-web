# Semantic HTML

English | [简体中文](README.zh-Hans.md)

Build a page from meaningful sections instead of anonymous boxes. Each tag names the job of its part of the page, such as navigation, an article or a side note, instead of leaving everything in `<div>`s.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/fundamentals/html/semantic.html
```

No install or build is needed: `npm run dev` works right after cloning. The page has no styles of its own, only the site's shared stylesheet for fonts, colours and spacing: a large title, two links, an article and a short note about the notebook. The two links jump to the article and to the note, and the address then ends in `#entry` or `#author`. Open the Elements panel of DevTools to see the structure behind it. You can also open the [live demo](https://l-jovi.github.io/latte-web/fundamentals/html/semantic.html).

## How it works

[semantic.html](semantic.html) (8 lines) is a made-up field notebook. Each element names a job:

- `<header>` holds the page title, an `<h1>`, and one line of introduction.
- `<nav>` holds the links that move around the page. Its `aria-label="Notebook"` gives this navigation a name for screen readers.
- `<main>` holds the content that the page is about.
- `<article>` is a piece that makes sense on its own, like a blog post. Inside it, a `<section>` groups one topic, and a `<footer>` gives the publication date.
- `<time datetime="2026-09-28">` shows people "28 September 2026" and gives programs the same date in a fixed format.
- `<aside>` holds related content, here the note about the notebook.
- A last `<footer>` closes the page.

The headings go down one level at a time: `<h1>` for the page, `<h2>` for the article and the note, `<h3>` for the section. People who use screen readers often jump from heading to heading to find their way around a page, and a skipped level leaves them wondering what is missing ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements)).

## Then and now

The original version of this page, from 2021, had four `<h1>` headings: one in the header, one at the top of each of two articles, and one in an `aside`. Older versions of the HTML standard allowed a new `<h1>` in each nested section. That is now non-conforming, and MDN recommends a single `<h1>` per page, with the levels in order ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements)). The page now has one `<h1>`.

The same idea applies beyond headings: native elements carry meaning and behavior. A `<button>` works with the keyboard and tells screen readers that it is a button. A `<div>` styled to look like one does neither, until you add all of that yourself.

## Limits

- The page shows structure only. It is not a full accessibility review.
- It has no styles of its own, no form and no images, so topics such as colour contrast, form labels and alternative text do not come up.

## Checks and credits

- `npm run test:browser` opens the page in Chromium, Firefox and WebKit and checks that it loads without errors. No test checks the structure or the headings.
- The notebook text is made up. The [migration ledger](../../docs/migration.md) links to the original version, in the `template/html` folder.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
