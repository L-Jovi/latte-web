# 老式 React 测试：TestUtils 与 Enzyme

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

来自早年教程的浅渲染和 DOM 测试，留作与 Testing Library 对比。它们出自阮一峰的 react-testing-demo，测试对象是一个为 React 0.14 编写的小型 Todo 应用。

## 试一试

这些测试没法运行：它们导入的 Todo 应用已经不在仓库里了，它们依赖的旧版本库也没有安装。所以请直接阅读，并和今天的测试对照着看。每个文件检查的都是同样五件事中的几件：标题是“Todos”；待办一开始都是未完成；点击一条待办会在完成与未完成之间切换；删除按钮会移除一条待办；添加按钮会新增一条。

1. [cases/shallow1.test.js](cases/shallow1.test.js) 和 [cases/shallow2.test.js](cases/shallow2.test.js)（各 19 行）使用“浅渲染”（shallow rendering）：React 只把组件渲染一层，测试再检查它返回的元素，比如 `app.props.children[0].type`。
2. [cases/dom1.test.js](cases/dom1.test.js)、[cases/dom2.test.js](cases/dom2.test.js) 和 [cases/dom3.test.js](cases/dom3.test.js)（17 到 21 行）用 TestUtils 把应用渲染进 DOM，用 `TestUtils.Simulate.click` 模拟点击，然后数一数待办有几条，或者检查某个 CSS 类名。
3. [cases/enzyme1.test.js](cases/enzyme1.test.js)（43 行）用 Enzyme 做同样的检查。
4. [cases/setup.js](cases/setup.js)（7 行）用 jsdom 造出一个假的 `document`，好让 DOM 测试能在 Node 里运行。

然后打开今天对应的测试：[tests/apps/react.test.jsx](../../../tests/apps/react.test.jsx) 和 [tests/browser/react.spec.js](../../../tests/browser/react.spec.js)。

## 原理

这些用例依赖 React 0.14 时代的几样工具：

- **TestUtils**（`react-addons-test-utils`）是 React 官方提供的底层测试辅助工具。`createRenderer` 做浅渲染，不渲染子组件，也不需要 DOM。`renderIntoDocument` 把组件渲染进 DOM；`Simulate.click` 通过 React 自己的事件系统发送一次点击，并不产生真实的浏览器事件。
- **Enzyme** 出自 Airbnb，它把这些辅助工具包装成一套模仿 jQuery 的 API：`find('h1')`、`.text()`、`.simulate('click')`、`.hasClass()`。它提供三种渲染方式：`shallow`、`render`（渲染成静态 HTML）和 `mount`（渲染进完整的 DOM）。[cases/enzyme1.test.js](cases/enzyme1.test.js) 三种都用到了。
- **Mocha** 负责运行测试，**Chai** 提供 `expect`。

它们都是从内部观察应用：看元素树、看 `li` 这样的标签名、看 `todo-done` 这样的 CSS 类名、看 `.add-todo button` 这样的选择器。只要标记结构一改，这些测试就会失败，哪怕应用其实还能正常工作。

## 过去与现在

Enzyme 可以把组件浅渲染出来，再检查它的内部结构。这样的测试只要实现一改就会坏，哪怕页面其实还能正常工作。Enzyme 的官方适配器只到 React 16。[React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) 移除了 `react-test-renderer/shallow`，并弃用了 `react-test-renderer`，React 团队给出的理由是它“鼓励测试实现细节”。

Testing Library（2018 年）改为测试用户看到什么、做了什么。本仓库用它配合 Vitest 做组件测试，再用 Playwright 驱动真实浏览器：

| 任务       | 老用例（本目录）                                             | 今天（[react.test.jsx](../../../tests/apps/react.test.jsx)）                                                               |
| ---------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 找到标题   | `app.props.children[0].type`，或 Enzyme 的 `find('h1')`      | `getByRole('heading', { name: 'Todos' })`                                                                                  |
| 点击       | `TestUtils.Simulate.click`，或 Enzyme 的 `simulate('click')` | `@testing-library/user-event` 提供的 `user.click(…)`                                                                       |
| 添加待办   | 设置 `input.value`，再点击添加按钮                           | 用 `user.type(…)` 在名为“New todo”的输入框里输入，再点击 **Add**                                                           |
| 在哪里运行 | Mocha，外加 `setup.js` 手工造出的 `document`                 | Vitest 配合 jsdom；[react.spec.js](../../../tests/browser/react.spec.js) 在 Chromium、Firefox、WebKit 中运行一个更长的场景 |

更完整的经过见[生态是怎样变过来的](../../ecosystem.zh-Hans.md)。

## 刻意省略

- 这些用例需要原来的那套环境（React 0.14、Enzyme、Mocha 和 Babel），以及它们从 `../app/components/App` 导入的应用。这些都不在这里，所以它们只供阅读。
- 这里只保留了测试文件，内容未做改动。教程正文和那个 React 0.14 应用都已移除；[迁移清单](../../migration.zh-Hans.md)链接到两者的最后版本。

## 验证与来源

- 没有测试运行这些文件。今天，同样的 Todo 行为由其他测试检查：`npm run test:apps` 运行当前的组件和渲染器测试，其中包括用 Testing Library 测两个 Todo 应用；执行 `npm run build` 之后，`npm run test:browser` 用 Playwright 在 Chromium、Firefox、WebKit 中运行。
- 这些用例出自[阮一峰的 react-testing-demo](https://github.com/ruanyf/react-testing-demo)，而它大致基于 Jack Franklin 的文章《Testing React Applications》。用例保留阮一峰的 MIT 许可，见 [LICENSE](LICENSE)；另见 [NOTICE.md](../../../NOTICE.md)。
- 本页是原创内容，使用 MIT 许可。[迁移清单](../../migration.zh-Hans.md)链接到确切的原始版本。
