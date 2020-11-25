---
title: Ajax 编程扩展（一）
date: 2020-08-27
sidebar: false
categories:
 - FrontEnd
 - BackEnd
tags:
 - Ajax
 - Node.js
publish: true
---



- Ajax应用模板引擎 

- FormData 对象
- 同源政策
- JSONP 解决方案
- CORS 跨域资源访问

<!-- more -->

## 模板引擎

作用：使用模板引擎提供的模板语法，可以将数据和 HTML 拼接起来。



**下载**

[art-template](https://aui.github.io/art-template/zh-cn/docs/installation.html) 



**在 HTML 中引入**

```html
<script src="./js/template-web.js"></script>
```



**准备 art-template 模板**

```html
<script id="tpl" type"text/html">
    <div class="box"></div>
</script>
```



**数据注入**

```js
var html = template('tpl', {uname:'zs', age: 20});
```



**插入页面**

```js
document.getElementById('container').innerHTML = html;
```



**数据拼接**

```html
<script id="tpl" type="text/html">
	<div class="box"> {{ username }} </div>
</script>
```





**完整实例**

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script src="/js/template-web.js"></script>

</head>
<body> 
    <div id="container"></div>
</body>
<script type="text/html" id='tpl'>
    <h1>{{uname}} {{pwd}}</h1>
</script>
<script>
    let html = template('tpl', {uname:'zs',pwd:123});
    $('#container').append(html);
</script>
</html>
```

:::



## 案例 



### 验证邮箱地址唯一性



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200827131350.png)



1. 获取文本框并为其添加离开焦点事件

2. 离开焦点时，检测用户输入的邮箱地址是否符合规则

3. 如果不符合规则，阻止程序向下执行并给出提示信息

4. 向服务器端发送请求，检测邮箱地址是否被别人注册

5. 根据服务器端返回值决定客户端显示何种提示信息

邮箱验证正则表达式

```
/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
```





**完整源码**

ajax 完整封装，后面的案例都将引用该方法

::: details

```js
// ajax.js
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

// 调用示例
// ajax({
//     type : 'post',
//     url : 'http://localhost:3000/first',
//     data : {
//         uname : 'zs',
//         pwd : 123
//     },
//     success : (data, xhr) => {
//         console.log(data);
//     }
// });
```

:::



网站服务器响应，模拟数据库查询，后续案例将只书写关键部分

::: details

```js
// app.js 模拟数据库查询
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/verifyEmailAdress', (req, res) => {
	// 接收客户端传递过来的邮箱地址
	const {email} = req.query;
	// 判断邮箱地址注册过的情况
	if (email == '123@qq.com') {
		// 设置http状态码并对客户端做出响应
		res.status(400).send({message: '邮箱地址已经注册过了, 请更换其他邮箱地址'});
	} else {
		// 邮箱地址可用的情况
		// 对客户端做出响应
		res.send({message: '恭喜, 邮箱地址可用'});
	} 
});


app.listen(3000);
console.log('服务器监听：http://localhost:3000');
```

:::



完整html实现源码，后续将只给出关键代码

::: details

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script src="/js/template-web.js"></script>
    <script src="/js/ajax.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="form-group col-md-4 col-md-offset-4">
                <label for="email">邮箱地址</label>
                <input type="email" class="form-control" id="email" placeholder="Email">
                <p id="info"></p>
            </div>
        </div>
    </div>
</body>
<style>
    p:not(:empty) {
        margin-top: 10px;
        padding: 10px;
    }
</style>
<script>
    let email_input = $('#email');
    let info = $('#info');

    email_input.on('blur', function() {
        let email = $(this).val();
        let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

        if(!reg.test(email)){
            info.addClass('bg-warning');
            info.html(`请填写正确的邮箱格式`);
            return;
        }

        ajax({
            type: 'get',
            url : 'http://localhost:3000/verifyEmailAdress',
            data: {
                email : email
            },
            success: (result) => {
                console.log(result);
                info.html(result.message);
                info[0].className = 'bg-success';
            },
            error: (result) => {
                console.log(result);
                console.log(typeof result);
                info.html(result.message);
                info[0].className = 'bg-danger';
            }
        });
    })
</script>
</html>
```

:::





