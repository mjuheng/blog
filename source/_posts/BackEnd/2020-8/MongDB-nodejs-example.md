---
title: MongoDB Node.js使用实例
date: 2020-08-07
sidebar: false
categories:
 - BackEnd
tags:
 - MongoDB
 - Node.js
publish: true
---
```js
base.findOne({
        name : "QiJieH"
    }).then(result => console.log(result));
```
<!-- more -->
# MongoDB Node.js使用实例



## 环境部署

Nodejs

https://nodejs.org/zh-cn/

npm [nodejs package manager] 是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题



MongoDB

https://www.mongodb.com/try/download/community version require: 4.2.7



MongoDB 可视化界面管理软件 Compass

https://www.mongodb.com/try/download/compass



nodejs 操作 mongoDB 需要依赖第三方包 mongoose

`npm instaall mongoose`





## 服务启动与连接

---



启动 MongoDB 服务

`net start mongodb`

关闭 MongoDB 服务

`net stop mongodb`



### js调用API连接数据库

```javascript
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/userinfo",{useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => console.log("数据库连接成功"))
    .catch(err => console.log(err, "数据库连接失败"));
```





## 数据库增删改查

---



### 制定集合规则

``` javascript
const userSchema = new mongoose.Schema({
    name  :   String,
    pwd   :   String,
    email :   String,
    qq    :   String,
    level :   Number,
    desc  :   String,
    col   :   [String]
});

const User = mongoose.model("User", userSchema);

// 隐式制定
const User = mongoose.model("User", new mongoose.Schema({
    name  :   String,
    pwd   :   String,
    email :   String,
    qq    :   String,
    level :   Number,
    desc  :   String,
    col   :   [String]
}));
```



### 创建插入文档

```javascript
// 显示构造
const user = new User({
    name    :   "QiJieH",
    pwd     :   "LINKSTART1279",
    email   :   "1279656042@qq.com",
    qq      :   "1279656042",
    level   :   7,
    desc    :   "这是P1描述",
    col     :   ["A1","A3"]
});

user.save();

// 隐式构造
Course.creat({name: "mongoDB connect",author: "QiJieH",isPublish: true}, (err, doc) => {
    console.log(err);
    console.log(doc);
})

Course.creat({name: "mongoDB connect",author: "QiJieH",isPublish: true})
	.then()
	.catch();

```



### 使用CMD导入文件文档

`mongoimport -d 数据库名称 -c 集合名称 -file 导入目标文件`

使用mongoimport命令需要将MongoDB安装目录下的bin路径导入到系统变量Path中



### 查询文档

```javascript

Course.find().then(result => console.log(result));

Course.find({_id: "5ee1010ba2fb690f5821c3e0"}).then(result => console.log(result));

Course.findOne().then(result => console.log(result));

Course.findOne({name : "QiJieH"}).then(result => console.log(result));

// 条件查询
	//大于 小于
User.find({level: {$gt:8, $lt:12}})
    .then(result => {console.log(result)})
    .catch(err => {console.log(err)});
	
	//数组包含
User.find({col:{$in : ["A2"]}})
    .then(result => {console.log(result)});
	
	//选择查询字段 '-'为忽略字段
User.find().select("name email -_id")
    .then(result => {console.log(result)});

	//排序 '-'降序
User.find().sort("level")
    .then(result => {console.log(result)});

	// 跳过 限制
User.find().skip(1).limit(1)
    .then(result => {console.log(result)});
```



### 删除文档

```javascript
// 删除单个
User.findOneAndDelete({name : "Adminer"})
    .then(result => {console.log("已删除 >> " ,result)})

// 删除多个
User.deleteMany({})
    .then(result => {console.log(result)})
```



### 更新文档

```javascript
// 更新单个
User.updateOne({name : "ZiHaoW"}, {name : "QiJieH"})
    .then(result => {console.log(result)});
// 更新多个
User.updateMany({name : "QiJieH"}, {name : "QiJieH_More"})
    .then(result => {console.log(result)});
```



### 验证

