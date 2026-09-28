# Agent instructions for Latte Web

- Preserve readable mechanisms and the author's classic approaches. Fix defects without replacing a teaching implementation with the API it explains.
- Keep classic and modern examples distinguishable. Comparisons use the same observable scenario.
- Use Node 24, npm 11, `npm ci` and the root lockfile. Declare each workspace's dependencies explicitly.
- Run `npm run check` and relevant browser/build checks. Update both README languages together.
- Follow `docs/writing.md` for every document: write to readers, not to maintainers or agents, and keep the fixed README sections.
- `docs/catalog.json` is the source of titles, summaries and demo pages; `docs/migration.json` maps the original tree. After editing either, run `npm run docs:generate`. Never edit generated blocks, section indexes or `index.html` by hand.
- Historical references are not runnable or recommended production code. Never make a failing project pass by silently reclassifying it.
- Never restore, link or republish anything marked `withdrawn` in `docs/migration.json`.
- New comments explain rationale in English. Keep examples small, without generic framework infrastructure.
- Use a descriptive branch, Conventional Commits and a PR. Do not bypass main protection or rewrite published history.
- Never commit databases, credentials, personal data, dependencies or build outputs. Only GitHub Pages is deployed automatically; nothing is published to npm.