### 搜索框内容自动提示



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200827131457.png)



1. 获取搜索框并为其添加用户输入事件

2. 获取用户输入的关键字

3. 向服务器端发送请求并携带关键字作为请求参数

4. 将响应数据显示在搜索框底部



**源码**

服务器端数据库查询模拟

::: details

```js
// 输入框文字提示
app.get('/searchAutoPrompt', (req, res) => {
	// 搜索关键字
	const {key} = req.query;
	// 提示文字列表
	const list = [
		'黑马程序员',
		'黑马程序员官网',
		'黑马程序员顺义校区',
		'黑马程序员学院报名系统',
		'传智播客',
		'传智博客前端与移动端开发',
		'传智播客大数据',
		'传智播客python',
		'传智播客java',
		'传智播客c++',
		'传智播客怎么样'
	];
	// 搜索结果
	let result = list.filter(item => item.includes(key));
	// 将查询结果返回给客户端
	res.send(result);
});
```

:::



实现

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script src="/js/template-web.js"></script>
    <script src="/js/ajax.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="form-group col-md-4 col-md-offset-4">
                <input type="text" class="form-control" placeholder="请输入搜索关键字" id="search">
                <ul class="list-group" id="list-box">

                </ul>
            </div>
        </div>
    </div>
</body>
<style>
    .container {
        padding-top: 150px;
    }
    .list-group {
        display: none;
    }
</style>
<script src="/js/template-web.js"></script>
<script type='text/html' id='tpl'>
    {{each result}}
        <li class="list-group-item">{{$value}}</li>
    {{/each}}
</script>
<script>
    let searchInput = $('#search');
    let listBox = $('#list-box');
    let timer = null;
    searchInput.on('input', function() {
        clearTimeout(timer);
        let key = searchInput.val();
        if(!key.trim().length) {
            listBox.hide();
            return;
        }
        timer = setTimeout(() => {
            ajax({
                type : 'get',
                url : 'http://localhost:3000/searchAutoPrompt',
                data : {
                    key : key
                },
                success: (result) => {
                    let suggest = template('tpl',{result:result});
                    listBox.empty().append(suggest).show();
                }
            })
        }, 800);

    })
</script>
</html>
```

:::





### 省市区三级联动



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200827131640.png)



1. 通过接口获取省份信息

2. 使用JavaScript获取到省市区下拉框元素

3. 将服务器端返回的省份信息显示在下拉框中

4. 为下拉框元素添加表单值改变事件（onchange）

5. 当用户选择省份时，根据省份id获取城市信息

6. 当用户选择城市时，根据城市id获取县城信息



**关键源码**

::: details

```js
    let province = $('#province');
    let city = $('#city');
    let area = $('#area');

    ajax({
        type:'get',
        url : 'http://localhost:3000/province',
        success : (data) => {
            let provinceItem = template('provinceTpl', {province:data});
            province.append(provinceItem);
        }
    })

    province.on('change', function(){
        let pid = this.value;
        ajax({
            type: 'get',
            url : 'http://localhost:3000/cities',
            data: {
                id : pid
            },
            success:(data) => {
                let citiesItem = template('cityTpl', {cities:data});
                city.append(citiesItem);
            }
        })
    });

    city.on('change', function(){
        let cid = this.value;
        ajax({
            type: 'get',
            url : 'http://localhost:3000/areas',
            data: {
                id : cid
            },
            success:(data) => {
                let areasItem = template('areaTpl', {areas:data});
                area.append(areasItem);
            }
        })
    });
```

:::





## FormData



### FormData 作用

1. 模拟HTML表单，相当于将HTML表单映射成表单对象，自动将表单对象中的数据拼接成请求参数的格式。
2. 异步上传二进制文件（图片，音频）





### FormData 使用

1. 准备 HTML 表单

```html
<form id="form">
    <input type="text" name="username" />
    <input type="password" name="password" />
    <input type="button"/>
