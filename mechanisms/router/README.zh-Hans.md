# 手写前端路由

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

基于 History API 的小路由：点击链接、前进后退，都不刷新页面。路由本身是 72 行 React 类组件。

## 试一试

```sh
npm ci
npm run build -w @latte/router
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/router/dist/
```

页面上显示 **Home view**。点击 **About**：地址变成以 `/about` 结尾，页面显示 **About view**，整个过程不刷新页面。浏览器的后退、前进按钮可以在两个视图之间切换。在本地，停在 `/about` 时刷新也没问题，因为本地服务器会用应用的 `index.html` 响应这个地址。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/router/dist/index.html)；不过在那里刷新的表现不同（见“刻意省略”）。

## 原理

[src/router.jsx](src/router.jsx) 里有三个组件，[src/index.jsx](src/index.jsx)（15 行）用它们搭出页面：

- `BrowserRouter` 把当前路径保存在自己的 state 里，并通过 React 的 Context 共享给它里面的所有组件。Context 能把一个值交给层层嵌套的组件，而不用一层层手动往下传。
- `Route` 只有在当前路径和自己的 `path` 完全相同时，才显示它的内容。地址末尾多一个 `/` 或 `/index.html` 不影响匹配。
- `Link` 渲染一个普通的 `<a>`。遇到普通的左键点击时，它阻止浏览器加载新页面，用 `history.pushState` 修改地址，再通知路由更新。

最后这一步必不可少，因为 `pushState` 修改 URL 时不会触发 `popstate` 事件。浏览器只在你后退或前进时触发 `popstate`，`BrowserRouter` 监听这个事件，显示对应的视图。

监听函数 `onChangeView` 作为类字段只创建一次，所以 `removeEventListener` 收到的和 `addEventListener` 收到的是同一个函数，路由卸载时监听才会真正被移除。如果两处各自调用 `bind`，得到的是两个不同的函数，结果什么也移除不掉。

有些点击 `Link` 会交给浏览器按原样处理：按住 Ctrl、Cmd、Shift 或 Alt 的点击，用左键以外的按键点击，`target` 不是 `_self` 或带有 `download` 属性的链接，以及指向其他源（origin）的链接。

所有路径都以应用所在的目录开头。这个目录来自 [vite.config.js](vite.config.js) 里 Vite 的 `base` 选项；为 GitHub Pages 构建时，还会加上 `/latte-web/` 前缀。

## 过去与现在

以前，应用会借助 react-router-redux 这类库，把当前 URL 复制一份放进 Redux store，好让所有状态都待在一处；可这样一来，两份数据就可能对不上。如今由路由自己掌管 URL，[React Router 7](https://remix.run/blog/react-router-v7)（2024-11-22）还会为每个路由加载数据。两个 Todo 应用都使用 react-router-dom，可以拿来和这里的版本对照：[2018 年风格的 Todo](../../examples/react-classic/README.zh-Hans.md) 和[今天风格的 Todo](../../examples/react-modern/README.zh-Hans.md)。说到底，每个客户端路由做的都是这里的事：监听 History API，再决定渲染什么。

## 刻意省略

- 在线演示中，停在 About 视图时刷新页面，会看到 GitHub 的 404 页面。GitHub Pages 无法像本地服务器那样用 `index.html` 响应这个地址；点击链接、后退和前进仍然正常。本地开发服务器（[scripts/serve.mjs](../../scripts/serve.mjs)）专门有一条规则，用 `index.html` 响应 `/about`，所以在本地刷新没有问题。
- 只匹配完全相同的路径。没有嵌套路由，没有路由参数（例如 `/users/:id`），没有数据加载器，也无法拦截导航（例如提醒用户还有未保存的修改）。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中点击 **About**、后退、前进，然后刷新，检查刷新后仍然显示 **About view**。这次刷新依靠的正是本地服务器的那条特殊规则。
- `npm run test:pages` 像 GitHub Pages 一样在 `/latte-web/` 下提供构建好的站点，没有那条规则。它在 Chromium 中检查：点击 **About** 后地址变成 `/latte-web/mechanisms/router/dist/about`，后退后显示 **Home view**。它不测试刷新。
- 第一个版本传给 `removeEventListener` 的是一个新 `bind` 出来的函数，而且是在挂载之前、而不是卸载时调用的，所以它的 `popstate` 监听从来没有被移除过。[迁移清单](../../docs/migration.zh-Hans.md)链接到这个版本，也就是 `router-scratch` 目录。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
