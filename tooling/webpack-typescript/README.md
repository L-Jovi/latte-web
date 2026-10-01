# TypeScript and React through webpack

English | [简体中文](README.zh-Hans.md)

See why Babel strips types without checking them, and where `tsc` still fits in. The build turns TypeScript and JSX into JavaScript with Babel, and a separate `tsc` run checks the types.

## Try it

```sh
npm ci
npm run build -w @latte/webpack-typescript
npm run dev
# open http://127.0.0.1:4173/tooling/webpack-typescript/dist/
```

The page shows the heading **Render component from TypeScript and React 19**. You can also open the [live demo](https://l-jovi.github.io/latte-web/tooling/webpack-typescript/dist/index.html).

## How it works

[webpack.config.cjs](webpack.config.cjs) (30 lines) sends every `.ts` and `.tsx` file through `babel-loader` with two presets:

- `@babel/preset-typescript` deletes everything that only describes types, such as the `HelloProps` interface, without checking any of it.
- `@babel/preset-react` turns JSX into function calls; `runtime: 'automatic'` means a file does not need to import React for that.

[src/components/Hello.tsx](src/components/Hello.tsx) (18 lines) is a class component whose props must be two strings, `compiler` and `framework`. [src/index.tsx](src/index.tsx) (5 lines) mounts it with `createRoot`, and HtmlWebpackPlugin adds the script to [index.html](index.html), which provides the `#root` element.

Babel works on one file at a time and never looks at types, so it cannot notice a missing prop. That job belongs to `tsc`: [tsconfig.json](tsconfig.json) sets `noEmit: true`, so `tsc` only checks and writes no files. To see the split, delete `framework="React 19"` from `src/index.tsx` and build again: the build still succeeds, and the heading now ends in "and". Then run `npm run typecheck -w @latte/webpack-typescript`: `tsc` reports that the required `framework` prop is missing.

## Then and now

The original version compiled with `awesome-typescript-loader`, a loader built on the TypeScript compiler, and loaded React 17 as global variables from UMD `<script>` tags. React 19 no longer ships UMD builds and has removed `ReactDOM.render` ([upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)), so this version bundles React and mounts with `createRoot`.

Vite splits the work the same way: its [documentation](https://vite.dev/guide/features#typescript) says it only transpiles `.ts` files, without type checking, and recommends running `tsc --noEmit` alongside the build. [One component library, three builds](../../examples/components/README.md) builds React components with Vite as well as webpack.

## Limits

- The build itself never checks types: `npm run build -w @latte/webpack-typescript` succeeds even with type errors. Only `tsc`, run on its own or through `npm run check`, catches them.
- The class component is kept from the original to show typed props; new React code uses function components and Hooks ([How the ecosystem changed](../../docs/ecosystem.md)).
- There is no development setup: no dev server, source maps or hot reloading.

## Checks and credits

- `npm run check` runs `tsc` for this folder before any build, so a type error stops the check. `npm run test:browser` opens the built page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load; it does not check the heading.
- The [migration ledger](../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
