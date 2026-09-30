# add(1)(2)(3)：柯里化与类型转换

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

用闭包累加，再看一个函数是怎么变成数字的。“柯里化”是指把参数拆开，通过一连串调用逐次传入，而不是一次传完；“类型转换”是指 JavaScript 自动把一个值转换成另一种类型。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/utilities/add/
```

打开浏览器控制台。页面打印了三个链式调用的结果，可控制台里显示的是函数而不是数字：比如 Chromium 会打印出每个函数的源代码。所以请自己动手转换：输入 `String(addMutiplyParams(1, 2)(3))`，得到 `'6'`；`String(addMutiplyParams(1, 2, 3)(5, 7)())` 得到 `'18'`。不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/add/index.html)。

## 原理

[add-mutiply.js](add-mutiply.js)（30 行）里有两个版本：

- `addSimpleParam(a)` 每次调用只接收一个数。它返回一个函数 `sum`，`sum` 把下一个数加到 `a` 上，再返回自己，所以可以一直调用下去：`addSimpleParam(1)(2)(3)`。累加的总数 `a` 保存在闭包里，也就是函数从创建它的地方带走的那些变量。
- `addMutiplyParams(...)` 每次调用可以接收任意多个参数，例如 `addMutiplyParams(1, 2, 3)(5, 7)()`。每次调用都返回一个新函数，记住到目前为止的所有数字。一个数字都没有时，总数是 `0`。

两个版本都给返回的函数装上了自己的 `toString` 方法，由它返回总数。当 JavaScript 需要从函数得到一个原始值时，比如 `String(fn)`、`fn + ''` 或 `fn == 6`，最终都会调用 `toString`，拿到的就是这个数字。这种自动转换，就是标题里说的类型转换。

## 过去与现在

这是一道考察 JavaScript 如何转换值的谜题，并不是做加法的办法。在应用代码里，一个直接返回数字的函数，比如 `sum(1, 2, 3)`，要清楚得多。

## 刻意省略

- 只支持数字。如果传入字符串，`+` 会变成拼接文字：`String(addMutiplyParams('1', 2))` 的结果是 `'012'`。
- `addSimpleParam` 修改的是同一个共享的总数，所以一条调用链不能重复使用：执行 `const s = addSimpleParam(1); s(2); s(10)` 之后，`String(s)` 是 `'13'`。`addMutiplyParams` 每次调用都会生成新函数，所以没有这个问题。

## 验证与来源

- 这两个函数没有单元测试。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，只要抛出错误或有文件加载失败就会报错；它不检查数字。
- 两种写法参考了 `add-mutiply.js` 第一行链接的 muyiy.cn 页面。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
