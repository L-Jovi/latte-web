# Card and Button, three packaging paths

English | [简体中文](README.zh-Hans.md)

Card retains the original container/CSS role; Button retains its message prop and now forwards native button props. A single click counter consumes both. Vite emits library ESM/CJS plus extracted CSS; Webpack emits CJS and injects CSS when loaded in a browser; Babel transforms JSX while preserving separate modules and CSS imports. React stays external to library bundles. Babel output therefore needs a CSS-aware consumer. Run `npm run build:storybook` at the root, or `npm run storybook -w @latte/components`, for the two authored component stories. Storybook is documentation tooling, not another component implementation.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/components`. Run `npm run dev` and open `http://127.0.0.1:4173/examples/components/dist/demo/index.html`.

## Read and compare

Start at [src/Card.jsx](src/Card.jsx), [src/Button.jsx](src/Button.jsx), [build.mjs](build.mjs), [vite.library.config.js](vite.library.config.js), [webpack.config.cjs](webpack.config.cjs). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../docs/migration.md); [attribution](../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
