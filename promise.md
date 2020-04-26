<!--
Created: Sun Apr 26 2020 23:31:43 GMT+0800 (China Standard Time)
Modified: Mon Apr 27 2020 00:02:15 GMT+0800 (China Standard Time)
-->
<!-- js -->

# promise 用法

promise 是一个类, 具有 then(必须), catch, race, all, resolve, `reject` 方法

promise 具有三种状态， `pending` , `resolved` , `rejected` 

* 状态只能由 `pending` 变为 `resolved` 或由 `pending` 变为 `rejected` ，且状态改变之后不会在发生变化。

promise 构造函数 `constructor` 必须接收一个函数作为参数，该函数具有两个参数: `resolve` , `reject` 

* `resolve` 将状态 `pending` 变为 `resolved` 
* `reject` 将状态 `pending` 变为 `rejected` 
* `resolve` 和 `reject` 都可以传入任意类型的值作为实参，表示 promise 对象成功（ `resolved` ）和失败（ `rejected` ）的值

`promise.then` 接收两个参数，onResolved, onRejected
