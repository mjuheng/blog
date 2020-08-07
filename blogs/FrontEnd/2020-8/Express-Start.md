---
title: Express 初步使用
date: 2020-08-07
sidebar: false
categories:
 - FrontEnd
tags:
 - Express
publish: true
---
::: tip
基于 Node.js 平台，快速、开放、极简的 Web 开发框架  
官方文档：[Express Doc](https://www.expressjs.com.cn/)
:::
<!-- more -->
# Express 基础入门



## 1. 安装与环境部署



在命令行使用npm工具进行下载express

`npm install express`



在项目主js文件引入express

```javascript
const express = require('express');
// 创建主路由
const app = express();
```



## 2. 路由



- send方法内部会检测响应内容的类型
- send方法会自动设置http状态码
- send方法会自动设置响应内容类型和编码

```javascript
app.get('/', (req, res) => {
    res.send('hello express');
})

app.get('/json', (req, res) => {
    res.send({
        name : "QiJieH",
        age  : 23
    });
});
```



## 3. 中间件



中间件是处理客户端的请求的一种堆方法，一个请求可以有多个中间件处理。



### 中间件方法

#### 传递请求：next()

默认情况下依照代码顺序匹配中间件，一但匹配成功就终止，可以提供next方法将请求传递

```javascript
app.get('/request', (req, res, next) => {
    req.name = "QiJieH";
    next();
})

app.get('/request', (req, res) => {
    res.send(req.name);
})
```



#### 接收所有请求：.use

use方法可以匹配·所有请求方法  *use方法接收请求后会终止请求，请求将不会传递*

```javascript
app.use((res, req, next) => {
    console.log('我是必经中间件，我接收所有请求');
    next();
});

app.use('/request', (res, req, next) => {
    console.log('在/request下我接收所有请求');
    next();
});

app.get('/request', (req, res, next) => {
    req.name = "QiJieH";
    next();
});

app.get('/request', (req, res) => {
    res.send(req.name);
});

app.get('/request/test', (req, res, next) => {
    res.send('ok');
    next();
});
```



### 中间件应用场景



#### 验证用户登录

```javascript
app.use('/admin', (req, res, next) => {
    let isLogin = false;
    if(isLogin){
        next();
    }else{
        res.send("没有登录，不能访问");
    }
});

app.get('/admin', (req, res) => {
    res.send("已经登录，可以访问");
});
```



#### 网站维护

```javascript
app.use('/', (req, res, next) => {
    res.send("网站维护，请稍后访问");
});
```



#### 404页面定义

```javascript
// 代码顺序传递请求
app.get('/01', (req, res, next) => {
    res.send("01.html");
});

app.get('/02', (req, res) => {
    res.send("02.html");
});
// 如果请求仍然被传递说明访问未定义路由
app.use('/', (req, res) => {
    res.status(404).send("404 not found");
})
```





#### 错误处理中间件



在程序执行过程中，会不可避免的出现一些无法预料的错误，比如文件读取失败，数据库连接失败。

错误处理中间件是一个集中处理错误的地方。

```javascript
// 同步错误抓取
app.get('/index', (req, res) => {
    throw new Error("出现未知错误");
});

app.use('/', (err, req, res, next) => {
    res.status(500).send(err.message);
});


//异步错误抓取

// 
app.get('/index', async (req, res, next) => {
    try {
        await fs.readFile('./demo1.txt');
    }catch(e) {
        next(e);
    }
});

app.use('/', (err, req, res, next) => {
    res.status(500).send(err.message);
});
```




## 4. 构建模块化路由

```javascript
// home.js
const express = require('express');
const home = express.Router();
home.get('/index', (req, res) => {
    res.send("欢迎来到博客首页页面");
});
module.exports = home;

// admin.js
const express = require('express');
const admin = express.Router();
admin.get('/index', (req, res) => {
    res.send("欢迎来到博客管理员首页页面");
});
module.exports = admin;

// app.js
const express = require('express');
const app = express();
const home = require('./home');
const admin = require('./admin');
app.use('/home', home);
app.use('/admin', admin);
app.listen(3000);
```



## 5. 请求处理



### GET参数获取

Express中使用req.query即可获取GET参数，框架内部会将GET参数转化为对象并返回。

```javascript
app.get('/obj', (req, res) => {
    res.send(req.query);
});
```



### POST参数获取

Express中接收post参数需要借助express提供的模块包 body-parse

`npm install body-parser`

```javascript
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.post('/obj', (req, res) => {
    res.send(req.body);
});
```



### 路由参数

```javascript
app.get('/index/:id/:name', (req, res) => {
    res.send(req.params);
});

// {"id":"vaile","name":"xxx"}
```



### 静态资源处理

通过express下的express.static可以方便的托管静态文件，例如img，css，javascripe等静态资源

```javascript
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(path.join(__dirname, 'public')));

// http://localhost:3000/index.html
	// ==> project/public/index.html
// http://localhost:3000/css/test.css
	// ==> project/public/css/test.css
```


