# Publishing a library with webpack

English | [简体中文](README.zh-Hans.md)

Package a tiny number-to-word converter as a library and load it from a separate Node program. A library build produces a file for other code to load, instead of a page.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
node -e "const n = require('./tooling/webpack/library/dist/numbers.cjs'); console.log(n.numToWord(3), n.wordToNum('five'))"
```

The last command prints `Three 5`. There is no web page and no live demo: the library runs in Node.

## How it works

[src/index.js](src/index.js) (11 lines) exports two functions that look words up in [src/ref.json](src/ref.json), a list of the numbers zero to five:

- `numToWord(3)` returns `'Three'`; a number that is not in the list returns `''`.
- `wordToNum('five')` returns `5`, ignoring case; a word that is not in the list returns `-1`.

[webpack.config.cjs](webpack.config.cjs) (13 lines) does not use the shared base configuration, because a library needs no page:

- `target: 'node'` builds for Node instead of a browser.
- `output.library: { type: 'commonjs2' }` turns the exports of `src/index.js` into `module.exports`, so `require` returns an object with `numToWord` and `wordToNum`.
- `output.filename: 'numbers.cjs'` uses the `.cjs` extension, which tells Node that the file is CommonJS, even though this workspace's `package.json` says `"type": "module"`.

webpack copies the JSON into the bundle, so `dist/numbers.cjs` (681 bytes) needs no other file. That matters, because the users of a library receive only the built file: its format and what it needs at run time are part of what you publish, as much as its functions are.

## Then and now

The original version followed the [official guide](https://webpack.js.org/guides/author-libraries/), which, as of 2026-09, still builds a UMD file: one file that works as a global variable, a CommonJS module and an AMD module. It named the library `webpackNumbers`, kept Lodash as an _external_, a dependency that users must install themselves, and set the format with `libraryTarget`, which the [output documentation](https://webpack.js.org/configuration/output/) now asks you to replace with `library.type`. This version drops Lodash and builds CommonJS for Node only.

## Limits

- It knows only the English words for zero to five.
- It is CommonJS for Node only: there is no browser or ES module build, and no TypeScript type definitions.
- It is not published to npm; the test loads it straight from `dist/`.

## Checks and credits

- `npm run test:tooling` loads `dist/numbers.cjs` with `require`, as a separate program would, and checks that `numToWord(0)` is `'Zero'`, `wordToNum('tWo')` is `2` and an unknown word gives `-1`. `npm run check` runs the build first, then this test.
- Based on the official webpack guide [Authoring Libraries](https://webpack.js.org/guides/author-libraries/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
