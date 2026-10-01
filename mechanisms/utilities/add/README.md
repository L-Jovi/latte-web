# add(1)(2)(3): currying and type coercion

English | [简体中文](README.zh-Hans.md)

Keep a running total in a closure, and see how a function turns into a number. _Currying_ means passing arguments through a chain of calls instead of all at once; _type coercion_ is JavaScript converting a value to another type on its own.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/utilities/add/
```

Open the browser console. The page logs three chained calls, but the console shows functions, not numbers: Chromium, for example, prints each function's source code. Convert them yourself instead. Type `String(addMutiplyParams(1, 2)(3))` and you get `'6'`; `String(addMutiplyParams(1, 2, 3)(5, 7)())` gives `'18'`. No install or build is needed: `npm run dev` works right after cloning. You can also open the [live demo](https://latte.jovipro.com/mechanisms/utilities/add/index.html).

## How it works

[add-mutiply.js](add-mutiply.js) (30 lines) has two versions:

- `addSimpleParam(a)` takes one number per call. It returns a function, `sum`, that adds the next number to `a` and returns itself, so the calls can go on: `addSimpleParam(1)(2)(3)`. The running total `a` lives in a _closure_: the variables a function keeps from the place where it was created.
- `addMutiplyParams(...)` takes any number of arguments per call, as in `addMutiplyParams(1, 2, 3)(5, 7)()`. Each call returns a new function that remembers all the numbers so far. With no numbers at all, the total is `0`.

Both put their own `toString` method on the function, and it returns the total. When JavaScript needs a plain value from a function, as in `String(fn)`, `fn + ''` or `fn == 6`, it ends up calling `toString` and gets the number. That automatic conversion is the type coercion in the title.

## Then and now

This is a puzzle about how JavaScript converts values, not a way to add numbers. In application code, an explicit function that returns a number, such as `sum(1, 2, 3)`, is clearer.

## Limits

- Numbers only. With a string, `+` joins text instead: `String(addMutiplyParams('1', 2))` gives `'012'`.
- `addSimpleParam` changes one shared total, so a chain cannot be reused: after `const s = addSimpleParam(1); s(2); s(10)`, `String(s)` is `'13'`. `addMutiplyParams` builds a new function on every call, so it does not have this problem.

## Checks and credits

- No unit test covers these two functions. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails if it throws an error or a file does not load; it does not check the numbers.
- The two solutions follow the page on muyiy.cn linked in the first line of `add-mutiply.js`. The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
