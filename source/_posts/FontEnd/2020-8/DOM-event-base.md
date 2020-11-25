---
title: DOM 事件基础
date: 2020-08-07
categories:
 - FrontEnd
tags:
 - DOM
publish: true
---


文档对象模型 （Document Object Model) ，是 W3C 组织推荐的 HTML 或 XML 的标准编程接口。 即我们常说的 DOM树。

<!-- more -->

# DOM

## 1. DOM 简介

文档对象模型 （Document Object Model) ，是 W3C 组织推荐的 HTML 或 XML 的标准编程接口。

W3C 已经定义了一系列的 DOM 接口，通过这些 DOM 接口可以改变网页的内容，结构和样式。









## 2. DOM 树

![image-20200807163629695](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200807163629695.png)





- 文档：一个页面就是一个文档，DOM 中使用 document 表示
- 元素：页面中的所有标签都是元素，DOM 中使用 element 表示
- 节点：网页中所有的内容都是节点（标签，属性，文本，注释等），DOM 中使用 node 表示





## 3. DOM 操作



### 3.1 获取元素

#### 3.1.1 获取页面元素

因为所有元素都是在 document 下的，通过 document 对象进行获取 document.function()



- 根据 ID 获取

  `getElementById()`

  返回 object





- 根据标签名获取

  `getElementByTagName()`

  以 object 数组形式返回

  `element.getElementByTagName()`

  获取元素中的所有标签





- 通过 HTML5 新增方法获取

  `getElementByClassName()`

  根据类名获取 object 数组

  `querySelector('./#选择器')`

  返回指定选择器的第一个元素对象

  `querySelectAll('./#选择器')`

  返回指定选择器的所有元素对象





- 特殊元素获取

  获取 body 标签

  `document.body`

  获取 html 标签

  `document.documentElement`

  



>console.dir(object) 能打印出当前对象的所有属性和方法





### 3.2 事件基础

#### 3.2.1 事件概述

JavaScript 使我们有能力创建动态页面，而事件是可以被 JavaScript 侦测到的行为。

网页中的每个元素都可以产生某些触发 javaScript 的事件。



事件源：事件被触发的对象

事件类型：如何触发 如鼠标触摸，鼠标点击等

事件处理程序：函数



```javascript
document.getElementById(btn).onclick = function() {
    alert('click btn');
}
```



>使用事件三要素对网页效果进行分析能很迅速明了的了解网页实现方式



#### 3.2.2 执行事件步骤

1. 获取事件源
2. 注册事件
3. 添加事件处理函数

```javascript
var btn = document.getElementById(btn);
btn.onclick = function() {
    alert('click btn');
}
```





### 3.3 操作元素

javascript 的 DOM 操作可以改变网页内容，结构样式，我们可以利用 DOM 操作元素来改变元素的内容，属性等。



#### 3.3.1 改变元素内容

```javascript
element.innerText
```

从起始位置到终止位置的内容，但它去除 html 标签，同时空格和换行也会去掉

```javascript
element.innerHTML
```

起始位置到终止位置全部内容，保留 html 标签，编译 html



#### 3.3.2 操作元素属性

哪些是属性 src style id alt title 等等，即除了标签之外，标签内包含的代码。

```javascript
element.attr
// 通过赋值操作修改属性值
// element.src = "xxxx"
// element.style = "color = bule"

element.getAttribute('attrname','newattrvalue')  // 自定义属性值修改

```



#### 3.3.3 获取元素属性

```js
element.attr // 标准属性
element.getAttribute('attr')  // 自定义属性
```



#### 3.3.4 移除元素属性

```js
element.attr = ''
element.removeAttribute('attr')
```







#### 3.3.5 表单元素操作

不同于其它元素，操作表单元素有些许不同

```javascript
formElement.value // 获取内容或设置内容
checkBox.checked = true
button.disabled = true
```





#### 案例：分时问候

需求：根据不同的时间在页面上显示不同的问候语

实现思路：

- 获取系统时间，和页面展示元素
- 添加事件，判断时间，不同的时间修改不同的元素内容



