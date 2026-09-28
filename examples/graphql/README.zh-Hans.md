# Apollo、订阅与 SQLite

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

本地链接信息流覆盖查询、注册登录、发布、投票、分页和实时事件。更新原来的 Graphcool／How to GraphQL 练习，保留同一组可观察行为。

在仓库根目录运行：

```sh
npm ci
npm run build
npm run db:setup -w @latte/graphql-server
npm run dev -w @latte/graphql-server
# 另开终端：
npm run dev
```

打开 http://127.0.0.1:4173/examples/graphql/client/dist/。使用 `reader@example.test` / `Learning-only-123!` 登录，或注册虚构账户。初始数据是四个公开文档链接；再开一个登录页观察发布和投票事件。尝试搜索、分页、发布 HTTPS 链接并投票，重复投票应显示 `Already voted`。

从[服务端](server/README.zh-Hans.md)阅读 schema、resolver、鉴权、迁移和 seed；从[客户端](client/README.zh-Hans.md)阅读 HTTP／WebSocket 分流与缓存。Server 5、Client 4、GraphQL 16、graphql-ws 6、Prisma 7 替换旧 CRA 底座、Apollo 内置订阅传输与旧 Prisma 初始化。具体版本由根锁文件固定。

令牌仅保存在客户端内存，一小时过期，HTTP 和 WebSocket 操作均验证；退出关闭连接并丢弃客户端缓存。发布必须登录，数据库唯一约束保证并发请求也不能重复投票；等待写入完成后才发布事件。本例是单进程教学服务，没有邮箱验证、密码找回、限流、分布式消息、持久事件日志或部署配置，请在本机用虚构数据运行。

`npm run test:api` 覆盖从空库迁移、重复 seed、查询边界、登录、未登录写入、并发重复投票和真实订阅。`npx playwright test tests/browser/graphql.spec.js` 在三个浏览器验证构建后的客户端。测试创建独立临时库，不重置你的本地数据。保留 [Graphcool MIT 许可](LICENSE.txt)，原创修改同为 MIT。

参考：[Apollo Server 订阅](https://www.apollographql.com/docs/apollo-server/data/subscriptions)、[GraphQLWsLink](https://www.apollographql.com/docs/react/api/link/apollo-link-subscriptions)、[Prisma 7 SQLite](https://www.prisma.io/docs/v7/prisma-orm/quickstart/sqlite)。
