---
title: Node.js 入门（二）
date: 2020-08-24
sidebar: false
categories:
 - BackEnd
tags:
 - Node.js
publish: true
---

- Node 服务器创建

- 浏览器请求处理

- Promise 对象

- 异步函数

<!-- more -->

## 服务器端基础概念

### 网站的组成

网站应用程序主要分为两大部分：客户端和服务器端。

客户端：在浏览器中运行的部分，就是用户看到并与之交互的界面程序。使用HTML、CSS、JavaScript构建。

服务器端：在服务器中运行的部分，负责存储数据和处理应用逻辑。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200824160604.png)





### Node 网站服务器

能够提供网站访问服务的机器就是网站服务器，它能够接收客户端的**请求**，能够对请求做出**响应**。





### IP地址

互联网中设备的唯一标识。

IP是Internet Protocol Address的简写，代表互联网协议地址.





### 域名

由于IP地址难于记忆，所以产生了域名的概念，所谓域名就是平时**上网所使用的网址**。



虽然在地址栏中输入的是网址, 但是最终还是会将域名转换为ip才能访问到指定的网站服务器。





### 端口

端口是计算机与外界通讯交流的出口，用来区分服务器电脑中提供的不同的服务。





### URL

统一资源定位符，又叫URL（Uniform Resource Locator），是专为标识Internet网上资源位置而设的一种编址方式，我们平时所说的网页地址指的即是URL。



**URL 的组成**

```
传输协议://服务器IP或域名:端口/资源所在位置标识
```

http：超文本传输协议，提供了一种发布和接收HTML页面的方法。







## 创建web服务器



```js
// app.js
// 引用系统模块
const http = require('http');
// 创建web服务器
const app = http.createServer();
// 当客户端发送请求的时候
app.on('request', (req, res) => {
   //  响应
   res.end('<h1>hi, user</h1>');
});
// 监听3000端口
app.listen(3000);
console.log('服务器已启动，监听3000端口，请访问 localhost:3000')
```



命令行运行

```bash
node app.js
```





## HTTP 协议



### HTTP协议的概念

**超文本传输协议**（英文：HyperText Transfer Protocol，缩写：**HTTP**）规定了如何从网站服务器传输超文本到本地浏览器，它基于客户端服务器架构工作，是客户端（用户）和服务器端（网站）请求和应答的标准。



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200824172520.png)



### 报文

在HTTP请求和响应的过程中传递的数据块就叫报文，包括要传送的数据和一些附加信息，并且要遵守规定好的格式。



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200824172819.png)





### 请求报文

1. 请求方式 （Request Method）
   - GET   请求数据
   - POST  发送数据
2. 请求地址 （Request URL）

```js
app.on('request', (req, res) => {
    req.headers  // 获取请求报文
    req.url      // 获取请求地址
    req.method   // 获取请求方法
});
```



**根据请求地址返回不同数据**

```js
app.on('request', (req, res) => {
    if(req.url == '/index' || req.url == '/'){
        res.end("homepage");
    }else if(req.url == '/index/a'){
        res.end("a");
    }
});
```



### 响应报文

1. HTTP状态码

   - 200 请求成功
   - 404 请求的资源没有被找到
   - 500 服务器端错误
   - 400 客户端请求有语法错误

2. 内容类型

   - text/plain

   - text/html
   - text/css
   - application/javascript
   - image/jpeg
   - application/json

```js
app.on('request', (req, res) => {
    // 设置响应报文
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    });
    res.end('<h2>首页</h2>');
});
```





## HTTP 请求与响应处理

### 请求参数

客户端向服务器端发送请求时，有时需要携带一些客户信息，客户信息需要通过请求参数的形式传递到服务器端，比如登录操作。



### GET请求参数

- 参数被放置在浏览器地址栏中，例如：`http://localhost:3000/?name=zhangsan&age=20`
- 参数获取需要借助系统模块url，url模块用来处理url地址

```js
const http = require('http');
// 导入url系统模块 用于处理url地址
const url = require('url');
const app = http.createServer();
app.on('request', (req, res) => {
    // 将url路径的各个部分解析出来并返回对象
    // true 代表将参数解析为对象格式
    let {query} = url.parse(req.url, true);
    console.log(query);
});
app.listen(3000);
```





### POST请求参数

- 参数被放置在请求体中进行传输
- 获取POST参数需要使用data事件和end事件
- 使用querystring系统模块将参数转换为对象格式

```html
<form action="http://localhost:3000" method="post">
    <input type="text" name="uname">
    <input type="password" name="pwd">
    <input type="submit">
</form>
```



