# Proxy 拦截与事件委托

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

用 `Proxy` 拦截属性读写，用一个父元素处理所有子元素的点击。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/design-patterns/proxy/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。打开浏览器控制台。读取 `proxy.name` 会触发 `get` 拦截器，它依次打印目标对象、属性名（`name string`）和代理对象本身，随后出现 `king saber`。执行 `proxy.name = 'foobar'` 之后，再读一次得到的是 `king archer`。再点击列表里的任意一个数字：控制台会打印这个数字，尽管只有列表本身绑定了点击监听器。也可以直接打开[在线演示](https://latte.jovipro.com/mechanisms/design-patterns/proxy/index.html)。

## 原理

两个例子都是在中间插了一层。代理站在你的代码和对象之间；委托的监听器放在父元素上，替子元素处理事件。思路相通，但它们是浏览器里两种不同的功能。

[es6-proxy.js](es6-proxy.js)（29 行）用 `new Proxy(target, handler)` 包装一个对象。handler 里的函数叫作“拦截器”（trap），它们会代替默认行为执行：

- `get` 拦截器在每次读取属性时执行。它打印自己收到的参数，然后返回 `'king ' + target[key]`。
- `set` 拦截器故意无视赋给它的值：给 `name` 赋值时存进去的是 `'archer'`，给其他任何属性赋值时，存进 `weapon` 的是 `'ea'`。它返回 `true`，表示赋值成功。如果 `set` 拦截器返回 `false`，在严格模式下这次赋值会抛出 `TypeError`（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)）。

[event-proxy.js](event-proxy.js)（2 行）只给 `<ul>` 绑定了一个点击监听器。点击某个 `<li>` 时，事件会冒泡到列表上，`event.target` 告诉你点的是哪一项。这就是“事件委托”：一个监听器服务许多子元素，包括之后才添加进来的子元素。[事件传播与事件循环](../../../fundamentals/events/README.zh-Hans.md)更详细地演示了冒泡。

## 过去与现在

JavaScript 有两种拦截属性访问的办法：getter 和 setter，每次只能为一个属性定义；以及 ES2015 加入的 `Proxy`（[规范](https://262.ecma-international.org/6.0/)）。Vue 的变化就是一个例子：Vue 2 受浏览器支持所限，只用 getter 和 setter；Vue 3 则用 Proxy 实现响应式对象（[Vue 文档](https://vuejs.org/guide/extras/reactivity-in-depth.html)）。

框架同样会委托事件。React 以前把大部分监听器挂在 `document` 上，React 17 把它们移到了应用的根容器上（[React 博客](https://legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html)）。

## 刻意省略

- 拦截器是为演示特意设计的：`get` 会改写它返回的每一个值，`set` 会丢掉你赋的值。
- 监听器直接使用 `event.target`。如果某一项里还嵌套了其他元素，target 可能是那个内层元素；这时用 `event.target.closest('li')` 仍然能找到那一项。

## 验证与来源

- 这两个文件没有自动化测试。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，页面一旦报错测试就会失败。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。[迁移清单](../../../docs/migration.zh-Hans.md)里有原始版本的链接。
