# 手写一个 React 风格的渲染器

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

用几个文件实现 `createElement`、挂载和 `setState`；两个计数器各自保存状态。组成渲染器的三个文件一共 106 行。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/mini-react/?lang=zh
```

页面上出现两个按钮：**第一个：0** 和**第二个：0**。点几下**第一个**，只有它自己的计数会增加。浏览器控制台会打印 `mounted after insertion First true` 和 `mounted after insertion Second true`，分别在两个计数器第一次加到页面上时输出。不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/mini-react/index.html?lang=zh)。

## 原理

按工作发生的顺序阅读这几个文件：

1. [src/react.js](src/react.js)（21 行）：`createElement(type, props, ...children)` 返回一个描述元素的普通对象，子元素放在它的 props 里。字符串和数字会变成文本元素；`null`、`undefined`、`true`、`false` 会被丢掉。
2. [src/react-dom.js](src/react-dom.js)（71 行）：`render(element, container)` 负责“挂载”这份描述：创建真正的 DOM 节点，设置属性和事件监听，再把它们放进容器。函数组件直接传入 props 调用；类组件（继承自 `Component` 的类）先用 `new` 创建实例，再调用它的 `render` 方法。接着第二步“提交”（commit）会调用每个组件的 `componentDidMount`，所以这个方法总是在组件的 DOM 放到页面上之后才运行。
3. [src/component.js](src/component.js)（14 行）：基类 `Component`。`setState` 把变化合并进 `this.state`（变化可以是一个对象，也可以是一个接收旧状态的函数），然后调用这个实例自己的更新函数。

[src/index.js](src/index.js) 是演示：同一个 `Counter` 类渲染了两次。

每个组件实例在挂载时都会拿到属于自己的更新函数，所以两个计数器的状态不会混在一起。更新是立即执行的：重新渲染这个组件，创建新的 DOM 节点替换掉旧的，卸载旧的子树；如果组件定义了 `componentDidUpdate`，最后再调用它。卸载时会调用 `componentWillUnmount`，并断开实例和更新函数的联系，所以之后再调用 `setState` 不会有任何效果。

## 过去与现在

以前，需要状态的组件都写成类，并使用 `componentDidMount` 这样的生命周期方法，就像这里的 `Counter`。[React 16.8](https://legacy.reactjs.org/blog/2019/02/06/react-v16.8.0.html)（2019-02-06）加入了 Hooks，如今新代码都用函数组件加 Hooks；类组件仍然可以用。这个渲染器的 `render(element, container)` 和旧的 `ReactDOM.render` 形式相同，而 React 19 已经移除了这个 API：现在的应用改为调用 `createRoot(container).render(element)`（[升级指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)）。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- 更新时会重建组件的整棵子树，而不是像 React 那样和上一次的结果做比较。嵌套的组件会从头开始、状态清零，里面的焦点和选中的文字也会丢失：点击之后，你点的那个按钮已经被一个新元素替换了。
- 没有按 `key` 匹配列表项，没有把多次更新合并成一次渲染（批处理），没有 Hooks、Fragment、错误边界和并发渲染，生命周期也只实现了一部分。
- 组件必须恰好返回一个元素。
- 这个渲染器保持小巧，是为了让你看清哪个实例拥有哪份状态；它并不打算和 React 兼容。

## 验证与来源

- `npm run test:apps` 用 Vitest 在 jsdom（一个模拟的 DOM 环境）里渲染两个计数器：点击第一个计数器两次，检查按钮文字变成 `a2` 和 `b0`；检查 `componentDidMount` 对每个计数器各运行一次，并且运行时两个按钮都已经在容器里；还检查 `render(null, container)` 会对两个计数器都调用 `componentWillUnmount`，并清空容器。
- `npm run test:browser` 在 Chromium、Firefox、WebKit 中点击 **First: 0**，检查它变成 **First: 1**，而 **Second: 0** 保持不变。
- 第一个版本每个组件类只保留一个实例，并通过全局变量重新渲染整个页面，所以两个计数器无法各自保存状态。[迁移清单](../../docs/migration.zh-Hans.md)链接到这个版本，也就是 `react-scratch` 目录。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
