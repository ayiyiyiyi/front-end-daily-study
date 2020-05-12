<!--
Created: Mon May 11 2020 18:03:00 GMT+0800 (中国标准时间)
Modified: Mon May 11 2020 18:03:00 GMT+0800 (中国标准时间)
-->

# node 用法

## path

path.join() 由 `/` 作为定界符,连接字符串,生成规范路径，尾部的目录分隔符将被忽略
```js
path.join('/foo', 'bar', 'baz/asd', 'qux', '..');
// .. 代表返回上级目录, 所以最近返回的结果是: '/foo/bar/baz/asd'

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