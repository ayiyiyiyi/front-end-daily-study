<!--
Created: Tue Jun 16 2020 10:40:58 GMT+0800 (中国标准时间)
Modified: Tue Jun 16 2020 10:40:58 GMT+0800 (中国标准时间)
-->

<!-- js, Hybrid -->

# JSBridge 实现原理

JSBridge 是 JS 和 Native 之间的一种通信方式。简单的说，JSBridge就是定义 Native 和 JS 的通信, Native 只通过一个固定的桥对象调用 JS , JS 也只通过固定的桥对象调用 Native。JSBridge 另一个叫法及大家熟知的 Hybrid app 技术。

## JS 调用 Native 实现方式

### url scheme
url scheme是一种类似于url的链接,是为了方便app直接互相调用设计的。具体来讲如果是系统的url scheme,则打开系统应用,否则找看是否有app注册这种scheme,打开对应app。
注：这种scheme必须原生app注册后才会生效。

而在我们实际的开发中，app不会注册对应的scheme, 而是由前端页面通过某种方式触发scheme(如用iframe.src),然后Native用某种方法捕获对应的url触发事件,然后拿到当前的触发url,根据定义好的协议,分析当前触发了那种方法。

### API 注入