# Promise 链与 async/await 对照

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

同一个两步计算，分别用 .then() 和 await 来写。两个版本都从 `2` 开始，乘以 `3`，最后返回一个结果为 `6` 的 Promise。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/fundamentals/javascript/async-await/?lang=zh
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。页面显示 `6 = 6`，也就是两个版本的结果并排放在一起。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/fundamentals/javascript/async-await/index.html?lang=zh)。

## 原理

全部代码都在 [index.html](index.html) 的一个 `<script>` 里：

- `chain()` 返回 `Promise.resolve(2).then(value => value * 3)`。每个 `.then()` 都会返回一个新的 Promise，它的结果就是回调的返回值。
- `withAwait()` 是一个 `async` 函数。`await Promise.resolve(2)` 让函数暂停，等这个 Promise 有了结果再交回 `2`，然后函数返回 `value * 3`。`async` 函数总是返回 Promise，所以调用方拿到的同样是一个结果为 `6` 的 Promise。
- `Promise.all` 等两个 Promise 都完成后，把结果写进页面。

`await` 只会暂停它所在的那个 `async` 函数。页面的其他部分照常运行，被暂停的函数稍后作为“微任务”（microtask，当前代码一执行完就会运行的小任务）继续执行。`await` 并不会把繁重的计算挪出主线程：`async` 函数里的一段耗时计算，照样会卡住页面。

## 过去与现在

`Promise` 在 ES2015 成为 JavaScript 的一部分，`async`/`await` 随后在 ES2017 加入；更完整的经过见[生态是怎样变过来的](../../../docs/ecosystem.zh-Hans.md)。两种写法在所有主流浏览器和 Node.js 中都原生可用，哪种写法能把步骤的先后顺序表达得更清楚，就用哪种。想弄清 Promise 回调和被暂停的函数究竟什么时候执行，接着看[事件传播与事件循环](../../events/README.zh-Hans.md)；想了解 Promise 内部是怎样工作的，读[从零实现 Promise](../../../mechanisms/promise/README.zh-Hans.md)。

## 刻意省略

- 两个版本都会成功，所以页面没有对比 `.catch()` 和 `try`/`catch` 两种错误处理方式。
- 计算是瞬间完成的，所以页面无法展示“函数在等待时，页面其他部分照常运行”这一点。

## 验证与来源

- 没有单元测试覆盖这个页面。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开它，检查页面能正常加载、没有报错。
- [迁移清单](../../../docs/migration.zh-Hans.md)链接到位于 `es-feature/async+await` 的原始版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
