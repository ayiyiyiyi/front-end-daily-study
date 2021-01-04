<!--
Created: Mon Sep 14 2020 15:22:08 GMT+0800 (China Standard Time)
Modified: Mon Sep 14 2020 16:39:45 GMT+0800 (China Standard Time)
-->
<!-- Tag: js, ts -->

# typeScript 

> 参考资料: [深入理解TS](https://jkchao.github.io/typescript-book-chinese/#why)

## 枚举

[一文让你彻底掌握 TS 枚举](https://juejin.im/post/6844904112669065224#heading-18)

枚举是定义的一组有限范围的值(类似于自定义的 Boolean 类型, 只有 true 和 false)的自定义类型. 是一个被命名的常量的集合.

### 为什么需要枚举? 枚举的应用场景

``` JS
const SUN: number = 0;
const MON: number = 1;
const TUE: number = 2;
const WED: number = 3;
const THU: number = 4;
const FRI: number = 5;
const SAT: number = 6;

// 可以通过枚举简单写成如下形式
enum WeekDay {
    SUN, MON, TUE, WEN, THU, FRI, SAT
}
```
### 数字枚举, 字符串枚举, 异构枚举


