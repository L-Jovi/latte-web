# Apollo Client 前端

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

在 Vite 应用里发起查询、变更和实时订阅。这是[链接分享站](../README.zh-Hans.md)的页面：它显示链接、处理登录，并在别人发布或投票时自动更新。

## 试一试

按[应用的快速开始](../README.zh-Hans.md#试一试)启动 API 和页面。`npm run build -w @latte/graphql-client` 会把这个应用构建到 `examples/graphql/client/dist/`，由根目录的 `npm run dev` 提供访问。

如果想一边改代码一边实时刷新，就先停掉根目录的 `npm run dev`（两者都用 4173 端口），让 API 继续运行，再启动 Vite：

```sh
npm run dev -w @latte/graphql-client
```

然后打开 Vite 打印出来的地址。

## 原理

按下面的顺序读 [src](src) 里的三个文件：

1. [src/client.js](src/client.js)（32 行）创建 Apollo Client。一个 `split` link 会查看每个操作：订阅经由 `GraphQLWsLink` 走 WebSocket，查询和变更经由 `HttpLink` 走 HTTP。如果已经登录，两者都会带上登录令牌。
2. [src/main.jsx](src/main.jsx)（30 行）把会话（令牌和用户名）保存在 React state 里，也就是只存在内存中。会话一变（登录或退出时），它就关闭旧的客户端及其 WebSocket，再创建一个缓存为空的新客户端。
3. [src/App.jsx](src/App.jsx)（241 行）使用 Apollo Client 4 的 React hooks，从 `@apollo/client/react` 导入。`useQuery` 每次取三个链接，把搜索文字和翻页偏移量作为变量。`useMutation` 负责登录、注册、发布和投票。两个 `useSubscription` 只在登录后生效，监听 `newLink` 和 `newVote`，收到事件就重新获取当前页。

接口地址默认是 `http://127.0.0.1:4000/graphql`，除非构建时用 `VITE_GRAPHQL_URL` 指定了别的地址。Vite 会把这类变量写进页面，谁都能读到，所以里面绝不能放密钥。服务端允许的来源列表（CORS）也必须和页面的地址对应。链接描述一律作为文本显示，不会当作 HTML；服务端也只接受 `http` 和 `https` 链接。

## 过去与现在

原来的客户端是一个使用 Apollo Client 3 的 Create React App 项目，订阅走的是较早的 subscriptions-transport-ws 协议。现在的版本用 Vite 构建，使用 Apollo Client 4 和 graphql-ws。在 Apollo Client 4 里，React hooks 来自单独的入口 `@apollo/client/react`。参考 [GraphQLWsLink](https://www.apollographql.com/docs/react/api/link/apollo-link-subscriptions) 和 [Apollo React API](https://www.apollographql.com/docs/react/api/react/hooks)。

## 刻意省略

- 令牌只保存在内存里，所以刷新页面就会退出登录。
- 浏览器里不保存任何东西，没有离线队列；会话过期后客户端也不会自动重连，需要刷新页面重新登录。

## 验证与来源

- 执行 `npm run build` 之后，`npx playwright test tests/browser/graphql.spec.js` 在 Chromium、Firefox、WebKit 中运行这个应用：翻页、登录、搜索、从第二个页面发布、投票、`Already voted` 以及退出登录。测试运行时会自己启动所需的服务，所以请先停掉你自己启动的那些。
- API 报错以及两次投票同时到达的情况，由服务端测试 `npm run test:api` 检查。
- 这个应用改编自 Graphcool 的教程代码，保留其 [MIT 许可](../LICENSE.txt)；修改部分同样使用 MIT 许可。见 [NOTICE.md](../../../NOTICE.md)。
