# 从零搭一个 GraphQL HTTP 服务

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

Schema、resolver 和 JSON 响应：最小的一次完整 GraphQL 请求。服务端保留了原版里的 hello、掷骰子和留言三个练习。

## 试一试

这个示例需要两个本地服务，所以没有在线演示。在仓库根目录运行：

```sh
npm ci
npm run dev -w @latte/graphql-http
# 在第二个终端里：
npm run dev
```

打开 http://127.0.0.1:4173/examples/graphql-http/?lang=zh，点击**运行查询**。按钮下方会出现 JSON 格式的回答：`"foo": "Hello world!"`、`"bar": ["bar", "baz"]`，以及三次 1 到 6 之间的掷骰结果。API 本身的地址是 http://127.0.0.1:4001/graphql。

接着把查询换成一个 mutation（变更，也就是会修改数据的操作）：

```graphql
mutation {
  createMessage(input: { author: "Reader", content: "Hello" }) {
    id
  }
}
```

拿它返回的 `id` 去调用 `getMessage` 或 `updateMessage`，比如 `{ getMessage(id: "…") { author content } }`。重启服务会清空所有留言。

## 原理

GraphQL 是一种给 API 用的查询语言：客户端发一个请求，准确列出它想要的字段，服务端就按同样的结构返回 JSON。所有逻辑都在 [server.js](server.js)（90 行）里，从上往下读：

1. `buildSchema` 读取用 GraphQL 自己的 schema 语言（SDL）写成的 schema，里面列出了各种类型，以及客户端可以发送的查询和 mutation。
2. `RandomDie` 是一个 class。当查询要一个 `RandomDie` 时，GraphQL 会调用它的方法（比如 `roll`）来填充客户端要的字段。
3. `rootValue` 为每个顶层的查询和 mutation 各提供一个函数。这些函数就是 resolver：负责产出数据。留言保存在内存里的一个 `Map` 中。
4. graphql-http 的 `createHandler` 把 schema 和 resolver 变成一个 HTTP 处理函数：读取 JSON 请求，执行它，再写回 JSON 响应。

页面（4173 端口）和 API（4001 端口）属于不同的源，所以服务端会发送 CORS 响应头，只允许这个页面的地址读取回答，其他地址都不行。[client.js](client.js)（25 行）用 `fetch` 发送 `POST` 请求，把输入框里的文字作为 `{ "query": … }` 发出去，再把回答打印出来。

输入都会经过检查：骰子有 1 到 1000 个面，一次可以掷 1 到 100 次；留言最多 1000 个字符，作者名最多 100 个字符；服务端最多保存 100 条留言。不合法的值会以 GraphQL 错误的形式返回，比如 `Expected an integer from 1 to 100`。查询不存在的留言会返回 `null`；试图修改不存在的留言则会报错。

## 过去与现在

原版用 Express 服务器上的 express-graphql 提供同一个 schema。GraphQL 基金会[采纳了 graphql-http](https://graphql.org/blog/2022-11-07-graphql-http/) 作为参考实现，express-graphql 于 2023 年归档。现在的版本用 graphql-http 配合 Node 自带的 `http` 模块，schema 和 resolver 仍然沿用 [GraphQL.js 教程](https://www.graphql-js.org/docs/)的写法。[全栈示例](../graphql/README.zh-Hans.md)用 Apollo Server 5 展示了更大的服务端还会多做些什么。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- 没有登录，没有数据库，也没有实时更新（订阅）。[全栈示例](../graphql/README.zh-Hans.md)三样都有。
- 留言保存在内存里，所以重启服务就会清空。
- 页面只是一个普通的文本框，不是 GraphQL IDE。
- 掷骰子用的是 `Math.random()`，做游戏没问题，但不适合任何必须无法预测的场合，比如安全令牌。

## 验证与来源

- 执行 `npm run build` 之后，`npm run test:api` 会在一个空闲端口上启动这个服务。它检查 `hello` 的回答，检查一个只有一个面的骰子掷三次得到 `[1, 1, 1]`，检查掷 101 个骰子会被拒绝，还检查留言可以创建、修改并读回来。
- 构建之后，`npx playwright test tests/browser/network.spec.js` 会在 Chromium、Firefox、WebKit 中点击 **Run query**，检查页面出现 `Hello world!`。同一个文件还测试了 [JSONP 与 fetch + CORS 对照](../network/README.zh-Hans.md)和[离线访问](../service-worker/README.zh-Hans.md)两个示例。测试运行时会自己启动所需的服务（见 [scripts/test-services.ts](../../scripts/test-services.ts)），所以请先停掉“试一试”里启动的那些。浏览器需要先安装一次：`npx playwright install chromium firefox webkit`。
- 这两条命令都需要先构建，因为它们也会加载[全栈示例](../graphql/README.zh-Hans.md)，而那个示例的数据库客户端由 `npm run build` 生成。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。schema 和 resolver 的练习沿用 [GraphQL.js 教程](https://www.graphql-js.org/docs/)，HTTP 处理函数由 [graphql-http](https://github.com/graphql/graphql-http) 提供。
