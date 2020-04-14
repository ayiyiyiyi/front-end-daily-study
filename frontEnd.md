<!--
Created: Tue Apr 07 2020 12:01:43 GMT+0800 (China Standard Time)
Modified: Tue Apr 07 2020 12:02:13 GMT+0800 (China Standard Time)
-->

# 前端导图

前端知识架构

## http相关

01. https加密过程
02. http报文的结构包括常见的字段
  + [参考](https://juejin.im/post/5afad7f16fb9a07abf72ac30)
03. tcp链接的建立和断开
04. tcp链接，以及长连接的区别和应用场景
05. http响应码的问题
06. http1.0/1.1/2.0的区别
07. 输入url到显示页面的过程，包括dns解析等等
08. http的缓存
09. get post请求的区别还有别的请求

## 安全

01. xss攻击
02. csrf攻击

## 开发相关

### 前后端分离

01. restfulAPI
02. 数据mock的原理  

### 打包

01. webpack打包 原理 过程
02. webpack常见的module plugin
03. webpack打包的优化
04. 各种loader的原理，运行方式
05. ast的生成原理
07. 各种hook的实现方式

### git

01. 常用git命令
02. git 和 svn 区别 优劣
03. gitflow开发模式

### 兼容性

01. ie8以后和chrome的区别
02. 移动端兼容性，例如ios8之前
03. 不同的前缀
04. 兼容性的写法

## html

01. 语义化
02. bfc
03. table布局的问题和优势 （垂直居中的应用）
04. dom树 渲染树 与 文件加载的阻塞关系
05. repaint和reflow

## css

01. 兼容性头缀 优雅降级 和 渐进增强
02. rem 和em vw
03. flex
04. grid
05. 媒体查询
06. 垂直居中
07. css3 常见的属性，例如滤镜
08. 动画 缓动效果
09. translate 的矩阵变换
10. css 变量
11. less sass中混入，嵌套，参数，运算

## js

01. 自执行函数
02. 闭包
03. 隐式转换
04. 继承 多态
05. 对象的操作,克隆,冻结
06. ES6 
  + 生成器, 箭頭函數, promise, async, 裝飾器
07. 数组的各种操作
08. for的各种差异
09. 节流防抖
10. 懒加载
11. 柯里化
12. definePorperty的劫持操作和proxy

## 框架

### vue

01. 常见设计模式以及实现
02. vue和react的异同
03. vue2和vue3的差异
04. 生命周期
05. mixin以后的生命周期
06. 组件加载销毁的顺序
07. key的作用
08. vue的原理
09. 虚拟dom diff算法 需要了解
10. computed 和 watch
11. 各种组件通信的方式

#### vue相关插件

01. 实现一个插件
02. vuex的时间穿梭如何实现
03. vuex 的数据流 
04. vuex的设计原理
05. vue-router 的mode和差异