```javascript
const newuserSchema = new mongoose.Schema({
    name  :   {
        type: String, 
        required: [true, "请传入昵称"],
        minlength: [2, "过短"],
        maxlength: [99, "过长"],
        trim: true //过滤空格
    },
    
    level : {
        type:   Number,
        min :   [14, "年龄过低"],
        max :   78
    },
    
    bairth : {
        type:   Date,
        default:    Date.now
    },
    
    class : {
            type: String,
            enum:{
                values : ["A","B","C","D"],
                message : "calss 中只有ABCD"
            }
        },
    
    author: {
        type: String,
        validate: {
            validator: v =>{
                v && v.length > 4
            },
            message: "传入的值不符合验证规则"
        }
    }
    
});

const newUser = mongoose.model("NewUser", newuserSchema);
```



### 优雅的验证错误抓取

```javascript
newUser.create({
    name    :   "QiJieH",
    level   :   13,
    bairth  :   "",
    class   :   "E",
    author  :   "1234567"
})  .then(result => {console.log(result)})
    .catch(error => {
        const err = error.errors;
        
        for(var attr in err){
            console.log(err[attr]["message"]);
        }
    });
```



### 集合关联

| 文章集合 | 用户集合 |
| :------: | :------: |
|   _id    |   _id    |
|  title   |   name   |
|  author  |   age    |
| content  | habbies  |

- 使用id对集合进行关联
- populate方法进行关联查询



```javascript
const userSchema = new mongoose.Schema({
    name    :   String,
    age     :   Number
});

const postSchema = new mongoose.Schema({
    title   :   String,
    author  :   {
        type    :   mongoose.Schema.Types.ObjectId, ref: "User"
    },
    content :   String
})
    
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// for(var i=0; i<10; i++){
//     User.create({
//         name :  "user_" + i,
//         age  :  i,
//     }).then(result => {console.log(result)});
    
//     }

// Post.create({
//     title   : "Post_1",
//     author  : "5ee119e5d8b06b10141e6ceb"
// }).then(result => console.log(result));

Post.find().populate("author").then(result => {console.log(result)});
```





### 案例实战

#### 用户信息管理系统

1. 搭建网站服务器，实现客户端与服务端的通信
2. 连接数据库，创建用户集合，向集合中插入文档
3. 当用户访问/list时，将所有用户信息查询出来
4. 将用户信息和表格HTML进行拼接并将拼接结果响应给客户端
5. 当用户访问/add时，呈现表单页面，并实现添加用户信息功能
6. 当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
7. 当用户访问/delete时，实现用户删除功能



::: details