```js
const http = require('http');
// querystring 内置方法 parse 将 post型字符串转换为对象
const querystring = require('querystring');
const app = http.createServer();
app.on('request', (req, res) => {
    let postParams = '';

    req.on('data', params => {
        postParams += params;
    });

    req.on('end', () => {
        console.log(postParams);	// uname=qijih&pwd=123
        console.log(querystring.parse(postParams));
        // { uname: 'qijih', pwd: '123' }
    })

    res.end('OK');
});
```



### 路由

`http://localhost:3000/index `

`http://localhost:3000/login` 

路由是指客户端请求地址与服务器端程序代码的对应关系。简单的说，就是请求什么响应什么。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200825123246.png)



**一个比较完整的路由和参数获取**

```js
const http = require('http');
const url = require('url');

const app = http.createServer();

app.on('request', (req, res) => {
    // 获取请求方式
    const method = req.method.toLowerCase();
    // 获取请求地址
    const {pathname} = url.parse(req.url);

    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    })

    if(method == 'get') {
        if(pathname == '/' || pathname == '/index') {
            res.end('首页');
        }else if(pathname == '/list') {
            res.end('列表');
        }else {
            res.end('404');
        }
    }else if( method == 'post') {

    }
})

app.listen(3000);
console.log("服务器运行中，请访问 http://localhost:3000");
```



### 静态资源

服务器端不需要处理，可以直接响应给客户端的资源就是静态资源，例如CSS、JavaScript、image文件。



**访问静态资源实例**

```js
app.on('request', (req, res) => {
    // 获取请求方式
    const method = req.method.toLowerCase();
    // 获取请求地址
    let {pathname} = url.parse(req.url);

    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    })

    if(method == 'get') {
        if(pathname == '/' || pathname == '/index') {
            res.end('首页');
        }else if(pathname == '/list') {
            res.end('列表');
        }else if(pathname == '/form') {
            let pathsrc = path.join(__dirname, 'static', 'public', pathname + '.html');
            fs.readFile(pathsrc, (err, doc) => {
                if(err) {
                    res.end(JSON.stringify(err));
                    return;
                }else {
                    res.end(doc);
                }
            })
        }
    }else if( method == 'post') {
        
    }
})
```











### 动态资源

相同的请求地址不同的响应资源，这种资源就是动态资源。

`http://localhost:3000/article?id=1` 

`http://localhost:3000/article?id=2` 



**返回资源类型动态判断**

```js
const mime = require('mime');

app.on('request', (req, res) => {
    // 获取请求方式
    const method = req.method.toLowerCase();
    // 获取请求地址
    let {pathname} = url.parse(req.url);

    

    if(method == 'get') {
		if(pathname == '/form') {
            let pathsrc = path.join(__dirname, 'static', 'public', pathname + '.html');
            fs.readFile(pathsrc, (err, doc) => {
                if(err) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html;charset=utf8'
                    });
                    res.end(JSON.stringify(err));
                    return;
                }else {
                    res.writeHead(200, {
                        'Content-Type': `${mime.getType(pathsrc)};charset=utf8`
                    });
                    res.end(doc);
                }
            })
        }
```





### 客户端请求途径

- GET请求
  - 浏览器地址栏
  - link标签的href属性
  - script标签的src属性
  - img标签的src属性
  - Form表单提交
- POST请求
  - Form表单提交





## Node.js 异步编程



### 同步异步API



**同步API**：只有当前API执行完成后，才能继续执行下一个API

```js
console.log('before'); 
console.log('after');
```



**异步API**：当前API的执行不会阻塞后续代码的执行

```js
console.log('before');
setTimeout(
   () => { console.log('last');
}, 2000);
console.log('after');

// output:
// before
// after
// last
```



### 同异区别

同步API可以从返回值中拿到API执行的结果, 但是异步API是不可以的

```js
// 同步
function sum (n1, n2) { 
	return n1 + n2;
} 
const result = sum (10, 20);

// 异步
function getMsg () { 
	setTimeout(function () { 
		return { msg: 'Hello Node.js' }
	}, 2000);
}
const msg = getMsg ();
console.log(msg);  // undefined
```



### 回调函数

自己定义函数让别人去调用。

```js
  // getData函数定义
 function getData (callback) {
     callback();
 }
  // getData函数调用
 getData (() => {});
```



### 使用回调函数获取异步API执行结果

```js
function getMsg (callback) {
    setTimeout(function () {
        callback ({ msg: 'Hello Node.js' })
    }, 2000);
}
getMsg (function (msg) { 
    console.log(msg);
});
console.log('next');

// next
// { msg: 'Hello Node.js' }
```



### 代码顺序分析

同步API从上到下依次执行，前面代码会阻塞后面代码的执行

