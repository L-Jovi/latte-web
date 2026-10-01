# What class extends does under the hood

English | [简体中文](README.zh-Hans.md)

Compare `class extends` with old-style function inheritance, including why static members are inherited too. `extends` links two prototype chains; the old pattern links only one.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/fundamentals/javascript/classes/
```

No install or build is needed: `npm run dev` works right after cloning. Open the browser console. It shows `true`, `true` and `false`: the three comparisons in [extends.js](extends.js), explained below. You can also open the [live demo](https://latte.jovipro.com/fundamentals/javascript/classes/index.html).

## How it works

Every object has a prototype: the object it falls back to when a property is missing. A constructor is an object too, so it has a prototype of its own. [extends.js](extends.js) (18 lines) compares the two styles:

1. `class C__Sub extends C__Super` sets two links. Instances of `C__Sub` fall back to `C__Super.prototype`, and `C__Sub` itself falls back to `C__Super`. The first line, `C__Sub.__proto__ === C__Super`, is `true`.
2. The old style, `Sub.prototype = new Super()`, sets only the first link. `Sub` itself still falls back to `Function.prototype`, like any other function: the second line is `true`, and the third, `Sub.__proto__ === Super`, is `false`.

The second link is why static members are inherited. A static member is a property of the class itself rather than of its instances, such as a `C__Super.create()` helper. `C__Sub.create` would find it through that link, while in the old style `Sub.create` would be `undefined`. The file defines no static members; the comparisons show the link that makes this work.

## Then and now

Before ES2015 added [`class`](https://262.ecma-international.org/6.0/#sec-class-definitions), inheritance was written by hand, as in the second half of extends.js. Today `extends` sets both links for you ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)). The file reads prototypes through `__proto__`, an old accessor that is now deprecated; in new code, read them with `Object.getPrototypeOf(C__Sub)` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)).

## Limits

- The example stops at the prototype links. It does not show `super` calls, fields or private members.
- In the old pattern, `new Super()` runs the parent constructor only to create a prototype object. Here that is harmless, because `Super` is empty.

## Checks and credits

- No unit test covers this file. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and checks that it loads without errors.
- The [migration ledger](../../../docs/migration.md) links to the original version, which lived in `es-feature/class`.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