</form>
```

2. 将 HTML 表单转化为 formData 对象

```js
var form = document.getElementById('form'); 
var formData = new FormData(form);
```

3. 提交表单对象（仅 POST 请求）

```js
xhr.send(formData);
```



**注意：**

1. Formdata 对象不能用于 get 请求，因为对象需要被传递到 send 方法中，而 get 请求方式的请求参数只能放在请求地址的后面。

2. 服务器端 bodyParser 模块不能解析 formData 对象表单数据，我们需要使用 formidable 模块进行解析。







### FormData 方法

获取表单对象属性值

```js
formData.get('key');
```



设置表单对象中属性值

```js
formData.set('key', 'value');
```

- 不存在，创建
- 存在，覆盖原有值

删除表单对象中属性值

```js
formData.delete('key');
```



追加表单对象中的属性值

```js
formData.append('key', 'value');
```



注意：set 方法与 append 方法的区别是，在属性名已存在的情况下，set 会覆盖已有键名的值，append会保留两个值。





### FormData 二进制文件上传

```html
<input type="file" id="file"/>
```



```js
var file = document.getElementById('file')
// 当用户选择文件的时候
file.onchange = function () {
    // 创建空表单对象
    var formData = new FormData();
    // 将用户选择的二进制文件追加到表单对象中
    formData.append('attrName', this.files[0]);
    // 配置ajax对象，请求方式必须为post
    xhr.open('post', '/file');
    xhr.send(formData);
}
```



### FormData 文件上传进度提示

```js
// 当用户选择文件的时候
file.onchange = function () {
    // 文件上传过程中持续触发onprogress事件
    xhr.upload.onprogress = function (ev) {
        // 当前上传文件大小/文件总大小 再将结果转换为百分数
        // 将结果赋值给进度条的宽度属性 
        bar.style.width = (ev.loaded / ev.total) * 100 + '%';
    }
}
```





### FormData 文件上传图片即时预览

在我们将图片上传到服务器端以后，服务器端通常都会将图片地址做为响应数据传递到客户端，客户端可以从响应数据中获取图片地址，然后将图片再显示在页面中。





### 文件上传完整源码

**完成图**

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200827131058.png)



**app.js**

::: details

```js
const formidable = require('formidable');

app.post('/upload', (req, res) => {
	let form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname, 'public', 'uploads');
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		res.send({
			path : files.fileName.path.split('public')[1]
		});
	});
})
```

:::



**index.html**

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script src="/js/template-web.js"></script>
    <script src="/js/ajax.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="form-group col-md-4 col-md-offset-4">
                <label for="file">请选择文件</label>
                <input type="file" name="file" id="file_input">
                <br>
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <br>
                <div class="padding preimg-wrp">
                    
                </div>
            </div>
        </div>
    </div>
</body>
<style>
    .container {
        padding-top: 150px;
    }
</style>
<script>
    let file = $('#file_input');
    let progress_bar = $('.progress-bar');
    let preimg_wrp = $('.preimg-wrp');

    file.on('change', function() {
        let formData = new FormData();
        formData.append('fileName', this.files[0]);
        let xhr = new XMLHttpRequest();
        xhr.open('post', '/upload');
        xhr.upload.onprogress = (ev) => {
            let progress = Math.trunc((ev.loaded/ev.total) * 100) + '%';
            progress_bar.text(progress).css('width',progress);
        };
        xhr.send(formData);
        xhr.onload = () => {
            let result = JSON.parse(xhr.responseText);
            let preimg = $(`<img src="${result.path}" class="img-rounded img-responsive">`);
            preimg_wrp.append(preimg);
        };
    });
</script>
</html>
```

:::





## 同源政策



### Ajax 请求限制

Ajax 只能向自己的服务器发送请求。比如现在有一个A网站、有一个B网站，A网站中的 HTML 文件只能向A网站服务器中发送 Ajax 请求，B网站中的 HTML 文件只能向 B 网站中发送 Ajax 请求，但是 A 网站是不能向 B 网站发送 Ajax请求的，同理，B 网站也不能向 A 网站发送 Ajax请求。





### 什么是同源

如果两个页面拥有相同的协议、域名和端口，那么这两个页面就属于同一个源，其中只要有一个不相同，就是不同源。

```
http://www.example.com/dir/page.html 目标页面

http://www.example.com/dir2/other.html：同源
http://example.com/dir/other.html：不同源（域名不同）
http://v2.www.example.com/dir/other.html：不同源（域名不同）
http://www.example.com:81/dir/other.html：不同源（端口不同）
https://www.example.com/dir/page.html：不同源（协议不同）
```