```js
for (var i = 0; i < 100; i++) { 
    console.log(i);
}
console.log('for循环后面的代码');

// ...
// 99
// for循环后面的代码
```

异步API不会等待API执行完成后再向下执行代码

```js
console.log('代码开始执行'); 
setTimeout(() => { console.log('2秒后执行的代码')}, 2000);
setTimeout(() => { console.log('0秒后执行的代码')}, 0); 
console.log('代码结束执行');

// 代码开始执行
// 代码结束执行
// 0秒后执行的代码
// 2秒后执行的代码
```



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200825142110.png)





### Node.js中的异步API

```js
 fs.readFile('./demo.txt', (err, result) => {});
```

```js
 var server = http.createServer();
 server.on('request', (req, res) => {});
```

如果异步API后面代码的执行依赖当前异步API的执行结果，但实际上后续代码在执行的时候异步API还没有返回结果，这个问题要怎么解决呢？

```js
fs.readFile('./demo.txt', (err, result) => {});
console.log('文件读取结果');
```



**回调地狱**

需求：依次读取 A,B,C 文件

```js
const fs = require('fs');

fs.readFile('./1.txt', 'utf8', (err, doc) => {
    console.log(doc);
    fs.readFile('./2.txt', 'utf8', (err, doc) => {
        console.log(doc);
        fs.readFile('./3.txt', 'utf8', (err, doc) => {
            console.log(doc);
        });
    });
});
```



### Promis

Promise 出现的目的是解决 Node.js 异步编程中回调地狱的问题。



Promise 实例：

```js
const fs = require('fs');

let promise = new Promise((result, reject) => {
    fs.readFile('./1.txts','utf8', (err, doc) => {
        if(err){
            reject(err);
        }else{
            result(doc);
        }
    });
});

promise.then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
})
```



Promise 解决回调地狱

```js
const fs = require('fs');


function p1() {
    return new Promise ((resolve, reject) => {
        fs.readFile('./1.txt', 'utf8', (err, doc) => {
            resolve(doc);
        })
    });
}

function p2() {
    return new Promise ((resolve, reject) => {
        fs.readFile('./2.txt', 'utf8', (err, doc) => {
            resolve(doc);
        })
    });
}

function p3() {
    return new Promise ((resolve, reject) => {
        fs.readFile('./3.txt', 'utf8', (err, doc) => {
            resolve(doc);
        })
    });
}


p1().then((r1) => {
    console.log(r1);
    return p2();
})
.then((r2) => {
    console.log(r2);
    return p3();
})
.then( (r3) => {
    console.log(r3);
})
```





### 异步函数

异步函数是在 ES7 中新增的，其本质上是对 Promise 对象的封装，使得代码语法更加简洁

异步函数是异步编程语法的终极解决方案，它可以让我们将异步代码写成同步的形式，让代码不再有回调函数嵌套，使代码变得清晰明了。



**语法**

```js
const fn = async () => {};
```

```js
async function fn() {};
```

- **`async`**
  - 普通函数定义前加async关键字 普通函数变成异步函数
  - 异步函数默认返回promise对象
  - 在异步函数内部使用 return 关键字进行结果返回 结果会被包裹的promise 对象中 return 关键字代替了 resolve 方法
  - 在异步函数内部使用 throw 关键字抛出程序异常
  - 调用异步函数再链式调用then方法获取异步函数执行结果
  - 调用异步函数再链式调用catch方法获取异步函数执行的错误信息



```js
// 在普通函数声明时使用 async 声明成异步函数
// 异步函数返回值是 Promise 对象
// 使用 throw 抛出错误，使用 catch 抓取关键字
// await 关键字：
//  1. await 只能出现在异步函数 async 中
//  2. await 后紧跟 promise 对象，其会暂停异步函数的执行，等待 promise 对象的执行

async function fn() {
    throw 'errrrrrrrrrrrrrrrrrro';
    return 123;
}

fn().then( (data)=>{
    console.log(data);
}).catch((err) => {
    console.log(err);
})

// =========================================

async function p1() {
    return 'p1';
}
async function p2() {
    return 'p2';
}
async function p3() {
    return 'p3';
}

async function run() {
    let r1 = await p1();
    let r2 = await p2();
    let r3 = await p3();

    console.log(r1);
    console.log(r2);
    console.log(r3);
}

run();
```



**依次读取文件的异步函数解决方案**

```js
const fs = require('fs');
// util 下的 promisify 方法会将参数包装成 promise 对象 
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

async function run() {
    let r1 = await readFile('./1.txt', 'utf8');
    let r2 = await readFile('./2.txt', 'utf8');
    let r3 = await readFile('./3.txt', 'utf8');

    console.log(r1);
    console.log(r2);
    console.log(r3);
}

run();
```

























