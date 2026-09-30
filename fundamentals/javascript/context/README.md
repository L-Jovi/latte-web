# call, apply and bind by hand

English | [简体中文](README.zh-Hans.md)

Rebuild `call`, `apply` and `bind` to see how a function decides what `this` is. The object a function is called on, its _receiver_, becomes `this`; these three methods let you choose that object yourself.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/fundamentals/javascript/context/
```

No install or build is needed: `npm run dev` works right after cloning. Open the browser console. `forgeCall`, `forgeApply` and `forgeBind` each call a function `test` with `{name: 'saber'}` as `this`, so every block logs `saber` and then `foobar`, its two arguments joined. The last part of the page calls a bound function with `new` and logs `undefined`, `daisy`, `18`, `shopping` and `kevin`. You can also open the [live demo](https://l-jovi.github.io/latte-web/fundamentals/javascript/context/index.html).

## How it works

JavaScript sets `this` from the way a function is called: in `obj.method()`, `this` is `obj`. [call.js](call.js) (16 lines) uses exactly that rule:

1. Put the function on the receiver for a moment, under a new `Symbol` key. Every symbol is unique, so the key can never overwrite a property the object already has.
2. Call it as `receiver[key](...args)`, so `this` is the receiver.
3. Delete the key in a `finally` block, so the object is cleaned up even if the function throws.

If the receiver is `null` or `undefined`, `globalThis` is used instead, and a primitive such as `5` is wrapped in an object first. [apply.js](apply.js) (16 lines) does the same but takes the arguments as one array-like list.

[bind.js](bind.js) (20 lines) calls nothing yet. It returns a new function that remembers the receiver and the arguments given so far, and adds the rest when it is called. When the bound function is called with `new`, it ignores the remembered receiver and uses the new object instead, as the built-in `bind` does. That is why the last part of the page logs `undefined` for `this.value`. Objects created this way inherit from the original function's prototype, so `instanceof` still works. That last part uses the built-in `bind`; change `bar.bind` to `bar.forgeBind` and the output stays the same.

## Then and now

Use the built-in `Function.prototype.call`, `apply` and `bind` in real code, and compare their output with these versions. Two other features cover many of their jobs today. Spread syntax, `fn(...args)`, does in general what `fn.apply(null, args)` does ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)). Arrow functions take `this` from the code around them, so `call`, `apply` and `bind` cannot change it ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)).

## Limits

- Putting the function on the receiver only models how `this` works outside strict mode. The model always wraps primitives and replaces `null` or `undefined` with `globalThis`; in strict mode, the built-in methods pass them through unchanged.
- It cannot add the temporary key to a frozen object, so calling a function on one throws a `TypeError`.
- `forgeBind` handles ordinary function constructors, not classes or built-in constructors with special internals. Calling a bound class with `new` throws, and a bound `Date` creates an object that passes `instanceof Date` but is not a real date.

## Checks and credits

- `npm test` checks that `forgeCall` and `forgeApply` leave an existing property alone and remove their temporary key even when the function throws. It also checks that `new` on a `forgeBind` function combines both sets of arguments, ignores the bound receiver, creates an `instanceof` the original function, and leaves the `constructor` on the original prototype untouched. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and checks that it loads without errors.
- bind.js is based on [mqyqingfeng's article on writing your own bind](https://github.com/mqyqingfeng/Blog/issues/12), which is also where the `new` example on the page comes from. The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
