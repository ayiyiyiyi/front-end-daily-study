<!--
Created: Wed Jun 03 2020 16:45:59 GMT+0800 (中国标准时间)
Modified: Wed Jun 03 2020 16:45:59 GMT+0800 (中国标准时间)
-->
<!--Tag: Vue, CSS -->

# vue CSS scoped 深度选择器 以及 Modules

> 相关链接 [Vue loader](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8)

## scoped 实现样式私有化的原理

当 `<style>` 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。


```html
<style scoped>
.text {
  color: red;
}
</style>
```
postcss 转译成:
```html

<div class="text" data-v-f3f3eg9></div>

<style >
.text[data-v-f3f3eg9] {
  color: red;
}
</style>
```

它的原理是: 通过给一个组件中的所有dom节点添加了一个唯一的 data-v-hash 属性，并且给 css 选择器添加当前组件对应的 data-v-hash 属性选择器来私有化样式。

这里利用到了 CSS 属性选择器, 它通过已经存在的属性名或属性值匹配元素。详见 MDN [CSS 属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)


## 深度作用选择器

如果你希望 scoped样式中的一个选择器能够作用得更深，影响到子组件， 比如在使用 element-UI 时,希望对组件的样式进行自定义, 使用全局样式来覆盖容易造成样式的混乱, 那么这时你可以使用 深度作用选择器 `>>>`:

```HTML
<style scoped>
.a >>> .b { /* ... */ }
</style>
```
它被编译为:
```css
.a[data-v-f3f3eg9] .b { /* ... */ }
```
有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。

## Modules

CSS Modules 是一个用于模块化和组合 CSS 的系统. Vue-loader 提供了与其的集成, 作为模拟 scoped css 的替代方案. 
``` html
<template>
  <p :class="$style.red"> This should be <span :class="$style.bold">red</span> </p>
</template>
```
```css
<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
```
编译完成后
```html
<div>
  <p class="Total_red_1wxmu"> 
    This should be 
    <span class="Total_bold_3qcvz">red</span>
  </p>
</div>
```

**原理:**

从编译结果来看, 它的原理是 对 module 内的所有的类名,根据规则(默认filename+classname+hash)进行重新生成和替换. 通过这种方式, 哪怕每个组件的样式名一样, 但文件名和 hash值不一样, 也不会造成样式污染.

PS: 使用时更详细配置见, [ vueCli 脚手架文档](https://cli.vuejs.org/zh/guide/css.html#css-modules)

