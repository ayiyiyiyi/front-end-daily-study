<!--
Created: Thu Jun 11 2020 18:06:40 GMT+0800 (中国标准时间)
Modified: Fri Jun 12 2020 19:14:43 GMT+0800 (中国标准时间)
-->
<!-- miniprogram -->

# 小程序原理

> 既然在写小程序, 那就了解了解小程序吧, 相关链接: [微信，支付宝小程序实现原理概述](https://segmentfault.com/a/1190000018631528), [小程序运行流程](https://juejin.im/post/5afd136551882542682e6ad7), [小程序实现原理解析](https://cloud.tencent.com/developer/article/1029663), [从小程序开发工具源码看实现原理](https://www.cnblogs.com/wonyun/p/11176762.html) [原生组件同层渲染](https://developers.weixin.qq.com/community/develop/article/doc/000c4e433707c072c1793e56f5c813), [wePY 性能调优探究](https://mp.weixin.qq.com/s/EvzQoSwWYUmShtI_MkrFuQ)


## 运行环境差异

* IOS: js 代码是运行在 JavaScriptCore 中，渲染由 WKWebView 来渲染的，环境有 iOS8、iOS9、iOS10 
* Android: js 代码是通过 X5 JSCore 来解析, 是由 X5 基于 Mobile Chrome 53/57 内核来渲染的 
* 开发工具: js 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的

## 小程序为什么比较快

* 安装包缓存
* 分包加载
* 独立渲染线程
* webview 预加载
* native 组件

## 微信小程序的技术选型

### 渲染方面

* 用纯客户端原生技术来渲染

  + 缺点: 无法动态打包, 动态下发

* 用纯 Web 来渲染

  + 缺点: 复杂交互页面会面临性能问题, 原因是 Web 渲染 技术中, **UI渲染**和 **JS 脚本执行** 都在一个单线程中执行, 这就导致 JS 逻辑 会抢占 UI渲染的资源.

* 介于客户端原生技术与 Web 技术之间的，互相结合各自特点的技术来渲染

  + 每个页面都由 WebView 渲染, 避免了单个WebView的任务过于繁重。

### 原生组件的渲染方式
同层渲染

## 架构

小程序框架包含两部分: View 视图层(可存在多个)用来渲染页面, APP Service 逻辑层(一个)用来逻辑处理、数据请求、接口调用, 两部分分别在不同的线程里运行.
视图层使用 webview 渲染, 逻辑层使用 JSCore 运行, 两者通过系统层的 WeixinJsBridage 进行通信, 逻辑层把数据变化通知到视图层，触发视图层页面更新，视图层把触发的事件通知到逻辑层进行业务处理。

![小程序框架图](./assets/miniprogram)

### 数据驱动视图变化

在渲染层，宿主环境会把WXML转化成对应的JS对象，在逻辑层发生数据变更的时候，我们需要通过宿主环境提供的setData方法把数据从逻辑层传递到渲染层，再经过对比前后差异，把差异应用在原来的Dom树上，渲染出正确的UI界面。


## 运行机制

### 启动和更新

**启动**: 小程序有冷启动与热启动两种机制, 假如用户已经打开过某小程序，然后在一定时间内再次打开该小程序，此时无需重新启动，只需将后台态的小程序切换到前台，这个过程就是热启动；冷启动指的是用户首次打开或小程序被微信主动销毁后再次打开的情况，此时小程序需要重新加载启动。

小程序冷启动时如果发现有新版本，将会异步下载新版本的代码包，并同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上。 如果需要马上应用最新版本，可以使用 wx.getUpdateManager API 进行处理。

### 运行机制

小程序没有重启概念, 当小程序进入后台, 客户端会维持一段时间(目前5分钟)的运行状态, 超过时间后会被微信主动销毁, 两短时间内连续收到两次以上收到系统内存告警，会进行小程序的销毁.

![小程序运行机制图](./assets/miniprogram1)

#### wxml 与 wxss 的转换

wxml 与 wxss 都是被转换成 js.

* wcc可执行程序，用于将 wxml 内容转换为js内容，执行方式： `wcc xxx.wxml` 
  + `wxml` --wcc编译--> `js` -> `WAWebView` --Virtual DOM Update--> `View` 

* wcsc可执行程序，用于将wxss内容转换为视图可使用css内容，执行方式 `wcsc xxx.wxss` , 小程序底层使用该可执行程序转换为js内容来处理页面css的引用
  + `wxss` --wcsc编译--> `js` 
  + wxss 被 wcsc 编译生成 js 的原因是: 添加尺寸单位 rpx 转换, 可根据屏幕宽度自适应; 提示 `setCssToHead` 方法将转换后的 CSS 内容 添加到 Header
