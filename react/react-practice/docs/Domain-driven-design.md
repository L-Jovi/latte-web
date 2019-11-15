# 领域驱动模型

[Demo TodoMVC](https://github.com/L-Jovi/exer-web/tree/master/react-practice) 中应用了 [领域驱动模型（域驱动开发）Domain-driven design](https://zh.wikipedia.org/wiki/%E5%9F%9F%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91) 的一种尝试，从设计的角度上试图由业务本身驱动理解项目的结构划分。

## 现存问题

目前项目中应用了 React + Redux 的结构，过分的加重了 View 层的负担，单向数据流从实际应用中，实际需要界面本身负责 actions 派发和 state 获取的工作，从 UI 交互角度，没有做到逻辑角色（logic state）和交互角色（interaction state）的分离。

因此在实际项目中最终代码往往呈现过重的 action 几乎负责了所有异步和数据流转换的逻辑，参考 Vue.js 关于分离 [逻辑](https://cn.vuejs.org/v2/guide/computed.html) 和 [交互](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6) 的设计。

## 确定边界

根据 DDD 的设计概念，将所有的场景视为单独的域，那么本质的问题就是确定边界的上下文（BOUNDED CONTEXT），设置严格的规范，意图淡化模糊边缘和使连接变得更加复杂的行为。

本示例中意图将 actions 打薄，仅仅在展示层表示和模板的关联性，至于复杂的业务逻辑处理，全部交由单独的 services 管理，表现单独的业务块或者功能。

至于复杂的展示场景，需要依赖前端的计算或者发送请求的行为，均由带有副作用的中间件角色的操作符进行带有明确意图的控制。本示例选用的依赖为 [redux-saga](https://github.com/redux-saga/redux-saga)。

## 参考用例

DDD 设计本意是解决复杂的业务耦合关系，确定边界和核心域的模块组成，应用于 React 设计的前端架构并没有标准的方案。

相较于本例中抽取了 services 和整合 modules 的处理边界做法，仍有其他思路可以借鉴。以下示例中均以去中心化的思路切割整个业务块。

[domain-driven-react-redux](https://medium.com/@hassan.djirdeh/domain-driven-react-redux-a474ecf7d126)

[react-redux-immutable-ddd](https://github.com/ersinerdal/react-redux-immutable-ddd)