```html
<h1></h1>

<script>
    var h = document.querySelector('h1');
    var date = new Date().getHours();
    console.log(date);
    var str = '';
    if( 18 <= date <= 24 || 0 <= date < 6) {
        str = "晚上好";
    } else if( 6 <= date <= 9) {
        str = "早上好";
    } else if( 9  < date <12) {
        str = "上午好";
    } else if( 12 < date < 14) {
        str = "中午好"
    } else {
        str = "下午好"
    }
    h.innerHTML = str;
</script>
```







#### 案例：显示密码

需求：用户在填写密码表单时，提供一个按钮，用户点击按钮可以显示密码和关闭显示密码

实现思路：

- 为按钮添加事件，修改表单的 type 属性
- 设置变量 flag 判断按钮状态

```html
<div style="text-align: center; margin-top: 300px;">
    请输入密码:<input type="password"> <button>显示</button>
</div>

<script>
    var input = document.querySelector('input');
    var btn = document.querySelector('button');
    var flag = false;
    btn.onclick = function() {
        if(flag) {
            btn.innerHTML = '显示';
            input.type = 'password';
            flag = false;
        } else {
            btn.innerHTML = '关闭';
            input.type = 'text';
            flag = true;
        }
    }
</script>
```



> 通过这个方法能迅速窃取别人的密码，现在的浏览器都有自动填充功能，一但有人通过页面元素修改 input 的 type 属性，自动填充的密码很容易就会暴露给别人。



### 3.4 操作样式

#### 3.4.1 操作 style 修改样式

我们可以通过 js 修改元素的样式 style

```javascript
element.style.backgroundColor = 'blue';
element.style.width = '200px';
```





#### 3.4.2 操作 class 修改样式

当需要大量改变元素的样式时，我们可以新增 class ，通过操作元素 class 属性添加 classname。

```javascript
element.className = 'classname'
element.className = 'saveclassnameold addclassnamenew'
```





#### 3.4.3 排他思想

应用场景：当出现一组组件，触摸其中一个组件更改样式，其余其他组件恢复原来样式。

实现思路：

- 通过两组 for 循环遍历组件
- 第一次循环恢复所有组件样式
- 第二次循环为组件添加事件改变样式

```html
<div style="text-align: center; margin-top: 200px;">
    <button>按钮1</button>
    <button>按钮2</button>
    <button>按钮3</button>
    <button>按钮4</button>
    <button>按钮5</button>
    <button>按钮6</button>
</div>

<script>
    var btns = document.querySelectorAll('button');
    for(var i = 0; i < btns.length; i++) {
        btns[i].onclick = function() {
            for(var i = 0; i < btns.length; i++) {
                btns[i].style.backgroundColor = '';
            }
            this.style.backgroundColor = 'dodgerblue';
        }
    }
</script>
```





#### 3.4.4 H5 自定义属性

自定义属性的目的：未您保存并使用数据。有些数据可以保存到页面中而不用保存到数据库中。

自定义属性通过 `getAttribute('name')` 来获取

但是有些属性很难判断是数据标准属性还是自定义属性，容易引起歧义

所以 H5 规定了自定义属性语法

```html
data-attr = ''; // 自定义属性命名规范 data-xxx
```

H5 新增 `element.dataset.attr` 或者 `element.dataset['attr']`

```js
data-list-name = 'xx'
// 获取此类自定义属性时需要使用驼峰命名法
element.dataset.listName
element.dataset['listName']
```



#### 案例：点击隐藏图片

需求: 用户点击按钮,隐藏一张图片

实现思路:

- 为 button 添加事件,修改图片 div 的 display 属性



```javascript
<div style="width: 400px;height: 200px;border: solid 1px dodgerblue;">
    我是图片
    <button>close</button>
</div>

<script>
    var img = document.querySelector('div');
    var btn = document.querySelector('button');
    btn.onclick = function() {
        img.style.display = 'none';
    }
</script>
```



#### 案例：循环图片表

