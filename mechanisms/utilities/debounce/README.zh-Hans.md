# 防抖

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

等一连串调用停下来之后，只执行一次。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/utilities/debounce/?lang=zh
```

打开浏览器控制台，快速连续点击**测试防抖**几次。只要你还在点，控制台就什么也不打印；最后一次点击过后半秒，控制台只打印一次 `1 2`。不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/debounce/index.html?lang=zh)。

## 原理

[simple.js](simple.js)（9 行）：每次调用都会取消上一次调用启动的定时器，再重新启动一个。只有在 `wait` 毫秒（默认 500）内没有新的调用，定时器才会触发，函数也只执行一次，使用的是最后一次调用的 `this` 和参数。`debounced.cancel()` 可以取消还在等待的那次调用。

防抖和[节流](../throttle/README.zh-Hans.md)很容易混淆。防抖要等一连串事件**停下来**才执行，适合搜索框；节流在事件**进行中**定期执行，适合滚动、拖拽。

[lodash-debounce.js](lodash-debounce.js)（132 行）改编自 lodash 的 `debounce`，作为单独的阅读练习保留。它提供几个选项：在第一次调用时执行（`leading`），在最后一次调用之后执行（`trailing`，默认开启），以及在持续很久的一连串调用中至少每 `maxWait` 毫秒执行一次。它还提供 `flush()`，立即执行正在等待的调用；以及 `pending()`，告诉你是否有调用正在等待。页面加载了这个文件，但没有调用它。

## 过去与现在

截至 2026-09，JavaScript 仍然没有内置的防抖函数。lodash 等库提供的 [`debounce`](https://lodash.com/docs/#debounce) 带有上面这些选项。短版本用来看懂“替换定时器”是怎么回事；需要这些选项时，请使用仍在维护的库。

## 刻意省略

- `simple.js` 只在一连串调用结束后执行，没有“第一次调用就执行”的选项，也没有 `maxWait` 和 `flush`。
- 如果调用一直比 `wait` 来得更快，函数就会被一再推迟，甚至永远不执行。lodash 的 `maxWait` 正是为这种情况准备的。
- 防抖后的函数返回 `undefined`：真正的调用发生在之后，所以它的返回值拿不到。

## 验证与来源

- `npm test` 连续两次调用一个经过防抖的方法，检查它只执行一次，`this` 是那个对象，参数是第二次调用传入的；接着检查 `cancel()` 能取消正在等待的调用。`npm run test:browser` 在 Chromium、Firefox、WebKit 中连点三下按钮，检查 `1 2` 只打印了一次。
- `lodash-debounce.js` 改编自 lodash 的 `debounce`，保留了它的 MIT 许可（版权归 JS Foundation 及其他贡献者）；见 [LICENSE.lodash](LICENSE.lodash) 和 [NOTICE.md](../../../NOTICE.md)。其余部分是原创代码，使用 MIT 许可。
- [迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
