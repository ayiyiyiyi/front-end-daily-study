<!--
Created: Tue May 19 2020 10:11:16 GMT+0800 (中国标准时间)
Modified: Tue May 19 2020 10:15:08 GMT+0800 (中国标准时间)
-->
<!-- js -->

# JS 常用方法记录

## Array 常用方法

### reduce

reduce 的使用和如何实现：
[reduce实现](./handwriting/reduceAndCompose.js)

### slice

浅拷贝返回新数组，不改变原数组。
```js
Array.slice(begin, end)
```
**begin：可选**

1. 从该索引开始提取原数组元素。

2. 如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。

3. 如果省略，则从 0 开始。

4. 如果 begin 大于原数组的长度，则会返回空数组。

**end：可选**

1. 在该索引处结束提取原数组元素。不包括 end

2. 如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。
 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。

3. end 被省略或大于原数组长度，则 slice 会一直提取到原数组末尾。

### find, findIndex

find: 返回第一个符合条件的数组成员。若不存在返回 undefined。

findIndex: 返回第一个符合条件的数组成员的位置。若不存在返回 -1。

相同点：

1. 第一个参数都是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员。回调函数的三个参数分别为：当前的值、当前的位置和原数组。

2. 都可以接收第二个参数，用来绑定回调函数的this对象。
```js
function f(v, index, arr){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

### from

from方法用于将两类对象转为真正的数组。类数组(arguments)和可遍历(iterable)对象(包括 Set、Map)

```js
// ： DOM 操作返回的 NodeList 也是类数组
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  //...
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```
String 和 Set, Map 结构都具有 Iterator 接口，因此可以被Array.from转为真正的数组。
```js
// String
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

// Set
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// Map
const map = new Map();
map
.set('a', 'aaa')
.set('b', 'bbb');
Array.from(map) // [["a", "aaa"],["b", "bbb"]]
```

如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。

**PS：扩展运算符（...）也可以将某些数据结构转为数组。**

扩展运算符(...)与 from 的不同之处：

扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。

而Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，**即必须有length属性**。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。

```js
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```js 
Array.from([1, 2, 3], x => x * x);
// 等同于
Array.from([1, 2, 3]).map(x => x * x);
// [1, 4, 9]
```



### every, some

every 传入一个函数, 数组内每个元素都满足函数, 则返回 true, 否则返回 false. 空数组任何情况都返回 true.
some  传入一个函数, 数组只要有一个元素都满足函数, 就返回 true, 否则返回 false. 空数组任何情况都返回 false.

### splice 

删除或改变数组元素

```js
Array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```

**start**: 开始位置 (从0计数), 若大于数组长度,则从数组末尾添加内容. 若为负数, 则表示从末尾开始的第几位( -1 表示从末尾开始的第一位)

**deleteCount**: 可选,删除元素的个数

**item1,item2...**: 可选,插入数组的元素