应用场景：在某些页面需要大量规律插入图片时

优雅的做法应该是通过 js 动态操作图片文件名，图片文件名的命名应该有规律，便于 js 循环，这样通过循环为列表添加不同图片。

```js
imagelist = document.querySelector('li');
for(var i = 0; i < imagelist.length ; i++){
    this.style.backgroundImage = 'image' + i + '.png';
}
```





#### 案例：显隐文本框内容

需求：

- 当用户点击输入框时，不显示输入框的内容，失去焦点时，展示回来原本建议。
- 但是当用户输入文本再失去焦点时要展示用户输入，没有输入时重新显示原本的建议。
- 此外当用户输入时，颜色加深，失去焦点时颜色变浅。

实现思路：

- 获得焦点 onfocus 失去焦点 onblur
- 为两个事件添加判断文本框的 value 属性
- 为两个事件修改文本框 style.color 属性



```javascript
<div style="text-align: center; margin-top: 200px;">
    <input type="text" value="热门建议""><button>搜索</button>
</div>

<script>
    var input = document.querySelector('input');
    input.onfocus = function() {
        if(this.value == '热门建议') {
            this.value = '';
        }
        this.style.color = '#333333'
    }
    input.onblur = function() {
        if(this.value == '') {
            this.value = '热门建议';
        }
        this.style.color = '#999999'
    }
</script>
```





#### 案例：输入提示

需求：

- 当输入框失去焦点，展示提示信息
- 当用户输入错误，显示错误提示信息
- 当用户输入正确，显示正确提示



实现思路：

- 为输入框添加获取焦点事件 onfocus 并显示展示信息
- 输入监控，判断输入，展示相应提示



```javascript
<div style="text-align: center; margin-top: 200px;">
    <input type="text"><p style="display: inline-block; margin-left: 30px;">请输入密码</p>
</div>

<script>
    var input = document.querySelector('input');
    var msg = document.querySelector('p');
    input.onblur = function() {
        if(this.value.length < 6 ) {
            msg.innerHTML = '输入过短';
            msg.style.backgroundColor = 'red';
        } else if(this.value.length > 12 ) {
            msg.innerHTML = '输入过长';
            msg.style.backgroundColor = 'red';
        } else {
            msg.innerHTML = '输入正确';
            msg.style.backgroundColor = 'dodgerblue';
        }
    }
</script>
```







#### 案例：百度换肤

需求：用户从图片组点击图片时，更换页面背景为点击图片。

实现思路：

- 为图片组注册事件
- 添加事件函数修改页面背景
- 传递点击图片的 src 给页面 bg

```javascript
<body style="background: url(./01.jpg) no-repeat center top;">

<ul style="display: block;list-style-type: none;">
    <li style="float: left;"><img style="border: solid 2px dodgerblue;" width="140px" src="./01.jpg"></li>
    <li style="float: left;"><img width="140px" src="./02.jpg"></li>
    <li style="float: left;"><img width="140px" src="./03.jpg"></li>
    <li style="float: left;"><img width="140px" src="./04.jpg"></li>
    <li style="float: left;"><img width="140px" src="./05.jpg"></li>
</ul>


<script>
    var lis = document.querySelector('ul').querySelectorAll('img');
    var body = document.querySelector('body');
    for( var i = 0; i < lis.length; i++) {
        lis[i].onclick = function() {
            for( var i = 0; i < lis.length; i++) {
                lis[i].style.border = '';
            }
            this.style.border = 'solid 2px dodgerblue';
            body.style.backgroundImage = 'url('+ this.src +')';
        }
    }
</script>
```



#### 案例：表格触摸反馈

需求：鼠标触摸该行时样式加深

实现思路：

- 为每个 tr 添加鼠标经过事件 onmouseover 和鼠标离开事件 onmouseout，改变样式
- 使用 for 为 td 设置背景样式

```html
<script>
    var trs = document.querySelector('tbody').querySelectorAll('tr');
    for( var i=0; i<trs.length; i++) {
        trs[i].onmouseover = function() {
            this.className = 'highlight'
        }
        trs[i].onmouseout = function() {
            this.className = ''
        }
    }
</script>
```





