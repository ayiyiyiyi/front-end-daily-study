<!--
Created: Sat May 09 2020 18:31:55 GMT+0800 (中国标准时间)
Modified: Sat May 09 2020 18:31:55 GMT+0800 (中国标准时间)
-->
<!-- Tag: js, es6 -->

# ES6 之 let const

> let 和 const 的 用法就不记录了，记录点我不知道的
来源 [ES6 系列之 let 和 const](https://github.com/mqyqingfeng/Blog/issues/82)

## 特点
1. 不会被提升
2. 不可重复声明
3. 不绑定全局作用域
```js
let value = 1;
console.log(window.value); // undefined
```

## 临时死区
