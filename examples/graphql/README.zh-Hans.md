# 全栈 GraphQL：Apollo、订阅与 SQLite

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

一个小型链接分享站：注册登录、投票、分页和实时更新。它更新了 Graphcool 出品的 How to GraphQL 教程应用，保留了原来能做的事：注册和登录、发布链接、投票、搜索、翻页浏览，以及看着更新实时到达。

## 试一试

这个示例需要本地的 API 服务，所以没有在线演示。在仓库根目录先做一次准备：

```sh
npm ci
npm run build
npm run db:setup -w @latte/graphql-server
```

然后启动 API，再在第二个终端里启动页面服务：

```sh
npm run dev -w @latte/graphql-server
npm run dev
```

打开 http://127.0.0.1:4173/examples/graphql/client/dist/。信息流显示种子数据四个链接中的三个，最新的在前，下面有 **Previous** 和 **Next** 两个按钮。接着可以：

- 点击 **Log in**。表单里已经填好了虚构的账号 `reader@example.test` / `Learning-only-123!`。你也可以用另一个虚构账号注册。
- 在 **Search** 里输入文字，按描述或 URL 筛选链接。
- 发布一个 `http` 或 `https` 链接，再投票。给同一个链接投第二次票，会显示 `Already voted`。
- 在第二个标签页里打开同一个页面，也登录。一个标签页发布或投票时，另一个会立即更新，并显示 `New link: …` 或 `New vote: …`。

## 原理

这个应用分成两半，各有自己的说明页：

- [服务端](server/README.zh-Hans.md)：Apollo Server 5，包括 GraphQL schema 和 resolver、基于 JSON Web Token 的登录，以及通过 Prisma 7 使用的 SQLite 数据库。
- [客户端](client/README.zh-Hans.md)：一个使用 Apollo Client 4 的 Vite 应用。查询和变更（mutation）走 HTTP，订阅走 WebSocket。

“订阅”（subscription）是一种会保持打开的 GraphQL 操作：每当有事情发生，服务端就推送一个事件，这里是 `newLink` 和 `newVote`。客户端收到后，会重新获取信息流的当前页。

这个应用保证：

- 登录令牌只保存在页面的内存里，一小时后过期。服务端在每个 HTTP 请求和每次 WebSocket 建立连接时都会检查它，并在令牌过期时关闭连接。
- 退出登录会关闭 WebSocket，并丢弃客户端的缓存。
- 只有登录用户才能发布和投票。数据库保证每个用户对每个链接只能投一票，即使两次投票同时到达也一样。
- 只有在数据库写入完成之后才会发出事件，所以订阅者收到的总是已经保存下来的那一行数据。

## 过去与现在

原版跟随的是 How to GraphQL 的 React + Apollo 教程：客户端基于 Create React App，后端是 Apollo Server 2，订阅走的是较早的 subscriptions-transport-ws 协议。截至 2026-09，现在的版本使用 Apollo Server 5、Apollo Client 4、GraphQL 16、graphql-ws 6 和 Prisma 7，客户端用 Vite 构建。Apollo Server 如今把订阅交给 graphql-ws 库处理（[Apollo 文档](https://www.apollographql.com/docs/apollo-server/data/subscriptions)）。Apollo Server 4 在 2026-01-26 停止支持，[Apollo Server 5](https://www.apollographql.com/docs/apollo-server/migration) 要求 Node.js 20 或更高版本。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- 这是一个以单进程运行的小服务。没有邮箱验证，没有找回密码，没有限流，没有持久化的事件日志，也没有部署配置。
- 事件在服务进程的内存里传递，所以不会送到其他服务进程，重启后也会丢失。
- 它只监听 127.0.0.1，只用于虚构的数据。

## 验证与来源

- 执行 `npm run build` 之后，`npm run test:api` 检查这些内容：在全新的数据库上执行迁移和 seed，信息流查询的限制，登录，未登录的写入会被拒绝，同时发出的两次投票只产生一票和一个 `ALREADY_VOTED` 错误，以及订阅确实收到了这次投票。每个测试都会创建自己的临时数据库，用完即删，不会动你本地的数据。
- 构建之后，`npx playwright test tests/browser/graphql.spec.js` 在 Chromium、Firefox、WebKit 中运行构建好的客户端：翻页、登录、搜索、从第二个页面发布、投票、`Already voted` 以及退出登录。测试运行时会自己启动所需的服务，所以请先停掉你自己启动的那些。浏览器需要先安装一次：`npx playwright install chromium firefox webkit`。
- 所有依赖的确切版本都固定在根目录的 `package-lock.json` 里。
- 这个应用改编自 Graphcool 的教程代码，保留其 [MIT 许可](LICENSE.txt)；修改部分同样使用 MIT 许可。见 [NOTICE.md](../../NOTICE.md)。
- 参考：[Apollo Server 订阅](https://www.apollographql.com/docs/apollo-server/data/subscriptions)、[Apollo Client 的 GraphQLWsLink](https://www.apollographql.com/docs/react/api/link/apollo-link-subscriptions)、[Prisma 7 配合 SQLite](https://www.prisma.io/docs/v7/prisma-orm/quickstart/sqlite)。
