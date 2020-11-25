---
title: MySQL 免安装版配置
date: 2020-10-10
sidebar: false
categories:
 - BackEnd
tags:
 - MySQL
publish: true
---
## MySQL 免安装版配置


**为什么使用免安装版？**  

- 绿色无污染
- 便携轻量
- 灵活可控


### 开始

1. 前往 MySQL 官网下载免安装版
[MySQL Community Downloads](https://dev.mysql.com/downloads/mysql/)


2. 下载解压至任意目录，这里解压到 `C:/MySQL` 为例，解压后得到以下目录结构
![](https://gitee.com/QiJieH/blog-image-bed/raw/master/`E31C`@QSQD_J9KQGICS7NB.png)

3. 配置环境变量：
```
新增系统变量
变量名：%MYSQL_HOME%
变量值：C:/MySQL

添加PATH：%MYSQL_HOME%\bin
```
> 检查是否设置成功命令行键入 `mysql --version`
> 如果显示失败，检查环境变量的设置

4. 在 `C:/MySQL/mysql-8.0.21-winx64/` 下新建 `my.ini` 文件（可选，如无特殊需求不建议自行配置）
```
[mysqld]
# 设置mysql的安装目录
basedir=C:\MySQL\mysql-8.0.21-winx64
# 设置mysql数据库的数据的存放目录，必须是data
datadirC:\MySQL\mysql-8.0.21-winx64
#设置时区
default-time_zone='+8:00'
# mysql端口
port=3306
# 字符集
character_set_server=utf8
# 更多设置参数请自行查询文档
```

5. 使用**管理员权限**打开 CMD 执行安装命令（如果忽略 `.ini` 文件，一切都按默认进行配置）
```bash
mysqld -install
```
6. 执行 MySQL 初始化命令，在 `mysql-8.0.21-winx64` 目录下就会生成 `data` 文件夹
```bash
mysqld --initialize-insecure
```
![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20200917201609.png)


7. 启动 MySQL 服务
```bash
net start mysql
```

8. 命令行访问数据库
```bash
mysql -u root -p
```

9. mysql 正常语法
```bash
show databases;
```

10. 设置 root 密码
```bash
mysqladmin -u root -p abc password 123456
```
> 使用 `quit` 或 `exit` 退出 mysql 命令符，再执行修改密码操作
> 如无设置密码可忽略 `-p` 参数

## 其余控制命令

关闭 MySQL 服务
```bash
net stop mysql
```

卸载 MySQL
```bash
mysqld -remove
```

查看服务状态 (mysql命令)
```bash
status;
```