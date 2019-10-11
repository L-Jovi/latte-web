# Data Structure (zh)

依赖 JavaScript 实现常用数据结构。

[参考链接](https://zhuanlan.zhihu.com/p/77702278)

## 实现结构

### Stack（栈）

实现接口

- `push`

  将一个元素推入栈顶

- `pop`

  移除栈顶元素，并返回被移除的元素

- `peek`

  返回栈顶元素

- `length`

  返回栈中元素的个数

### Queue（队列）

实现接口

- `enqueue`

  入列，向队列尾部增加一个元素
 
- `dequeue`

  出列，移除队列头部的一个元素并返回被移除的元素

- `front`

  获取队列的第一个元素

- `isEmpty`

  判断队列是否为空

- `size`

  获取队列中元素的个数

### Priority Queue（优先队列）

给每个元素赋予优先级，优先级高的元素入列时将排到低优先级元素之前。区别是 `enqueue` 方法的实现

### Linked List（链表）

- `size`

  返回链表中节点的个数

- `head`

  返回链表中的头部元素

- `add`

  向链表尾部增加一个节点

- `remove`

  删除某个节点

- `indexOf`
 
  返回某个节点的 index

- `elementAt`

  返回某个 index 处的节点

- `addAt`

  在某个 index 处插入一个节点

- `removeAt`
 
  删除某个 index 处的节点

### Set（集合）

- `values`

  返回集合中的所有元素

- `size`

  返回集合中元素的个数

- `has`

  判断集合中是否存在某个元素

- `add`

  向集合中添加元素

- `remove`

  从集合中移除某个元素

- `union`

  返回两个集合的并集

- `intersection`

  返回两个集合的交集

- `difference`

  返回两个集合的差集

- `subset`

  判断一个集合是否为另一个集合的子集

### Hash Table（哈希表/散列表）

### Tree（树）

### Trie（字典树）

### Graph（图）