```javascript
const http = require("http");
const mongoose = require("mongoose");
const url = require("url");
const querystring = require("querystring");


mongoose.connect("mongodb://localhost/data",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {console.log("数据库连接成功")})
    .catch(() => {console.log("数据库连接失败")});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:2,
        maxlength:20
    },
    age: {
        type: Number,
        min:18,
        max: 80
    },
    psw: String,
    email: String,
    hobbies: [String]
})

const User = mongoose.model("User", userSchema);


const app = http.createServer();


app.on("request", async (req, res) => {
    const method = req.method;
    const {pathname, query} = url.parse(req.url, true);

    if(method == "GET") {
               if(pathname == "/list") {

            let users = await User.find();
            console.log(users);

            let list = `<html>
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h6>
                        <a href="/add" class="btn btn-primary">添加用户</a>
                    </h6>
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>用户名</td>
                            <td>年龄</td>
                            <td>爱好</td>
                            <td>邮箱</td>
                            <td>操作</td>
                        </tr>`;
            

            users.forEach(item => {
                list += `<tr>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>`;

                item.hobbies.forEach(obj => {
                    list += `<span>${obj} </span>`;
                });

                
                list += `
                        </td>
                        <td>${item.email}</td>
                        <td>
                            <a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                            <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
                        </td>
                    </tr>`;
                
            })


            list += `</table>
            </div>
        </body>
        </html>`;
            
            res.end(list);

        } else if (pathname == "/add") {
            let add = `<html>

            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            
            <body>
                <div class="container">
                    <h3>添加用户</h3>
                    <form method="post" action="/add">
                        <div class="from-group">
                            <label>用户名</label>
                            <input name="name" type="text" class="form-control" placeholder="请填写用户名">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input name="pwd" type="password" class="form-control" placeholder="请输入密码">
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input name="age" type="number" class="form-control" placeholder="请输入年龄">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input name="email" type="email" class="form-control" placeholder="请输入邮箱">
                        </div>
                        <div class="form-group">
                            <label>请选择爱好</label>
                            <div>
                                <label class="checkbox-inline"><input type="checkbox" value="java" name="hobbies" />java</label>
                                <label class="checkbox-inline"><input type="checkbox" value="c++" name="hobbies" />c++</label>
                                <label class="checkbox-inline"><input type="checkbox" value="javascrip"
                                        name="hobbies" />javascrip</label>
                                <label class="checkbox-inline"><input type="checkbox" value="html" name="hobbies" />html</label>
                                <label class="checkbox-inline"><input type="checkbox" value="css" name="hobbies" />css</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">添加用户</button>
                    </form>
                </div>
            </body>
            
            </html>`;

            res.end(add);
        } else if (pathname == "/modify") {
            let user = await User.findOne({_id:query.id});
            console.log(user);
            let hobbies = ["java","javascrip","c++","css","html"];
            let modify = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            
            <body>
                <div class="container">
                    <h3>修改用户</h3>
                    <form method="post" action="/modify?id=${user._id}">
                        <div class="from-group">
                            <label>用户名</label>
                            <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input value="${user.psw}" name="pwd" type="password" class="form-control" placeholder="请输入密码">
                        </div>
                        <div class="form-group">
                            <label>年龄</label>
                            <input value="${user.age}" name="age" type="number" class="form-control" placeholder="请输入年龄">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input value="${user.email}" name="email" type="email" class="form-control" placeholder="请输入邮箱">
                        </div>
                        <div class="form-group">
                            <label>请选择爱好</label>
                            <div>
                            `;
                hobbies.forEach(item => {
                    let isHobby = user.hobbies.includes(item);
                    if(isHobby){
                        modify += `
                        <label class="checkbox-inline"><input type="checkbox" value="${item}" name="hobbies" checked />${item}</label>
                        `
                    } else {
                        modify += `
                        <label class="checkbox-inline"><input type="checkbox" value="${item}" name="hobbies" />${item}</label>
                        `
                    }
                });

                modify += ` </div>
                        </div>
                        <button type="submit" class="btn btn-primary">修改用户保存</button>
                    </form>
                </div>
            </body>
            
            </html>`;

            res.end(modify);
        } else if (pathname == "/remove") {
            await User.findByIdAndDelete({_id:query.id});
            res.writeHead(301, {
                Location: "/list"
            });
            res.end();
        }
    } else if(method == "POST") {
               if(pathname == "/add") {
            // 表单提交
            let formData = "";
            req.on("data", param => {
                formData += param;
            });

            req.on("end", async () => {
                let user = querystring.parse(formData);
                await User.create(user);
                //res.end("OK");
                res.writeHead(301, {
                    Location: "/list"
                });
                res.end();
            });
        } else if(pathname =="/modify") {
            // 表单提交
            let formData = "";
            req.on("data", param => {
                formData += param;
            });

            req.on("end", async () => {
                let user = querystring.parse(formData);
                await User.updateOne({_id: query.id }, user);
                //res.end("OK");
                res.writeHead(301, {
                    Location: "/list"
                });
                res.end();
            });
        }
    }

    
})


app.listen(3000);
```

:::



#### 代码优化 模块化

```bash
Project
│  app.js	//main
│  package-lock.json	//npmfile
│
├─model
│      index.js		//数据库连接
│      user.js		//集合规则
│
└─node_modules //npm mongoose
```



### 模板引擎



art-template

>art-template 是一个简约、超快的模板引擎。
>它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。

> > 参考链接 https://www.jianshu.com/p/d8d8e19157e0
> >
> > 官方文档 http://aui.github.io/art-template/zh-cn/docs/index.html



1. 使用命令 `npm install art-template` 进行安装

2. 使用 `const template = require("art-template")` 引入模板引擎
3. 告诉模板引擎要拼接的数据和模板文件 `const html = template("path",data)` 



```javascript
// 导入模板引擎
const template = require("art-template");
const path = require("path");

const views = path.join(__dirname, 'views', "index.art")
const html = template(views, {
    name: "张三",
    age: 20
});

console.log(html);
```



```html
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    {{ name }}
    {{ age }}
