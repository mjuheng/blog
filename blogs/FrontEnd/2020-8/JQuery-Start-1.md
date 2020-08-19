---
title: JQuery 入门（一）
date: 2020-08-16
sidebar: false
categories:
 - FrontEnd
tags:
 - javascript
 - jquery
publish: true
---

**write less, do more.**

<!-- more -->

## JQuery 介绍

### JavaScript 库

JavaScript库：即 library，是一个封装好的特定的集合（方法和函数）。从封装一大堆函数的角度理解库，就是在这个库中，封装了很多预先定义好的函数在里面，比如动画animate、hide、show，比如获取元素等。

> 简单理解： 就是一个JS 文件，里面对我们原生js代码进行了封装，存放到里面。这样我们可以快速高效的使用这些封装好的功能了。
>
> 比如 jQuery，就是为了快速方便的操作DOM，里面基本都是函数（方法）。



常见的JavaScript 库：jQuery、Prototype、YUI、Dojo、Ext JS、移动端的zepto等，这些库都是对原生 JavaScript 的封装，内部都是用 JavaScript 实现的，我们主要学习的是 jQuery。



### JQuery 概念

- jQuery 是一个快速、简洁的 JavaScript 库，其设计的宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情。

- j 就是 JavaScript；   Query 查询； 意思就是查询js，把js中的DOM操作做了封装，我们可以快速的查询使用里面的功能。

- jQuery 封装了 JavaScript 常用的功能代码，优化了 DOM 操作、事件处理、动画设计和 Ajax 交互。

- 学习jQuery本质： 就是学习调用这些函数（方法）。

- jQuery 出现的目的是加快前端人员的开发速度，我们可以非常方便的调用和使用它，从而提高开发效率。



### JQuery 优点

1. 轻量级。核心文件才几十kb，不会影响页面加载速度。
2. 跨浏览器兼容，基本兼容了现在主流的浏览器。
3. 链式编程、隐式迭代。
4. 对事件、样式、动画支持，大大简化了DOM操作。
5. 支持插件扩展开发。有着丰富的第三方的插件，例如：树形菜单、日期控件、轮播图等。
6. 免费、开源。



## JQuery 开始

### JQuery 下载

