---
title: BOM 浏览器对象模型
date: 2020-08-07
sidebar: false
categories:
 - FrontEnd
tags:
 - BOM
publish: true
---
BOM 封装了浏览器的各项操作，并允许程序员通过 `js` 语法调用这些操作，如：返回上一页，读取 `cookie`，调整浏览器窗口等等

<!-- more -->

## BOM 概述

BOM （Browser Object Model） 即浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是 `window`。

BOM 由一系列相关的对象构成，并且每个对象都提供了很多方法与属性。

BOM 缺乏标准，JavaScript 语法标准的组织是 ECMA，DOM 的标准化组织是 W3C，BOM 最初是 Netscape 浏览器标准的一部分。



**DOM**

- 文档对象模型
- DOM 就是将文档当成一个对象来看
- DOM 的顶级对象是 `document`
- DOM 主要是学习操作页面元素
- DOM 是 W3C 标准



**BOM**

- 浏览器对象模型
- 把浏览器当成一个对象
- BOM 的顶级对象是 `window`
- BOM 学习的是浏览器窗口交互。
- BOM 是浏览器厂商在各自浏览器上定义的，混乱，难以兼容





**BOM 构成**

---

![image-20200807164403194](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200807164403194.png)



`window` 对象是浏览器的顶级对象，它具有双重角色

- 它是 JS 访问浏览器窗口的一个接口
- 它是一个全局对象，定义在全局作用域中的变量，函数都会变成 `window` 对象的属性和方法



>在调用方法属性时我们一般忽略 `window.`
>
>`window.name` 是一个存在的属性，在声明变量时注意避免





























## window 事件



**窗口加载事件**

```javascript
window.onload = function

window.addEventListen('load',function)
```

当页面所有元素加载完成后触发该事件。



>传统事件注册方式的特性依旧存在，只会执行代码顺序的最后一个 `onload` 事件函数
>
>注册监听事件方式特性也存在，没有限制











**DOM 加载事件**

```javascript
document.addEventListen('DOMContentLoaded',function)
```

当 DOM 加载完成触发，不包括 css image flash 等等



应用场景：

当页面存在大量图片时，用户触发 `onload` 可能会需要很长时间，这期间无法实现交互效果，必然影响用户体验，这时使用 `DOMContentLoaded` 事件比较合适。











**调整窗口大小事件**

```javascript
window.onresize = function

window.addEventListen('resize',function)
```

当浏览器窗口发生改变时，触发该事件。



应用场景：

响应式布局， `winow.innerWidth` 当前屏幕宽度， `winow.innerHeight` 当前屏幕高度。























## 定时器

window 对象为我们提供了2个定时器语法。



**`setTimeout() ` 方法**

```javascript
windows.setTimeout(function,time)
```

参数：

- `function` ：调用函数

- `time` : 延迟时间，单位 ms



`setTimeout()` 方法可以在指定时间后执行一次调用函数。这个函数方法也称为回调函数 `callback`

普通函数是按照代码顺序执行的，而回调函数是在先完成一个函数方法后去调用另一个方法。

`element.onclick = function()` 和 `element.addEventListener('click',fn)` 都是回调函数。



>window 可以省略
>
>调用函数可以直接写匿名函数，或声明函数，也可以使用 `'fun()'` 这种写法，但是并不推荐
>
>延迟的时间可以忽略，即为 0 ，立即执行











**`setInterval()` 方法**

```javascript
windows.setInterval(function,time)
```

参数：

- `function` ：回调函数

- `time` : 间隔时间，单位 ms

`setInterval()` 方法可以每间隔 `time` 执行一次回调函数，只有通过 `clearInterval()` 方法才能清除终止该定时器。











**停止定时器**

---

清除 `setTimeout` 

```javascript
window.clearTimeout(timeoutID)
```



清除 `setInterval`

```javascript
window.clearInterval(intervalID)
```













## JS 执行队列

JavaScript 语言的一大特定就是单线程，同一时间只能做一件事。这是因为 JavaScript 这门脚本语言诞生的使命所致的—— JavaScript 是为处理页面中的用户交互，以及操作 DOM 而诞生的。当我们对某个 DOM 元素进行操作时，是不能同时创建和删除的。



单线程就意味着任务队列的存在，前一个任务结束完之后，才会执行后一个任务。这样就会导致如果 JS 执行时间过长，就会造成页面渲染不连贯，加载阻塞。



**同步和异步**

为了解决阻塞问题，利用多核 CPU 的计算能力， HTML5 提出 Web Worker 标准，运行 JavaScript 脚本创建多个线程。于是，JS 中出现了同步和异步。

- **同步**

前一个任务执行完成后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致，同步的。即允许阻塞。

- **异步**

前一个任务执行时，不等待其执行完毕，将其独立运行，接着其他任务。





**同步任务**

同步任务都在主线程上执行，形成一个 **执行栈**

**异步任务**

JS 的异步任务都是通过回调函数实现的

1. 普通事件：`click`, `resize`
2. 资源加载：`load`, `error`
3. 定时器：`setInterval` , `serTimerout`

异步任务相关回调函数添加到 **任务队列** 中（**消息队列**）





**执行机制**

---

1. 先执行**执行栈中的同步任务**。
2. 如果遇见执行栈中的异步任务（回调函数）会被放到任务队列之中（消息队列），并不执行。
3. 当执行栈中的所有同步任务执行完毕后，系统会依次读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行。



![image-20200807164430761](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200807164430761.png)



