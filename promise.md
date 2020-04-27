<!--
Created: Sun Apr 26 2020 23:31:43 GMT+0800 (China Standard Time)
Modified: Mon Apr 27 2020 00:02:15 GMT+0800 (China Standard Time)
-->
<!-- js -->

# promise

promise 是一个类, 具有 then(必须), catch, race, all, resolve, `reject` 方法

promise 具有三种状态， `pending` , `resolved` , `rejected` 

* 状态只能由 `pending` 变为 `resolved` 或由 `pending` 变为 `rejected` ，且状态改变之后不会在发生变化。

promise 构造函数 `constructor` 必须接收一个函数作为参数，该函数具有两个参数: `resolve` , `reject` 

* `resolve` 将状态 `pending` 变为 `resolved` 
* `reject` 将状态 `pending` 变为 `rejected` 
* `resolve` 和 `reject` 都可以传入任意类型的值作为实参，表示 promise 对象成功（ `resolved` ）和失败（ `rejected` ）的值

## promise.then

`promise.then` 接收两个参数，onResolved, onRejected

* onResolved 和 onRejected 都是可选参数
* onResolved 是函数

 + 当 promise 状态变为成功时必须被调用，其第一个参数为 promise 成功状态传入的值
 + 在 promise 状态改变前其不可被调用
 + 其调用次数不可超过一次

* 如果 onRejected 是函数：

 + 当 promise 状态变为失败时必须被调用，其第一个参数为 promise 失败状态传入的值
 + 在 promise 状态改变前其不可被调用
 + 其调用次数不可超过一次

promise.then 支持链式调用，说明 promise.then 返回的是一个新的 promise 对象。

### promise 调用规则：值的传递以及'错误捕获'

1. 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：

 * 若 x 不为 Promise ，则使 x 直接作为新返回的 Promise 对象的值， 即新的onFulfilled 或者 onRejected 函数的参数.
 * 若 x 为 Promise ，这时后一个回调函数，就会等待该 Promise 对象(即 x )的状态发生变化，才会被调用，并且新的 Promise 状态和 x 的状态相同。

``` js
// example 1
let promise0 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(2);
    }, 2000);
})
promise0
    .then((res) => {
        console.log(res, 'promise0 res');
        return res + 3;
    }, err => {
        console.log(err, 'promise0 error');
        return err + 3;
    })
    .then((res) => {
        console.log(res, 'promise0 then2')
    })
// 2 promise0 error
// 5 promise0 then2
```

``` js
// example 2
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
})
let promise2 = promise1.then(res => {
    return new Promise((resolve1, reject1) => {
        setTimeout(() => {
            reject1(3);
        }, 4000);
    });
})

promise2.then(res => {
    console.log(res, 'res');
}, err => {
    console.log(err, 'err');
});
// 3 err
```

2. 如果 onFulfilled 或者onRejected 抛出一个异常 e ，则 promise2 必须变为失败（Rejected），并返回失败的值 e

``` js
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
})
promise2 = promise1.then(res => {
    throw new Error('这里抛出一个异常e')
})
promise2.then(res => {
    console.log(res)
}, err => {
    console.log(err) //1秒后打印出：这里抛出一个异常e
})
```

3. 如果onFulfilled 不是函数且 promise1 状态为成功（Fulfilled）， promise2 必须变为成功（Fulfilled）并返回 promise1 成功的值

``` js
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
})
promise2 = promise1.then('这里的onFulfilled本来是一个函数，但现在不是')
promise2.then(res => {
    console.log(res) // 1秒后打印出：success
}, err => {
    console.log(err)
})
```

4. 如果 onRejected 不是函数且 promise1 状态为失败（Rejected），promise2必须变为失败（Rejected） 并返回 promise1 失败的值，

``` js
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('fail')
    }, 1000)
})
promise2 = promise1.then(res => res, '这里的onRejected本来是一个函数，但现在不是')
promise2.then(res => {
    console.log(res)
}, err => {
    console.log(err) // 1秒后打印出：fail
})
```
5. 这里还有一种特殊的情况，就是当 resolve 方法传入的参数为一个 Promise 对象时，则该 Promise 对象状态决定当前 Promise 对象的状态。

```js
const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve(1)
    }, 4000)
});

const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve(promise3);
    }, 1000)
})

p2.then(res => {
    console.log('p2 res', res); // p2 res', 1
}, err => {
    console.log('p2 err', err);
})

// 只有在 p2 和 p2 都为 resolve时，才会输出 resolve 结果，剩下的所有情况，都会输出 `p2 err Promise {<pending>}`

```
上面代码中，p1 和 p2 都是 Promise 的实例，但是 p2 的resolve方法将 p1 作为参数，即一个异步操作的结果是返回另一个异步操作。
注意，这时 p1 的状态就会传递给 p2，也就是说，p1 的状态决定了 p2 的状态。如果 p1 的状态是Pending，那么 p2 的回调函数就会等待 p1 的状态改变；如果 p1 的状态已经是 Fulfilled 或者 Rejected，那么 p2 的回调函数将会立刻执行。

## 其他方法

### promise.catch
相当于调用 then 方法, 但只传入 Rejected 状态的回调函数
```js
// 添加catch方法
catch (onRejected) {
  return this.then(undefined, onRejected)
}
```

### 静态 Promise.resolve
 如果是参数是 Promise 实例，则直接返回，否则，将其作为 Promise 的 resolve 结果，返回 Promise 实例
 
### 静态 Promise.resolve
 将参数作为 Promise 的 reject 结果，返回 Promise 实例

### Promise.all

### Promise.race

### Promise.finally

