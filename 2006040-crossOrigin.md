<!--
Created: Thu Jun 04 2020 10:24:53 GMT+0800 (中国标准时间)
Modified: Thu Jun 04 2020 10:24:53 GMT+0800 (中国标准时间)
-->
<!-- http, browser -->

# 浏览器跨域 
> 

## 什么是跨域

## 解决方法

### CORS 

#### 概念

> CORS (cross origin resource sharing) 跨域资源共享. 它允许浏览器向跨源服务器发出 XMLRequest 请求. 从而克服 AJAX 只能同源使用的限制.原理是 通过设置一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。

我理解的 CORS 是, 在同源策略的限制下, a.com 通过浏览器向跨源服务器 b.com 发送的 AJAX 请求会被拦截, 但是在现代业务中, 不可避免会有向跨源服务器请求的时候, 总不能一直都只能用 jsonp 吧, 浏览器也是需要进步来适应需求的, 于是这个时候浏览器就对 a 说, 我也不能棒打鸳鸯, 只要你请求的服务器 b 同意你访问,也就是服务器 b 设置自定义的 HTTP 头部字段, 声明了a.com 允许访问资源, 你们两个你情我愿, 那我也就不拦着啦.

**浏览器对简单请求与非简单请求的处理并不相同**

那么什么是简单请求与非简单请求呢?

#### 简单请求与非简单请求

只要同时满足以下两大条件, 就属于简单请求:

1. 请求方式是: head, get, post
2. 头部信息不超过以下字段:
    1. Accept
    2. Accept-Language
    3. Content-Language
    4. Last-Event-ID
    5. Content-Type: 只限于三个值 application/x-www-form-urlencoded, multipart/form-data, text/plain

不同时满足以上条件的, 就是非简单请求

#### 简单请求跨域处理
浏览器请求头增加 `origin` 字段
服务端增加响应头字段: `Access-Control-Allow-Origin`