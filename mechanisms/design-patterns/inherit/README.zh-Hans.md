# 原型继承，以及常见的错误写法

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

看共享原型和借用构造函数会出什么问题，以及 `Object.create` 怎样解决。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/design-patterns/inherit/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。打开浏览器控制台，先看到 prototype.js 打印的 `animal`，再看到 combination.js 打印的 `1` 和 `true`。页面把每个文件都作为模块加载，所以两个文件都可以使用 `Parent`、`Child` 这样的名字而互不冲突。也可以直接打开[在线演示](https://latte.jovipro.com/mechanisms/design-patterns/inherit/index.html)。

页面没有加载 prototype-obj.js。用 `node mechanisms/design-patterns/inherit/prototype-obj.js` 运行它，会打印 `animal`。

## 原理

JavaScript 里的继承，就是把原型连起来：一个对象自己没有某个属性时，JavaScript 会去它的原型上找，再去原型的原型上找，依此类推。这几个文件分别用不同的方式把 `Child` 连到 `Parent` 上。

[prototype.js](prototype.js)（24 行）让两者共享同一个原型：`Child.prototype = Parent.prototype`。读取没有问题（`c.species` 是 `'animal'`），但两个构造函数现在用的是同一个对象。执行 `Child.prototype.constructor = Child` 时，`Parent` 的也跟着变了，于是 `new Parent().constructor` 是 `Child`；给 `Child` 加的任何方法，也会出现在 `Parent` 上。

[combination.js](combination.js)（83 行）包含三个版本：

1. **借用构造函数，再加一个父类实例。** `Parent.call(this, value)` 在每个新的子对象上执行父构造函数，所以每个子对象都有自己的 `val`。`Child.prototype = new Parent()` 把原型连起来。它能用（`child.getValue()` 打印 `1`，`child instanceof Parent` 为 `true`），但父构造函数为了构建原型额外多执行了一次，在 `Child.prototype` 上留下一个用不到的 `val`；而且 `child.constructor` 是 `Parent`。
2. **修正版。** `Son` 同样借用构造函数，但用 `Object.create(Father.prototype, …)` 构建自己的原型。这样既连上了父类的原型，又不会调用 `Father`，同时定义了一个隐藏的（不可枚举的）`constructor`，指回 `Son`。
3. **一个辅助函数。** `inherit(child, parent)` 同样借助 `Object.create`，并把子类原型上已有的方法复制过去。它用普通赋值来设置 `constructor`，所以和版本 2 不同，`constructor` 会出现在 `Object.keys(Cat.prototype)` 里。

[prototype-obj.js](prototype-obj.js)（29 行）不用 `Object.create` 也建立了同样的连接：一个空函数 `F` 共享父类的原型，于是 `new F()` 得到一个连好原型的对象，而不会执行 `Parent`。

## 过去与现在

如今直接写 `class Child extends Parent`，并在构造函数里调用 `super()`。class 语法会替你连好原型、设好 `constructor`，但底层用的仍然是同样的原型链接。[class extends 背后做了什么](../../../fundamentals/javascript/classes/README.zh-Hans.md)对比了这两种写法。

## 刻意省略

- 页面只打印了几个值。上面说的问题要看代码才能发现，页面上看不出来。
- 这些版本都没有把两个构造函数本身连起来，所以直接设在 `Parent` 上的属性（静态成员）不会被继承。`class extends` 连这一层也会连好，class 的例子里有演示。

## 验证与来源

- 这些文件没有自动化测试。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，页面一旦报错测试就会失败。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。[迁移清单](../../../docs/migration.zh-Hans.md)里有原始版本的链接。
