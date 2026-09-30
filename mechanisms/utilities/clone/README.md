# Shallow copy vs deep clone

English | [简体中文](README.zh-Hans.md)

Copy an object graph while keeping shared references and cycles, then compare with `structuredClone`. An _object graph_ is an object together with everything it points to.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/utilities/clone/
```

Open the browser console. The page builds an object, `source`, with nested arrays, a DOM element, a function, a symbol key and a property, `circleRef`, that points back to `source` itself, and logs `cloneDeep(source)`. Now type `structuredClone(source)`: it throws a `DataCloneError`, because the built-in cannot copy DOM elements or functions. No install or build is needed: `npm run dev` works right after cloning. You can also open the [live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/clone/index.html).

## How it works

A _shallow copy_ copies only the top level: nested objects are shared by the original and the copy. A _deep clone_ copies the nested objects too. The hard part is that a graph can point to the same object twice, or back to itself.

[clone.js](clone.js) (11 lines) is the shallow copy: it copies each own enumerable property into a new object. The page does not load it.

[clone-deep.js](clone-deep.js) (32 lines) is the deep clone. It keeps a `WeakMap` from each original object to its copy, and checks it before copying anything: an object that was copied already gets the same copy again. That one rule keeps shared references and cycles intact. Two properties that pointed to one object point to one copy, and a property that pointed back to the original points back to the copy.

It copies plain objects, arrays, `Map`, `Set`, `Date` and `RegExp`. Everything else, such as DOM elements, class instances and functions, is kept as it is: the copy points to the same thing as the original. Properties are copied together with their descriptors (whether each one is writable, enumerable and configurable), symbol keys included, and a getter is copied as a getter without being called. Sparse arrays keep their holes.

## Then and now

Deep copies used to be made with `JSON.parse(JSON.stringify(x))` or with a library. The JSON trick turns dates into strings, turns `Map` and `Set` into empty objects, copies a shared object twice and throws on a cycle. Today [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) is built in: all major browsers have had it since 2022, and Node.js since version 17. It keeps cycles, but it copies differently from `cloneDeep` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)): functions and DOM nodes make it throw a `DataCloneError`; getters, setters and property descriptors are not copied; the prototype chain is not copied; and a `RegExp` loses its `lastIndex`.

## Limits

- Anything other than plain objects, arrays, `Map`, `Set`, `Date` and `RegExp` is shared, not copied. That includes typed arrays, `Error` objects and instances of your own classes.
- A frozen object comes out unfrozen: each property keeps its descriptor, but new properties can be added to the copy.
- `clone.js` always returns a plain object, so an array comes back as an object with the keys `0`, `1`, `2` and so on. It also skips symbol keys.

## Checks and credits

- `npm test` runs `cloneDeep` on an object that points to itself, holds one child under two names and under a symbol key, has a `Map` from that child to a `Set` holding it, and has a sparse array. It checks that the copy is a new object, that its cycle points to the copy, that every reference to the child leads to one copied child, that the sparse array keeps its length and its hole, and that `cloneDeep(null)` is `null`. `clone.js` has no unit test. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails if it throws an error or a file does not load.
- The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
