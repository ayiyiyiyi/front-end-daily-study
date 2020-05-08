<!--Tag: command -->

# 常用命令行


## 文件、文件夹相关

### 打开当前路径的finder

``` bash
open .
```
### 打开当前路径的vscode
貌似需要配置item2 =.= 回家问问慕逸哥哥 
``` bash
open code
```

### 查看当前路径

``` bash
pwd
```

### cd

``` bash
 cd -
```

### ls

``` bash
ls -a  #查看包含隐藏文件在内的所有文件
ls -alh  #当前目录下的文件权限
```

权限查看方式

``` 
-rw-r--r--@  1 ayi   staff   104K 11 22 14:07 430DDC5092226B6C4F062BAEF2242B78.jpg
drwxr-xr-x   4 ayi   staff   128B Jan 31 17:31 code
drwxr-xr-x  64 ayi   staff   2.0K Jan 22 19:39 node_modules
```

权限分为 `d rwx(所有人) rwx(同组人) rwx(其他人)` 四部分

`d` 代表directory(即文件夹), `-` 代表文件

r(read)可读， w(write)可写， x(execute)可执行，-代表无该权限

查看方式： `d`  `rwx`  `r-x`  `r-x` 

### 新建文件夹

``` bash
mkdir foldername 
# 正常创建文件夹

mkdir -p floder/folder2 
# 创建多层级目录
或
take path/foldername  相当于创建并打开
```

### 删除文件夹, 文件

``` bash
rmdir DirectoryName

rm -r-f DirectoryName # -f强制删除、-r文件夹不为空也可删除
```

### 创建文件

``` bash
touch test.txt
```

## 压缩文件 

### tar
-c: 建立压缩档案
-x：解压
-t：查看内容
-r：向压缩文件末尾增加文件
-u：更新原压缩包中的文件

这五个是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。下面的参数是根据需要在压缩或解压档案时可选的。

-z：有gzip属性的
-j：有bz2属性的
-Z：有compress属性的
-v：显示所有过程
-O：将文件解开到标准输出

下面的参数-f是必须的

-f: 压缩包名，切记，这个参数是最后一个参数，后面只能接档案名。

例子：
```bash
tar -cf all.tar *.jpg // 将所有.jpg的文件打成一个名为all.tar的包
tar -cf dist.tar dist // 将dist 文件打成一个名为dist.tar的压缩包
tar -xvf dist.tar  // 解压 dist.tar 包，并展示过程
```

感觉常用的也就是压缩和解压了，剩下的可以查看下面链接：
[Linux tar 用法](https://www.jianshu.com/p/b91d7491381b)