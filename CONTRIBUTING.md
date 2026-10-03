# Contributing

Thanks for helping. This repository explains one idea at a time, so a small, correct example with clear limits is worth more than a large, unfinished one.

## Before you start

- Use Node 24 LTS and npm 11, then run `npm ci`.
- Follow the README of the example you are changing.

## Making a change

- Run `npm run check` and any browser or build checks that apply. In the pull request, say what you ran and what you could not run.
- Update the English README and its Chinese mirror (`README.zh-Hans.md`) together, following the [writing guide](docs/writing.md).
- When you add or rename an example, edit `docs/catalog.json` and run `npm run docs:generate`. Do not edit the generated learning-path block in the root READMEs, the section indexes or `index.html` by hand; `npm run check:docs` will catch it.
- GitHub Pages publishes only `index.html` and the pages listed in `docs/catalog.json` (`scripts/pages.mjs`), so every published page is one the browser tests open. Any other HTML file, such as a build's template or a page for the browser console, stays out of the site.
- Every demo page shares `assets/site.css` and a top bar. `npm run docs:generate` writes them into `<!-- latte-site:… -->` blocks in each page or template; built pages get them from `scripts/site.cjs`. Change those two files, not the blocks.
- Every page fits a phone. `npm run docs:generate` gives a page a viewport tag unless it has its own, so a phone lays the page out as wide as its screen. Put a demo that needs a fixed width, such as a 500 px box, inside `<div class="latte-wide">`: on a narrow screen that frame scrolls sideways, not the page. `tests/browser/phone.spec.js` lays out every page 320 px wide, in both languages and at every step of its guide.
- Every page shows one language at a time: English when it opens, Chinese after the switch in the top bar (`assets/language.js`). The reader's choice is kept for the next page, and `?lang=zh` opens a page in Chinese. Write the page's text in pairs:
  - `<p data-l="en">…</p><p data-l="zh">…</p>`, or spans inside one heading;
  - `data-text-en`/`data-text-zh` on an element that a script or a test selects, and `data-label-en`/`data-label-zh` for its `aria-label`;
  - `data-title-en`/`data-title-zh` on `<html>` for the page title.

  Text that a script writes comes from a small `{ en, zh }` table and is drawn again on the `languagechange` event. In Chinese text, wrap three or more English words in a row, such as a name like Core Web Vitals, in `<span lang="en">`. `tests/browser/language.spec.js` opens every page with `?lang=en` and with `?lang=zh`, presses its switch each time, and fails the page if it shows the other language at any point. To prove that the check works, it also plants a sentence in the wrong language and expects to find it.

- A page can have a step-by-step guide beside it: `assets/guides/<page path>.json`, for example `assets/guides/fundamentals/css/bfc/bfc.json` for `fundamentals/css/bfc/bfc.html`. `npm run docs:generate` adds `assets/guide.js` to every page that has one. The guide speaks the page's language, and its button switches the whole page. On a screen narrower than 72rem it is a sheet over the bottom of the window, which the reader can fold down to one row. Each step has `title`, `titleZh`, `text` and `textZh`, and may have:
  - `action`, applied in this order: `clear` (empty the guide's console first), `fill` (`target`, `value`: types into a field; free text has a `valueZh` for the Chinese page), `click` (a selector), `clickText` (the exact English text of a button or link on the page; it is found in Chinese too), `run` (statements in the page's global scope) and `toggle` (`target`, `property`, `on`, `off`: a style the step switches, restored when the reader moves on);
  - `actionLabel` and `actionLabelZh`, the button text, required when there is an action;
  - `watch`: `label` (with an optional `labelZh`) and `value` (an expression), with an optional `expect`. The panel reads each value again whenever the page changes, so a value that arrives late, after a fetch or a render, still shows;
  - `focus`, the selector of the part of the page the step is about;
  - `highlight`, text to mark in the guide's console;
  - `expectConsole` (one string that some line contains, or a list of the first lines) and `absentConsole` (text that must not appear).
    `npm run check:docs` checks that the page is in the catalog and that every step has both languages. `tests/browser/guides.spec.js` runs every step in Chromium, Firefox and WebKit and checks each `expect`, so write only values you have measured. It then walks the guide again with the page in Chinese: every action must still work, and the page must stay in one language. Write both languages by [docs/writing.md](docs/writing.md).
- Explain why an older approach existed before introducing its modern replacement.
- Keep attribution and folder licenses: the root MIT license does not replace third-party terms (see [NOTICE.md](NOTICE.md)).
- Use made-up data and your own or properly licensed images, fonts and code. Never commit personal information, credentials, databases or build output. Anything listed as `withdrawn` in `docs/migration.json` must not be restored.

## Commits and pull requests

- Write commit messages and pull request titles as [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `ci:` or `chore:`, followed by a short summary.
- Open a branch and a pull request against `main`. The `verify` check must pass and review conversations must be resolved before merging; no approval from another person is required.
- Nothing is published to npm. The live demos are deployed to GitHub Pages from `main` automatically.
