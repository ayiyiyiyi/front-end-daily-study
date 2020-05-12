# 手写 一个 async 函数，又名 babel 是怎么实现 async 的

> 起因是前晚无聊刷掘金，顺手看到一篇手写 async 的文章，点开没看完就被打断了，自己之后想了一下，发现除了知道 async 是 ES7 出来的关于 generator 的语法糖以为一无所知 =. =|| , 所以查漏补缺一下
[这篇手写async函数及过程分析](https://juejin.im/post/5eb837385188256d6b0b9215)

本质上, async 就是函数(废话)，传入参数为 generator 函数，返回值为 Promise。 内部实现是通过递归实现的，因为迭代器 generator 每次调用都会返回一个 `{value: '', done: false}`, 通过 `done` 来作为递归停止的条件, `value` 的值作为下一次递归传入的值。
原理就是这么个原理。

```js
async function fn() {
    //...
}
``` 
等同于
```js
function fn() {
    return asyncToGenerator(function* () {
        //...
    })
}
```