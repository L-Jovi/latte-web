# 从零实现 Promise

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

分三步写出 Promise：从最小的状态机，到通过全部 872 项 Promises/A+ 官方测试的版本。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/promise/
```

页面串联了两次 `then`，显示 `1,2`。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/promise/index.html)。

用官方测试集检验完整版：

```sh
npm ci
npm run test:aplus
```

最后应该显示 `872 passing`。

## 原理

Promise 是一个很小的状态机。它一开始处于 _pending_（等待）状态，并且只会结算一次：要么带着一个值变为 _fulfilled_（成功），要么带着一个原因变为 _rejected_（失败）。通过 `then` 注册的回调会在队列里等待，并且总是稍后作为微任务执行，绝不会插进你正在运行的代码中间。

按顺序读这三个版本：

1. [simple.js](simple.js)（23 行）只有状态机和回调队列。`then` 返回的是同一个 Promise，所以还不能链式调用。
2. [promise-a+.js](promise-a+.js)（59 行）加入了“解析过程”（resolution procedure）。`then` 会返回一个新的 Promise；如果回调返回了另一个 Promise（或者任何带 `then` 方法的对象），新的 Promise 就会接管它的结果。它还会拒绝“解析成自己”的 Promise，并且只读取一次 `then`。通过官方测试的就是这个版本。
3. [index.js](index.js) 是本仓库最初基于 class 的版本，另外加上了 `all`、`race` 和 `finally`。

[samples 页面](samples/index.html)会打印一组嵌套的 `then` 回调。先猜一猜输出顺序，再打开浏览器控制台核对。

## 过去与现在

2015 年以前，Promise 来自 Q、Bluebird 等库，社区规范 [Promises/A+](https://promisesaplus.com/) 让这些库能够互相配合。ES2015 把 `Promise` 加进了 JavaScript，ES2017 又加入了建立在 Promise 之上的 `async`/`await`。实际项目里请直接用原生版本。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- `simple.js` 故意不完整：不能链式调用，也不会接管另一个 Promise 的结果。
- `promise-a+.js` 只覆盖规范定义的部分，也就是 `then`（外加 `catch`），没有 `resolve`、`reject`、`all`、`race` 这些辅助方法。
- `index.js` 加入了 `all`、`race` 和 `finally`，但只有 `promise-a+.js` 会跑完整的测试集。
- 它们都不适合用在生产环境：原生 `Promise` 更快，经过的测试也多得多。

## 验证与来源

- `npm run test:aplus` 用未经修改的 [Promises/A+ 测试集](https://github.com/promises-aplus/promises-tests)检验 `promise-a+.js`。测试集自带的旧测试运行器，通过根目录 `package.json` 的 `overrides` 固定到修复过漏洞的 Mocha 和 Underscore 版本。适配器在测试运行器自己的执行环境里加载这个文件，这样测试集里对 `TypeError` 的检查才会按规范预期工作。
- `npm test` 检查另外两个版本，`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面。
- 基于 class 的版本最初参考了[这篇知乎文章](https://zhuanlan.zhihu.com/p/58428287)；嵌套回调的小测验来自[这篇掘金文章](https://juejin.cn/post/6844904158848352264)。
- 原创代码使用 MIT 许可；第三方内容见 [NOTICE.md](../../NOTICE.md)。
