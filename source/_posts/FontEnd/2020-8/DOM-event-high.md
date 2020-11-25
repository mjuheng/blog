---
title: DOM 事件进阶
date: 2020-08-07
categories:
 - FrontEnd
tags:
 - DOM
publish: true
---
# DOM 事件

[[toc]]









## 注册事件

给元素添加事件，称为注册事件或者绑定事件



注册事件有两种方式：

**传统注册方式**

- 利用 on 开头的事件 比如 ：`onclick` `onfocus` `onmouseover`
- 特点：注册事件的唯一性，即一个事件源只能有一个 on 事件，相同的 on 事件只会执行文档流最后的事件。



**方法监听注册方式**

- w3c 标准，推荐方式
- `addEventListen() ` 方法
- ie9 之前不支持此方法，解决方案使用  `attachEvent()`  替换
- 特点：一个事件源可以注册多个监听器，按注册顺序依次执行







**传统注册方式**

---

在 DOM 事件基础中已经详细介绍传统注册方式，这里不再赘述。











**方法监听注册方式**

---

**关键语法：**

```javascript
eventTarget.addEventListener(type, listener[ , userCapture])
```



`eventTarget.addEventListener()` 方法将指定的监听器注册到 eventTarget (目标对象) 上，当该对象触发指定事件时，就会执行事件处理函数。

该方法接收三个参数：

- `type` ：事件类型字符串， 比如：`click` , `mouseover `... ，注意这里不需要 on
- `listener` ：事件处理函数，事件发生时，会调用该监听函数
- `useCapture`：可选参数，是一个布尔值，默认是 `false` 。为 `true` 时，表示在事件捕获阶段调用事件处理程序，否则在事件冒泡阶段调用。







>实例：
>
>```javascript
>var btn = document.querySelector('button');
>btn.addEventListener('click', function(){
>    alert('click');
>})
>// 添加多次事件 会按顺序执行
>btn.addEventListener('click', function(){
>    alert('click again');
>})
>```







**ie9兼容解决方案 （非提倡）**

***

关键语法：

```javascript
eventTarget.attachEvent(eventNameWithOn, callback)
```



`eventTarget.attachEvent()` 方法将指定的监听器注册到 eventTarget （目标对象）上，当该对象触发指定的事件时，指定的回调函数就会被执行。

该方法接收两个参数：

- `eventNameWithOn` ：事件类型字符串，比如 `onclick` , `onmouseover` ... ，这里需要带上 on
- `callback` ：事件处理函数，当目标触发事件时回调函数会被调用





>全版本兼容可以自行判断浏览器内核，对不同版本返回不同函数方式，封装为一个函数，在项目中使用即可
>
>或者使用传统事件注册方式







## 删除事件





**1. 传统删除方式，即注册空事件**

```javascript
eventTarget.onEvent = null
```

`onEvent` ：事件类型字符串，比如：`onclick`,`onmouseover`,`onfocus...



**2. 方法监听删除**

```javascript
eventTarget.removeEventListener(type, function);
```

参数说明：

- `type` ：事件类型字符串， 比如：`click` , `mouseover `... ，注意这里不需要 on
- `function` ：移除事件函数名



> 使用该方法移除事件时，注册事件函数必须暴露事件名，即注册事件不能为匿名函数





















## DOM 事件流

事件流描述的是从页面中接收事件的顺序。

事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即 DOM 事件流。



DOM 事件流分为3个阶段

1. 捕获阶段
2. 当前目标阶段
3. 冒泡阶段



>事件捕获：网景最早提出，由 DOM 最顶层节点开始，然后逐级向下传播到具体元素接收的过程
>
>事件冒泡：IE 最早提出，事件开始时由最具体的元素接收，然后逐级向上传播到 DOM 最顶层节点的过程



捕获阶段示意图：

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807164011.png)



冒泡阶段示意图：

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807164023.png)





**个人理解总结**

---

事件流即事件穿透/传递过程

由于 DOM 树是层层嵌套的，以点击事件为例，其传递流程应该是

`Document -> html -> body -> fatherdiv -> sondiv`

点击事件会从顶层逐级传递，直到被事件监听函数捕获。这个流程被称为 捕获阶段，通过 `eventTarget.addEventListener(type, function, true)` 

设置第三个参数为 `true` 使事件以**顶层穿透**这种方式传递。



通过设置其参数为 `false` 即为冒泡阶段，这种方式是最常用的，该传递方式会忽略顶层穿透，逆向传递点击事件。

`sondiv -> fatherdiv -> body -> html ->document`

我更喜欢称之为**底层穿透**方式。





>在实际开发中很少使用到事件捕获，我们更关注事件冒泡
>
>某些事件是没有冒泡行为的：`onblur`,`onfocus`,`onmouseenter`,`onmouseleave`
>
>事件冒泡机制实现一些很巧妙的功能，但有时也会带来麻烦























## 事件对象

在监听事件函数中我们可以声明一个事件对象 `event`，`evt`，`e`

只有事件存在，事件对象才会存在，它里面包含了一系列事件相关数据的集合。



>实例：
>
>```javascript
>btn.onclick('onclick',function(event){
>  event = event || window.event;
>  console.log(event);
>})
>```



>ie678 中可以使用 `window.event` 获取事件对象





**事件对象常见属性和方法**

---

| 方法                  | 说明                                     |
| --------------------- | ---------------------------------------- |
| `e.target`            | 返回触发事件的对象 标准                  |
| `e.srcElement`        | 返回触发事件的对象 非标准 ie678          |
| `e.type`              | 返回事件类型 如：`click`,`mousemover`... |
| `e.stopPropagation()` | 阻止事件冒泡 标准                        |
| `e.cancelBubble`      | 阻止事件冒泡 非标准 ie678                |
| `e.preventDefault()`  | 阻止事件触发 标准                        |
| `e.returnValue`       | 阻止事件触发 非标准 ie678                |



> 我们也可以在事件中使用 `return`方法阻止事件运行，但是这种方法会中断 `return` 之后的代码运行











## 阻止事件冒泡

事件冒泡特性有好有坏，需要灵活运用。

阻止冒泡会终止事件向上级传递。



**标准语法：**

```javascript
event.stopPropagation()
```

`event` ：事件对象



**非标准写法：**

```javascript
event.cancelBubble = true
```

`event` ：事件对象





























## 事件委托

事件委托也称为事件代理，事件委派，是事件冒泡特性的运用



现有以下场景：

```html
<ul>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
    <li>第四项</li>
    <li>第五项</li>
