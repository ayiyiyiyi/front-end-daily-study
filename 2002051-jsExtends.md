<!--
Created: Wen Feb 05 2020 23:21:53 GMT+0800 (China Standard Time)
Modified: Sun Jun 14 2020 23:47:19 GMT+0800 (China Standard Time)
-->
<!-- Tag: js -->

# js 的继承
> 花了一天时间整理的，第一次感觉真正搞懂了js的继承。权威的资料果然还是要看《Javascript高级程序设计》。感觉自己走了好多弯路，当然同时也偷了好多懒。

# js继承有哪些？优缺点

### 原型链继承

子类原型指向父类实例

``` js
function Parent(name) {
    this.parentName = name;
}
Parent.prototype.say = function() {
    console.log('parent name:', this.parentName);
}

function Child(name) {
    this.name = name;
}
Child.prototype = new Parent('father');
Child.prototype.constructor = Child;
Child.prototype.say = function() {
    console.log('my name:', this.name, );
    console.log('parent name:', this.parentName);
}

let child1 = new Child('may');
child1.say();
```

缺点：
子类型无法给父类传递参数，
多个子类的实例将共享同一个父类的**引用属性**，其使用的都是同一个内存里的值，这样修改该内存里的值，其他继承的子类实例里的值都会变化。

### 构造函数继承

在生成子类实例时，子类构造函数内部 call 调用父类

``` js
function Parent(name) {
    this.parentName = name;
}
Parent.prototype.say = function() {
    console.log('parent name:', this.parentName);
}

function Child(name, parentName) {
    Parent.call(this, parentName);
    this.name = name;
}

let child1 = new Child('may');
child1.say(); // Uncaught TypeError: child1.say is not a function
```

缺陷：
无法继承父类原型上的方法

### 组合继承

原型链继承 与 构造函数继承 相结合

``` js
function Parent(name) {
    this.parentName = name;
}
Parent.prototype.say = function() {
    console.log('parent name:', this.parentName);
}

function Child(name, parentName) {
    Parent.call(this, parentName);
    this.name = name;
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
let child1 = new Child('may', 'father');
child1.say();
```

缺点：
父类的构造函数被调用了两次。

### 原型式继承

原型式继承即 `Object.create` 方法，该方法的原理是创建一个构造函数，构造函数的原型指向对象，然后调用 new 操作符创建实例，并返回这个实例，本质上是对传入其中的对象执行了一次浅拷贝。

**原型继承没有使用严格意义上的构造函数** ，其想法是借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

ps: 自定义类型，即可以将它的实例标识为一种特定的类型。

``` js
let parent = {
    name: 'lilei',
    friends: ['aa', 'bb', 'cc'],
    say: function() {
        console.log('hi')
    }
}

function create(obj) {
    let fn = function() {}
    fn.prototype = obj
    return new fn()
}
let child = create(parent)
child.say()
```

缺点：
1、父类引用属性全部被共享，2、子类不可传递参数给父类

### 寄生式继承

本质上是仍 `Object.create()` , 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

``` js
function create(o) {
    let clone = Object.create(o);
    clone.say = function() {
        console.log('hi');
    }
    return clone
}

let parent = {
    name: "rose",
    age: '16'
}

let child = create(person);
child.say(); // => hi
```

在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。

缺点：同原型式继承一样

### 寄生组合式继承 

原型链继承 与 构造函数继承 与 寄生式继承 相结合

组合式继承缺点是调用了两次父类的构造函数，但其实第二次调用原型只是为了指定子类的原型，没有必要为了指定子类的 prototype 来重复调用，创建一个空的中间类，将子类的原型指向中间类的实例就可以了。

> 不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。

``` js
function Parent(name) {
    this.parentName = name;
}
Parent.prototype.say = function() {
    console.log('parent name:', this.parentName);
}

function create(obj) {
    let fn = function() {};
    fn.prototype = obj;
    return new fn();
}

function Child(name, parentName) {
    Parent.call(this, parentName);
    this.name = name;
}

function inheritPrototype(superType, subType) {

    // let prototype = create(superType.prototype);
    let prototype = Object.create(superType.prototype);

    subType.prototype = prototype;
    subType.prototype.constructor = subType;
}

inheritPrototype(Parent, Child);

let child1 = new Child('may', 'father');
child1.say();
```

### ES6 继承

``` js
class Parent {
    constructor(name) {
        this.parentName = name
    }
    do() {
        console.log('do', this.parentName);
    }
}
class Child extends Parent {
    constructor(name, childName) {
        super(name);
        this.childName = childName;
    }
    say() {
        console.log('say', this.childName);
    }
}

let child1 = new Child('father', 'son');
child1.do();
```
