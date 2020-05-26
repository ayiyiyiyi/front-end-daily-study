<!--
Created: Mon May 25 2020 20:31:52 GMT+0800 (中国标准时间)
Modified: Mon May 25 2020 20:31:52 GMT+0800 (中国标准时间)
-->
<!-- js -->

# koa 洋葱模型

> 起因是在跟慕逸聊天的时候他突然问我说你知道洋葱模型吗? 然后我就又多了一个不知道的知识点, so, 继续学习吧!

洋葱模型: 是将 koa 的各个中间件合并执行，结合 next() 形成一种串行机制，并且是支持异步，这样就形成了洋葱式模型. 每个函数中都要等到next()函数执行完成之后，才会next()后面的代码，那么洋葱心就是最后一个执行完毕的中间件, 每个next就是洋葱每一层的分界线

![](https://user-gold-cdn.xitu.io/2018/9/26/1661448ce8e66d5c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

koa 案例
```js
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