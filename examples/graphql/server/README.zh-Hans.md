# GraphQL 服务端与数据库

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

Apollo Server + Prisma + SQLite，用迁移脚本和虚构数据重建。这是[链接分享站](../README.zh-Hans.md)背后的 API。

## 试一试

按[应用的快速开始](../README.zh-Hans.md#试一试)准备并启动服务端。它只监听 127.0.0.1 的 4000 端口，HTTP 和 WebSocket 请求都由 `/graphql` 处理。在另一个终端里给它发一个查询：

```sh
curl -s http://127.0.0.1:4000/graphql -H 'Content-Type: application/json' -d '{"query":"{ info feed { count } }"}'
```

回答是 `{"data":{"info":"A local learning feed","feed":{"count":4}}}`，也就是种子数据里的四个链接。

## 原理

先读 [src/schema.graphql](src/schema.graphql)，再读 [src/server.ts](src/server.ts)、[src/db.ts](src/db.ts) 和 [prisma/seed.ts](prisma/seed.ts)。

- **Schema。** `User` 只有 `id` 和 `name` 两个字段。邮箱地址和密码哈希虽然存在数据库里，却不属于公开的 schema，所以任何查询都拿不到它们。
- **信息流。** `feed` 先按 `createdAt` 排序，再按 `id` 排序，所以同一时刻创建的链接每次都以相同的顺序返回。`skip` 必须大于等于 0，`take` 在 1 到 50 之间，搜索文字最多 200 个字符。
- **账号。** 注册时密码至少 12 个字符，以 bcrypt 哈希的形式保存。bcrypt 只读取密码的前 72 个字节，所以更长的密码会被直接拒绝，而不是被悄悄截短。登录会返回一个一小时后过期的 JSON Web Token（JWT）。服务端会检查令牌的算法、签发者和受众；令牌无效时请求直接失败，而不是当作游客继续处理。
- **写入。** 发布和投票都需要登录。数据库在“链接 + 用户”上建有唯一索引，保证每个用户对每个链接只能投一票，即使两次投票同时到达也一样；第二次会得到 `ALREADY_VOTED` 错误。
- **实时更新。** 订阅通过 WebSocket 运行，使用 graphql-ws 库的 `graphql-transport-ws` 协议。服务端只在数据库写入完成之后才发布事件，并在令牌过期时关闭对应的连接。
- **数据库。** [src/db.ts](src/db.ts)（5 行）通过 Prisma 的 better-sqlite3 适配器打开 SQLite。[prisma7.config.ts](prisma7.config.ts) 保存数据库地址，不写在 Prisma schema 里。

`npm run db:setup -w @latte/graphql-server` 会准备好一切，而且绝不覆盖已有的内容：

1. [setup.mjs](setup.mjs) 写入带随机本地密钥的 `.env`，仅在 `.env` 还不存在时才写。然后创建空的 SQLite 文件，已有的文件不会被清空。
2. `prisma migrate deploy` 执行 [prisma/migrations](prisma/migrations) 里的 SQL 迁移。
3. [prisma/seed.ts](prisma/seed.ts) 添加一个虚构用户和四个链接。重复运行不会改变任何东西。

如果想要一个独立的全新数据库，就给 `db:setup` 和 `dev` 都设置 `DATABASE_URL=file:/absolute/path/to/new-demo.db`（换一个新路径）。已有的数据绝不会被悄悄重置。

## 过去与现在

原来的服务端来自 How to GraphQL 教程，运行在 Apollo Server 2 上，订阅走的是较早的 subscriptions-transport-ws 协议。它用的是 Prisma 3，数据库文件也直接放在仓库里。现在的版本使用运行在 Express 5 上的 Apollo Server 5、graphql-ws 6 和 Prisma 7。Apollo Server 如今把订阅交给 graphql-ws 库处理（[Apollo 文档](https://www.apollographql.com/docs/apollo-server/data/subscriptions)），Prisma 7 则通过驱动适配器连接 SQLite（[Prisma 文档](https://www.prisma.io/docs/v7/prisma-orm/quickstart/sqlite)）。

旧的数据库文件不再使用，也没有从中迁移任何数据。schema 从一个基线迁移和虚构数据重新开始，所以旧应用里的个人数据一条也不会带过来。

## 刻意省略

- 事件通过内存里的发布器传递，也就是 graphql-subscriptions 的 `PubSub`。服务重启后事件就会丢失，也不会送到其他服务进程。
- 没有邮箱验证，没有找回密码，也没有限流。

## 验证与来源

- `npm run typecheck -w @latte/graphql-server` 生成 Prisma 客户端，并对服务端做类型检查。
- 执行 `npm run build` 之后，`npm run test:api` 用迁移脚本和 seed 建出全新的临时数据库，并检查登录、分页、URL 校验、一人一票的规则，以及经由 graphql-ws 的真实推送。
- Git 会忽略生成的客户端、`.env`、数据库文件及其 journal 文件。
- `setup.mjs` 特意先创建空的数据库文件：在测试这个示例的 macOS 电脑上，这一步让 Prisma 7.10 的首次迁移变得可靠。
- Prisma 7.10 指定了 `deepmerge-ts`（用于读取配置）和 `mysql2` 的确切旧版本，这些版本有已知的安全问题。根目录的 `package.json` 用 overrides 把它们换成 `deepmerge-ts` 8.0.2 和 `mysql2` 3.24.4。配置里只有普通对象，所以 [deepmerge-ts v8 在 `Map` 和自定义类型上的变化](https://github.com/RebeccaStevens/deepmerge-ts/releases/tag/v8.0.0)不会影响它；`npm run check` 也会实际执行客户端生成、配置读取和迁移。这个 SQLite 应用从不使用 MySQL。直接运行 `npm ci` 就能装好一切，不需要 `--force`，也不需要放宽 peer 依赖检查。
- 服务端改编自 Graphcool 的教程代码，保留其 [MIT 许可](../LICENSE.txt)；修改部分同样使用 MIT 许可。见 [NOTICE.md](../../../NOTICE.md)。
