---
title: JavaScript变量提升
date: 2020-08-16
sidebar: false
categories:
 - FrontEnd
tags:
 - javascript
publish: true
---



```js
x = 5;
console.log(x);
fn();

var x;
function fn(){
    // code
}
```

JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。

JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。

<!-- more -->

## 实例

有以下两个实例：

```js
// 实例一
x = 5;
console.log(x);

var x;
```

```js
// 实例二
fn();

function fn(){
    // code
}
```



你可能认为这是一段错误的 Js 代码，其调用了为声明的变量或函数。其实这两个实例等价于：

```js
var x = 5;
function fn(){
    // code
}
console.log(x);
fn();
```



## 变量提升

要理解以上实例就需要理解 **"hoisting(变量提升)"**。

变量提升：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部。



需要注意的是初始化的变量其初始化的值不会进行提升。

```js
var x = 5; // 初始化 x

elem = document.getElementById("demo"); // 查找元素
elem.innerHTML = x + " " + y;           // 显示 x 和 y

var y = 7; // 初始化 y
```

上面代码片段的 y 输出了 **undefined**，这是因为变量声明 (var y) 提升了，但是初始化(y = 7) 并不会提升，所以 y 变量是一个未定义的变量。





## 个人理解

浏览器JS引擎解释器会抓取JS代码中的全局变量和函数，将其先绑定在顶级对象 window 下，之后再去逐行执行JS代码，这也是为什么不给变量赋值时输出 undefined 的原因。

尽管这种存在这种特性，但是如果使用其，代码可读性和维护性不友好，依旧建议对变量和函数先声明后使用，遵循代码规范。





> 参考资料：[菜鸟教程 JavaScript变量提升](https://www.runoob.com/js/js-hoisting.html) 