# 小例子讲设计模式

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

单例、工厂、适配器、代理、发布订阅，每个只用几行代码。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/design-patterns/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。打开浏览器控制台，会看到 `true`（单例）、`saber and archer`（适配器）和 `yck false`（只读属性）。也可以直接打开[在线演示](https://latte.jovipro.com/mechanisms/design-patterns/index.html)。

页面没有加载两个工厂示例，请在仓库根目录用 Node 运行它们：`node mechanisms/design-patterns/factory/simple-factory.js` 会打印 `yck`。

## 原理

这里每个文件演示一种模式：

- **单例**，[singleton.js](singleton.js)（21 行）：一个类只有一个共享的实例。`Singleton.getInstance()` 在第一次调用时创建实例，并把它保存在闭包里，之后每次调用都返回同一个对象，所以 `s1 === s2` 为 `true`。
- **工厂**，[factory/simple-factory.js](factory/simple-factory.js)（22 行）：调用方通过 `Factory.create(name)` 拿到对象，而不是自己去调用 `new Man(name)`。
- **工厂方法**，[factory/factory-method.js](factory/factory-method.js)（25 行）：`Factory(type, item)` 调用 `Factory.prototype` 上名为 `type` 的方法（`saber` 或 `archer`）。要增加一种对象，只需在原型上加一个方法，`Factory` 函数本身不用改。不写 `new` 也能用：被当作普通函数调用时，它会自己用 `new` 再调用一次。
- **适配器**，[plug.js](plug.js)（20 行）：`Target` 内部持有一个 `Plug`，在插头自己的返回值基础上，提供调用方需要的 `getName()`。调用方只和 `Target` 打交道，从不直接接触 `Plug`。
- **只读属性**，[descriptor.js](descriptor.js)（4 行）：`Object.defineProperty` 加上 `writable: false`，让 `name` 变成只读，于是 `Reflect.set` 返回 `false`，值仍然是 `'yck'`。

另外三种模式各有自己的目录：

- [原型继承，以及常见的错误写法](inherit/README.zh-Hans.md)：对比共享原型、借用构造函数和 `Object.create`。
- [Proxy 拦截与事件委托](proxy/README.zh-Hans.md)：用 `Proxy` 拦截属性读写，用一个父元素处理所有子元素的点击。
- [发布订阅](pub-sub/README.zh-Hans.md)：一个最小的 `on` / `emit` / `off` 事件中心。

## 过去与现在

只有当一个模式能消除代码两部分之间真实存在的依赖时，才值得用它。有些模式如今语言本身就提供了：ES 模块只会执行一次，所有导入它的文件共享同一批对象，所以一个模块级的对象往往就能起到单例的作用。

只读属性的例子原先是一个装饰器 `@readonly`，照原样无法运行。装饰器至今（2026-09）仍是提案。旧例子用的是早期的签名 `(target, key, descriptor)`，而[当前提案](https://github.com/tc39/proposal-decorators)调用装饰器时传入的是 `(value, context)`。属性描述符是标准 JavaScript，不需要任何构建工具。

## 刻意省略

- 这些只是每种思路的草图，并不建议把每个模式都搬进应用里。
- 没有什么能阻止 `new Singleton()` 再创建一个实例；这个模式要靠调用方老老实实地用 `getInstance()`。
- `Factory('unknown')` 会抛出 `TypeError`，因为原型上没有这个名字的方法。

## 验证与来源

- 上面五个模式文件没有自动化测试。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，页面一旦报错测试就会失败。发布订阅的事件中心有自己的单元测试，见[它的 README](pub-sub/README.zh-Hans.md)。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。[迁移清单](../../docs/migration.zh-Hans.md)里有原始版本（`design-mode` 目录）的链接。
