<!--
Created: Mon May 11 2020 18:03:00 GMT+0800 (中国标准时间)
Modified: Mon May 11 2020 18:03:00 GMT+0800 (中国标准时间)
-->
<!-- Tag: node -->

# node 用法

## path 模块

### path.join
path.join() 是使用平台特定的分隔符 *[Unix系统是/，Windows系统是\ ]*, 连接字符串, 生成规范路径，尾部的目录分隔符将被忽略
```js
const path1 = path.join('/foo', 'bar', 'baz/asd', 'qux', '..');
// .. 代表返回上级目录, 所以最近返回的结果是: '/foo/bar/baz/asd'
const path2 = path.join('foo', 'bar', 'baz');
// foo/bar/baz
```
### path.resolve
path.resolve() 是把一个路径或路径片段的序列解析为一个绝对路径。
``` JS
const path1 = path.resolve('/foo/bar','/baz/asd')
// /bas/asd
const path2 = path.resolve('/foo/bar','/baz/asd')
// /foo/bar/baz/asd
const path2 = path.resolve('foo/bar','/baz/asd')
// /Users/ayi/code/myself/daily/foo/bar/baz/asd
```
### path.join 与 path.resolve 区别

1. join是把各个 path 片段连接在一起， resolve把 `/` 当成根目录
``` JS
path.join('/a', '/b'); 
// /a/b
path.resolve('/a', '/b');
// /b
```

2. resolve 在传入非绝对路径时，会自动加上当前目录形成一个绝对路径，而 join 仅仅用于路径拼接
``` JS
// 当前路径为/Users/ayi/code/myself/daily/
path.join('a', 'b', '..', 'd');
// a/d
path.resolve('a', 'b', '..', 'd');
// /Users/ayi/code/myself/daily/a/d

```


## __dirname
当前模块的目录名,与 __filename 的 path.dirname() 相同。
示例：从 User/example 运行 node app.js
```js
console.log(__dirname);
// 打印: /Users/example
console.log(path.dirname(__filename));
// 打印: /Users/example
```