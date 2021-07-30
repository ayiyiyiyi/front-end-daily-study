<!--
Created: Wed Jul 28 2021 16:53:34 GMT+0800 (China Standard Time)
Modified: Wed Jul 28 2021 16:53:34 GMT+0800 (China Standard Time)
-->
<!-- Tag: Js -->

# instanceof 和 typeof 判断变量类型

Instanceof, typeof, Object.prototype.toString.call 三者区别

## typeof

typeof 判断数据类型, 返回的类型有 `number`, `string`, `object`, `boolean`, `function`, `undefined`, `symbol` 7种.

缺点:
1. 对于引用类型，除 function 以外，一律返回 object 类型,  例如:

    ```javascript
    let s = new String('abc');
    typeof s === 'object'// true
    s instanceof String // true
    typeof [] === 'object' // true
    ```

2. `typeof null === 'object' // true` 

    造成这个结果的原因是, 最初的实现中，JS 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。：用 −2^30 整数来表示, null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"

因此, 最好是用 `typeof` 来判断基本数据类型（包括`symbol`），避免对 null 的判断。

## Object.prototype.toString.call

```javascript
Object.prototype.toString.call(null) // [object Null]
Object.prototype.toString.call([]) // [object Array]
```



## instanceof

instanceof 只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型.

Instanceof 实现:

```javascript
function _instaceof(obj, constuctor) {
  let constuctorPrototype = constructor.prototype
	while(true) {
    if(obj.__proto__ === null) {
      return false
    }
    if(obj.__proto__ === constuctorPrototype) {
      return true
    }
    obj = obj.__proto__
  }
}
```



