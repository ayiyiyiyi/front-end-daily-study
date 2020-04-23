#### 打开当前路径的finder
```bash
open .
```

#### 查看当前路径

```bash
pwd
```

#### cd
```bash
 cd -
```

#### ls
```bash
ls -a  #查看包含隐藏文件在内的所有文件
ls -alh  #当前目录下的文件权限
```
权限查看方式
```
-rw-r--r--@  1 ayi   staff   104K 11 22 14:07 430DDC5092226B6C4F062BAEF2242B78.jpg
drwxr-xr-x   4 ayi   staff   128B Jan 31 17:31 code
drwxr-xr-x  64 ayi   staff   2.0K Jan 22 19:39 node_modules
```
权限分为`d rwx(所有人) rwx(同组人) rwx(其他人)`四部分
`d` 代表directory, `-` 代表文件
r(read)可读， w(write)可写， x(execute)可执行，-代表无该权限
查看方式：`d` `rwx` `r-x` `r-x`


#### 新建文件夹
```bash
mkdir foldername 
# 正常创建文件夹

mkdir -p floder/folder2 
# 创建多层级目录
或
take path/foldername  相当于创建并打开
```

#### 删除文件夹,文件
```bash
rmdir DirectoryName

rm -r-f DirectoryName # -f强制删除、-r文件夹不为空也可删除
```


#### 创建文件
```bash
touch test.txt
```
