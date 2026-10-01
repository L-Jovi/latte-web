# How generators pause and resume

English | [简体中文](README.zh-Hans.md)

See the state machine that Babel turns `yield` into, and how values flow in and out.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/generator/
```

It works right after cloning; no `npm ci` or build step is needed. The page calls `next()` twice on a native generator and twice on a hand-made one, and prints both results. They match: first `{ value: 1, done: false }`, then `{ value: 5, done: true }`. The first call stops at `yield 1`. The second call sends in `3`, which comes back out as `3 + 2`. You can also open the [live demo](https://latte.jovipro.com/mechanisms/generator/index.html).

Then open the browser console and load [transformed.html](transformed.html) from the same folder ([live demo](https://latte.jovipro.com/mechanisms/generator/transformed.html)). It runs the code Babel produced for a generator and logs `param-a this is a`, `param-b this is b` and `undefined this is c`.

## How it works

A generator function stops at each `yield` and continues from the same spot when you call `next()`. To do that, it has to remember where it stopped, like a bookmark. That bookmark is usually called the _program counter_.

[forge.js](forge.js) (13 lines) makes the bookmark visible. `forgeGenerator(step)` keeps a small `context` object:

- `next` says where to continue.
- `sent` holds the value passed to `next(value)`.
- `done` is set by `stop()`.

Each call to `next(value)` stores the value in `context.sent` and calls `step(context)`. The step function is a `switch` on `context.next` that jumps to the right place. Because `done` is a separate flag, a step can yield `undefined` without ending the iterator.

[transform-generator.js](transform-generator.js) (50 lines) is the same idea at full size: the code Babel produced for the `genn` generator in [index.js](index.js). `_context.next` is the program counter, each `case` label is a place where the function can continue, `_context.sent` holds the value passed to `next()`, and `_context.abrupt("return", …)` finishes the generator. [regenerator-runtime.js](regenerator-runtime.js) (317 lines) supplies `_regeneratorRuntime()`, which drives this `switch`.

[index.js](index.js) (34 lines) holds the native generators to compare with. Run it with `node mechanisms/generator/index.js`: `testGen(5)` yields `6` and `8`, then returns `39`.

## Then and now

Generators became part of JavaScript in ES2015 ([specification](https://262.ecma-international.org/6.0/)). Current browsers run them natively, so code built for them doesn't need regenerator-runtime.js. The compiled `switch` still shows how code built for older browsers paused and resumed.

## Limits

- forge.js handles only `next()` and the values sent in. Real generators also have `throw()` and `return()`, and run `finally` blocks; forge.js has none of these.
- You write the `switch` in the step function by hand; nothing generates it for you.
- transform-generator.js and regenerator-runtime.js are historical Babel output, kept to read and compare. They are not meant for new code.

## Checks and credits

- `npm test` checks that the hand-made iterator can yield `undefined` without finishing, that the value sent with `next(7)` comes back out, and that the next call reports `done`. `npm run test:browser` loads both pages in Chromium, Firefox and WebKit and fails if either throws an error.
- transform-generator.js names [this article on Zhihu](https://zhuanlan.zhihu.com/p/473245486) as its source.
- regenerator-runtime.js comes from Facebook's regenerator project (MIT, Copyright (c) 2014-present, Facebook, Inc.). It keeps its original notice, and the license is in [LICENSE.regenerator](LICENSE.regenerator).
- Original code is MIT; see [NOTICE.md](../../NOTICE.md). The [migration ledger](../../docs/migration.md) links to the original version.
