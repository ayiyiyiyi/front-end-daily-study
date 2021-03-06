<!-- Tag: js -->

# 大数相加问题 与 0.1 + 0.2 不等于 0.3 的问题？

> 缘由是阿里面试的一道题目，2个正整数字符串的相加，即'1'+'19'——>'20'。做做到题目时并没有思考，当数字为大数或小数时应做何处理，因此补足相应功课。

[JS中如何理解浮点数?](https://juejin.im/post/5c22fcbe6fb9a049ba419d4c)
[你真的知道0.1+0.2为何不等于0.3吗?](https://juejin.im/post/5d6e74c35188254628237d5d)
[BigNumber.js](https://github.com/MikeMcl/bignumber.js)

问题？
为什么 0.1 + 0.2 !== 0.3, 但 0.3 + 0.4 === 0.7 ？
[为什么 0.1 + 0.2 不等于 0.3, 但 0.3 + 0.4 === 0.7 ？](https://cloud.tencent.com/developer/article/1528227)

## Number 的储存标准

JavaScript Number 采用的是 IEEE 754 定义的 64 位双精度浮点型来表示。
![](./assets/bigNumber0)

* sign: 符号位,占 1 位
* exponent: 指数位, 占 11 位
* fraction: 有效数字位, 占 52 位

exponent 取值范围 为 0 ~ 2047 即 2^11,