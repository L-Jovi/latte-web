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
- Explain why an older approach existed before introducing its modern replacement.
- Keep attribution and folder licenses: the root MIT license does not replace third-party terms (see [NOTICE.md](NOTICE.md)).
- Use made-up data and your own or properly licensed images, fonts and code. Never commit personal information, credentials, databases or build output. Anything listed as `withdrawn` in `docs/migration.json` must not be restored.

## Commits and pull requests

- Write commit messages and pull request titles as [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `ci:` or `chore:`, followed by a short summary.
- Open a branch and a pull request against `main`. The `verify` check must pass and review conversations must be resolved before merging; no approval from another person is required.
- Nothing is published to npm. The live demos are deployed to GitHub Pages from `main` automatically.
