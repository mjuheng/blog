---
title: Express 初步使用
date: 2020-08-07
sidebar: false
categories:
 - [FrontEnd]
 - [BackEnd]
tags:
 - Express
 - Node.js
publish: true
---

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200825153439.png)

Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架 

<!-- more -->

## Express 基础入门

官方文档：[Express Doc](https://www.expressjs.com.cn/) 



### 什么是 Express

Express是一个基于Node平台的web应用开发框架，它提供了一系列的强大特性，帮助你创建各种Web应用



### Express 框架特性

- 提供了方便简洁的路由定义方式
- 对获取HTTP请求参数进行了简化处理
- 对模板引擎支持程度高，方便渲染动态HTML页面
- 提供了中间件机制有效控制HTTP请求
- 拥有大量第三方中间件对功能进行扩展





### 路由对比

```js
// 原生Node.Js

app.on('request', (req, res) => {
    // 获取客户端的请求路径
    let { pathname } = url.parse(req.url);
    // 对请求路径进行判断 不同的路径地址响应不同的内容
    if (pathname == '/' || pathname == 'index') {
    	res.end('欢迎来到首页');
    } else if (pathname == '/list') {
    	res.end('欢迎来到列表页页');
    } else if (pathname == '/about') {
    	res.end('欢迎来到关于我们页面')
    } else {
    	res.end('抱歉, 您访问的页面出游了');
    }
});


// Express

// 当客户端以get方式访问/时
app.get('/', (req, res) => {
    // 对客户端做出响应
    res.send('Hello Express');
});

// 当客户端以post方式访问/add路由时
app.post('/add', (req, res) => {
	res.send('使用post方式请求了/add路由');
});

```



### 请求参数对比

```js
// Node.js
app.on('request', (req, res) => {
    // 获取GET参数 第二个参数是否转化为对象
    let {query} = url.parse(req.url, true);
    // 获取POST参数
    let postData = '';
    req.on('data', (chunk) => {
    	postData += chunk;
    });
    req.on('end', () => {
    	console.log(querystring.parse(postData));
    })); 
});

    
// Express
app.get('/', (req, res) => {
    // 获取GET参数
    console.log(req.query);
});

app.post('/', (req, res) => {
    // 获取POST参数
    // require('body-parser')
    console.log(req.body);
}) 
```





### Express 初体验

使用Express框架创建web服务器及其简单，调用express模块返回的函数即可。

```js
// 引入Express框架
const express = require('express');
// 使用框架创建web服务器
const app = express();
// 当客户端以get方式访问/路由时
app.get('/', (req, res) => {
    // 对客户端做出响应 send方法会根据内容的类型自动设置请求头
    res.send('<h2>Hello Express</h2>');
});
// 程序监听3000端口
app.listen(3000);
```





## Express 安装部署



在命令行使用npm工具进行下载express

```bash
npm install express
```



在项目主js文件引入express

```javascript
const express = require('express');
// 创建主路由
const app = express();
```



## Express中间件

中间件就是一堆方法，可以接收客户端发来的请求、可以对请求做出响应，也可以将请求继续交给下一个中间件继续处理。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200825155655.png)



### 什么是中间件

中间件主要由两部分构成，中间件方法以及请求处理函数。

中间件方法由Express提供，负责拦截请求，请求处理函数由开发人员提供，负责处理请求。

```js
 app.get('请求路径', '处理函数')   // 接收并处理get请求
 app.post('请求路径', '处理函数')  // 接收并处理post请求
```



**中间件规则**

可以针对同一个请求设置多个中间件，对同一个请求进行多次处理。

默认情况下，请求从上到下依次匹配中间件，一旦匹配成功，终止匹配。





### 中间件方法

**传递请求：next()**

默认情况下依照代码顺序匹配中间件，一但匹配成功就终止。可以调用`next()` 将请求的控制权交给下一个中间件，直到遇到结束请求的中间件。调用 `next()` 方法需要在回调函数参数中属性 next 参数

```javascript
app.get('/request', (req, res, next) => {
    req.name = "张三";
    next();
});
app.get('/request', (req, res) => {
    res.send(req.name);
});
```



**接收所有请求：use()**

use方法可以匹配所有请求方法  use方法接收请求后会终止请求，请求将不会传递

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



**验证用户登录**

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



**网站维护**

```javascript
app.use('/', (req, res, next) => {
    res.send("网站维护，请稍后访问");
});
```



**404页面定义**

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





**错误处理中间件**

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




## Express模块化路由

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



## Express请求处理



### GET参数获取

Express中使用 `req.query` 即可获取GET参数，框架内部会将GET参数转化为对象并返回。

```javascript
app.get('/obj', (req, res) => {
    res.send(req.query);
});
```



### POST参数获取

Express中接收post参数需要借助express提供的模块包 `body-parse`

```bash
npm install body-parser
```

使用：

```javascript
const bodyParser = require('body-parser')
// 拦截所有请求，对请求参数处理
app.use(bodyParser.urlencoded({extended: false}));
app.post('/obj', (req, res) => {
    res.send(req.body);
});
```



### 路由参数

```javascript
// localhost:3000/index/23/express

app.get('/index/:id/:name', (req, res) => {
    res.send(req.params);
});

// {id:23, name:"express"}
```



### 静态资源处理

通过express下的 `express.static` 可以方便的托管静态文件，例如 img，css，javascripe 等静态资源

```javascript
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// 指定请求路径
app.use('/static', express.static(path.join(__dirname, 'public')));
```



## Express模板引擎

为了使art-template模板引擎能够更好的和Express框架配合，模板引擎官方在原art-template模板引擎的基础上封装了express-art-template。



```bash
npm install art-template express-art-template
```



```js
// 当渲染后缀为art的模板时 使用express-art-template
app.engine('art', require('express-art-template'));
// 设置模板存放目录
app.set('views', path.join(__dirname, 'views'));
// 渲染模板时不写后缀 默认拼接art后缀
app.set('view engine', 'art');
app.get('/', (req, res) => {
    // 渲染模板
    res.render('index');
}); 
```



**`app.locals` 对象**

将变量设置到app.locals对象下面，这个数据在所有的模板中都可以获取到。

```js
app.locals.users = [{
    name: '张三',
    age: 20
},{
    name: '李四',
    age: 20
}]
```

