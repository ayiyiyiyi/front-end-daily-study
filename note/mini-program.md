<!--
Created: Mon May 18 2020 19:45:06 GMT+0800 (中国标准时间)
Modified: Mon May 18 2020 20:32:57 GMT+0800 (中国标准时间)
-->

# 小程序开发记录

> 小程序现在基本快成为前端必备技能了，可是我还没有真正的实际上手过，这次利用工作的项目，记录一下小程序的开发过程。使用的是原生，组件库用的是 vant-webapp。

## 生命周期

小程序的声明周期:

### APP 的生命周期

App() 必须在 app.js 中注册，且不能注册多个。所以App（）方法在一个小程序中有且仅有一个。
App() 函数用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等。

| 生命周期  |                      描述                     |
|----------|:---------------------------------------------:|
| onLaunch | 当小程序初始化完成时，会触发 onLaunch（全局只触发一次） |
| onShow   |   当小程序启动，或从后台进入前台显示，会触发 onShow   |
| onHide   |        当小程序从前台进入后台，会触发 onHide       |

### Page 的生命周期

| 生命周期  |                      描述                     |
|----------|:---------------------------------------------:|
| onLoad | 监听页面加载，一个页面只会调用一次。 |
| onShow   | 监听页面显示页面，每次打开页面都会调用一次。  |
| onReady | 页面初次渲染完成，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。 |
| onHide   | 监听页面隐藏  |
| onUnload | 监听页面卸载  |

### 生命周期顺序

1. 首次进入小程序：

    App.onLaunch --> App.onShow --> Page.onLoad --> Page.onShow --> Page.onReady

2. 隐藏小程序进入后台

    Page.onHide --> App.onHide

3. 从后台重新打开小程序

    App.onShow --> Page.onShow

4. 按返回键

    Page.onUnload（非栈底页面）

## 功能点

### 小程序导航

#### 小程序导航

在做小程序时有一个逻辑: 进入首页 -> 判断是否登录 -> 未登录 -> 跳转授权手机号登录页面. 那在这个逻辑中, 在授权页用户是不可跳回首页的, 在实际开发过程中,微信的导航栏却在右上角出现了 home 图标. 

home 图标出现的原因是: **不是首页或 tabBar 页面, 页面在栈最底层**

刚好我从 home 页 redirectTo 授权登录页, 此时栈中只有这一个页面, 所以展示了 home 图标.

**隐藏方法**:  在 Page 的 onShow 方法中调用 hideHomeButton 隐藏返回首页按钮

```js
  onShow: function () {
    wx.hideHomeButton()
  }
```

#### 自定义导航栏

客户端 7.00  支持自定义导航样式，只保留右上角胶囊按钮，且允许单页设置, 需要在 app.json 或 页面配置文件中做如下配置 

``` json
// app.json
{
    "window":{
        "navigationStyle": "custom"
    }
}

// page/index/index.json
{
    "navigationStyle": "custom"
}

```

这次使用的是 vant-webapp 的 NavBar 组件。

### 小程序地图

[小程序地图](https://developers.weixin.qq.com/miniprogram/dev/component/map.html)

使用 map 组件可以开发地图相关功能. 通过 map 组件可以获取到经纬度, 如果需要对经纬度进行解析或根据地址解析出经纬度,则需要接入[微信地图小程序 SDK](https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview). SDK使用见链接.

#### 实现拖动地图定位功能

地图移动时,使用 `MapContext.getCenterLocation` 可以获取到地图中心经纬度, 把选点图标定位在地图中心,此时获取到的就是选点图标的位置. 将经纬度进行逆地址解析,进行展示.

实例代码:

```html
<map class="map" id="map" latitude="{{location.lat}}" longitude="{{location.lng}}" bindregionchange="onChangeRegion"  >
	<image class="location-picker-marker" src="./img/Big_Marker@2x.png"/>
</map>
```
```js
var QQMapWX = require('xxx/qqmap-wx.js');
var qqmapsdk = new QQMapWX({
    key: '开发密钥（key）' // 必填
}); 
Page({
    onChangeRegion(event) {
        const _this = this;
        if (event.type === 'end' && event.causedBy === 'drag') {
        console.log(event.type);
        const mapCtx = wx.createMapContext('map', this); // map 为组件的 id
        mapCtx.getCenterLocation({ // 获取当前中心经纬度
            success: res => {
                const latitude = res.latitude;
                const longitude = res.longitude;
                // 调用腾讯地图, 逆地址解析得出经纬度坐标描述
                _this.reverseGeocoder()
            }
        })
        }
    },
    reverseGeocoder() {
        const _this = this;
        qqmapsdk.reverseGeocoder({
            location: '39.984060,116.307520', // string格式经纬度描述
            success: function (data) { 
                console.log(data) 
            }
        })
     }
})
```