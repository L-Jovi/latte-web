# JSONP 与 fetch + CORS 对照

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

用两种方式读取同一份跨域数据，并用 `AbortController` 取消请求。JSONP 把回答当作脚本执行；`fetch` 只是读取它，而且之所以能读，是因为服务器通过 CORS 允许了。

## 试一试

这个示例需要第二个本地服务，所以没有在线演示。不需要安装依赖：克隆仓库后两个服务都能直接运行。在仓库根目录运行：

```sh
node examples/network/server.js
# 在第二个终端里：
npm run dev
```

打开 http://127.0.0.1:4173/examples/network/。页面来自 4173 端口，数据来自 4002 端口，所以两者的“源”（origin，即协议、主机和端口三者合在一起）不同，浏览器会把它们隔开。

- **Request with JSONP** 和 **Request with Fetch** 都会显示同一条消息 `Hello from the second origin`。`transport` 字段说明它是通过哪种方式来的：`jsonp` 或 `data`。
- **Start slow Fetch** 会显示 `Waiting`，服务器要过 2 秒才回答。在此之前点击 **Cancel request**，输出就变成 `Request cancelled`。如果等它完成，就会显示那条消息，`transport` 为 `slow`。

## 原理

页面可以从任何源加载脚本，但页面里的代码不能读取另一个源的响应，除非那个源允许。

- **JSONP** 利用的是前一条规则。[jsonp.js](jsonp.js)（22 行）先起一个独一无二的函数名，以 `?callback=…` 的形式加到 URL 上，再插入一个 `<script>` 标签。服务器返回一段 JavaScript，用数据去调用这个函数，形如 `latte_…({…});`。无论是调用到达、3 秒超时，还是脚本加载失败，代码都会移除这个标签，并删掉这个函数。
- **CORS** 处理的是后一条。[server.js](server.js)（51 行）只对页面的两个确切地址 `http://127.0.0.1:4173` 和 `http://localhost:4173` 添加 `Access-Control-Allow-Origin` 响应头，于是浏览器允许 `fetch` 读取 JSON。对于 JSONP，它只接受普通标识符形式的回调名，绝不接受其他代码。
- **取消。** [app.js](app.js)（37 行）给每个慢请求配一个自己的 `AbortController`。调用 `abort()` 会让对应的 `fetch` 以 `AbortError` 失败，页面把它显示为 `Request cancelled`。发起新的慢请求时会取消前一个，而且旧请求永远不会覆盖新请求的输出。

## 过去与现在

JSONP 利用了一个漏洞：浏览器不允许脚本读取其他源的响应，但 `<script>` 标签可以从任何地方加载代码，于是服务器把数据包在一个函数调用里返回。代价是信任：JSONP 把远程的回答当作代码执行，拥有页面的全部权限；它只支持 GET，出错时也很难处理。如今，[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) 让服务器声明谁可以读取它的响应，`fetch`（2015 年）负责读取，[`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) 可以取消不再需要的请求。早期的 `fetch` 完全无法取消；[React 架构笔记](../../docs/history/react/README.zh-Hans.md)当年选择 axios，部分原因就在这里。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- 只有在完全信任数据提供方时，JSONP 才是安全的，因为回答会作为代码在你的页面里运行。它也只适用于类似 GET 的加载方式。
- 移除 `<script>` 标签能让页面保持整洁，但并不能可靠地取消一个 JSONP 请求。
- CORS 决定的是浏览器里哪些网页可以读取响应。它不检查来访者是谁：`curl` 这样的其他程序照样能读到数据。
- 一切都在你的电脑上运行，不依赖任何外部或私有的服务器。

## 验证与来源

- `npx playwright test tests/browser/network.spec.js` 在 Chromium、Firefox、WebKit 中依次点击四个按钮。它检查两种方式的回答，检查 JSONP 结束后 `window` 上没有残留 `latte_…` 回调，并检查取消后显示 `Request cancelled`。同一个文件还测试了[离线访问](../service-worker/README.zh-Hans.md)和[从零搭一个 GraphQL HTTP 服务](../graphql-http/README.zh-Hans.md)两个示例。
- 这次测试运行会自己启动所需的服务，所以请先停掉“试一试”里启动的那些。运行前需要先执行 `npm ci` 和 `npm run build`，因为这些服务里包括全栈 GraphQL 示例；浏览器也需要安装一次：`npx playwright install chromium firefox webkit`。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。参考：[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)、[AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)、[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)。
