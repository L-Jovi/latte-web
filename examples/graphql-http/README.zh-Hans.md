# GraphQL 的 HTTP 基础

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

从最小完整请求链入手：SDL schema → 根对象／class resolver → HTTP JSON 响应。保留原来的 hello、骰子和内存消息练习。

根目录 `npm ci` 后，分别运行 `npm run dev -w @latte/graphql-http` 和 `npm run dev`。打开 http://127.0.0.1:4173/examples/graphql-http/，点击 **Run query**，应看到 `Hello world!` 和三次骰子结果。API 地址为 http://127.0.0.1:4001/graphql。

按 `buildSchema`、`RandomDie`、`rootValue`、`createHandler` 的顺序读 `server.js`。试用 `mutation { createMessage(input: {author: "Reader", content: "Hello"}) { id } }`，再用 ID 调用 `getMessage` 或 `updateMessage`。重启会清空 Map。骰子数量和文本长度有边界，随机数不用于安全用途。

用 `graphql-http` 替换已停止维护的旧 Express 适配器。本层不包含登录、持久化或订阅，相关边界见[完整应用](../graphql/README.zh-Hans.md)。查询不存在的消息返回 null，修改不存在的消息返回 GraphQL 错误。界面直接用 textarea，便于观察请求。

运行 `npm run test:api` 和 `npx playwright test tests/browser/network.spec.js`。原创修改为 MIT，schema／resolver 学习来源为 [GraphQL.js 文档](https://www.graphql-js.org/docs/)。适配器参考 [graphql-http](https://github.com/graphql/graphql-http)。
