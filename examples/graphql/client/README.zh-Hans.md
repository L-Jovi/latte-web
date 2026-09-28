# Apollo Client 请求与订阅

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

先按[完整入口](../README.zh-Hans.md)运行。`npm run build -w @latte/graphql-client` 生成 `/examples/graphql/client/dist/` 下的 Vite 应用。开发时可停止根静态服务，改用 `npm run dev -w @latte/graphql-client` 监听 4173，API 仍在另一终端运行。

`src/client.js` 用 split link 将订阅交给 GraphQLWsLink，其余请求交给 HttpLink。`src/main.jsx` 管理内存中的会话，身份变化时建立／销毁客户端。`src/App.jsx` 从 Apollo 4 的 React 入口使用 hooks，以变量控制搜索分页，以 mutation 写入，订阅后刷新当前视图。

默认端点是 `http://127.0.0.1:4000/graphql`。可选 `VITE_GRAPHQL_URL` 在构建时替换；Vite 变量会公开到浏览器，不能放密钥。服务端 CORS 来源也需对应。重载会清空令牌；没有持久化、离线队列或过期后的自动重连，需要重新登录。

`npx playwright test tests/browser/graphql.spec.js` 验证整套操作；API 错误与并发重复投票由服务端测试覆盖。描述按文本渲染，服务端只接受 HTTP／HTTPS 链接。许可：[Graphcool MIT](../LICENSE.txt) 与原创 MIT 修改。参考：[Apollo React API](https://www.apollographql.com/docs/react/api/react/hooks)。