#### 案例：表单全选取消全选

需求：

- 新增全选案例，点击案例勾选全部项目，取消则取消全选
- 用户手动全选时，全选按钮需要打勾
- 用户手动取消全选时，取消勾选全选按钮

实现思路：

- 为全选按钮添加点击事件，判断选择状态，并用 for 循环设置其余选择的 checked 状态

- 为所有的其余按钮添加事件，在事件中 for 判断所有按钮状态，为全选按钮设置相应状态



```javascript
<script>
    var checkall = document.querySelector('#checkall');
    var items = document.querySelector('tbody').querySelectorAll('input');
    checkall.onclick = function() {
        if(this.checked) {
            for(var i=0;i<items.length;i++) {
                items[i].checked = true;
            };
        } else {
            for(var i=0;i<items.length;i++) {
                items[i].checked = false;
            };
        };
    };

    for(var i=0;i<items.length;i++) {
        items[i].onclick = function() {
            for(var i=0;i<items.length;i++) {
                if(!items[i].checked){
                    checkall.checked = false;
                    return;
                }
                checkall.checked = true;
            };
        }
    }
</script>
```





#### 案例：tab栏切换

需求：

- 当鼠标点击选项卡 tab ,下面的内容跟随变化

实现思路：

- 为每个 tab 标签添加 index 属性，通过 index 确定需要展示的 div

::: details

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .contain {
            margin: 240px auto;
            width: 520px;
            height: 560px;
        }
        .tab {
            width: 520px;
            height: 60px;
            border-bottom: solid 1px dodgerblue;
        }
        .content {
            width: 520px;
            height: 500px;
        }
        .current {
            background-color: dodgerblue;
            color: white;
        }
        .item {
            padding-top: 80px;
            display: none;
        }
        .tab li{
            display: inline-block;
            width: 100px;
            height: 60px;
            text-align: center;
            line-height: 60px;
        }
        .tab ul{
            list-style-type: none;
        }
    </style>
</head>

<body>
    <div class="contain">
        <div class="tab">
            <ul>
                <li class="current">tab01</li>
                <li>tab02</li>
                <li>tab03</li>
                <li>tab04</li>
                <li>tab05</li>
            </ul>
        </div>
        <div class="content">
            <div class="item" style="display: block;">01展示内容</div>
            <div class="item">02展示内容</div>
            <div class="item">03展示内容</div>
            <div class="item">04展示内容</div>
            <div class="item">05展示内容</div>
        </div>
    </div>
<script>
    var tabs = document.querySelector('.tab').querySelectorAll('li');
    var content = document.querySelector('.content').querySelectorAll('.item');
    for(var i=0; i<tabs.length;i++) {
        tabs[i].setAttribute('index',i);
        tabs[i].onclick = function() {
            for(var i=0; i<tabs.length;i++) {
                tabs[i].className = '';
            }
            this.className = 'current';

            var index = this.getAttribute('index');
            for(var i=0; i<content.length;i++) {
                content[i].style.display = 'none';
            }
            content[index].style.display = 'block'
        }
    }
</script>
</body>

</html>
```

:::



### 3.5 节点操作

#### 3.5.1 什么是节点操作

获取元素通常使用两种方式：

1. 利用 DOM 提供的方法获取元素

   - document.getElementById()
   - document.getElementByTagName()
   - document.querySelector()
   - 逻辑性不强，繁琐

   

2. 利用节点层级关系获取元素

   - 利用节点关系获取元素
   - 逻辑性强，兼容性差



#### 3.5.2 节点概述

页面中所有的内容都是节点，在 DOM 中节点使用 node 表示。

HTML DOM 中所有的节点都可以通过 js 访问，所有 HTML 元素节点均可以被修改，也可以被创建或删除。

一般的，节点至少拥有 nodeType （节点类型），nodeName （节点名称），nodeValue（节点值）这三个要素。



- 元素节点 nodeType 为 1
- 属性节点 nodeType 为 2
- 文本节点 nodeType 为 3





#### 3.5.3 节点层级

利用 DOM 树可以把节点划分为不同的层级关系，如复制，兄弟关系。



1. 父级节点

```javascript
node.parentNode
```

2. 子节点

```javascript
node.childNodes

