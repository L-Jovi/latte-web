# 事件传播与事件循环

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

先看事件如何冒泡，再预测并验证任务、微任务和定时器的执行顺序。两个页面把结果打印到浏览器控制台，第三个脚本在 Node 里运行。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/fundamentals/events/dom-event/
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。请一直开着浏览器控制台。

- **冒泡**，就是上面这个页面（[在线演示](https://l-jovi.github.io/latte-web/fundamentals/events/dom-event/index.html)）。点击里面的小方块（child）：只出现 `fire child`。点击外框（parent）里的其他地方：出现 `fire parent`。点击列表里的某个数字：控制台先显示你点中的 `<li>`，再显示负责监听的 `<ul>`。
- **调度**，页面地址是 `/fundamentals/events/web-task/`（[在线演示](https://l-jovi.github.io/latte-web/fundamentals/events/web-task/index.html)）。页面加载时，一个脚本依次打印 `script start`、`async2 end`、`Promise`、`script end`、`async3 end`、`promise1`、`async4 end`、`promise2`、`async1 end`，最后是 `setTimeout`；另一个脚本打印 `Promise.resolve:  2`。然后点击里面的方块：`click`、`promise`、`observer` 会出现两遍，先是里面的方块，再是外面的方块，之后是两行 `animationFrame` 和两行 `timeout`。

Node 脚本不需要服务器。另开一个终端，在仓库根目录运行：

```sh
node fundamentals/events/node-task/task-order.cjs
```

它依次打印 `9`、`8`、`5`、`6`、`7`，然后是 `1`、`3`、`4` 和 `2`。`2` 出现在 `1 3 4` 之前还是之后，每次运行都可能不同。

## 原理

**冒泡。** 点击事件从你点中的元素开始，然后沿着祖先元素一层层向上“冒泡”，所以祖先元素上的点击监听器也会执行。在 [dom-event/event-register.js](dom-event/event-register.js)（23 行）里，child 的第一个监听器调用了 `e.stopImmediatePropagation()`。它既让事件停在到达 parent 之前，也跳过了 child 自己的第二个监听器，所以 `fire child 2nd event` 和 `fire parent` 都不会出现（[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation)）。被注释掉的 `e.stopPropagation()` 只会阻止事件传到 parent：child 的第二个监听器仍然会执行。列表演示的是“事件委托”：`<ul>` 上的一个监听器，处理所有 `<li>` 的点击。`event.target` 是你点中的元素，`event.currentTarget` 是当前正在执行监听器的那个元素。

**调度。** 浏览器以“任务”（task）为单位运行代码，比如一整段脚本、一次定时器回调、一次点击。当前代码一执行完（一段脚本，或者一个事件监听器），浏览器就会把排队中的“微任务”（microtask）全部执行掉：Promise 回调、`async` 函数在 `await` 之后的剩余部分，以及 `MutationObserver` 的通知（[MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)）。每个定时器回调都要等到之后的某个任务里才执行，而 `requestAnimationFrame` 的回调在浏览器下一次绘制页面之前执行。

- [web-task/task-order.js](web-task/task-order.js)（39 行）：调用 `async` 函数时，函数体会立刻执行，直到遇到第一个 `await`，所以 `async2 end` 和同步代码一起打印出来。`script end` 之后，每个 `await` 都在一个微任务里恢复执行，和 `.then` 回调轮流进行。`setTimeout` 要等一个新的任务，所以排在最后。
- [web-task/promise-order.js](web-task/promise-order.js)（20 行）是个陷阱。`Promise.resolve(fn)` 并不会调用 `fn`，它创建的是一个值为这个函数本身的 Promise。那些本该打印 1、3、4、5、6 的嵌套代码从来不会执行，只有 `.then` 回调打印出了 `2`。
- [web-task/event-call.js](web-task/event-call.js)（23 行）给两个方块绑定了同一个处理函数。每个监听器执行完，它产生的微任务会立刻执行：先是 `promise`，再是 `observer`（由处理函数修改属性触发）。之后事件才继续冒泡到外面的方块。定时器和动画帧回调都在更后面，两者谁先谁后不固定。
- [node-task/task-order.cjs](node-task/task-order.cjs)（13 行）：Node 先执行同步代码（`9`），然后是 `process.nextTick` 回调（`8`），然后是 Promise 回调（`5 6 7`），最后是定时器（`1 3 4`）和 `setImmediate`（`2`）。在脚本顶层，定时器和 `setImmediate` 的先后顺序是不保证的（[Node.js 文档](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#setimmediate-vs-settimeout)）。文件以 `.cjs` 结尾，所以 Node 把它当作 CommonJS 脚本运行。在 ES 模块里，Promise 回调会先于 `nextTick` 回调执行（[Node.js 文档](https://nodejs.org/docs/latest-v24.x/api/process.html#when-to-use-queuemicrotask-vs-processnexttick)）：把文件复制成一个 `.mjs` 文件再运行，就会看到 `9 5 6 7 8`。

## 过去与现在

冒泡和事件委托今天依然是这样工作的：父元素上的一个监听器，就能处理它所有子元素的点击。不过调度的细节变过。V8 团队向 ECMAScript 规范提出了一项修改（后来已被合并），让 `await` 一个 Promise 只需要一轮微任务，而不是至少三轮（[V8 博客，2018-11-12](https://v8.dev/blog/fast-async)）。因此，较早的文章和较旧的引擎打印 task-order.js 时，顺序可能不一样。所以请拿真实的日志和你的预测对照，而不是去背一个放之四海而皆准的顺序。这些脚本的第一版还在注释里把 `requestAnimationFrame` 称为“宏任务”；它并不是定时器那样的任务，而是在浏览器绘制之前执行的回调。

## 刻意省略

- 只演示了点击事件和冒泡，没有捕获阶段的监听器，也没有 `preventDefault()`。
- 有些输出没有固定顺序：浏览器里的定时器和动画帧回调，Node 脚本顶层的定时器和 `setImmediate`。上面列出的只是其中一种可能的顺序。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中点击 child，检查以 `fire` 开头的消息只有 `fire child` 一条，也就是说 child 的第二个监听器和 parent 的监听器都没有执行。它还会打开这两个页面，检查页面能正常加载、没有报错。调度顺序没有自动测试。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到原来的 `event` 目录。Node 脚本从 `task-order.js` 改名为 `task-order.cjs`，因为本仓库的 `package.json` 会让 `.js` 文件按 ES 模块处理。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
