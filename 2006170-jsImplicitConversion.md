<!--
Created: Wed Jun 17 2020 22:13:20 GMT+0800 (China Standard Time)
Modified: Wed Jun 17 2020 22:13:20 GMT+0800 (China Standard Time)
-->
<!-- js -->
# JS 隐式转换
> 准备面试的时候发现自己隐式转换这块讲不清楚, 所以总结一下. 不得不吐槽一下 js 的隐式转换看起来各种坑爹. 相关链接: [隐式转换](https://juejin.im/post/5a7172d9f265da3e3245cbca#heading-2), [深入理解Javascript中Object类型的转换](https://zhuanlan.zhihu.com/p/29730094)

由一道面试题开始 js 隐式转换执行过程.
```js
const a = {
  i: 1,
  toString: function () {
    return a.i++;
  }
}
if (a == 1 && a == 2 && a == 3) {
  console.log('hello world!');
}
```

一直没有搞明白的点是: ToPrimitive(), ToNumber(), ToString() 三者分别什么时候使用.

## ToPrimitive

js 通过 ToPrimitive 将值转换为原始值

方法为: ToPrimitive(input, PreferredType?)

input 是要转换的值，PreferredType 是可选参数，可以是 Number 或 String 类型。他只是一个转换标志，转化后的结果并不一定是这个参数所值的类型，但是转换结果一定是一个原始值(或者报错).

### 如果PreferredType被标记为Number，则会进行下面的操作流程来转换输入的值。

``` JS
1、如果输入的值已经是一个原始值，则直接返回它
2、否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，
   如果valueOf()方法的返回值是一个原始值，则返回这个原始值。
3、否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。
4、否则，抛出TypeError异常。
```

### 如果PreferredType被标记为String，则会进行下面的操作流程来转换输入的值。
``` JS
1、如果输入的值已经是一个原始值，则直接返回它
2、否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。
3、否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，
   如果valueOf()方法的返回值是一个原始值，则返回这个原始值。
4、否则，抛出TypeError异常。
```
### PreferredType是可选参数，那么如果没有这个参数时，怎么转换呢？PreferredType的值会按照这样的规则来自动设置：
```js
1、该对象为Date类型，则PreferredType被设置为String
2、否则，PreferredType被设置为Number
```

## 转换规则:

### A + B

JS中进行  A+B  这种操作时会经历这样一个过程：将A和B都转换为原始值(primitive，执行ToPrimitive)，这里记为 A1，B1. 如果 A1 和 B1 中有一个值为 string，则将 A1、B1 都转换为 string (执行 ToString )，其值记为 A2、B2，将 A2 B2 连接后就是 A+B的结果, 否则的话将 A1、B1 都转换为 number (执行 ToNumber )，其值记为 A3、B3，将 A3 B3 相加即为 A+B 的结果

### A == B

类型相同略,类型不相同时:

1. x,y 为 null、undefined 两者中一个   // 返回true
2. x,y 为 Number 和 String 类型时，则转换为Number类型比较。
3. 有Boolean类型时，Boolean转化为Number类型比较。
4. 一个 Object 类型，一个 String 或 Number 类型，将 Object 类型进行原始转换后，按上面流程进行原始值比较。