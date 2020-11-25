---
title: Ajax 编程基础
date: 2020-08-25
sidebar: false
categories:
 - FrontEnd
 - BackEnd
tags:
 - Ajax
 - Node.js
publish: true
---



## Ajax 基础



### 传统网站中存在的问题

- 网速慢的情况下，页面加载时间长，用户只能等待
- 表单提交后，如果一项内容不合格，需要重新填写所有表单内容
- 页面跳转，重新加载页面，造成资源浪费，增加用户等待时间



### Ajax 概述

Ajax：标准读音 [ˈeɪˌdʒæks] ，中文音译：阿贾克斯

它是浏览器提供的一套方法，可以实现页面无刷新更新数据，提高用户浏览网站应用的体验。



简单来说，Ajax 是刷新网页部分数据的技术。



### Ajax 应用场景

1. 页面上拉加载更多数据
2. 列表数据无刷新分页
3. 表单项离开焦点数据验证
4. 搜索框提示文字下拉列表



### Ajax 运行环境

Ajax 技术需要运行在网站环境中才能生效，当前课程会使用Node创建的服务器作为网站服务器。



使用 express 创建 Ajax 运行环境

```js
// app.js
// 依赖引入
const express = require('express');
const path = require('path');

// 创建服务器
const app = express();

// 静态资源访问
app.use(express.static(path.join(__dirname, 'public')));


// 监听
app.listen(3000);
console.log('服务器监听：http://localhost:3000');
```



此时你的项目结构应该为

```
.
├── public
│   └──  index.html
│
├── app.js
├── node_modules
└── package.json
```





## Ajax 使用



### Ajax 运行原理

Ajax 相当于浏览器发送请求与接收响应的代理人，以实现在不影响用户浏览页面的情况下，局部更新页面数据，从而提高用户体验。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200826124116.png)





### Ajax 实现步骤



1. 创建 Ajax 对象

```js
var xhr = new XMLHttpRequest();
```



2. 设置请求地址及请求方式

```js
xhr.open('get', 'http://localhost:3000');
```



3. 设置请求格式（可选）

```js
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```



4. 发生请求

```js
xhr.send();
```



5. 获取服务器端响应数据

```js
xhr.onload = () => {
    console.log(xhr.responseText);
}
```



::: danger

代码顺序敏感，严禁错误的代码执行步骤

:::



**入门实例**

::: details

```html {13-24}
// public/index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
</head>
<body>
    <h1>welcome, this is homepage</h1>
</body>
    <script>
        // 创建 ajax 对象
        const xhr = new XMLHttpRequest();
        // 设置请求方式及地址
        xhr.open('get','http://localhost:3000/first');
        // 发生请求
        xhr.send();
        // 接收响应数据
        xhr.onload = () => {
            console.log(xhr.responseText);
        }
    </script>
</html>
```





```js {12-14}
// app.js
// 依赖引入
const express = require('express');
const path = require('path');

// 创建服务器
const app = express();

// 静态资源访问
app.use(express.static(path.join(__dirname, 'public')));

app.get('/first', (req, res) => {
    res.send('Hello Ajax');
});

// 监听
app.listen(3000);
console.log('服务器监听：http://localhost:3000');
```

:::



### 响应数据格式

在真实的项目中，服务器端大多数情况下会以 JSON 对象作为响应数据的格式。当客户端拿到响应数据时，要将 JSON 数据和 HTML 字符串进行拼接，然后将拼接的结果展示在页面中。



在 http 请求与响应的过程中，无论是请求参数还是响应内容，如果是对象类型，最终都会被转换为对象字符串进行传输。

```js
 JSON.parse() // 将 json 字符串转换为json对象
```





**实例**

```js {5}
const xhr = new XMLHttpRequest();
xhr.open('get', 'http://localhost:3000/resData');
xhr.send();
xhr.onload = () => {
    let res = JSON.parse(xhr.responseText)
    console.log(res);
    let str = `<h2>${res.name}</h2>`
    $('body').append(str);
}
```



```js
// app.js
app.get('/resData', (req, res) => {
    res.send({
        'name' : 'zhangsan'
    })
});
```



### 请求参数传递

在传统网站都是以表单方式进行参数传递

```html
<form method="get" action="http://www.example.com">
    <input type="text" name="username"/>
    <input type="password" name="password">
</form>
<!– http://www.example.com?username=zhangsan&password=123456 -->
```



