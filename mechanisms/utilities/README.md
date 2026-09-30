# Everyday utilities by hand

English | [简体中文](README.zh-Hans.md)

Debounce, throttle, deep clone and more, written as short algorithms with clear limits. Each one has its own folder, page and README.

## Try it

```sh
npm run dev
# open any page below, for example http://127.0.0.1:4173/mechanisms/utilities/debounce/
```

No install or build is needed: `npm run dev` works right after cloning. Most pages print their results in the browser console. To run the checks for all of them, use `npm test`; it also needs nothing but Node.

## How it works

Each folder holds one idea:

- [Debounce](debounce/README.md): wait until a burst of calls stops, then run once.
- [Throttle](throttle/README.md): run at most once per interval; the first call goes through right away.
- [Shallow copy vs deep clone](clone/README.md): copy an object graph while keeping shared references and cycles, then compare with `structuredClone`.
- [Detecting circular references](circle-ref/README.md): tell a real cycle apart from an object that is referenced twice, and see why a failing `JSON.stringify` does not prove a cycle.
- [Why timers drift, and how to correct them](timer/README.md): measure how late timer callbacks arrive and adjust the next deadline.
- [Thousands separators without losing precision](format/README.md): group the digits of a number string without converting it to `Number`.
- [add(1)(2)(3): currying and type coercion](add/README.md): keep a running total in a closure, and see how a function turns into a number.

Two smaller files sit directly in this folder, without a page:

- [check-type.js](check-type.js) (2 lines): `isType('String')` returns a function that checks a value's type with `Object.prototype.toString.call(value)`, which gives strings such as `[object String]`. Run `node mechanisms/utilities/check-type.js` from the repository root; it prints `true`.
- [read-array.js](read-array.js) (9 lines): `createArrayReader(array)` returns `read(count)`. Each call hands out the next `count` items (one by default), and `[]` once the array is used up. The position lives in a closure, so two readers on the same array do not disturb each other, and `Array.prototype` is left alone. A `count` that is not a positive whole number throws a `RangeError`.

## Then and now

Several of these jobs now have a built-in answer: `structuredClone` for deep copies, `Intl.NumberFormat` for formatting numbers and `requestAnimationFrame` for animation timing. Debounce and throttle are still not part of JavaScript (as of 2026-09); libraries such as lodash provide them. To read an array one item at a time, the array's own iterator, as used by a `for…of` loop, is usually enough. The original version of `read-array.js` added a `getReader` method to `Array.prototype`; this one leaves the built-in prototype unchanged.

## Limits

- These are separate small files, not one library. Each has its own page and limits, and none is packaged for installation.
- `read-array.js` reads the array itself, not a copy: if the array changes between reads, later reads see the change.
- `isType` trusts `Object.prototype.toString`, which an object can change through `Symbol.toStringTag`: `isType('String')({ [Symbol.toStringTag]: 'String' })` is `true`.

## Checks and credits

- `npm test` has checks for every utility here except `add`; each README says what they cover. For the two files above, it checks that `isType('String')('test')` is `true`, that two readers on the same array keep separate positions, and that a count of `0` throws. `npm run test:browser` opens every utility page in Chromium, Firefox and WebKit and fails if a page throws an error or a file does not load.
- The [migration ledger](../../docs/migration.md) links to the original version, the `toolkit` folder.
- Original code is MIT. `debounce/lodash-debounce.js` is adapted from lodash, also MIT; see [NOTICE.md](../../NOTICE.md).
