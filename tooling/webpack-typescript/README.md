# Typed React props through Webpack

English | [简体中文](README.zh-Hans.md)

The retained class component requires compiler/framework props and mounts with createRoot. Babel strips TypeScript syntax; it does not type-check. The independent tsc command catches invalid props before Webpack emits the page. Compare this build with the Vite-based component demo.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/webpack-typescript`. Run `npm run dev` and open `http://127.0.0.1:4173/tooling/webpack-typescript/dist/index.html`.

## Read and compare

Start at [src/components/Hello.tsx](src/components/Hello.tsx), [webpack.config.cjs](webpack.config.cjs), [tsconfig.json](tsconfig.json). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../docs/migration.md); [attribution](../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
