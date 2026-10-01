# JavaScript 基础：闭包、this 与 new

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

用几段短脚本，看懂闭包、this 和对象构造的真实行为。这个目录里有一个闭包示例和一份总览；下面四个子目录各自手写实现语言的一小块。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/fundamentals/javascript/?lang=zh
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。打开浏览器控制台：页面用 `forgeNew`（[instance](instance/README.zh-Hans.md) 里手写的 `new`）创建一个对象，并把它打印在两行 `=== forge new ===` 之间，它的 `name` 是 `'saber'`。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/fundamentals/javascript/index.html?lang=zh)。

闭包示例没有页面，在仓库根目录用 Node 运行：

```sh
node fundamentals/javascript/closure.js
```

它会每秒打印一个数字，依次是 `0`、`1`、`2`、`3`、`4`。

## 原理

闭包（closure）是一个函数，它在创建它的代码运行结束之后，仍然能访问周围的变量。[closure.js](closure.js)（13 行）用一个循环启动了五个定时器，每个定时器的回调都记住了属于自己的 `i`。为了让每个回调拿到自己的一份 `i`，这个循环同时用了两种办法：`let` 在每一轮循环中都会创建一个新的 `i`；外面包的那层 `(function (i) { … })(i)` 是一个立即调用的函数，它把 `i` 复制到了参数里。其实任选一种就够了。如果改用 `var`、又去掉这层包装，五个回调就会共用同一个 `i`，打印五次 `5`。

每个子目录手写一块，让你看到语言平时藏起来的步骤：

- [手写 new 与 instanceof](instance/README.zh-Hans.md)：创建对象、执行构造函数、沿原型链查找。它还说明了为什么构造函数返回 `null` 时你仍然会拿到新对象，而返回另一个对象时，新对象就会被替换掉。
- [手写 call、apply 与 bind](context/README.zh-Hans.md)：函数调用时 `this` 是怎么确定的。
- [class extends 背后做了什么](classes/README.zh-Hans.md)：把 `class extends` 和老式的函数继承放在一起对比。
- [Promise 链与 async/await 对照](async-await/README.zh-Hans.md)：同一个两步计算的两种写法。

建议从 [closure.js](closure.js)、[instance/new.js](instance/new.js) 和 [context/bind.js](context/bind.js) 读起。

## 过去与现在

ES2015 加入了 [`let`](https://262.ecma-international.org/6.0/#sec-let-and-const-declarations) 和 [`class`](https://262.ecma-international.org/6.0/#sec-class-definitions)。有了 `let`，closure.js 里那层包装函数就不再需要了；`class` 则让构造和继承有了更简短的写法。但两者都没有取代底层的对象模型：class 创建的对象依然建立在原型之上，普通函数的 `this` 依然取决于它是怎样被调用的。所以这些小小的手写实现，今天依然能解释你写的代码。

## 刻意省略

- closure.js 只能在 Node 或浏览器控制台里运行：没有页面加载它，也没有测试检查它。
- 各子目录里的实现故意写得很小，每个子目录的 README 都列出了它省略了什么。

## 验证与来源

- `npm test` 检查手写的 `new`、`instanceof`、`call`、`apply` 和 `bind`，具体检查了什么见各子目录的 README。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开每个页面，检查页面能正常加载、没有报错。
- 来源链接就写在被引用的代码旁边，比如 [context/bind.js](context/bind.js) 参考的那篇文章。[迁移清单](../../docs/migration.zh-Hans.md)链接到这个目录的原始版本，当时目录名叫 `syntax`。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