// 这个方法可能会返回文本节点，需要一定处理才能得到元素节点
for(var i = 0; i < node.childNodes.length; i++) {
    if(node.childNodes[i].nodeType == 1){
        // 元素节点
    }
}

node.children
// 这个方法会直接返回子元素节点

node.firstChild
node.lastChild
// 注意返回的文本节点

node.firstElementChild
node.lastElementChile
// 返回第一与最后一个元素节点

// 兼容性解决方案
node.children[index]
node.children[node.children.length - 1]
```

3. 兄弟节点

```javascript
node.previousSibling
node.nextSibling

node.previousElementSibling
node.nextElementSibling

// 兼容性解决方案
function getNextElementSibling(element) {
	var el = elemnet;
	while(el == el.nextSibling) {
		if(el.nodeType == 1){
			return el;
		}
	}
	return null;
}
```



#### 3.5.4 节点操作

```javascript
// 创建节点
document.createElement('tagName')

// 追加节点
node.appendChild(chile)

// 插入节点
node.insertBefore(child,insernode)

// 删除节点
node.removeChild(child)

// 复制节点
node.cloneNode(false/true) 
// false: 浅拷贝 true:深拷贝


```



#### 3.5.5 三种动态创建元素的区别

```javascript
document.write()
// 这种方式会刷新页面，导致重绘

element.innerHTML
//使用数组追加能提高效率 最高效率

