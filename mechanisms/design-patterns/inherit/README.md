# Prototype inheritance, including the mistakes

English | [简体中文](README.zh-Hans.md)

See what goes wrong with a shared prototype or a borrowed constructor, and how `Object.create` fixes it.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/design-patterns/inherit/
```

It works right after cloning; no `npm ci` or build step is needed. Open the browser console. It shows `animal` from prototype.js, then `1` and `true` from combination.js. The page loads each file as a module, so both files can use names such as `Parent` and `Child` without clashing. You can also open the [live demo](https://latte.jovipro.com/mechanisms/design-patterns/inherit/index.html).

The page doesn't load prototype-obj.js. Run it with `node mechanisms/design-patterns/inherit/prototype-obj.js`; it prints `animal`.

## How it works

Inheritance in JavaScript means linking prototypes: when an object doesn't have a property, JavaScript looks for it on the object's prototype, then on that prototype's prototype, and so on. Each file links a `Child` to a `Parent` in a different way.

[prototype.js](prototype.js) (24 lines) shares one prototype: `Child.prototype = Parent.prototype`. Reading works (`c.species` is `'animal'`), but the two constructors now use the same object. Setting `Child.prototype.constructor = Child` also changes `Parent`'s, so `new Parent().constructor` is `Child`, and any method added for `Child` appears on `Parent` too.

[combination.js](combination.js) (83 lines) holds three versions:

1. **Borrowed constructor plus a parent instance.** `Parent.call(this, value)` runs the parent constructor on each new child, so every child gets its own `val`. `Child.prototype = new Parent()` links the prototypes. It works (`child.getValue()` logs `1`, and `child instanceof Parent` is `true`), but the parent constructor runs one extra time just to build the prototype, which leaves an unused `val` on `Child.prototype`, and `child.constructor` is `Parent`.
2. **The fix.** `Son` borrows the constructor the same way, but builds its prototype with `Object.create(Father.prototype, …)`. That links to the parent's prototype without calling `Father`, and defines a hidden (non-enumerable) `constructor` that points back to `Son`.
3. **A helper.** `inherit(child, parent)` does the same with `Object.create` and copies across any methods already on the child's prototype. It sets `constructor` with a plain assignment, so unlike in version 2, `constructor` shows up in `Object.keys(Cat.prototype)`.

[prototype-obj.js](prototype-obj.js) (29 lines) gets the same link without `Object.create`: an empty function `F` shares the parent's prototype, so `new F()` creates a linked object without running `Parent`.

## Then and now

Today you write `class Child extends Parent` and call `super()` in the constructor. The class syntax links the prototypes and sets `constructor` for you, but underneath it still uses the same prototype links. [What class extends does under the hood](../../../fundamentals/javascript/classes/README.md) compares the two styles.

## Limits

- The page logs only a few values. The problems described above are visible in the code, not on the page.
- None of these versions links the constructors themselves, so properties set directly on `Parent` (static members) are not inherited. `class extends` links those too, as the class example shows.

## Checks and credits

- No automated test checks these files. `npm run test:browser` loads the page in Chromium, Firefox and WebKit and fails if it throws an error.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md). The [migration ledger](../../../docs/migration.md) links to the original version.