</ul>
```

要求为点击每个 `li` 时弹出提示框，如果不使用事件冒泡特性，循环为 `li` 注册事件是不优雅的，而且访问的 DOM 越多，页面加载速度和交互速度也会变慢。



实现思路：

为 `ul` 注册点击事件，利用事件对象的 `target` 来找到当前点击的 `li` ，因为点击 `li` 会冒泡到 `ul` 上， `ul` 有事件注册，就会触发事件监听器。



这样我们只操作了一次 DOM 即只为 `ul` 添加了事件监听，提高了程序性能。



> 实现代码：
>
> ```javascript
> var ul = document.querySelector('ul');
> ul.onclick = function(e) {
>     alert(e.target.innerHTML);
> }
> ```

















## 常用的鼠标事件

| 事件          | 触发事件     |
| ------------- | ------------ |
| `onlick`      | 鼠标点击     |
| `onmouseover` | 鼠标经过     |
| `onmouseout`  | 鼠标离开     |
| `onfocus`     | 获得焦点     |
| `onblur`      | 失去焦点     |
| `onmousemove` | 鼠标移动     |
| `onmouseup`   | 鼠标弹起     |
| `onmousedown` | 鼠标按下     |
| `contextmenu` | 鼠标右键菜单 |
| `selectstart` | 鼠标选中     |



禁止鼠标右键菜单

```javascript
element.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // 阻止事件运行
})
```

禁止鼠标选中

```javascript
element.addEventListener('selectstart', function(e) {
    e.preventDefault();
})
```





**鼠标事件对象**

---

| 对象        | 说明                                    |
| ----------- | --------------------------------------- |
| `e.clientX` | 返回鼠标相对于浏览器可视区窗口的 x 坐标 |
| `e.clientY` | 返回鼠标相对于浏览器可视区窗口的 Y 坐标 |
| `e.pageX`   | 返回鼠标相对于文档页面的 x 坐标 ie9+    |
| `e.pageY`   | 返回鼠标相对于文档页面的 Y 坐标 ie9+    |
| `e.screenX` | 返回鼠标相对于电脑屏幕的 x 坐标         |
| `e.screenY` | 返回鼠标相对于电脑屏幕的 Y 坐标         |

















## 常用的键盘事件

| 事件         | 触发条件                                          |
| ------------ | ------------------------------------------------- |
| `onkeyup`    | 某个键弹起                                        |
| `onkeydown`  | 某个键按下                                        |
| `onkeypress` | 某个键按下 不能识别功能键 如 ctrl shift 方向键... |



> 执行顺序：
>
> `keydown` -> `keypress` -> `keyup`
>
> `keyup` 和 `keydown` 不区分按下的大小写，在事件对象中无法辨识大小写，` key press ` 支持区分大小写







**键盘事件对象**

---

| 对象        | 说明                    |
| ----------- | ----------------------- |
| `e.keyCode` | 返回按下键盘的 ASCII 值 |

























## 本章案例



### 图片跟随鼠标移动

需求：需要一张图片在页面中跟随用户鼠标移动

实现思路：

- 鼠标不断移动，鼠标移动事件 `mousemove`
- 在整个页面移动，给 `document` 注册事件
- 图片要移动位置，但是不占据页面空间，使用 `absolute` 定位
- 每次移动鼠标，都会获取新的鼠标坐标，将这个坐标设置为图片的 `top` `left` 值即可。



```javascript
var img = document.querySelector('img');
document.addEventListener('mousemove',function(e){
    img.style.top = e.pageY + 'px';
    img.style.left = e.pageX + 'px';
})
```





### 点击按键聚集焦点

需求：当用户在页面按下 s 键时，搜索框获得焦点，开始输入。

实现思路：

- 为 `document` 添加按键监听事件
- 使用键盘事件对象中的 `keyCode` 判断用户按下的键
- 使用 `focus()` 方法使文本框获取焦点



```javascript
var input = document.querySelector('input');
document.addEventListener('keyup',function(e){
    if(e.keyCode == 83){
        input.focus();
    }
})
```



### 输入内容显示放大

需求：当用户在表单输入时，浮现用户输入内容到上方并放大输入内容。

实现思路：

- 用户输入，`div` 盒子显示
- 检测用户输入，为表单添加键盘事件
- 将表单 `value` 获取并通过 `innerHTML` 赋值给`div` 
- 如果输入为空则隐藏 `div`



```javascript
var div = document.querySelector('.div')
var input = document.querySelector('input');
input.addEventListener('keyup',function(e){
    div.innerHTML = this.value;
    if(this.value){
        div.style.display = 'block';
    }else{
        div.style.display = 'none';
    }
})
```



>注意 `keydown`，`keypress`的触发时机，当按键按下时立即触发，但是此时表单并没有进行输入
>
>这是`keydown`，`keypress`在表单输入的特性

