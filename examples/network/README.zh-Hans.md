# JSONP、Fetch 与取消请求

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

用同一个本地跨源响应比较两种方式：JSONP 加载并执行脚本；Fetch 在服务端允许 CORS 后读取响应。

在根目录运行 `node examples/network/server.js`，另一个终端运行 `npm run dev`，打开 http://127.0.0.1:4173/examples/network/。JSONP 和 Fetch 显示同一条消息；启动慢请求再取消，显示 `Request cancelled`。

从 `jsonp.js` 读回调生命周期，从 `server.js` 读回调名校验和精确的来源白名单。`app.js` 给每次 Fetch 配一个 AbortController，并阻止旧请求覆盖新结果。移除 JSONP 脚本是清理步骤，不能保证真正取消传输。

JSONP 只适合可信脚本提供方和类似 GET 的加载，不能防止提供方执行恶意代码。CORS 管浏览器能否读取响应，不承担鉴权。本地服务不依赖私有后端。旧文“Fetch 无法取消”对应早期状态；现在可用 AbortController。

运行 `npx playwright test tests/browser/network.spec.js`，在三个浏览器验证响应、回调清理、取消及独立的离线实验。原创代码 MIT。参考：[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)、[AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)、[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)。
