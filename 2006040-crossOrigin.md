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

我理解的 CORS 是, 在同源策略的限制下, a.com 通过浏览器向跨源服务器 b.com 发送的 AJAX 请求会被拦截, 但是在现代业务中, 不可避免会有向跨源服务器请求的时候, 总不能一直都只能用 jsonp 吧, 浏览器也是需要进步来适应需求的, 于是这个时候浏览器就对 a 说, 我也不能棒打鸳鸯, 只要你请求的时候表明你是 a, 服务器 b 同意你访问,也就是服务器 b 设置自定义的 HTTP 头部字段, 声明了a.com 允许访问资源, 你们两个你情我愿, 那我也就不拦着啦.

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
浏览器发现请求是简单请求,并且是跨域的,就在请求头增加 `origin` 字段, `origin` 字段表明请求来源.

* `origin` 指定的源不在许可范围内, **服务器也会返回正常的 HTTP 响应的!**, 但浏览器发现响应头部没有包含 `Access-Control-Allow-Origin`, 就会将该响应拦截, 抛出错误被 XMLHTTPRequest 的 onerror 回调函数捕获. PS: 这种错误无法通过状态码识别,因为响应状态码有可能为200.

* `origin` 指定的源在许可范围内, 服务端返回的响应会多出头信息字段
```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
```

**Access-Control-Allow-Origin**: 必须, 要么是请求时 `origin` 字段的值, 要么是 `*` ,表示接受任意域名的请求.

**Access-Control-Allow-Credentials**: 可选, 表示是否允许发送 cookie, 默认不包含在 CORS 请求中, 设为 true 表示服务器明确同意, cookie 可以包含请求中一起发送给服务器,  若设置 `Access-Control-Allow-Credentials` 为 true, 则 `Access-Control-Allow-Origin` 不可以设置为 `*`, 必须指定明确的、与请求网页一致的域名。同时 CORS 依旧遵循同源策略, 只有使用服务器域名设置的 cookie 才会被上传.  PS: 浏览器发送 AJAX 请求带 cookie 的字段为 `withCredentials`, 将其设为 true, 则发送 AJAX 请求时会带上 cookie, 设为 false, 则不会带 cookie.

#### 非简单请求跨域

非简单跨域请求会在正式发出请求之前进行一次**预检请求**, 即浏览器先询问服务器, 当前网页所在域名是否在服务器的可请求名单中,以及可以使用哪些请求方法和请求头, 只有得到肯定答复,浏览器才会发出正式的 HTTP 请求, 否则就会报错.

##### 预检请求

预检请求所使用的方法是 `OPTIONS`, 下例是预检请求的部分请求头信息:
```
OPTIONS /cors HTTP/1.1 
Origin: http://api.bob.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
**origin**: 必须, 表明请求源.

**Access-Control-Request-Method**: 必须, 浏览器要发送的 CORS 请求的请求方法

**Access-Control-Request-Headers**: 是逗号分隔的字符串, 表示 浏览器要发送的 CORS 请求的自定义头部字段

预检请求的响应头 CORS 相关字段:
```
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
```
**Access-Control-Allow-Origin**: 同简单请求

**Access-Control-Allow-Methods**: 必须, 表示服务器支持的所有跨域请求的方法.

**Access-Control-Allow-Credentials**: 同简单请求

**Access-Control-Max-Age**: 可选, 表示在这次预检请求的有效期, 在此期间, 再次发起该 CORS 请求不用再次预检.

##### 预检请求通过后的正常请求

预检请求通过后的正常请求, 同简单请求, 请求头必定会有 `origin` 字段, 响应头必定会有 `Access-Control-Allow-Origin` 字段