</body>
</html>
```



![image-20200611190039146](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200611190039146.png)



#### 模板引擎语法

标准语法 原始语法

##### 1. 输出
::: v-pre
   `{{data}}`
:::
   `<%=data %>`

   可在花括号内使用简单的逻辑运算 + - x / = ?: 等

```html
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <!-- 标准语法 -->
    <p>{{ name }}</p>
    <p>{{ 1+1 }}</p>
    <p>{{ 1+1 == 2 ? "相等" : "不等" }}</p>
    <!-- 原始语法 -->
    <p><%= name %></p>
    <p><%= 1+2 %></p>
    <p><%= 1+2 == 3 ? "相等" : "不等" %></p>
</body>
</html>
```

![image-20200611190958753](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806233357.png)



##### 2. HTML输出
::: v-pre
   `{{@data}}`
:::
   `<%- data %>`

##### 3. 条件判断

   ```html
   {{if condition}}
   	show this
   {{else if condition}}
   	show this
   {{else}}
   	show this
   {{/if}}
   
   
   // 原始语法
   <% if(condition) {%> show this <%} %>
   <% if(condition) {%> show this <%} else if(condition) {%> show this<%} %>
   ```

##### 4. 循环
::: v-pre
   `{{each data}} {{/each}}`
:::
   `<% for() {%> <%} %>`

   ```html
      <ul>
           {{each users}}
               <li> 
                   {{$value.name}}
                   {{$value.age}}
                   {{$value.sex}}
               </li>
           {{/each}}
       </ul>
   
       <ul>
           <% for(var i=0; i<users.length; i++) {%>
               <li>
                   <%=users[i].name %>
                   <%=users[i].age %>
                   <%=users[i].sex %>
               </li>
           <%} %>
       </ul>
   ```



##### 5. 子模板

   使用子模板可以将网站的公共区域（头部，尾部）抽离到文件中
::: v-pre
   `{{include "模板"}}`
:::
   `<%include("模板")>`

```html
    {{include './common/header'}}
    <div>
        {{msg}}
    </div>
    {{include './common/footer'}}

    <%include ('./common/header') %>
    <div>
        <%=msg %>
    </div>
    <%include ('./common/footer') %>
```



##### 6. 模板继承

```javascript
//模板预留
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    {{block 'link'}} {{/block}}
</head>
<body>
    {{block 'content'}} {{/block}}
</body>
</html>
```



```javascript
// 继承并新生
{{extend './common/layout.art'}}


{{block 'content'}}
<p>{{msg}}</p>
{{/block}}

{{block 'link'}}
<link rel="stylesheet" href="">
{{/block}}
```



##### 7. 模板配置

- 向模板中导入变量 template.defaults.imports.变量名 = 变量值

```javascript
const dateFormat = require("dateformat");

template.defaults.imports.dateFormat = dateFormat;

{{ dateFormat(time, 'yyyy-mm-dd') }}
```

- 设置模板根目录 template.defaults.root = 模板根目录

```javascript
// 导入模板引擎
const template = require("art-template");
const path = require("path");
const dateFormat = require("dateformat");

template.defaults.imports.dateFormat = dateFormat;

template.defaults.root = path.join(__dirname, 'views');

const html = template("index", {
    time: new Date()
});

console.log(html);
```

- 设置默认模板后缀 template.defaults.extname = '.html'





## 实战项目 学生档案管理

---

1. 建立项目文件夹并生成项目描述文件
2. 创建网站服务器实现客户端和服务器端通信
3. 连接数据库并根据需求设计学员信息表
4. 创建路由并实现页面模板呈递
5. 实现静态资源访问
6. 实现学生信息添加功能
7. 实现学生信息展示功能



`npm init init`

```javascript
//app.js
const http = require('http');
const app = http.createServer();

app.on('request', (req, res) => {
    res.end('ok');
});

app.listen(80);
console.log("at your sevice");
```



router

功能：实现路由

使用步骤：

1. 获取路由对象
2. 调用路由对象提供的方法创建路由
3. 启用路由，使路由生效



serve-static

功能：实现静态资源访问服务

步骤：

1. 引入sever-static模块获取创建静态资源服务功能的方法
2. 调用方法创建静态资源服务并指定静态资源服务目录
3. 启用静态资源服务功能