<!--
Created: Wed May 13 2020 11:30:05 GMT+0800 (中国标准时间)
Modified: Fri May 15 2020 15:24:09 GMT+0800 (中国标准时间)
-->

<!--  Tag: js, babel -->

# 手写 一个 async 函数，又名 babel 是怎么实现 async 的

> 起因是前晚无聊刷掘金，顺手看到一篇手写 async 的文章，点开没看完就被打断了，自己之后想了一下，发现除了知道 async 是 ES7 出来的关于 generator 的语法糖以为一无所知 =. =|| , 所以查漏补缺一下

参考链接

[这篇手写async函数及过程分析](https://juejin.im/post/5eb837385188256d6b0b9215)

``` js
async function fn() {
    //...
}
fn().then(res => {})
```

从 async 的调用方式上可以看出来， async 是一个函数(废话)，传入参数为 generator 函数，返回值为一个返回 Promise 的函数。 内部实现是通过递归，因为迭代器 generator 每次调用都会返回一个 `{value: '', done: false}` , 通过 `done` 来作为递归停止的条件, `value` 的值作为下一次递归传入的值。
原理就是这么个原理。

等同于

``` js
function* fnG() {
    //...
}

asyncToGenerator(fnG).then(res => {})
```

## 首先来看案例

### async 案例

``` js
const getData = () => new Promise(resolve => setTimeout(() => {
    resolve('data')
}, 1000))

async function test() {
    const data1 = await getData();
    console.log('data1: ', data1);
    const data2 = await getData();
    console.log('data2: ', data2);
    return 'success';
}
test().then(res => console.log(res));

/** data1, data 一秒钟后输入
 *  data2, data 再过一秒后输出
 *  success 最后输出
 */
```

这里没有什么疑问

### 如果用 generator 改写案例

#### generator 基本概念

* function后面加上 * 表示这是一个Generator函数，如 `function* testG(){}` 
* 函数内部可以使用 yield 来中断函数的执行，即当每次执行到 yield 语句的时候，函数暂停执行
* 暂停执行之后，需要调用 next() 才会继续执行 Generator 函数，直到碰到函数内下一个 yield 又会暂停
* 以此循环，直到函数内有 return 或者函数内代码全部执行完
* 每次调用 next() 的返回值，它是一个对象，有两个属性：
    - value：yield 语句后的表达式的结果
    - done：当前的 Generator 对象的逻辑块是否执行完成

#### 以为的改写

``` js
const getData = () => new Promise(resolve => setTimeout(() => {
    resolve('data')
}, 1000))

function* testG() {
    const data1 = yield getData();
    console.log('data1: ', data1);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
}
let gen = testG();
gen.next();
gen.next();
gen.next();

// 以为的输出结果会和 async 案例一样，实际输出

//data1: undefined
//data2: 
```

小盆友，你是否有许多问号？
为什么 data1, data2 是 undefined?
为什么 没有打印 success？

再次赋值打印看看？

``` js
const getData = () => new Promise(resolve => setTimeout(() => {
    resolve('data')
}, 1000))

function* testG() {
    const data1 = yield getData();
    console.log('data1: ', data1);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
}
var gen = testG();
// 手动调用3次且把每次的返回值打印出来看看
var dataPromise = gen.next();
console.log(dataPromise);
var dataPromise2 = gen.next('这个参数才会被赋给data变量');
console.log(dataPromise2);
var dataPromise3 = gen.next('这个参数才会被赋给data2变量');
console.log(dataPromise3);

// 输出结果为:

// {value: Promise,done: false}
// 'data:', '这个参数才会被赋给data变量'

// {value: Promise,done: false}
// 'data2:', '这个参数才会被赋给data2变量'

// {value: 'success',done: true}
```

why?

这里就看出来自己虽然用过 generator 函数，但其实对它并不是很了解了。造成上面输出结果的的原因是 **yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。** 来源为[ES6 阮一峰](https://es6.ruanyifeng.com/#docs/generator) 中的 next 方法的参数一节。

``` js
const getData = () => new Promise(resolve => setTimeout(() => {
    resolve('data')
}, 1000))

function* testG() {
    const data1 = yield getData();
    console.log('data1: ', data1);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
}
var gen = testG();

var dataPromise = gen.next();
// {value: Promise,done: false}
// 'data:', '这个参数才会被赋给data变量'
// 第一次调用 next, 此时只执行到 yield getData(), 并把返回的值赋给了 dataPromise , data1 的赋值语句需要等到下一次 next 才会被执行。

var dataPromise2 = gen.next('这个参数才会被赋给data变量');
// {value: Promise,done: false}
// 'data2:', '这个参数才会被赋给data2变量'
// 第二次调用 next, 这次做了两件事，一是将 next() 中参数赋值给 data1, 二是执行 yield getData()  并把返回的值赋给了 dataPromise2

var dataPromise3 = gen.next('这个参数才会被赋给data2变量');
// {value: 'success',done: true}
// 第三次调用 next, 这次同样做了两件事，一是将 next() 中参数赋值给 data2, 二是执行 return 'success'  并把返回的值赋给了 dataPromise2,停止整个流程
```

## 手写

### 案例实现

明白了 generator, 就大概知道怎么写了，就是将每次 next 返回的 Promise 进行 `.then()` 调用，拿到 value 后把它作为下一次的 next 参数传递进去, 直到 `done === true` 循环结束。

``` js
const getData = () => new Promise(resolve => setTimeout(() => {
    resolve('data')
}, 1000))

function* testG() {
    const data1 = yield getData();
    console.log('data1: ', data1);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
}
let gen = testG();
let dataPromise = gen.next();
dataPromise.value.then(res => {
    let dataPromise2 = gen.next(res);
    dataPromise2.value.then(res2 => {
        let dataPromise3 = gen.next(res2);
        console.log(dataPromise3.value)
    })
})
```

这个充满回调地狱既视感的代码，才是 generator 实现案例的方式

### 通用实现

#### 自己的简单实现

``` js
function asyncToGenerator(fnG) {
    return function() {
        const fn = fnG.apply(this, arguments);
        return new Promise(resolve => {
            function step(key, val) {
                const data = fn[key](val);
                const {
                    done,
                    value
                } = data;
                if (done) {
                    resolve(value)
                } else {
                    value.then(res => {
                        step('next', res);
                    })
                }
            }
            step('next')
        })

    }
}
```

简单的实现了一下，除了对异常没有进行处理外，还有一个大的缺陷，缺陷就是没有对 value 进行处理，因为 例子里面 `getData`是 Promise, 但如果 value 不是 Promise 的话， `value.then` 就会报错了。所以这里需要用到 `Promise.resolve` 对 value 进行处理。使它一定是一个 Promise。

#### throw() 异常处理
 
async 对异常的处理是这样的， 在迭代器迭代的过程中，如果 迭代器的 Promise 抛出了异常，则直接 reject 该异常，不再进行下面的 await 迭代。

那实现异常的处理就又需要一个之前没有用过的方法， Generator 的 `throw()` 。
它和next()一样，都是属于 `Generator.prototype` 上的方法，且返回值也是和next()一样。

简单例子:

``` js
function* gen() {
    while (true) {
        try {
            yield 'hello'
        } catch (e) {
            console.log(e)
        }
    }
}
var g = gen();
g.next(); // { value: 'LinDaiDai', done: false }
g.next(); // { value: 'LinDaiDai', done: false }
g.throw(new Error('错误')); // Error: '错误'
g.throw('错误1')); // '错误1'
```

#### 完整代码

``` js
function asyncToGenerator(fnG) {
    return function () {
        const fn = fnG.apply(this, arguments);
        return new Promise((resolve, reject) => {
            function step(key, val) {
                let data;
                try {
                    data = fn[key](val);
                } catch (e) {
                    return reject(e)
                }
                const { done, value } = data;
                if (done) {
                    return resolve(value)
                } else {
                    return Promise.resolve(value).then(res => {
                        step('next', res);
                    }, err => {
                        step('throw', err);
                    })
                }
            }
            step('next')
        })

    }
}

```

[手写代码版地址](./handwriting/async.js)

至此，大功告成！
