<!--
Created: Tue Jan 12 2021 20:46:46 GMT+0800 (China Standard Time)
Modified: Tue Jan 12 2021 21:27:21 GMT+0800 (China Standard Time)
-->
<!-- Tag: js -->

# Blob, ArrayBuffer and Buffer

> 今天在做小程序手机登录获取图形验证码时候, 注意到了后台传来到值是二进制文件流, h5 代码中将其转为 Blob 文件, 而小程序中不支持 Blob 类型, 仅支持 ArrayBuffer, 所以想要弄懂 Blob 和 ArrayBuffer 究竟是什么

图片接口的 response 的 Content-Type 为 `application/octet-stream`

`application/octet-stream` 表示其这是一个二机制文件

## Blob

Blob 并不是 js 中特有的, 最初是为了在数据库中使用, 用于储存音频, 图片或视频等无法储存在常规数据库字段大大文件. 因此 Blob 实际上指的是 **二进制大对象**. 

在 js 中, Blob 用于将文件表示为不可变的原始数据. Blob 有两个属性, size 和 type. size 是以字节为单位的数据大小. 类型是一个包 [MIME](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types) 类型的字符串.

``` JS
// 创建 Blob
const blob = new Blob([doc.output()], {
    type: 'application/pdf'
});
```

js 的 Blob 提供了一些方法来访问文件的内容.

* blob.text

它以文本(text)的方式返回对 Blob 内容的 Promise 解析(技术上是 USVString).

``` JS
// JavaScript
const blob = new Blob([doc.output()], {
    type: 'application/pdf'
});
const blobText = await blob.text();
```

* blob.ArrayBuffer

将返回一个 Promise 解析到 ArrayBuffer

* blob.stream

将返回一个可读流 (ReadableStream)

## 读取

通过 `window.URL.createObjectURL` 方法可以把一个 `blob` 转化为一个Blob URL，并且用做文件下载或者图片显示的链接。它只是类似于一个浏览器内部的 "引用"地址, 因此仅可在单个浏览器内部进行.



