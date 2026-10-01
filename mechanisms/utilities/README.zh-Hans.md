# 手写常用工具函数

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

防抖、节流、深拷贝等，写成边界清楚的短算法。每一个都有自己的目录、页面和 README。

## 试一试

```sh
npm run dev
# 打开下面任意一个页面，例如 http://127.0.0.1:4173/mechanisms/utilities/debounce/?lang=zh
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。大多数页面把结果打印在浏览器控制台里。想一次运行全部检查，可以执行 `npm test`，它同样只需要 Node。

## 原理

每个目录讲一个想法：

- [防抖](debounce/README.zh-Hans.md)：等一连串调用停下来之后，只执行一次。
- [节流](throttle/README.zh-Hans.md)：每个时间间隔最多执行一次，第一次调用立即执行。
- [浅拷贝与深拷贝](clone/README.zh-Hans.md)：复制对象图时保留共享引用和循环引用，再和 `structuredClone` 对比。
- [检测循环引用](circle-ref/README.zh-Hans.md)：区分真正的循环引用，和只是被引用了两次的对象；再看看为什么 `JSON.stringify` 报错并不能证明存在循环。
- [定时器为什么会漂移，以及如何校正](timer/README.zh-Hans.md)：测量定时器回调晚了多少，并据此调整下一次的触发时间。
- [千分位格式化，不丢精度](format/README.zh-Hans.md)：不把数字字符串转成 `Number` 也能加千分位。
- [add(1)(2)(3)：柯里化与类型转换](add/README.zh-Hans.md)：用闭包累加，再看一个函数是怎么变成数字的。

还有两个更小的文件直接放在这个目录下，没有配套页面：

- [check-type.js](check-type.js)（2 行）：`isType('String')` 返回一个函数，它用 `Object.prototype.toString.call(value)` 检查值的类型，这个调用会返回 `[object String]` 这样的字符串。在仓库根目录运行 `node mechanisms/utilities/check-type.js`，会打印 `true`。
- [read-array.js](read-array.js)（9 行）：`createArrayReader(array)` 返回 `read(count)`。每调用一次，就取出接下来的 `count` 项（默认 1 项）；数组读完之后返回 `[]`。读取位置保存在闭包里，所以同一个数组上的两个读取器互不干扰，`Array.prototype` 也不会被修改。`count` 不是正整数时会抛出 `RangeError`。

## 过去与现在

这些工作里有好几项如今已有内置方案：深拷贝用 `structuredClone`，数字格式化用 `Intl.NumberFormat`，动画计时用 `requestAnimationFrame`。截至 2026-09，防抖和节流仍然不是 JavaScript 的一部分，lodash 等库提供了它们。要逐项读取数组，用数组自带的迭代器（`for…of` 循环用的就是它）通常就够了。`read-array.js` 最初的版本给 `Array.prototype` 加了一个 `getReader` 方法；现在的版本不改动内置原型。

## 刻意省略

- 这些是彼此独立的小文件，不是一个库。每个都有自己的页面和局限，也都没有打包成可以安装的包。
- `read-array.js` 读的是数组本身，而不是副本：如果两次读取之间数组变了，后面的读取会看到变化。
- `isType` 依赖 `Object.prototype.toString` 的结果，而对象可以通过 `Symbol.toStringTag` 改变这个结果：`isType('String')({ [Symbol.toStringTag]: 'String' })` 的结果是 `true`。

## 验证与来源

- 除了 `add`，这里的每个工具都有 `npm test` 检查；具体检查了什么，见各自的 README。对上面两个文件，它检查 `isType('String')('test')` 为 `true`、同一个数组上的两个读取器各自记录位置，以及数量为 `0` 时会抛出错误。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开每个工具的页面，只要页面抛出错误或有文件加载失败就会报错。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到最初的版本，也就是 `toolkit` 目录。
- 原创代码使用 MIT 许可。`debounce/lodash-debounce.js` 改编自 lodash，同样使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