### 同源政策的目的

同源政策是为了保证用户信息的安全，防止恶意的网站窃取数据。最初的同源政策是指 A 网站在客户端设置的 Cookie，B网站是不能访问的。



随着互联网的发展，同源政策也越来越严格，在不同源的情况下，其中有一项规定就是无法向非同源地址发送Ajax 请求，如果请求，浏览器就会报错。





## JSONP

jsonp 是 json with padding 的缩写，它不属于 Ajax 请求，但它可以模拟 Ajax 请求。



1. 将不同源的服务器端请求地址写在 script 标签的 src 属性中

```html
<script src="www.example.com"></script>
```

2. 服务器端响应数据必须是一个函数的调用，真正要发送给客户端的数据需要作为函数调用的参数。

```js
const data = 'fn({name: "张三", age: "20"})';
res.send(data);
```

3. 在客户端全局作用域下定义函数 fn

```js
function fn (data) { }
```

4. 在 fn 函数内部对服务器端返回的数据进行处理

```js
function fn (data) { console.log(data); }
```



### JSONP 代码优化

---

1. 客户端需要将函数名称通过请求参数传递到服务器端。

```html
<button type="button" class="btn btn-primary">Send s2</button>
<script>
    function showName(data){
        console.log(data.name);
    };
</script>
<script>
    let btn = $('button');
    btn.on('click', function() {
        let scp = document.createElement('script');
        scp.src = 'http://localhost:3001/test?callback=showName';
        document.body.appendChild(scp);
        scp.onload = function(){
            document.body.removeChild(scp)
        };
    });
</script>
```

```js
// 服务器端接收参数获取到函数名
app.get('/test', (req, res) => {
    const {callback:fnName} = req.query;
    const result = fnName + '({name:"lisi"})';
    res.end(result);
});
```

2. 将 script 请求的发送变成动态请求。

3. 封装 jsonp 函数，方便请求发送。

```js
function jsonp({url, data, success}) {
    let script = document.createElement('script');

    let params = '';
    if(data) {
        for(var attr in data) {
            params += `&${attr}=${data[attr]}`;
        }
    }

    let fnName = 'myJsonp' + Math.random().toString().replace('.', '');
    window[fnName] = success;

    script.src = `${url}?callback=${fnName}${params||''}`;
    document.body.appendChild(script);
    script.onload = function(){
        document.body.removeChild(this);
        delete window[fnName];
    }
}

// 调用示例
btn.on('click', function() {
    jsonp({
        url: 'http://localhost:3001/test',
        data : {
            name : 'wangwu'
        },
        success : function(data) {
            console.log(data);
        },
    });
});
```



4. 服务器端代码优化之 res.jsonp 方法。

```js
app.get('/test', (req, res) => {
    // const {callback:fnName} = req.query;
    // const data = JSON.stringify({name:'张三'});
    // const result = `${fnName}(${data})`;
    // res.end(result);

    res.jsonp({name:'张三'});
});
```





### 案例：腾讯天气 JSONP

访问腾讯天气[官网](https://tianqi.qq.com/) 

通过开发者工具抓取请求 `common?source=pc...` ，在新选项卡打开，不难发现其返回的是一个函数，函数的参数为对象，其存储了天气信息，且腾讯天气的域名和该请求的域名不同源，是典型的 JSONP 的应用。



腾讯天气抓包

![image-20200827152014739](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200827152014739.png)



请求返回数据

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200827152116.png)



**腾讯天气的接口文档**

- 请求地址

```
https://wis.qq.com/weather/common
```

- 请求方式
  - GET   支持 jsonp
- 参数

| 参数名       | 必选 | 类型   | 说明                                                   |
| ------------ | ---- | ------ | ------------------------------------------------------ |
| source       | y    | string | `pc`  `xw`                                             |
| weather_type | y    | string | `forecast_1h` ：未来48小时 <br>`forcast_24h` ：未来7天 |
| province     | y    | string | 省份                                                   |
| city         | y    | string | 城市                                                   |

- 返回值

