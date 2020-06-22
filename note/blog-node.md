<!--
Created: Mon Jun 22 2020 20:55:27 GMT+0800 (China Standard Time)
Modified: Mon Jun 22 2020 20:55:27 GMT+0800 (China Standard Time)
-->

# 基于 node + express + mongodb 的博客网站后台

[基于 node + express + mongodb 的博客网站后台](https://github.com/biaochenxuying/blog-node)

## 简单搭建 express 后台

### 环境准备：node, express

``` 
npm install express -g // global install express
npm install express-generator -g // global install express cli

```

### 项目搭建

``` 
express express-demo // init project
npm install
npm run start
```

## mangodb 安装

1. 安装 mongodb

``` 
sudo brew install mongodb
```

2. 创建数据库储存目录

由于 OSX 升级到 Catalina 以后版本, 根目录变成只读, 因此不能在根目录下直接添加 `/data/db` 目录, 因此可以在 `~` 目录下创建, 

``` 
 mkdir ~/data/db
```

 再启动 mongod 时指定目录:

``` 
 $ sudo mongod --dbpath=/Users/ayi/data/db
 ```

 这样就可以启动成功了.
