# new and instanceof by hand

English | [简体中文](README.zh-Hans.md)

Rebuild `new` and `instanceof`: create the object, run the constructor, walk the prototype chain. Two short functions, `forgeNew` and `forgeInstanceof`, do by hand what the two operators do for you.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/fundamentals/javascript/instance/
```

No install or build is needed: `npm run dev` works right after cloning. Open the browser console. `forgeNew(Test, 'saber', 12)` runs the constructor, which logs `new init list:  saber 12`; then the new object calls `foobar`, a method it inherits from `Test.prototype`, which logs `12`. You can also open the [live demo](https://latte.jovipro.com/fundamentals/javascript/instance/index.html).

This page does not load `forgeInstanceof`, but the page at `/fundamentals/javascript/` does. In that page's console, `forgeInstanceof([], Array)` returns `true` and `forgeInstanceof(1, Number)` returns `false`.

## How it works

`new Test('saber', 12)` does three things, and [new.js](new.js) (10 lines) writes them out:

1. Create an empty object whose prototype is `Test.prototype`, with `Object.create`.
2. Run `Test` with that object as `this`, with `Constructor.apply(obj, args)`.
3. Return the new object, unless the constructor returned another object or a function; then return that instead. Returning `null` or a primitive such as `5` does not replace the new object.

`instanceof` asks whether `Constructor.prototype` appears in the object's _prototype chain_: the object's prototype, that prototype's prototype, and so on until `null`. [instanceof.js](instanceof.js) (13 lines) follows the chain with `Object.getPrototypeOf` until it finds `Constructor.prototype` or reaches the end. A primitive on the left, such as `1`, returns `false` straight away.

## Then and now

The page builds its object the way JavaScript did before ES2015 added [`class`](https://262.ecma-international.org/6.0/#sec-class-definitions): a constructor function, with methods on its `prototype`. A class creates objects the same way underneath; [What class extends does under the hood](../classes/README.md) shows how. In application code, use `new`, `class` and `instanceof`; these functions only show the steps the operators normally hide.

## Limits

- `forgeNew` handles ordinary function constructors only. A class throws a `TypeError`, because a class constructor cannot run without `new`. Bound functions and arrow functions are rejected, because they have no `prototype`.
- `forgeInstanceof` only walks the prototype chain. It ignores [`Symbol.hasInstance`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance), which lets an object decide the answer to `instanceof` itself, and it throws for a bound function, which the built-in `instanceof` accepts.

## Checks and credits

- `npm test` checks that a constructor returning `null` still gives the new object, while returning an object or a function replaces it. It also checks that `forgeInstanceof(null, Object)` is `false` and `forgeInstanceof([], Object)` is `true`, which means the walk goes past `Array.prototype` to `Object.prototype`. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and checks that it loads without errors.
- The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