```json
{
    "data": {
        "alarm": {},
        "forecast_1h": {
            "0": {
                    "degree": "33", // 温度
                    "update_time": "20200827150000",// 时间
                    "weather": "雷阵雨", // 天气
                    "weather_code": "04",
                    "weather_short": "雷阵雨", // 天气简写
                    "wind_direction": "东风", // 风向
                    "wind_power": "5"	// 风力
            },
            "1": {
                "degree": "33",
                    "update_time": "20200827150000",
                    "weather": "雷阵雨",
                    "weather_code": "04",
                    "weather_short": "雷阵雨",
                    "wind_direction": "东风",
                    "wind_power": "5"
            }
        },
        "forecast_24h": {},
        "index": {},
        "limit": {},
        "observe": {},
        "rise": {},
        "tips": {}
    },
    "message": "OK",
    "status": 200
}
```





**完整源码**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="row" style="margin-top:80px">
            <div class="col-md-8 col-md-offset-2">
                <table class="table table-striped table-hover" align="center">
                    <thead>
                        <tr>
                            <th>时间</th>
                            <th>温度</th>
                            <th>天气</th>
                            <th>风向</th>
                            <th>风力</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
<script src="/js/jsonp.js"></script>
<script src="/js/template-web.js"></script>
<script type="text/html" id='tpl'>
    {{each info}}
    <tr>
        <td>{{dateFormat($value.update_time)}}</td>
        <td>{{$value.degree}}</td>
        <td>{{$value.weather}}</td>
        <td>{{$value.wind_direction}}</td>
        <td>{{$value.wind_power}}</td>
    </tr>
    {{/each}}
</script>
<script>
    var tb = $('.table > tbody');

    template.defaults.imports.dateFormat = (date) => {
        let year = date.substr(0,4); 
        let mouth = date.substr(4,2); 
        let day = date.substr(6,2); 
        let hour = date.substr(8,2);
        let minute = date.substr(10,2);
        let second = date.substr(12,2);

        return `${mouth}月${day}日  ${hour}时${minute}分`;
    }


    jsonp({
        url : 'https://wis.qq.com/weather/common',
        data : {
            source : 'pc',
            weather_type : 'forecast_1h',
            province : '浙江省',
            city : '金华市',
        },
        success : function(data) {
            let html = template('tpl', {info:data.data.forecast_1h});
            tb.append(html);
        }
    });
</script>
</html>
```

```js
// jsonp.js
function jsonp({url, data, success}) {
    let script = document.createElement('script');

    let params = '';
    if(data) {
        for(var attr in data) {
            params += `&${attr}=${data[attr]}`;
        }
    }

    let fnName = 'myJsonp' + Math.random().toString().replace('.', '');
    window[fnName] = success;

    script.src = `${url}?callback=${fnName}${params||''}`;
    document.body.appendChild(script);
    script.onload = function(){
        document.body.removeChild(this);
        delete window[fnName];
    }
}
```





## CORS 跨域资源共享

CORS：全称为 Cross-origin resource sharing，即跨域资源共享，它允许浏览器向跨域服务器发送 Ajax 请求，克服了 Ajax 只能同源使用的限制。



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200827162921.png)



```js
Access-Control-Allow-Origin: 'http://localhost:3000'
Access-Control-Allow-Origin: '*'
```



**实例**

```js
// 对于 /cross 下的所有访问都允许跨域
app.use('/cross', (req, res, next) => {
    // 允许访问的客户端
    res.header('Access-Control-Allow-Origin','*');
    // 允许客户端的访问方法
    res.header('Access-Control-Allow-Methods', 'get,post');
    next();
});
```



## 服务器端代理跨域

同源政策是浏览器给予Ajax技术的限制，服务器端是不存在同源政策限制。



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200827164647.png)



```js
const request = require('request');

app.get('/mis', (req, res) => {
    request('http://localhost:3001/cross', (body) => {
        res.send(body);
    })
});
```







**withCredentials属性**

在使用Ajax技术发送跨域请求时，默认情况下不会在请求中携带cookie信息。

`withCredentials` ：指定在涉及到跨域请求时，是否携带cookie信息，默认值为 false

`Access-Control-Allow-Credentials` ：true 允许客户端发送请求时携带cookie





注意：如果允许携带 cookie 时，不能将`Access-Control-Allow-Origin` 设置为 * ，必须是具体的域名。





