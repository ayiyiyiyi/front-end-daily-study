<!--
Created: Mon May 25 2020 20:31:52 GMT+0800 (中国标准时间)
Modified: Wed May 27 2020 17:11:11 GMT+0800 (中国标准时间)
-->
<!-- js -->

# koa 洋葱模型

洋葱模型: 是将 koa 的各个中间件合并执行，结合 next() 形成一种串行机制，并且是支持异步，这样就形成了洋葱式模型. 每个函数中都要等到next()函数执行完成之后，才会next()后面的代码，那么洋葱心就是最后一个执行完毕的中间件, 每个next就是洋葱每一层的分界线

![](https://user-gold-cdn.xitu.io/2018/9/26/1661448ce8e66d5c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

koa 案例

``` js
const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
});

app.use(async (ctx, next) => {
    console.log(3);
    await next();
    console.log(4);
});

app.use(async (ctx, next) => {
    console.log(5);
    await next();
    console.log(6);
});

app.listen(3000);

// 1
// 3
// 5
// 6
// 4
// 2
```

## 实现
compose 的伪实现如下
```js
let middlewares = [fn0, fn1, fn2, fn3]
function compose(middlewares) {
    return function() {
        let fn0 = middlewares[0];
        return fn0(function next() {
            let fn1 = middlewares[1];
            return fn1(function next() {
                let fn2 = middlewares[2];
                return fn2(function next() {
                    //...... 直到最后一个 执行完最后一个函数, 最后一个函数的返回结果依次向上返回
                })
            })
        })
    }
}
```
## koa-compose 实现
```js 
compose = () => {
    const _this = this;
    return () => {
        function dispatch(i) {
            if (i === _this.middlewares.length) return null;
            const fn = _this.middlewares[i];
            return fn(() => dispatch(i + 1))
        }
        dispatch(0)
    }
}
```
上面的这种写法, 可以实现同步函数的链式顺序调用, 在所有函数为 async 函数时依旧可以顺序输出.

PS: 我不太知道为什么要写成下面的方法. 看有人的说法是因为 use 中可以传入同步和异步函数, 为了兼容两种, 所以把所有的返回结果都用 Promise 包起来, 这个说法我不太赞同, 所以猜测是因为 `fn = app.compose()`, 之后调用的 fn() 最后需要返回的是 Promise, 所以就在 compose 中把所有的返回结果都变成 Promise

异步写法
```js 
compose = () => {
    const _this = this;
    return () => {
        function dispatch(i) {
            if (i === _this.middlewares.length) return Promise.resolve();
            const fn = _this.middlewares[i];
            return Promise.resolve(fn(() => dispatch(i + 1)))
        }
        dispatch(0)
    }
}

```