[官方文档](https://www.jquery123.com/) 

[下载地址](https://www.bootcdn.cn/jquery/) 



**本地依赖**

下载 `jquery.min.js` 到项目目录，并在 `head` 引入

```html
<script src="jquery.min.js"></script>
```



**在线CDN**

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
```





### JQuery 体验

```js
$('div').hide(); //隐藏div盒子
```





### JQuery 入口函数

jQuery中常见的两种入口函数：

```js
$(function () {   
    // code
}) ; 
// 两种方式等价
$(document).ready(function(){
   // code
});
```

以上两种方式都是当 DOM 加载完成后执行，相当于原生 Js 的 `DOMContentLoaded` ，注意与 `onload` 区分。



### JQuery 顶级对象 $

1.  \$是 jQuery 的别称，在代码中可以使用 jQuery 代替，但一般为了方便，通常都直接使用 $ 。
2.  \$是jQuery的顶级对象，相当于原生JavaScript中的 window。把元素利用$包装成jQuery对象，就可以调用jQuery 的方法。



### JQuery 对象

使用 jQuery 方法和原生JS获取的元素是不一样的，总结如下 : 

1. **用原生 JS 获取来的对象就是 DOM 对象**
2. **jQuery 方法获取的元素就是 jQuery 对象**
3. jQuery 对象本质是： 利用$对 DOM 对象包装后产生的对象（伪数组形式存储）。



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200818142007.png)



### 对象转换

DOM 对象与 jQuery 对象之间是可以相互转换的。因为原生js 比 jQuery 更大，原生的一些属性和方法 jQuery没有给我们封装. 要想使用这些属性和方法需要把jQuery对象转换为DOM对象才能使用。

```js
// DOM对象转换成jQuery对象
var box = document.getElementById('box');  // 获取DOM对象
var jQueryObject = $(box);  	// 把DOM对象转换为 jQuery 对象

// jQuery 对象转换为 DOM 对象
var domObject1 = $('div')[0]   //  jQuery对象[索引值]
var domObject2 = $('div').get(0)  //  jQuery对象.get(索引值)
```

实际开发比较常用的是把DOM对象转换为jQuery对象，这样能够调用功能更加强大的jQuery中的方法。



## JQuery 选择器

原生 JS 获取元素方式很多，很杂，而且兼容性情况不一致，因此 jQuery 给我们做了封装，使获取元素统一标准。

更多选择器请参考 [官方文档](https://www.jquery123.com/category/selectors/) 

### 基础选择器

| 名称       | 用法                     | 描述           |
| ---------- | ------------------------ | -------------- |
| ID选择器   | `$("#id")`               | 获取指定ID元素 |
| 全选择器   | `$("*")                  | 匹配所有元素   |
| 类选择器   | $(".class")              | 获取class类    |
| 标签选择器 | $("element")             | 获取标签       |
| 并集选择器 | $("selector1,selector2") | 多个元素       |
| 交集选择器 | $("selector1.selector2") | 交集元素       |



### 层级选择器

| 名称       | 用法         | 描述               |
| ---------- | ------------ | ------------------ |
| 子代选择器 | `$("ul>li")` | 获取亲儿子层级元素 |
| 后代选择器 | `$("ul li")` | 获取子孙后代元素   |



### 筛选选择器

| 语法         | 用法            | 描述                  |
| ------------ | --------------- | --------------------- |
| `:first`     | `$("li:first")` | 获取第一个 li 元素    |
| `:last`      | `$("li:last")`  | 获取最后一个 li 元素  |
| `:eq(index)` | `$("li:eq(2)")` | 获取 index 个 li 元素 |
| `:odd`       | `$("li:odd")`   | 获取偶数 li           |
| `:even`      | `$("li:even")`  | 获取奇数 li           |



### 筛选方法

| 语法                 | 用法                             | 说明                                               |
| -------------------- | -------------------------------- | -------------------------------------------------- |
| `parent()`           | `$("li").parent()`               | 查找父级                                           |
| `children(selector)` | `$("ul").children("li")`         | 查找亲子级                                         |
| `find(selector)`     | `$("ul").find("li")`             | 查找后代                                           |
| `siblings(selector)` | `$(".first").siblings("li")`     | 查找兄弟节点，不包括自己                           |
| `nextAll([expr])`    | `$(".first").nextAll()`          | 查找当前元素之后的所有同级元素                     |
| `prevAll([expr])`    | `$(".first").prevAll()`          | 查找当前元素之前的所有同级元素                     |
| `hasClass(calss)`    | `$("div").hasClass("protected")` | 检查当前元素是否包含某个特定类，返回 true 或 false |
| `eq(index)`          | `$("li").eq(2)`                  | 查找第index个元素                                  |





## JQuery 隐式迭代

在原生JS中，我们如果需要为一组元素添加事件或设置样式需要使用 for 循环遍历这组元素。而在 JQuery 中，我们不再需要循环遍历了，JQuery 会为我们隐式迭代这组元素，为这组元素都添加你设置的事件或样式。

```js
$("li").mouseover(function(){
    $(this).toggleClass("current");
});
```



## JQuery 样式操作

JQuery 操作样式有两种方式，一种是通过 `css()` 方法，另一种是通过类操作。



### css() 方法

```js
// 获取属性
var strColor = $(this).css('color');

// 设置单属性
$(this).css("width", "300px");
$(this).css("width", 300);  // 可忽略引号和单位

// 多属性设置
$(this).css({ 
    color: "white",
    "font-size": 20,
    // fontSize : 20,
    backgroundColor : "red"
    // background-color: "red"
});
```

`css()` 应用于少量样式操作时，如果样式过多请通过添加类操作。



### class() 方法

```js
// 1.添加类
$("div").addClass("current");

// 2.删除类
$("div").removeClass("current");

// 3.切换类
$("div").toggleClass("current");
```

设置类样式方法比较适合样式多时操作，可以弥补css()的不足。

原生 JS 中 className 会覆盖元素原先里面的类名，jQuery 里面类操作只是对指定类进行操作，不影响原先的类名。



## JQuery 动画

​	jQuery 给我们封装了很多动画效果，最为常见的如下：

- 显示隐藏：`show() , hide() , toggle() `
- 划入画出：`slideDown() , slideUp() , slideToggle() `
- 淡入淡出：`fadeIn() , fadeOut() , fadeToggle() , fadeTo() `
- 自定义动画：`animate() `

> 注意：
>
> 动画或者效果一旦触发就会执行，如果多次触发，就造成多个动画或者效果排队执行。
>
> jQuery为我们提供另一个方法，可以停止动画排队：stop() ;





### 显示隐藏

**`show()`**

```js
show([speed,[easing],[fn]])
```

**参数**

- 参数都可以省略，无动画直接显示
- `speed`：可选，预设参数 `slow`,`normal`,`fast`，也可填写毫秒数 ms
- `easing`：动画函数，预设 `swing` , `linear` 
- `fn`：回调函数



**`hide()`**

```js
hide([speed,[easing],[fn]])
```



**`toggle()`**

```js
toggle([speed,[easing],[fn]])
```



**实例**

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
</head>
<body>
    <button>显示</button>
    <button>隐藏</button>
    <button>切换</button>
    <div></div>
    <script>
        $(function() {
            $("button").eq(0).click(function() {
                $("div").show(1000);
            })
            $("button").eq(1).click(function() {
                $("div").hide(1000);
            })
            $("button").eq(2).click(function() {
              $("div").toggle(1000);
            })
        });
    </script>
</body>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: royalblue;
            display: none;
        }
    </style>
</html>
```

:::

### 滑入滑出

**`slideDown()`**

```js
slideDown([speed,[easing],[fn]])
```

**`slideUp()`**

```js
slideUp([speed,[easing],[fn]])
```

**`slideToggle()`**

```js
slideToggle([speed,[easing],[fn]])
```



**实例**

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
</head>
<body>
    <button>滑入</button>
    <button>滑出</button>
    <button>切换</button>
    <div></div>
    <script>
        $(function() {
            $("button").eq(0).click(function() {
                $("div").slideDown(1000);
            })
            $("button").eq(1).click(function() {
                $("div").slideUp(1000);
            })
            $("button").eq(2).click(function() {
              $("div").slideToggle(1000);
            })
        });
    </script>
</body>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: royalblue;
            display: none;
        }
    </style>
</html>
```

:::

### 淡入淡出

**`fadeIn()`**

```js
fadeIn([speed,[easing],[fn]])
```

**`fadeOut()`**

```js
fadeOut([speed,[easing],[fn]])
```

**`fadeTo()`**

渐近方式调整不透明度

```js
fadeTo([speed],opacity,[easeing],[fn])
```

- `opacity` : 必需，透明度 0~1

**`fadeToggle`**

```js
fadeToggle([speed,[easing],[fn]])
```



**实例**

::: details

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
</head>
<body>
    <button>淡入</button>
    <button>淡出</button>
    <button>切换</button>
    <button>自定义透明度</button>
    <div></div>
    <script>
        $(function() {
            $("button").eq(0).click(function() {
                $("div").fadeIn(1000);
            })
            $("button").eq(1).click(function() {
                $("div").fadeOut(1000);
            })
            $("button").eq(2).click(function() {
              $("div").fadeToggle(1000);
            })
            $("button").eq(3).click(function() {
              $("div").fadeTo(1000,0.5);
            })
        });
    </script>
</body>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: royalblue;
            display: none;
        }
    </style>
</html>
```

:::

### 动画排队

动画或者效果一旦触发就会执行，如果多次触发，就造成多个动画或者效果排队执行。

停止动画排队的方法为：`stop() ` 

- `stop()` 方法用于停止动画或效果。
- `stop()` 写到动画或者效果的前面， 相当于停止结束上一次的动画。

总结: 每次使用动画之前，先调用 `stop() `,在调用动画。

```js
$(this).stop().slideDown()
```



### 自定动画

自定义动画非常强大，通过参数的传递可以模拟以上所有动画，方法为：`animate() `



```js
animate(params,[speed],[easing],[fn])
```

**参数**

- `params` ：必需，想要更改的样式属性，以对象形式传递，复合属性使用驼峰命名。



**实例**

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
</head>
<body>
    <button>go</button>
    <div></div>
    <script>
        $(function() {
            $("button").click(function() {
                $("div").animate({
                    left: 500,
                    top: 300,
                    opacity: .4,
                    width: 500
                }, 500);
            })
        })
    </script>
</body>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: royalblue;
        }
    </style>
</html>
```

:::





