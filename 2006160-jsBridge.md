<!--
Created: Tue Jun 16 2020 10:40:58 GMT+0800 (中国标准时间)
Modified: Tue Jun 16 2020 19:47:24 GMT+0800 (China Standard Time)
-->
<!-- js, Hybrid -->

# JSBridge 实现原理

> 相关链接🔗: [JS bridge 的原理](https://juejin.im/post/5abca877f265da238155b6bc) [JSBridge 深度剖析](https://toutiao.io/posts/07qll1/preview)

JSBridge 是 JS 和 Native 之间的一种通信方式。简单的说，JSBridge就是定义 Native 和 JS 的通信, Native 只通过一个固定的桥对象调用 JS , JS 也只通过固定的桥对象调用 Native。JSBridge 另一个叫法及大家熟知的 Hybrid app 技术。

## JS 调用 Native 实现方式

JavaScript 调用 Native 的方式，主要有两种：**注入 API**和 **拦截 URL SCHEME**。

### url scheme 

url scheme是一种类似于url的链接, 是为了方便app直接互相调用设计的。具体来讲如果是系统的url scheme, 则打开系统应用, 否则找看是否有app注册这种scheme, 打开对应app。注：这种scheme必须原生app注册后才会生效。

拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。之所以不通过 location.href 是因为，如果连续多次修改window.location.href的值，在Native层只能接收到最后一次请求，前面的请求都会被忽略掉。

缺陷:

* 使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。
* 创建请求，需要一定的耗时，比注入 API 的方式调用同样的功能，耗时会较长。

以往之所以用这种方案是因为该方法兼容 `IOS6` , 现在基本可以忽略, 所以现在不推荐这种不优雅的实现方式.  

### API 注入

API 注入的主要原理是, 是通过 WebView 提供的接口, 向 JS 的 Context (即 window) 中注入对象和方法. 让 JS 调用的时候, 直接执行相应的 Native 逻辑.

对于 iOS 的 UIWebView，实例如下：

``` 
JSContext *context = [uiWebView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];

context[@"postBridgeMessage"] = ^(NSArray<NSArray *> *calls) {
    // Native 逻辑
};
```

前端调用方式：
``` 
window.postBridgeMessage(message);
```

Android 实例:

``` 
publicclassJavaScriptInterfaceDemoActivityextendsActivity{
private WebView Wv;

    @Override
    publicvoidonCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        Wv = (WebView)findViewById(R.id.webView);     
        final JavaScriptInterface myJavaScriptInterface = new JavaScriptInterface(this);    	 

        Wv.getSettings().setJavaScriptEnabled(true);
        Wv.addJavascriptInterface(myJavaScriptInterface, "nativeBridge");

        // TODO 显示 WebView

    }

    publicclassJavaScriptInterface{
         Context mContext;

         JavaScriptInterface(Context c) {
             mContext = c;
         }

         publicvoidpostMessage(String webMessage){	    	
             // Native 逻辑
         }
     }
}
```
在 4.2 之前，Android 注入 JavaScript 对象的接口是 addJavascriptInterface，但是这个接口有漏洞，可以被不法分子利用，危害用户的安全，因此在 4.2 中引入新的接口 @JavascriptInterface（上面代码中使用的）来替代这个接口，解决安全问题。所以 Android 注入对对象的方式是 有兼容性问题的。

前端调用方式：
``` 
window.nativeBridge.postBridgeMessage(message);
```

## Native 调用 JS 

相比 JS 调取 Native, Native 调取 JS 比较简单. 毕竟不管是 iOS 的 UIWebView 还是 WKWebView，还是 Android 的 WebView 组件，都以子组件的形式存在于 View/Activity 中，直接调用相应的 API 即可。
Native 调用 JavaScript，其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上。(类似 eval 执行 js 字符串)

## JSBridge 引入

### 由 Native 端进行注入

注入方式和 Native 调用 JavaScript 类似，直接执行桥的全部代码。
它的优点在于：桥的版本很容易与 Native 保持一致，Native 端不用对不同版本的 JSBridge 进行兼容；与此同时，它的缺点是：注入时机不确定，需要实现注入失败后重试的机制，保证注入的成功率，同时 JavaScript 端在调用接口时，需要优先判断 JSBridge 是否已经注入成功。

### 由 JS 端引入

直接与 JavaScript 一起执行。
与由 Native 端注入正好相反，它的优点在于：JavaScript 端可以确定 JSBridge 的存在，直接调用即可；缺点是：如果桥的实现方式有更改，JSBridge 需要兼容多版本的 Native Bridge 或者 Native Bridge 兼容多版本的 JSBridge。