document.creatElement()
```





#### 案例：下拉菜单

- 导航栏里的 li 都要有鼠标经过事件，所以需要循环注册事件
- 当鼠标经过 li 显示该 li 下的 ul

```html
<style>
        * {padding: 0;margin: 0;}
        .nav {width: 980px;margin: 0 auto;}
        a {text-decoration: none;color: black;}
        ul li{list-style: none;}
        .nav>li{float: left;width: 15%;text-align: center;margin-top: 10px;}
        .nav>li:hover{background-color: #eee;}
        .nav>li>ul{display: none;border-left: solid 1px;border-right: solid 1px;margin-top: 14px;}
        .nav>li>ul>li{line-height: 40px;border-bottom: 1px solid ;}
        .nav>li>ul>li:hover{background-color: #fecc58;}
    </style>
</head>
<body>
    <ul class="nav">
        <li>
            <a href="">标题一</a>
            <ul>
                <li><a href="">选项一</a></li>
                <li><a href="">选项二</a></li>
                <li><a href="">选项三</a></li>
            </ul>
        </li>
        <li>
            <a href="">标题二</a>
            <ul>
                <li><a href="">选项一</a></li>
                <li><a href="">选项二</a></li>
                <li><a href="">选项三</a></li>
                <li><a href="">选项四</a></li>
            </ul>
        </li>
        <li>
            <a href="">标题三</a>
            <ul>
                <li><a href="">选项一</a></li>
                <li><a href="">选项二</a></li>
            </ul>
        </li>
    </ul>

    <script>
        var nav = document.querySelector('.nav');
        var lis = nav.children;
        for(var i = 0; i<lis.length;i++) {
            lis[i].onmouseover = function() {
                this.children[1].style.display = 'block';
            }
            lis[i].onmouseout = function() {
                this.children[1].style.display = 'none';
            }
        }
    </script>
```



#### 案例：发布留言

需求：用户在 input 输入文本点击提交按钮后，将输入信息追加在页面区域。

实现思路：

- 点击按钮后，动态创建一个 li ，追加到页面

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .contain{
            width: 480px;
            margin: 180px auto 0 auto;
        }
    </style>
</head>
<body>
    <div class="contain">
        <input type="text" name="" id="">
        <button>发布</button>
        <br>
        评论区：
        <ul>
            
        </ul>
    </div>
    <script>
        var btn = document.querySelector('button');
        var input = document.querySelector('input');
        var ul = document.querySelector('ul');
        btn.onclick = function() {
            if(input.value==''){
                alert('输入为空！');
                return;
            }
            var li = document.createElement('li');
            li.innerHTML = input.value;
            ul.insertBefore(li,ul.children[0]);
        }
    </script>
```



#### 案例：删除留言

实现思路：

- 当我们插入留言时，多添加一个删除按钮
- 获取按钮，添加点击事件

- 阻止链接跳转 `javascrip:;`



```html
<div class="contain">
            <input type="text" name="" id="">
            <button>发布</button>
            <br>
            评论区：
            <ul>
                
            </ul>
        </div>
        <script>
            var btn = document.querySelector('button');
            var input = document.querySelector('input');
            var ul = document.querySelector('ul');
            btn.onclick = function() {
                if(input.value==''){
                    alert('输入为空！');
                    return;
                }
                var li = document.createElement('li');
                li.innerHTML = input.value + "<a href='javascrip:;'>删除</a>";
                ul.insertBefore(li,ul.children[0]);
                var del = document.querySelector('a');
                for(var i=0;i<del.length;i++){
                    del[i].onclick = function() {
                        ul.removeChild(this.parentNode);
                    }
                }
            }
        </script>
```



#### 案例：动态生成表格

需求：在表格中点击增加按钮添加数据，点击删除按钮，删除相应数据。

实现思路：

- 所有数据都是存放在 tbody 里，使用循环创建 tr，通过数组长度判断行数
- 通过循环数据对象创建 td
- 创建删除单元格
- 为删除添加事件

```javascript
        <style>
            *{
                margin: 0;
                padding: 0;
            }
            .contain{
                width: 480px;
                margin: 120px auto 0 auto;
            }
        </style>
    </head>
    <body>
        <div class="contain">
            <table cellspacing="20px">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>科目</th>
                        <th>成绩</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <script>
            var datas = [{
                name : '张三',
                subject:'java',
                score: 100
            },{
                name : '李四',
                subject:'html',
                score: 30
            },{
                name : '王五',
                subject:'c++',
                score: 89
            }];

            var tbody = document.querySelector('tbody');
            for(var i=0;i<datas.length;i++) {
                var tr = document.createElement('tr');
                tbody.appendChild(tr);
                for(var k in datas[i]) {
                    var td = document.createElement('td');
                    td.innerHTML = datas[i][k];
                    tr.appendChild(td);
                }
                var td = document.createElement('td');
                td.innerHTML = "<a href='javascript:;'>删除</a>"
                tr.appendChild(td);
            }

            var a = document.querySelectorAll('a');
            for(var i=0;i<a.length;i++) {
                a[i].onclick = function() {
                    tbody.removeChild(this.parentNode.parentNode);
                }
            }
        </script>
```





### 3.6 DOM 核心总结

DOM 元素是一个对象 object ，所以称 DOM 为文档对象模型

DOM 操作主要是对于元素的 增删改查，属性操作，事件操作



**创建**

- `document.write`
- `innerHTML`
- `createElement`



**增**

- `appendChild`
- `insertBefore`



**删**

- `removeChild`



**改**

- 修改元素属性 `element.attr` src title href 等
- 修改自定义元素 `element.getAttribute('attr','new')`
- 修改普通元素内容 `innerHTML innerText`
- 修改表单元素：`value,type,disabled`
- 修改元素样式：`style,className`



**查**

- DOM 提供的 API ：getElementByID,getElementsByTagName
- H5 提供的新方法：querySelector,querySelectorAll
- 利用节点操作获取元素：父(parentNode)  子 (children) 兄 (previousElementSibling,nextElementSibling)



**属性操作**

主要针对自定义属性

- setAttribute
- getAttribute
- removeAttribute



**事件操作**

事件三要素 事件源，事件类型，事件处理程序

onclick onmouseover onfocus onblur ...

