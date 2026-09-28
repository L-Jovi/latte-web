# 动手实现

[English](README.md) | 简体中文

> 对应英文版：两种语言由同一份目录数据同时生成，内容始终同步。

日常工具的小型实现，每一个都有测试。

| 主题 | 你会看到什么 | 试一试 |
| --- | --- | --- |
| [从零实现 Promise](promise/README.zh-Hans.md) | 分三步写出 Promise：从最小的状态机，到通过全部 872 项 Promises/A+ 官方测试的版本。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/promise/index.html) |
| [Generator 如何暂停与恢复](generator/README.zh-Hans.md) | 看 Babel 把 yield 编译成的状态机，以及值是怎样传进传出的。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/generator/index.html) |
| [小例子讲设计模式](design-patterns/README.zh-Hans.md) | 单例、工厂、适配器、代理、发布订阅，每个只用几行代码。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/index.html) |
| [原型继承，以及常见的错误写法](design-patterns/inherit/README.zh-Hans.md) | 对比共享原型、借用构造函数和 Object.create，看每种写法各自的问题。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/inherit/index.html) |
| [Proxy 拦截与事件委托](design-patterns/proxy/README.zh-Hans.md) | 用 Proxy 拦截属性读写，用一个父元素处理所有子元素的点击。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/proxy/index.html) |
| [发布订阅](design-patterns/pub-sub/README.zh-Hans.md) | 一个最小的 on / emit / off 事件中心，发送方不需要知道谁在监听。 | — |
| [手写常用工具函数](utilities/README.zh-Hans.md) | 防抖、节流、深拷贝等，写成边界清楚的短算法。 | — |
| [浅拷贝与深拷贝](utilities/clone/README.zh-Hans.md) | 复制对象图时保留共享引用和循环引用，再和 structuredClone 对比。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/clone/index.html) |
| [检测循环引用](utilities/circle-ref/README.zh-Hans.md) | 区分真正的循环引用，和只是被引用了两次的对象。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/circle-ref/index.html) |
| [防抖](utilities/debounce/README.zh-Hans.md) | 等一连串调用停下来之后，只执行一次。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/debounce/index.html) |
| [节流](utilities/throttle/README.zh-Hans.md) | 每个时间间隔最多执行一次，第一次调用立即执行。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/throttle/index.html) |
| [定时器为什么会漂移，以及如何校正](utilities/timer/README.zh-Hans.md) | 测量定时器回调晚了多少，并据此调整下一次的触发时间。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/timer/index.html) |
| [千分位格式化，不丢精度](utilities/format/README.zh-Hans.md) | 不把数字字符串转成 Number 也能加千分位；再和 Intl.NumberFormat 对比。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/format/index.html) |
| [add(1)(2)(3)：柯里化与类型转换](utilities/add/README.zh-Hans.md) | 用闭包累加，再看一个函数是怎么变成数字的。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/add/index.html) |
| [手写打包器（两种写法）](bundlers/README.zh-Hans.md) | 解析 import、构建依赖图、输出一个文件；先用几个函数写，再改成一个小型编译器。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/bundlers/dist/index.html) |
| [手写一个 React 风格的渲染器](mini-react/README.zh-Hans.md) | 用几个文件实现 createElement、挂载和 setState；两个计数器各自保存状态。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/mini-react/index.html) |
| [手写前端路由](router/README.zh-Hans.md) | 基于 History API 的小路由：点击链接、前进后退，都不刷新页面。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/router/dist/index.html) |
| [函数组合（compose）](compose/README.zh-Hans.md) | Redux 中间件背后的 compose，自己写一遍。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/compose/index.html) |
| [可编辑文本里的光标与选区](selection/README.zh-Hans.md) | 在失去焦点前保存光标，在光标处插入文字，重新渲染后再恢复光标。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/selection/index.html) |

[返回学习路线](../README.zh-Hans.md#学习路线)
