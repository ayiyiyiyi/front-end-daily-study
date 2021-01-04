<!--
Created: Fri Jul 10 2020 15:15:42 GMT+0800 (China Standard Time)
Modified: Fri Jul 10 2020 15:15:42 GMT+0800 (China Standard Time)
-->
<!-- Tag: js, vue -->
# vue composition api

> 相关链接🔗： [探秘 Vue3.0 - Composition API 在真实业务中的尝鲜姿势](https://juejin.im/post/5d6e4986518825267a756a8d#heading-2)
[Composition API中文翻译](https://juejin.im/post/5d9d9df76fb9a04e29030eda#heading-0)

## Composition api 设计初衷: 

1. 逻辑组合和复用。
2. 更好的类型推断： Vue3.0 最核心的点之一就是使用 TS 重构，以实现对 TS 丝滑般的支持。而基于函数 的 API 则天然对类型推导很友好。
3. 打包尺寸：每个函数都可作为 named ES export 被单独引入，对 tree-shaking 很友好；其次所有函数名和 setup 函数内部的变量都能被压缩，所以能有更好的压缩效率。

**重点是逻辑组合和复用**。

关于**逻辑组合**：在大型项目中，随着新功能和特性的开发迭代，复杂组件的代码会变得越来越难以推理。 尤其是开发者遇到不是自己写的代码的时候。根本的原因是 Vue 现有的 API 是通过 options 来组织的；但有的时候，通过关注逻辑来组织代码会更有意义。通过 Composition APIs，现在我们可以针对某个功能像函数一样的处理方式来组织代码。这些 APIs 还使得在组件之间甚至外部组件之间提取和复用逻辑更加简单明了。

> 在看译文讲解组织代码之前，我并不太理解 composition API 这样做的意义， 但现在明白了，在简单的组件和页面中，通过 options 定义组件并没有什么问题，因为我们可以很清楚的看明白 data, mounted， created 中的代码逻辑，看起来仿佛通过 options 定义组件比通过在 setup 函数中实现一大坨功能函数要有道理的多。 可是遇到一个超大且复杂组件时，面对众多逻辑功能点，再去梳理逻辑就会变得困难。例如一个组件要实现 A，B，C，D...多个逻辑点，这些逻辑点的数据放在 data, 而方法放在 methods，而它们之间可能相隔多行，我们也很难理解哪个 data 或 method 是属于哪个逻辑功能点的。在复杂组件中，我们更关心的是每个功能点的逻辑而不是它的 data, mounted，created 这些 options，而 options 的强制分离使得逻辑分散，让复杂项目难以维护。

关于**逻辑复用**：一个合成函数只依赖于它的参数和全局引入的Vue APIs，而不是充满魔法的 this 上下文。只需要将组件中你想复用的那部分代码，简单的将它导出为函数就可以了。

Vue2.0 中关于复用的方法有三种：Mixins, HOC, Renderless Components. 其中 Mixins 和 HOC 都存在 模板数据来源不清晰都问题，并且在 mixin 的属性、方法的命名以及 HOC 的 props 注入也可能会产生 命名空间冲突的问题。由于 HOC 和 Renderless Components 都需要额外的组件实例来做逻辑封装，会导致无谓的性能开销。

## setUp()

setup 是在组件实例被创建时， 初始化了 props 之后调用，处于 created 前，beforeCreated 后。





