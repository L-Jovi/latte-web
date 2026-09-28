# History API 路由机制

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

class 路由通过 Context 传递当前路径。pushState 改变地址却不触发 popstate，因此 Link 还要主动更新视图；浏览器前进后退会触发 popstate。注册和卸载使用同一个稳定函数引用。带修饰键的点击、下载链接和其他来源的地址保留原生行为。这里只匹配精确路径，不处理嵌套路由、loader、参数或导航拦截。根服务器为 /about 提供明确的回退页面，使刷新可用。可与两个 Todo 应用中的 react-router-dom 比较。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build -w @latte/router`，然后执行 `npm run dev`。打开 `http://127.0.0.1:4173/mechanisms/router/dist/index.html`。

## 从哪里读

[src/router.jsx](src/router.jsx), [src/index.jsx](src/index.jsx)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../NOTICE.md) 记录第三方署名。
