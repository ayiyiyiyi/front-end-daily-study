<!--
Created: Fri May 08 2020 09:35:15 GMT+0800 (中国标准时间)
Modified: Fri May 08 2020 09:57:31 GMT+0800 (中国标准时间)
-->
<!--Tag: ES6, js -->

# ES6 模块与 CommonJs 模块


> 以为相同的两种东西其实完全不同
> 资料整理来自《ES6阮一峰》

## ES6 模块化语法
[ES6 模块化语法](https://es6.ruanyifeng.com/#docs/module)

## ES6 与 CommonJs 模块差异

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。



### 第一个差异: CommonJS 输出是值拷贝，ES6 输出是值引用。

CommonJs

``` js
// lib.js
var counter = 3;

function incCounter() {
    counter++;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
};

// main.js
var mod = require('./lib');

console.log(mod.counter); // 3
mod.incCounter();
console.log(mod.counter); // 3
```

要想取到内部的counter，需要输出一个取值器

``` js
// lib.js
var counter = 3;

function incCounter() {
    counter++;
}
module.exports = {
    get counter: () {
        return counter;
    },
    incCounter: incCounter,
};

// main.js
var mod = require('./lib');

console.log(mod.counter); // 3
mod.incCounter();
console.log(mod.counter); // 4
```

ES6 模块与 CommonJS 不一样，JS引擎对脚本静态分析的时候，遇到模块加载命令 import ，就会生成一个只读引用。等脚本真正执行时，再根据该只读引用，到被加载的模块里去取值。ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

``` js
// lib.js
export let counter = 3;
export function incCounter() {
    counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

``` js
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import { foo } from './m1.js';
console.log(foo); // bar
setTimeout(() => console.log(foo), 500); // baz
```

这段代码表明，ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。

``` js
// lib.js
export let obj = {};

// main.js
import {
    obj
} from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```

上面代码中，main.js从lib.js输入变量 obj ，可以对 obj 添加属性，但是重新赋值就会报错。因为变量 obj 指向的地址是只读的，不能重新赋值，这就好比main.js创造了一个名为obj的const变量。

### 第二个差异: CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。