在 Ajax 中我们可以手动设置请求参数

**GET**

```js
xhr.open('get', 'http://localhost:3000?name=zs&pwd=123');
```

**POST**

```js
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.send('name=zs&pwd=134');
```





**实例**

::: details

GET请求参数

```html {14}

<input type="text" id="uname">
<input type="password" id='pwd'>
<input type="button" value="提交" id='sub'>

<script>
    $('#sub').on('click', () => {
        let uname = $('#uname').val();
        let pwd = $('#pwd').val();

        let params = `uname=${uname}&pwd=${pwd}`;

        const xhr = new XMLHttpRequest();
        xhr.open('get', `http://localhost:3000/get?${params}`);
        xhr.send();
        xhr.onload = () => {
            console.log(xhr.responseText);
        }
    })
</script>
```

```js
// app.js
app.get('/get', (req, res) => {
    res.send(req.query);
});
```



POST请求参数

```js {8-10}
$('#sub').on('click', () => {
    let uname = $('#uname').val();
    let pwd = $('#pwd').val();

    let params = `uname=${uname}&pwd=${pwd}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3000/post');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    xhr.onload = () => {
        console.log(xhr.responseText);
    }
})
```

```js
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));

// express 解析POST参数务必注意引入和设置参数过滤
app.post('/post', (req, res) => {
    res.send(req.body);
});
```

:::



### 请求参数格式

application/x-www-form-urlencoded

```
 uname=zs&pwd=123
```

application/json

```
{uname : 'zs', pwd : 123}
```



在请求头中指定 Content-Type 属性的值是 application/json，告诉服务器端当前请求参数的格式是 json，尽管如此我们仍然不能直接传递 json 对象给服务器端，而是将 json 对象转换为json字符串再进行传递。

```js
JSON.stringify() // 将json对象转换为json字符串
```

注意：get 请求是不能提交 json 对象数据格式的，传统网站的表单提交也是不支持 json 对象数据格式的。



而在服务器端，想要接收 json 字符串则需要进行相应设置

```js
app.use(bodyParser.json());
```





**实例**

::: details

```js
const xhr = new XMLHttpRequest();
xhr.open('post','http://localhost:3000/json');
xhr.setRequestHeader('Content-Type', 'application/json');

let obj = {
    uname : 'zs',
    pwd : 123,
}

xhr.send(JSON.stringify(obj));
xhr.onload = () => {
    console.log(xhr.responseText);
}
```

```js
app.use(bodyParser.json());

app.post('/json', (req, res) => {
    res.send(req.body);
});
```

:::



### 服务器端响应

获取服务器端响应的另一种方式，已过时

**Ajax 状态码**

在创建ajax对象，配置ajax对象，发送请求，以及接收完服务器端响应数据，这个过程中的每一个步骤都会对应一个数值，这个数值就是ajax状态码。

```
0: 请求未初始化(还没有调用open())
1: 请求已经建立，但是还没有发送(还没有调用send())
2: 请求已经发送
3: 请求正在处理中，通常响应中已经有部分数据可以用了
4: 响应已经完成，可以获取并使用服务器的响应了
```



**获取 Ajax 状态码**

```js
xhr.readyState
```



**`onreadystatechange` 事件**

```js
xhr.onreadystatechange = () => {}; 
```

当 Ajax 状态码发生变化时将自动触发该事件。

在事件处理函数中可以获取 Ajax 状态码并对其进行判断，当状态码为 4 时就可以通过 xhr.responseText 获取服务器端的响应数据了。



**实例**

::: details

```js
const xhr = new XMLHttpRequest();
console.log(xhr.readyState);    
// 0 已创建 ajax 对象，但未配置

xhr.open('get','http://localhost:3000/state');
console.log(xhr.readyState);    
// 1 已配置 ajax 对象，但未发送

// 监控 xhr 状态码改变
xhr.onreadystatechange = () => {
    console.log(xhr.readyState);     
    // 2 请求已发送
    // 3 已接收到部分服务器端数据
    // 4 服务器端响应数据接收完成
    if(xhr.readyState == 4) {
        console.log(xhr.responseText);
    }
}

xhr.send();
```

```js
app.get('/state', (req, res) => {
    res.send('hello');
})
```

:::



**两种获取服务器端响应方式的区别**

| 区别描述               | onload | onreadystatechange |
| ---------------------- | ------ | ------------------ |
| 是否兼容IE低版本       | 不兼容 | 兼容               |
| 是否需要判断Ajax状态码 | 不需要 | 需要               |
| 被调用次数             | 一次   | 多次               |





### Ajax 错误处理

1. 网络畅通，服务器端能接收到请求，服务器端返回的结果不是预期结果。

可以判断服务器端返回的状态码，分别进行处理。xhr.status 获取http状态码

```js
xhr.onload = () => {
    console.log(xhr.status);
    console.log(xhr.responseText);
    if(xhr.status == 400) {
        alert('some erro');
    }
}
```



2. 网络畅通，服务器端没有接收到请求，返回404状态码。

检查请求地址是否错误。

```js
xhr.onload = () => {
    console.log(xhr.status);
    console.log(xhr.responseText);
    if(xhr.status == 404) {
        alert('not found');
    }
}
```



3. 网络畅通，服务器端能接收到请求，服务器端返回500状态码。

服务器端错误，找后端程序员进行沟通。





4. 网络中断，请求无法发送到服务器端。

会触发xhr对象下面的 onerror 事件，在 onerror 事件处理函数中对错误进行处理。注意，不再执行 onload 事件

```js
xhr.onerror = () => {
    alert('脱机!!!')
};
```



### IE 低版本缓存问题

在低版本的 IE 浏览器中，Ajax 请求有严重的缓存问题，即在请求地址不发生变化的情况下，只有第一次请求会真正发送到服务器端，后续的请求都会从浏览器的缓存中获取结果。即使服务器端的数据更新了，客户端依然拿到的是缓存中的旧数据。



解决方案：在请求地址的后面加请求参数，保证每一次请求中的请求参数的值不相同。 

```js
xhr.open('get', 'http://www.example.com?t=' + Math.random());
```



## Ajax 异步



### 同异步概述

同步：上一行代码执行完成后，才能执行下一行代码，即代码逐行执行。

异步：异步代码虽然需要花费时间去执行，但程序不会等待异步代码执行完成后再继续执行后续代码，而是直接执行后续代码，当后续代码执行完成后再回头看异步代码是否返回结果，如果已有返回结果，再调用事先准备好的回调函数处理异步代码执行的结果。



Ajax 便是典型的异步代码

```js
const xhr = new XMLHttpRequest();
xhr.open('get','http://localhost:3000/first');
xhr.send();
xhr.onload = () => {
    console.log('2');
    console.log(xhr.responseText);
}
console.log('1');

// 1
// 2
// Hello Ajax
```





## Ajax 封装

通过上面的代码，不难发现，发送一次请求代码过多，发送多次请求代码冗余且重复。



这是我们便需要将 Ajax 进行函数封装，方便调用

```js
ajax({ 
     type: 'get',
     url: 'http://www.example.com',
     success: function (data) { 
         console.log(data);
     }
 })
```





**完整封装代码**

```js
function ajax(options) {
    const defaults = {
        type : 'get',
        url : '',
        data: '',
        header: {'Content-Type' : 'application/x-www-form-urlencoded'},
        succrss: ()=>{},
        error: ()=>{},
    }

    Object.assign(defaults, options);
    let {type, url, data, header, success, error} = defaults;
    
    const xhr = new XMLHttpRequest();
    
    
    let params = (() => {
        let tmp = '';
        for( var attr in data) {
            tmp += `${attr}=${data[attr]}&`;
        }
        tmp = tmp.substr(0, tmp.length - 1);
        return tmp;
    })();
    


    if(type == 'post'){
        let contentType = header['Content-Type'];
        xhr.open(type, url);
        xhr.setRequestHeader('Content-Type', contentType);
        if(contentType == 'application/json'){
            xhr.send(JSON.stringify(data))
        }else{
            xhr.send(params);
        }
    }else if(type == 'get'){
        url = `${url}?${params}`;
        xhr.open(type, url);
        xhr.send();
    }

    

    xhr.onload = () => {
        let contentType = xhr.getResponseHeader('Content-Type');
        if(xhr.status == 200) {
            if(contentType.includes('application/json')){
                success(JSON.parse(xhr.responseText), xhr);
            }else{
                success(xhr.responseText, xhr);
            }          
        }else {
            if(contentType.includes('application/json')){
                error(JSON.parse(xhr.responseText), xhr);
            }else{
                error(xhr.responseText, xhr);
            } 
        }
        
    }
}
```











