> 异步进程处理会保管回调函数，当事件触发时再将回调函数加入消息队列
>
> 执行栈会不停检查任务队列中的任务，如果有就取出执行，这个闭环被称为事件循环

















## location 对象

`window` 对象为我们提供了一个 `location` 属性用于获取或设置窗体的URL，并且可以用于解析 URL。因为属性返回的是一个对象，所以我们将这个属性也称为 `location` 对象。



> URL 统一资源定位器 (Uniform Resource Locator) 是互联网上标准资源地址。互联网上的每个文件都有一个唯一的 URL ，它包含信息指出文件位置并告诉浏览器应该怎么处理它。
>
> URL 一般语法：
>
> protocol://host[:port]/path/[?query]#fragment





**location 对象属性与方法**

---

| 属性/方法             | 返回                                     |
| --------------------- | ---------------------------------------- |
| `location.href`       | 获取或设置整个 URL                       |
| `location.host`       | 返回主机（域名）                         |
| `location.port`       | 返回端口号 如果未写返回空字符串          |
| `location.pathname`   | 返回路径                                 |
| `location.search`     | 返回 `query` 参数                        |
| `location.hash`       | 返回片段 # 后的内容                      |
| `localtion.assign()`  | 页面重定向 记录浏览历史                  |
| `localtion.replace()` | 替换当前页面 不记录浏览历史              |
| `localtion.reload()`  | 重新加载页面 刷新 参数为 `true` 强制刷新 |

















## navigator 对象

`navigator` 对象包含有关浏览器的信息，它有很多属性，我们最常用的是 `navigator.userAgent` ，该属性可以返回由客户端发送服务器的 `user-agent` 头部的值。



在浏览器打开任意网页开启控制的通过输入 `navigator` 查看其相关属性



































## history 对象

`history`对象用于与浏览器历史记录的交互。其包含了用户的浏览记录即访问过的 URL。



`history`对象方法

---

| 方法        | 说明                                                |
| ----------- | --------------------------------------------------- |
| `back()`    | 返回历史上一个页面                                  |
| `forward()` | 前进                                                |
| `go()`      | 前进后退功能 里面填写整数确定需要前进后台的历史条目 |





















## 本章案例



### 5秒后自动关闭广告

实现思路：

- 当页面加载完成 `onload` ，添加定时器 `setTimeout` ，到时`display`隐藏广告



```javascript
var ad = document.querySelector('.ad');
setTimeout(function(){
    ad.style.display = 'none';
}, 5000);
```











### 倒计时

实现思路：

- 倒计时不断变化，因此需要定时器 `setInterval` 自动变化
- 三个黑子分别存放时分秒
- 使用 `innerHTML` 放入计算的时分秒



>在执行 `setInteval` 时存在空白期，通过先调用一次封装函数的方法解决这个问题



```javascript
var hour = document.querySelector('.h');
var minute = document.querySelector('.m');
var second = document.querySelector('.s');
var inputTime = +new Date('2020-6-24 20:00:00');
function countDate(time) {
    var nowTime = +new Date();
    var times = (inputTime - nowTime) / 1000;
    var d = parseInt(times/60/60/24);
    d = d < 10 ? '0'+ d : d;
    var h = parseInt(times/60/60%24);
    h = h < 10 ? '0'+ h : h;
    hour.innerHTML = h;
    var m = parseInt(times/60%60);
    m = m < 10 ? '0'+ m : m;
    minute.innerHTML = m;
    var s = parseInt(times%60);
    s = s < 10 ? '0'+ s : s;
    second.innerHTML = s;
}
countDate();
setInterval(countDate, 1000);
```











### 发送冷却

需求：当用户点击发送按钮后，按钮不可点击，并显示 xx 秒后才可再次点击

实现思路：

- 按钮点击之后，会禁用按钮 `disabled` 
- 同时按钮内容变化，通过 `innerHTML` 修改
- 内容动态变化，需要定时器 `setInterval` 
- 定义变量，在定时器中自减
- 如果变量自减为 0 ，复原按钮，并重置倒计时



应用场景：

- 高强度文本聊天
- 短信验证冷却



```javascript
var btn = document.querySelector('button');
var time = 3;
btn.addEventListener('click', function(){
    this.disabled = true;
    btn.innerHTML = '还剩'+ time-- +'秒可以发送';
    var count = setInterval(function(){
        if(time == 0){
            clearInterval(count);
            btn.disabled = false;
            btn.innerHTML = '发送';
            time = 3;
        }else{
            btn.innerHTML = '还剩'+ time-- +'秒可以发送';
        }
    },1000)
})
```











### 5秒后跳转页面

实现思路：

- 设置 `setInterval` 定时器，每秒倒计时改变页面内容
- 到 0 时，使用 `location.href` 跳转页面



```javascript
var h = document.querySelector('h3');
var i = 4;
setInterval(function(){
    h.innerHTML = '您'+ i-- +'秒后将跳转页面';
    if(i==0){
        location.href = 'https://www.github.com/QiJieH'
    }
},1000)
```





### 获取 URL 参数

要求：用户再登录页面输入数据，点击登录之后页面跳转并展示登录页面用户输入的内容

实现思路：

- 为登录页面的表单添加 `action` 到展示页面。
- `action` `get` 会将表单数据拼接到 URL 中。
- 在展示页面从 `location.search` 获取之前的用户输入



```javascript
var params = location.search.substr(1);
var arr = params.split('=');
document.write(arr[1]);
```















