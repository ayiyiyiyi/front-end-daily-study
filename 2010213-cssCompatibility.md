<!--
Created: Fri Oct 23 2020 17:24:54 GMT+0800 (China Standard Time)
Modified: Fri Oct 23 2020 17:26:56 GMT+0800 (China Standard Time)
-->
<!-- Tag: css -->

# CSS 兼容性问题记录

# input 

## 在flex布局下 input 设置flex:1失效

input 对 flex 布局存在兼容性问题， 在 flex 布局下默认存在最小宽度, 所以在父元素宽度太小的情况下 input 设置了 `flex: 1` 会失效, 解决方法是在 input 最外层套一个 div, 将 div 设为 `flex: 1`, input 设为 `width: 100%`.
