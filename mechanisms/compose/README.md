# Function composition (compose)

English | [简体中文](README.zh-Hans.md)

The `compose` helper behind Redux middleware, written by hand. _Composing_ functions means feeding the result of one into the next: `compose(f, g)(x)` is `f(g(x))`.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/compose/
```

The page shows `108`. It runs `forgeCompose((x) => x - 2, (x) => x + 10, (x) => x * 10)(10)`, and the functions run from right to left: 10 × 10 = 100, then 100 + 10 = 110, then 110 − 2 = 108. No install or build is needed: `npm run dev` works right after cloning. You can also open the [live demo](https://l-jovi.github.io/latte-web/mechanisms/compose/index.html).

## How it works

[index.js](index.js) (8 lines) uses `reduce` to fold the list of functions into one. Each step wraps what it has so far around the next function: `(...args) => outer(inner(...args))`. Three details follow from that:

- The functions run from right to left, in the same order as the nested call `f(g(h(x)))`.
- The rightmost function runs first and receives all the arguments. Every other function receives one value: the result of the function to its right.
- With no functions, `forgeCompose()` returns the _identity_ function, which gives back its argument unchanged. With one function, it returns that function itself.

Redux's own [`compose`](https://github.com/reduxjs/redux/blob/master/src/compose.ts) behaves the same way.

## Then and now

Redux includes `compose` as a convenience. Its `applyMiddleware` uses `compose` to wrap `store.dispatch` in each middleware in turn ([source](https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.ts)). In a hand-written store setup, you call `compose` yourself to apply several _store enhancers_ (functions that add features to a store) in a row ([Redux docs](https://redux.js.org/api/compose)). Today Redux Toolkit is the official way to write Redux, and its `configureStore` composes the middleware and DevTools enhancers for you ([Redux docs](https://redux.js.org/introduction/why-rtk-is-redux-today)).

## Limits

- This is only `compose`: there is no store, no `dispatch` loop and no middleware here. The [Redux documentation](https://redux.js.org/api/compose) shows how `compose` fits into a chain of store enhancers.

## Checks and credits

- `npm test` checks that `forgeCompose()` returns its argument unchanged, and that the innermost function receives both arguments: `forgeCompose((x) => x * 2, (a, b) => a + b)(3, 4)` gives `14`. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails if it throws an error or a file does not load; it does not check the number on the page.
- This example started as a folder called `redux-scratch`, but what it actually showed was `compose`: one version fixed to three functions, and a `reduce` version that passed on only one argument. Neither handled an empty list. The [migration ledger](../../docs/migration.md) links to it.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
