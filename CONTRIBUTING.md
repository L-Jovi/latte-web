# Contributing

Thanks for helping. This repository explains one idea at a time, so a small, correct example with clear limits is worth more than a large, unfinished one.

## Before you start

- Use Node 24 LTS and npm 11, then run `npm ci`.
- Follow the README of the example you are changing.

## Making a change

- Run `npm run check` and any browser or build checks that apply. In the pull request, say what you ran and what you could not run.
- Update the English README and its Chinese mirror (`README.zh-Hans.md`) together, following the [writing guide](docs/writing.md).
- When you add or rename an example, edit `docs/catalog.json` and run `npm run docs:generate`. Do not edit the generated learning-path block in the root READMEs, the section indexes or `index.html` by hand; `npm run check:docs` will catch it.
- Every demo page shares `assets/site.css` and a top bar. `npm run docs:generate` writes them into `<!-- latte-site:… -->` blocks in each page or template; built pages get them from `scripts/site.cjs`. Change those two files, not the blocks.
- A page can have a step-by-step guide beside it: `assets/guides/<page path>.json`, for example `assets/guides/fundamentals/css/bfc/bfc.json` for `fundamentals/css/bfc/bfc.html`. `npm run docs:generate` adds `assets/guide.js` to every page that has one. The guide opens in English and has a button that switches it to Chinese; the reader's choice is kept for the next page. Each step has `title`, `titleZh`, `text` and `textZh`, and may have:
  - `action`, applied in this order: `clear` (empty the guide's console first), `fill` (`target`, `value`: types into a field), `click` (a selector), `clickText` (the exact text of a button or link on the page), `run` (statements in the page's global scope) and `toggle` (`target`, `property`, `on`, `off`: a style the step switches, restored when the reader moves on);
  - `actionLabel` and `actionLabelZh`, the button text, required when there is an action;
  - `watch`: `label` (with an optional `labelZh`) and `value` (an expression), with an optional `expect`. The panel reads each value again whenever the page changes, so a value that arrives late, after a fetch or a render, still shows;
  - `focus`, the selector of the part of the page the step is about;
  - `highlight`, text to mark in the guide's console;
  - `expectConsole` (one string that some line contains, or a list of the first lines) and `absentConsole` (text that must not appear).
    `npm run check:docs` checks that the page is in the catalog and that every step has both languages. `tests/browser/guides.spec.js` runs every step in Chromium, Firefox and WebKit and checks each `expect`, so write only values you have measured. Write both languages by [docs/writing.md](docs/writing.md).
- Explain why an older approach existed before introducing its modern replacement.
- Keep attribution and folder licenses: the root MIT license does not replace third-party terms (see [NOTICE.md](NOTICE.md)).
- Use made-up data and your own or properly licensed images, fonts and code. Never commit personal information, credentials, databases or build output. Anything listed as `withdrawn` in `docs/migration.json` must not be restored.

## Commits and pull requests

- Write commit messages and pull request titles as [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `ci:` or `chore:`, followed by a short summary.
- Open a branch and a pull request against `main`. The `verify` check must pass and review conversations must be resolved before merging; no approval from another person is required.
- Nothing is published to npm. The live demos are deployed to GitHub Pages from `main` automatically.
