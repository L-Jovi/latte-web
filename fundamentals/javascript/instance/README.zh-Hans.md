# 手写 new 与 instanceof

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

自己实现 new 和 instanceof：创建对象、执行构造函数、沿原型链查找。`forgeNew` 和 `forgeInstanceof` 这两个小函数，手工完成了这两个运算符替你做的事。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/fundamentals/javascript/instance/
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。打开浏览器控制台：`forgeNew(Test, 'saber', 12)` 执行构造函数，构造函数打印出 `new init list:  saber 12`；接着新对象调用从 `Test.prototype` 继承来的方法 `foobar`，打印出 `12`。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/fundamentals/javascript/instance/index.html)。

这个页面没有加载 `forgeInstanceof`，不过 `/fundamentals/javascript/` 那个页面加载了。在那个页面的控制台里，`forgeInstanceof([], Array)` 返回 `true`，`forgeInstanceof(1, Number)` 返回 `false`。

## 原理

`new Test('saber', 12)` 做了三件事，[new.js](new.js)（10 行）把它们一一写了出来：

1. 用 `Object.create` 创建一个空对象，它的原型是 `Test.prototype`。
2. 用 `Constructor.apply(obj, args)` 执行 `Test`，并把这个对象作为 `this`。
3. 返回这个新对象；但如果构造函数返回了另一个对象或函数，就改为返回那个值。返回 `null` 或 `5` 这样的原始值，不会替换掉新对象。

`instanceof` 判断的是：`Constructor.prototype` 是否出现在对象的原型链上。原型链就是对象的原型、原型的原型……一直到 `null` 为止。[instanceof.js](instanceof.js)（13 行）用 `Object.getPrototypeOf` 沿着这条链往上找，直到找到 `Constructor.prototype` 或走到尽头。如果左边是 `1` 这样的原始值，直接返回 `false`。

## 过去与现在

这个页面创建对象的方式，是 ES2015 加入 [`class`](https://262.ecma-international.org/6.0/#sec-class-definitions) 之前 JavaScript 的做法：一个构造函数，方法放在它的 `prototype` 上。class 在底层也是这样创建对象的，具体见 [class extends 背后做了什么](../classes/README.zh-Hans.md)。在应用代码里，请直接使用 `new`、`class` 和 `instanceof`；这两个函数只是把运算符平时藏起来的步骤摊开给你看。

## 刻意省略

- `forgeNew` 只支持普通的构造函数。传入 class 会抛出 `TypeError`，因为 class 的构造函数不用 `new` 就不能执行。绑定过的函数和箭头函数会被拒绝，因为它们没有 `prototype`。
- `forgeInstanceof` 只沿原型链查找。它不理会 [`Symbol.hasInstance`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance)（对象可以用它自行决定 `instanceof` 的结果）；遇到绑定过的函数时它会抛错，而内置的 `instanceof` 可以正常处理。

## 验证与来源

- `npm test` 检查：构造函数返回 `null` 时仍然得到新对象，返回对象或函数时则会被替换。它还检查 `forgeInstanceof(null, Object)` 为 `false`、`forgeInstanceof([], Object)` 为 `true`，也就是说查找会越过 `Array.prototype`，一直找到 `Object.prototype`。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，检查页面能正常加载、没有报错。
- [迁移清单](../../../docs/migration.zh-Hans.md)链接到原始版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
