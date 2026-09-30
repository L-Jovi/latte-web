# 函数组合（compose）

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

Redux 中间件背后的 `compose`，自己写一遍。“组合”函数，就是把一个函数的结果交给下一个函数：`compose(f, g)(x)` 等于 `f(g(x))`。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/compose/
```

页面上显示 `108`。它运行的是 `forgeCompose((x) => x - 2, (x) => x + 10, (x) => x * 10)(10)`，函数从右往左依次执行：10 × 10 = 100，接着 100 + 10 = 110，最后 110 − 2 = 108。不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/compose/index.html)。

## 原理

[index.js](index.js)（8 行）用 `reduce` 把一串函数合成一个。每一步都把已经合好的部分包在下一个函数外面：`(...args) => outer(inner(...args))`。由此得出三个细节：

- 函数从右往左执行，顺序和嵌套调用 `f(g(h(x)))` 一样。
- 最右边的函数最先执行，并接收全部参数；其余每个函数只接收一个值，也就是它右边那个函数的结果。
- 一个函数都不传时，`forgeCompose()` 返回“恒等函数”，原样返回传入的参数；只传一个函数时，直接返回这个函数本身。

Redux 自带的 [`compose`](https://github.com/reduxjs/redux/blob/master/src/compose.ts) 也是这样工作的。

## 过去与现在

Redux 顺带提供了 `compose` 这个工具函数。它的 `applyMiddleware` 用 `compose` 把 `store.dispatch` 依次包进每个中间件（[源码](https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.ts)）。手写 store 配置时，要自己调用 `compose`，把几个 store enhancer（给 store 增加功能的函数）依次套上去（[Redux 文档](https://redux.js.org/api/compose)）。如今 Redux Toolkit 是编写 Redux 的官方方式，它的 `configureStore` 会替你把中间件和 DevTools 的 enhancer 组合好（[Redux 文档](https://redux.js.org/introduction/why-rtk-is-redux-today)）。

## 刻意省略

- 这里只有 `compose`：没有 store，没有 `dispatch` 循环，也没有中间件。`compose` 在 store enhancer 链中怎样发挥作用，请看 [Redux 文档](https://redux.js.org/api/compose)。

## 验证与来源

- `npm test` 检查 `forgeCompose()` 会原样返回参数，并且最内层的函数能收到两个参数：`forgeCompose((x) => x * 2, (a, b) => a + b)(3, 4)` 的结果是 `14`。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，只要抛出错误或有文件加载失败就会报错；它不检查页面上的数字。
- 这个例子最初是一个叫 `redux-scratch` 的目录，但它实际演示的是 `compose`：一个版本只能组合三个函数，另一个 `reduce` 版本只传递一个参数，两者都处理不了空列表。[迁移清单](../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
