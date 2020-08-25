---
title: 初识 MongoDB
date: 2020-08-07
sidebar: false
categories:
 - BackEnd
 - DataBase
tags:
 - MongoDB
publish: true
---


![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200823161501.png)

MongoDB 是一个基于分布式文件存储非关系数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。  

<!-- more -->

# MongoDB 基础语法

官方文档：[Getting Started](https://docs.mongodb.com/guides/)

MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。









## 数据结构



MongDB 所有的数据都是以 json 对象进行存储的

```json
{
 "name": "notebook",
 "qty": 50,
 "rating": [ { "score": 8 }, { "score": 9 } ],
 "size": { "height": 11, "width": 8.5, "unit": "in" },
 "status": "A",
 "tags": [ "college-ruled", "perforated"]
}
```



在进行数据库结构设计时务必参照 JSON 标准。



MongoDB术语 参照 SQL术语 理解

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                           |
| :----------- | :--------------- | :---------------------------------- |
| database     | database         | 数据库                              |
| table        | collection       | 数据库表/集合                       |
| row          | document         | 数据记录行/文档                     |
| column       | field            | 数据字段/域                         |
| index        | index            | 索引                                |
| table joins  |                  | 表连接,MongoDB不支持                |
| primary key  | primary key      | 主键,MongoDB自动将_id字段设置为主键 |





## 安装部署



下载中心

[MongoDB Download Center](https://www.mongodb.com/download-center#production)



mongodb 社区版下载

[MongoDB Community](https://www.mongodb.com/try/download/community)



mongodb 图形界面管理工具（可选）

[MongoDB Compass](https://www.mongodb.com/try/download/compass)





### 使用引导安装

在命令行操作 mongodb 时请务必使用**管理员权限打开命令行窗口**

所有的安装设置都会在引导界面设置完成，之后通过命令行操作数据库服务

- 启动服务

```powershell
net start mongodb
```

- 停止服务

```powershell
net stop mongodb
```

- 移除服务

```powershell
C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe --remove
```

- 连接管理

```powershell
C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe
```







### 使用命令行安装

移除服务后需要手动以命令行方式进行安装

```powershell
mongod --logpath="C:\Program Files\MongoDB\Server\4.2\log\mongod.log" --dbpath="C:\Program Files\MongoDB\Server\4.2\data" --install
```



### 添加系统变量

虽然这步不是必须的，但是在使用 mongodb 过程中某些命令需要系统变量的支持。

MongoDB安装目录下的bin路径导入到系统变量Path中。



### 设置身份验证

初次安装时是没有设置身份验证的，任何人都可以访问你的数据库，这样是十分危险的。接下来将为 mongodb 部署强制身份验证。



在命令行窗口运行以下命令，确保 mongodb 服务在你的系统上存在

```powershell
tasklist /FI "IMAGENAME eq mongod.exe"
```



如果显示以下字段，说明 mogodb 服务正在运行

```
Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
mongod.exe                    8716 Console                    1      9,508 K
```





1. 使用命令行打开运行 mongo.exe

```powershell
C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe
```

2. 切换到 admin 数据库

```powershell
use admin
```

3. 新建超级管理员账户

```powershell
db.createUser(
  {
    user: "superuser",
    pwd: "changeMeToAStrongPassword",
    roles: [ "root" ]
  }
)
```

5. 验证是否创建成功

```powershell
show users
```

6. 卸载 mongodb 服务

```
net stop mongodb
mongod --remove
```

7. 创建 mongodb 服务 注意 -auth 参数

```
mongod --logpath="C:\Program Files\MongoDB\Server\4.2\log\mongod.log" --dbpath="C:\Program Files\MongoDB\Server\4.2\data" --install -auth
```



如果您已成功完成本指南，则已在本地 MongoDB 实例上启用了基本身份验证。







### 添加数据库用户

在添加数据库用户之前您必须拥有超级管理员账号。

连接到数据库 admin 进行身份验证，之后切换到需要创建管理账户的数据库中使用 `db.createUser` 进行创建。

```
mongo.exe
use admin
db.auth("rootname","rootpwd")
use dba
db.createUser({
	user:"dbaadmin",
	pwd:"admin",
	roles:["readWrite"]
})
```



>注意只有切换到响应的数据库之后才能进行身份验证或用户创建，否则会出现验证失败和创建失败。











## 连接数据库





### 未启用身份验证

如果你未启用身份验证，您可以容易的使用命令行进入数据库

```
C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe
```





在 Compass 中只需要点击 connect 即可，无需配置





### 启用身份验证

如果你启用了身份验证，在使用 Compass 连接时需要填写 URL ，url的填写规则为

```
mongodb:身份名:身份密码@host:port/数据库名称

mongodb:root:root@localhost:27017/admin
```



在命令行中启动 mongo.exe 切换到正确数据库之后使用 `db.auth("name","pwd")` 来进行验证

```
mongo.exe
use admin
db.auth("root","root")
```



>命令行进入 mongo.exe 并不需要验证，但是这样是无法查看或修改任何数据的







### API

你可以访问 [MongoDB Drivers](https://docs.mongodb.com/drivers/) 来获取您语言操作数据库的 API



本文档只介绍 Node.js 对 Mongodb 的连接操作。

在 node.js 下操作 mongodb 您需要使用到第三方模块 mongoose 您可以通过 npm 管理工具进行下载

```
npm install mongoose
```



之后您可以在 js 文件中引入 mongoose 并使用它来连接数据库。

```javascript
const mongoose = require ('mongoose')
mongoose.connect("mongodb://username:userpwd@host:port/dbname
                    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));
```





## 数据库操作

访问 [MongoDB Drivers](https://docs.mongodb.com/drivers/) 来获取您语言操作数据库的 API ，下面我们只介绍使用 mongo.exe 命令行对数据库的操作。



### 创建数据库

MongoDB 创建数据库的语法格式如下：

```
use DataBaseName
```

这个方法在没有该数据库时会创建该数据库，否则会转到该数据库，注意，如果创建数据库时没有添加该数据库内容，是不会显示该数据库的。



如果你想查看所有数据库，可以使用 **show dbs** 命令：

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> 
```



### 删除数据库

MongoDB 删除数据库的语法格式如下：

```
db.dropDatabase()
```

您需要使用 use dbname 来切换到需要删除的数据库才能执行删除操作。





### 创建集合

```
db.createCollection(name, options)

// name ：集合命名  options：集合规则

db.createCollection("mycol", 
{ 
	capped : true, 
	autoIndexId : true,
	size : 6142800, 
	max : 10000 
})
```



如果要查看已有集合，可以使用 **show collections** 或 **show tables** 命令：

```
> show collections
```





### 删除集合

```
db.collection.drop()

collection 为集合名称 ， 如果要查看已有集合，可以使用 show collections 或 show tables 命令
```





### 插入文档

```powershell
>db.COLLECTION_NAME.insertOne({'json':'json'})

db.COLLECTION_NAME.insertMany({'json':'json'})
```

以上代码会将花括号内的 json 对象插入到 col 集合中，如果集合不存在数据库会自动创建。



### 导入文档

`mongoimport -d 数据库名称 -c 集合名称 -file 导入目标文件`

使用mongoimport命令需要将MongoDB安装目录下的bin路径导入到系统变量Path中



### 更新文档

```
>db.COLLECTION_NAME.updateOne({'json':'value'},{$set:{'new key':'new value'}})

>db.COLLECTION_NAME.updateMany({'json':'value'},{$set:{'new key':'new value'}})
```



### 删除文档

```
// 删除匹配的第一条数据
>db.COLLECTION_NAME.deleteOne({'title':'MongoDB 笔记'})

// 删除所以匹配的数据
>db.COLLECTION_NAME.deleteMany({'title':'MongoDB 笔记'})

// 删除全部
>db.COLLECTION_NAME.deleteMany({})

```



### 查询文档

```
>db.COLLECTION_NAME.find({key1:value1, key2:value2}).pretty()
// .pretty() 以易读的方式返回查询数据
```