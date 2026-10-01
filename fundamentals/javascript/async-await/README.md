# Promise chains vs async/await

English | [简体中文](README.zh-Hans.md)

The same two-step calculation written with `.then()` and with `await`. Both versions start from `2`, multiply it by `3`, and return a promise for `6`.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/fundamentals/javascript/async-await/
```

No install or build is needed: `npm run dev` works right after cloning. The page shows `6 = 6`, the result of each version side by side. You can also open the [live demo](https://l-jovi.github.io/latte-web/fundamentals/javascript/async-await/index.html).

## How it works

Everything is in one `<script>` in [index.html](index.html):

- `chain()` returns `Promise.resolve(2).then(value => value * 3)`. Each `.then()` returns a new promise for its callback's result.
- `withAwait()` is an `async` function. `await Promise.resolve(2)` pauses the function until the promise settles, then gives back `2`, and the function returns `value * 3`. An `async` function always returns a promise, so the caller gets a promise for `6` here too.
- `Promise.all` waits for both promises and writes their results into the page.

`await` pauses only the `async` function it is in. The rest of the page keeps running, and the paused function continues later as a _microtask_, a small job that runs as soon as the current code has finished. `await` does not move heavy work off the main thread: a long calculation inside an `async` function still blocks the page.

## Then and now

`Promise` became part of JavaScript in ES2015, and `async`/`await` followed in ES2017; [How the ecosystem changed](../../../docs/ecosystem.md) tells the longer story. Both styles run natively in all major browsers and in Node.js, so use whichever makes the order of the steps clearest. To see when promise callbacks and paused functions actually run, continue with [Event propagation and the event loop](../../events/README.md); to see how a promise works inside, read [Promise from scratch](../../../mechanisms/promise/README.md).

## Limits

- Both versions succeed, so the page does not compare error handling with `.catch()` and with `try`/`catch`.
- The calculation is instant, so the page cannot show the rest of the page running while a function waits.

## Checks and credits

- No unit test covers this page. `npm run test:browser` opens it in Chromium, Firefox and WebKit and checks that it loads without errors.
- The [migration ledger](../../../docs/migration.md) links to the original version in `es-feature/async+await`.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
