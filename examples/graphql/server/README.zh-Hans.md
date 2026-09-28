# GraphQL 服务与数据库

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

先按[应用入口](../README.zh-Hans.md)启动。HTTP 和 `graphql-transport-ws` 子协议共享 4000 端口的 `/graphql`；`npm run dev -w @latte/graphql-server` 只监听 127.0.0.1。

阅读顺序：`src/schema.graphql` → `src/server.ts` → `src/db.ts` → `prisma/seed.ts`。分页以 createdAt、id 稳定排序，skip 非负、take 为 1–50。公共 schema 不暴露邮箱与密码。bcrypt 密码最多 72 字节，防止静默截断；JWT 固定算法、签发者和受众，失效令牌拒绝访问，连接在令牌过期时关闭。

`npm run db:setup -w @latte/graphql-server` 仅在 `.env` 不存在时写入随机本地密钥，创建空 SQLite 文件而不截断已有文件，执行仓库 SQL 迁移，再添加可重复的虚构 seed。`prisma7.config.ts` 承载数据库 URL，运行时使用官方 better-sqlite3 适配器。显式创建空文件也让本机 Prisma 7.10 的首次迁移可重复。生成客户端、`.env`、数据库和 journal 均被忽略。

完全独立的重建可给 `db:setup` 和 `dev` 同时设置 `DATABASE_URL=file:/absolute/path/to/new-demo.db`，选择新路径，不静默重置已有数据。旧运行数据库退役，不作为迁移输入；新 schema 是教学基线，不承诺迁移历史个人数据。

`npm run typecheck -w @latte/graphql-server` 生成并检查客户端；`npm run test:api` 验证迁移、seed、鉴权、分页、URL 校验、唯一约束和真实订阅。内存 PubSub 在重启后丢失事件，不适合多服务进程。

Prisma 7.10 的工具依赖上游仍固定旧版本，根 overrides 将配置合并用的 `deepmerge-ts` 固定为 8.0.2，将 `mysql2` 固定为 3.24.4。当前配置仅含普通记录，不涉及 v8 变化的 Map／自定义类型；实际生成、配置读取和迁移均纳入测试。SQLite 应用不使用 MySQL。参考 [deepmerge v8 变化](https://github.com/RebeccaStevens/deepmerge-ts/releases/tag/v8.0.0)，不使用强制安装或忽略兼容检查。许可：[Graphcool MIT](../LICENSE.txt) 与原创 MIT 修改。
