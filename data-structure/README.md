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

实现接口

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

实现接口

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

实现接口

- `add`

  增加一组键值对

- `remove`

  删除一组键值对

- `lookup`

  查找一个键对应的值

### Tree（树）

实现接口

- `add`

  向树中插入一个节点

- `findMin`

  查找树中最小的节点

- `findMax`

  查找树中最大的节点

- `find`

  查找树中的某个节点

- `isPresent`

  判断某个节点在树中是否存在

- `remove`

  移除树中的某个节点

### Trie（字典树）

实现接口

- `add`

  向字典树中增加一个单词

- `isWord`

  判断字典树中是否包含某个单词

- `print`

  返回字典树中的所有单词

### Graph（图）

实现接口
