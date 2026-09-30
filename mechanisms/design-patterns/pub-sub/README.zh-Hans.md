# 发布订阅

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

一个最小的 `on` / `emit` / `off` 事件中心，发送方不需要知道谁在监听。

## 试一试

这个示例没有演示页面，改为运行单元测试。克隆仓库后直接就能运行，不需要 `npm ci`：

```sh
npm test
```

结果里会有 `✔ publish/subscribe supports unsubscribe during delivery and hostile event names`。想亲手试试这个事件中心，就把 [simple.js](simple.js) 粘贴到浏览器控制台里，然后运行：

```js
const hub = new EventHub()
const off = hub.on('greet', (name) => console.log('hello', name))
hub.emit('greet', 'Ada') // 打印 "hello Ada"
off()
hub.emit('greet', 'Ada') // 什么也不打印：监听器已经没了
```

## 原理

在发布订阅模式里，发送消息的代码（发布者）和响应消息的代码（订阅者）之间只共享一个事件名，双方都不持有对方的引用。

[simple.js](simple.js)（21 行）是一个名为 `EventHub` 的 class，有三个方法：

- `on(event, handler)` 把处理函数加入这个事件的列表，并返回一个用来取消这次订阅的函数。
- `emit(event, data)` 按订阅的先后顺序，用 `data` 依次调用这个事件的每个处理函数。
- `off(event, handler)` 移除处理函数；如果这个事件的列表因此变空，就把列表整个删掉。

有两个细节很重要：

- `emit` 在开始调用处理函数之前，先复制一份列表。如果不复制，某个处理函数在派发过程中取消了自己的订阅，列表就会整体前移，下一个处理函数就会被跳过。
- 这些列表存放在一个 `Map` 里，以事件名为键。这样，名叫 `__proto__` 或 `constructor` 的事件和其他事件没有任何区别；如果用普通对象存放，这类名字会和每个对象本来就有的属性冲突。

## 过去与现在

浏览器自带一个事件中心：`new EventTarget()` 提供 `addEventListener`、`removeEventListener` 和 `dispatchEvent`，所有主流浏览器从 2020 年 9 月起都支持它（[MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget)）。Node.js 的 `node:events` 里也有 `EventEmitter`。

## 刻意省略

- 派发是同步的：`emit` 在返回之前，会把每个处理函数都调用完。
- 如果某个处理函数抛出异常，错误会传到调用 `emit` 的代码那里，排在它后面的处理函数也不会再运行。
- 没有异步派发，也不能在标签页、worker 或不同机器之间传递消息。

## 验证与来源

- `npm test` 给名为 `__proto__` 的事件订阅两个处理函数，其中第一个在运行时会取消自己的订阅。调用两次 `emit` 之后，测试期望得到 `1,2,4`：第二个处理函数没有被跳过，第一个只运行了一次。
- simple.js 注明它最初的学习来源是 [amandakelake 的一篇博客文章](https://github.com/amandakelake/blog/issues/65)。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到原始版本。
