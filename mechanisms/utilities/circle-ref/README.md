# Detecting circular references

English | [简体中文](README.zh-Hans.md)

Tell a real cycle apart from an object that is referenced twice.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/utilities/circle-ref/
```

Open the browser console. The page builds an object whose `circleRef` property points back to the object itself, and both checks print `true`. No install or build is needed: `npm run dev` works right after cloning. You can also open the [live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/circle-ref/index.html).

## How it works

A _circular reference_, or cycle, is a chain of properties that leads from an object back to itself, as in `obj.circleRef = obj`. An object that is referenced twice is not a cycle: in `{ one: child, two: child }`, following the properties never leads back to the start.

[check-by-iterator.js](check-by-iterator.js) (16 lines) walks through the object and remembers only the objects on the current path, from the top-level object down to the one it is looking at. Meeting an object that is already on the path means there is a way back, so that is a cycle. When the walk is done with an object, it takes the object off the path again. That is why meeting `child` a second time, under `two`, is not a cycle.

The walk looks at the keys and values of a `Map`, the values of a `Set`, and every own property of other objects, including symbol keys. It skips getters, so checking an object never calls one.

[check-by-json-parser.js](check-by-json-parser.js) (5 lines) calls `JSON.stringify` and reports a cycle if it throws. That is only a quick probe: `JSON.stringify` also throws for a `BigInt` value or for a `toJSON` method that throws, so a failure does not prove a cycle.

## Then and now

A common first attempt keeps one list of every object seen so far. It then reports a cycle as soon as two properties point to the same object; the first version of `check-by-iterator.js` worked that way. JavaScript still has no built-in cycle check (as of 2026-09), so a walk that tracks the current path, like this one, is how you find a cycle yourself.

## Limits

- Functions are not walked, so a cycle that passes through a function's properties is not found. Neither is a cycle that can only be reached through a getter.

## Checks and credits

- `npm test` checks `isCycleByIterator` on three cases: an object with two properties pointing to one child is not a cycle; once the child gets a property pointing back to the parent, it is; and `null` is not. `isCycleByJSON` has no unit test. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails if it throws an error or a file does not load; it does not check the output.
- The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
