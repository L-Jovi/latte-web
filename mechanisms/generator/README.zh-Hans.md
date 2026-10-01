# Generator 如何暂停与恢复

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

看 Babel 把 `yield` 编译成的状态机，以及值是怎样传进传出的。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/generator/?lang=zh
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。页面对一个原生 generator 和一个手写的版本各调用两次 `next()`，并把结果打印出来。两边完全一致：先是 `{ value: 1, done: false }`，再是 `{ value: 5, done: true }`。第一次调用停在 `yield 1`；第二次调用传入 `3`，它以 `3 + 2` 的结果又被送了出来。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/generator/index.html?lang=zh)。

接着打开浏览器控制台，再打开同一目录下的 [transformed.html](transformed.html)（[在线演示](https://l-jovi.github.io/latte-web/mechanisms/generator/transformed.html?lang=zh)）。它运行 Babel 为一个 generator 生成的代码，依次打印 `param-a this is a`、`param-b this is b` 和 `undefined this is c`。

## 原理

generator 函数每遇到一个 `yield` 就停下来，调用 `next()` 时再从原处接着执行。为此它必须记住自己停在哪里，就像在书里夹一枚书签。这枚书签通常叫作“程序计数器”（program counter）。

[forge.js](forge.js)（13 行）把这枚书签摆到了明处。`forgeGenerator(step)` 维护一个小小的 `context` 对象：

- `next` 记录下次从哪里继续。
- `sent` 保存传给 `next(value)` 的值。
- `done` 由 `stop()` 设置。

每次调用 `next(value)`，它先把值存进 `context.sent`，再调用 `step(context)`。step 函数是一个针对 `context.next` 的 `switch`，负责跳到正确的位置。由于 `done` 是一个单独的标志，step 可以 yield 出 `undefined`，迭代器也不会因此结束。

[transform-generator.js](transform-generator.js)（50 行）是同一思路的完整版：Babel 为 [index.js](index.js) 里的 generator `genn` 生成的代码。`_context.next` 就是程序计数器，每个 `case` 标签都是函数可以继续执行的位置，`_context.sent` 保存传给 `next()` 的值，`_context.abrupt("return", …)` 让 generator 结束。[regenerator-runtime.js](regenerator-runtime.js)（317 行）提供驱动这个 `switch` 的 `_regeneratorRuntime()`。

[index.js](index.js)（34 行）是用来对照的原生 generator。用 `node mechanisms/generator/index.js` 运行：`testGen(5)` 先后 yield 出 `6` 和 `8`，最后返回 `39`。

## 过去与现在

generator 在 ES2015 成为 JavaScript 的一部分（[规范](https://262.ecma-international.org/6.0/)）。当前的浏览器都原生支持它，所以面向这些浏览器构建的代码不再需要 regenerator-runtime.js。编译出来的 `switch` 依然能说明，为旧浏览器构建的代码是怎样暂停和恢复的。

## 刻意省略

- forge.js 只处理 `next()` 和传进来的值。真正的 generator 还有 `throw()` 和 `return()`，也会执行 `finally` 代码块；这些 forge.js 都没有。
- step 函数里的 `switch` 需要你自己手写，没有工具替你生成。
- transform-generator.js 和 regenerator-runtime.js 是历史上的 Babel 产物，留下来供阅读和对照，不适合用在新代码里。

## 验证与来源

- `npm test` 检查三件事：手写迭代器可以 yield 出 `undefined` 而不结束；用 `next(7)` 传入的值会被送回来；再下一次调用会报告 `done`。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这两个页面，任何一个报错测试都会失败。
- transform-generator.js 注明的来源是[这篇知乎文章](https://zhuanlan.zhihu.com/p/473245486)。
- regenerator-runtime.js 来自 Facebook 的 regenerator 项目（MIT 许可，Copyright (c) 2014-present, Facebook, Inc.），保留了原有的版权声明，许可证见 [LICENSE.regenerator](LICENSE.regenerator)。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。[迁移清单](../../docs/migration.zh-Hans.md)里有原始版本的链接。
