# 手写 call、apply 与 bind

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

自己实现 call、apply 和 bind，看懂函数调用时 this 是怎么确定的。函数是在哪个对象上被调用的，这个对象（称为“接收者”，receiver）就是 `this`；这三个方法让你自己指定这个对象。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/fundamentals/javascript/context/
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。打开浏览器控制台：`forgeCall`、`forgeApply`、`forgeBind` 都以 `{name: 'saber'}` 作为 `this` 调用函数 `test`，所以每一段都先打印 `saber`，再打印 `foobar`（两个参数拼在一起）。页面最后一部分用 `new` 调用一个绑定过的函数，依次打印 `undefined`、`daisy`、`18`、`shopping`、`kevin`。也可以直接打开[在线演示](https://latte.jovipro.com/fundamentals/javascript/context/index.html)。

## 原理

JavaScript 根据函数的调用方式来确定 `this`：在 `obj.method()` 里，`this` 就是 `obj`。[call.js](call.js)（16 行）正是利用了这条规则：

1. 用一个新的 `Symbol` 作为键，把函数临时挂到接收者上。每个 Symbol 都独一无二，所以这个键绝不会覆盖对象原有的属性。
2. 以 `receiver[key](...args)` 的形式调用它，这样 `this` 就是接收者。
3. 在 `finally` 里删掉这个键，即使函数抛出异常，对象也会被清理干净。

如果接收者是 `null` 或 `undefined`，就改用 `globalThis`；如果是 `5` 这样的原始值，会先把它包装成对象。[apply.js](apply.js)（16 行）做的事情一样，只是参数以一个类数组的列表传入。

[bind.js](bind.js)（20 行）暂时什么都不调用。它返回一个新函数，这个函数记住了接收者和已经传入的参数，被调用时再补上其余参数。如果用 `new` 调用这个绑定后的函数，它会忽略记住的接收者，改用新创建的对象，和内置的 `bind` 一样。这就是页面最后一部分打印出 `undefined`（`this.value`）的原因。这样创建出来的对象继承自原函数的原型，所以 `instanceof` 依然成立。页面最后一部分用的是内置的 `bind`；把 `bar.bind` 换成 `bar.forgeBind`，输出完全一样。

## 过去与现在

实际项目里请使用内置的 `Function.prototype.call`、`apply` 和 `bind`，并拿它们的输出和这里的版本对照。如今另外两个特性承担了它们的不少工作。展开语法 `fn(...args)` 一般情况下等价于 `fn.apply(null, args)`（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)）。箭头函数的 `this` 来自它外层的代码，`call`、`apply`、`bind` 都改变不了它（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)）。

## 刻意省略

- 把函数临时挂到接收者上，只模拟了非严格模式下 `this` 的行为。这个模型总是包装原始值，并用 `globalThis` 代替 `null` 或 `undefined`；而在严格模式下，内置方法会原样传入这些值。
- 它无法往冻结的对象上添加临时键，所以在冻结对象上调用函数会抛出 `TypeError`。
- `forgeBind` 只支持普通的构造函数，不支持 class，也不支持内部结构特殊的内置构造函数。用 `new` 调用绑定后的 class 会抛错；绑定 `Date` 后创建的对象能通过 `instanceof Date`，却不是真正的日期对象。

## 验证与来源

- `npm test` 检查 `forgeCall` 和 `forgeApply` 不会改动对象原有的属性，并且即使函数抛出异常，也会删掉临时键。它还检查：用 `new` 调用 `forgeBind` 返回的函数时，两批参数会合并在一起、绑定的接收者被忽略、创建出的对象是原函数的 `instanceof`，而且原函数原型上的 `constructor` 保持不变。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，检查页面能正常加载、没有报错。
- bind.js 参考了 [mqyqingfeng 讲解如何自己实现 bind 的文章](https://github.com/mqyqingfeng/Blog/issues/12)，页面上那个 `new` 的例子也出自这篇文章。[迁移清单](../../../docs/migration.zh-Hans.md)链接到原始版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
