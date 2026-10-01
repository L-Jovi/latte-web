# 用 Service Worker 实现离线访问

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

不依赖框架，完成注册、缓存、离线访问和清理。Service Worker 是浏览器与页面并行运行的一段脚本，它可以自己响应页面发出的请求，即使没有网络也行。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/service-worker/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。页面上显示 `在线` 和 `未注册`。

1. 点击**启用离线缓存**，等到出现 `离线缓存已就绪`。
2. 在浏览器的开发者工具里把网络切换成离线，然后刷新。页面仍然能打开，标题**离线笔记本**和 `离线` 字样都在。
3. 恢复网络，点击**清理这个实验**，再刷新。页面重新显示 `未注册`：这个 worker 已经不再控制它了。

也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/service-worker/index.html)。

## 原理

先读页面这一侧的 [app.js](app.js)（80 行），再读 worker 本身 [service-worker.js](service-worker.js)（42 行）。

1. **注册。** `navigator.serviceWorker.register('./service-worker.js', { scope: './' })` 只为当前这个目录安装 worker。worker 接管页面后会触发 `controllerchange` 事件，页面随即显示 `离线缓存已就绪`。
2. **安装。** worker 的 `install` 处理函数把三个文件存进名为 `latte-offline-v1` 的缓存：目录地址本身、`index.html` 和 `app.js`。`skipWaiting()` 让新的 worker 立即接手，不必等旧的标签页全部关闭。
3. **激活。** `activate` 处理函数删除名字以 `latte-offline-` 开头的旧缓存，然后用 `clients.claim()` 接管已经打开的页面，不需要刷新。
4. **拦截请求。** 对这三个文件，并且只对 `GET` 请求，`event.respondWith` 按“网络优先”作答：先尝试网络，响应正常就顺手存一份新副本；网络失败时，改用缓存里的副本。如果两边都没有，worker 就返回一个错误（状态码 `503`）。其他请求照常走网络。
5. **清理。** **清理这个实验**注销这个目录的 worker，并删除本实验的缓存。在你刷新之前，页面仍由旧的 worker 控制。

想观察更新过程，可以把 `service-worker.js` 里的 `CACHE` 改成 `latte-offline-v2` 再刷新。浏览器会安装改过的 worker，它的 `activate` 步骤会删除旧缓存。

Service Worker 只能在“安全上下文”中运行：页面要么通过 HTTPS 提供，要么来自你自己的电脑。所以本地服务器用普通的 `http://127.0.0.1` 就能运行；换到别的地方，页面就需要 HTTPS。

## 过去与现在

本仓库里的原版示例照原样是跑不起来的：它调用的是 `navigator.serviceWorkerContainer.register` 而不是 `navigator.serviceWorker.register`，用的是 `e.responseWith` 而不是 `event.respondWith`，还依赖另一台单独的服务器。如今页面要在离线时继续工作，靠的就是 [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)。这个示例不借助框架，亲手写出 worker，让每一步都看得见。

## 刻意省略

- worker 只处理自己的三个文件，而且只处理 `GET` 请求。它从不缓存身份凭据或 API 数据，也没有通用的离线路由、冲突合并或后台同步。
- 清理只涉及这个目录的注册，以及名字以 `latte-offline-` 开头的缓存。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中用测试自带的小服务器提供这个页面。它先启用缓存，再停掉这台服务器并刷新，要求标题仍然出现。在 Chromium 和 Firefox 中，它还会把浏览器切换到离线，并期望看到 `Offline`。作为对照，另开一个禁用了 Service Worker 的浏览器会话，这时页面必须加载失败。最后它重新启动服务器，点击 **Clear this experiment**，检查缓存已经全部删除，并且刷新后页面不再受 worker 控制。
- WebKit 没有切换到离线，是因为 Playwright 有一个[尚未解决的问题](https://github.com/microsoft/playwright/issues/42775)（截至 2026-09）：在 Playwright 1.63 中，WebKit 的离线模式会拒绝本可以由 Service Worker 响应的页面加载。停掉服务器同样能证明缓存在 WebKit 中有效。这种情况下 `navigator.onLine` 仍为 `true`，所以 WebKit 中显示的还是 `Online`。
- [迁移清单](../../docs/migration.zh-Hans.md)里有原版示例 `storage` 目录的链接。原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
