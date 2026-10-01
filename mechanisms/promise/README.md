# Promise from scratch

English | [简体中文](README.zh-Hans.md)

Grow a Promise in three steps, from a tiny state machine to a version that passes all 872 official Promises/A+ tests.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/promise/
```

The page chains two `then` calls and shows `1,2`. You can also open the [live demo](https://latte.jovipro.com/mechanisms/promise/index.html).

To run the official test suite against the full version:

```sh
npm ci
npm run test:aplus
```

It should finish with `872 passing`.

## How it works

A promise is a small state machine. It starts as _pending_ and settles exactly once: _fulfilled_ with a value, or _rejected_ with a reason. Callbacks registered with `then` wait in a queue and always run later, as microtasks, never in the middle of your code.

Read the three versions in order:

1. [simple.js](simple.js) (23 lines) has only the state machine and the queue. `then` returns the same promise, so it cannot chain yet.
2. [promise-a+.js](promise-a+.js) (59 lines) adds the _resolution procedure_. `then` returns a new promise, and if a callback returns another promise (or any object with a `then` method), the new promise takes on its result. It also rejects a promise that tries to resolve to itself, and reads `then` only once. This is the version that passes the official tests.
3. [index.js](index.js) is the repository's original class-based version, with `all`, `race` and `finally` added.

The [samples page](samples/index.html) logs a set of nested `then` callbacks. Guess the order first, then open the browser console.

## Then and now

Before 2015, promises came from libraries such as Q and Bluebird, and the community specification [Promises/A+](https://promisesaplus.com/) made them work together. ES2015 added `Promise` to JavaScript, and ES2017 added `async`/`await`, which is built on promises. Use the native versions in real code. [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story.

## Limits

- `simple.js` is incomplete on purpose: no chaining, and it does not take on the result of another promise.
- `promise-a+.js` covers what the specification defines, `then` (plus `catch`). It has no `resolve`, `reject`, `all` or `race` helpers.
- `index.js` adds `all`, `race` and `finally`, but only `promise-a+.js` runs against the full test suite.
- None of them is meant for production: the native `Promise` is faster and far better tested.

## Checks and credits

- `npm run test:aplus` runs the unmodified [Promises/A+ test suite](https://github.com/promises-aplus/promises-tests) against `promise-a+.js`. The suite's old test runner is pinned to patched versions of Mocha and Underscore through `overrides` in the root `package.json`. The adapter loads the file in the test runner's own context, so the suite's `TypeError` checks work as the specification expects.
- `npm test` checks the other two versions, and `npm run test:browser` opens this page in Chromium, Firefox and WebKit.
- The class-based version first followed [this article on Zhihu](https://zhuanlan.zhihu.com/p/58428287); the nested-callback quiz comes from [this article on Juejin](https://juejin.cn/post/6844904158848352264).
- Original code is MIT; see [NOTICE.md](../../NOTICE.md) for third-party material.
