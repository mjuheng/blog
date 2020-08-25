---
title: JavaScript基础（六）作用域
date: 2020-08-18
sidebar: false
categories:
 - FrontEnd
tags:
 - JavaScript
publish: true
---



JavaScript（ES6前）中的作用域有两种：

- 全局作用域
- 局部作用域（函数作用域）

<!-- more -->

## 作用域

### 作用域概述

通常来说，一段程序代码中所用到的名字并不总是有效和可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。作用域的使用提高了程序逻辑的局部性，增强了程序的可靠性，减少了名字冲突。

JavaScript（es6前）中的作用域有两种：

- 全局作用域
- 局部作用域（函数作用域）



### 全局作用域

作用于所有代码执行的环境(整个script标签内部)或独立的js文件。

### 局部作用域

作用于函数内的代码环境，就是局部作用域。 因为跟函数有关系，所以也称为函数作用域。

### 块级作用域

- 块作用域由 { } 包括。

- 在其他编程语言中（如 java、c#等），在 if 语句、循环语句中创建的变量，仅仅只能在本 if 语句、本循环语句中使用，如下面的Java代码：	

```java
if(true){
  int num = 123;
  system.out.print(num);  // 123
}
system.out.print(num);    // 报错
```

以上java代码会报错，是因为代码中 { } 即一块作用域，其中声明的变量 num，在 “{ }” 之外不能使用；而与之类似的JavaScript代码，则不会报错。

```js
if(true){
  var num = 123;
  console.log(num); //123
}
console.log(num);   //123
```

**ES6之后新增块级作用域**



## 变量的作用域

在JavaScript中，根据作用域的不同，变量可以分为两种：

- 全局变量
- 局部变量



### 全局变量

在全局作用域下声明的变量叫做全局变量（在函数外部定义的变量）。

- 全局变量在代码的任何位置都可以使用
- 在全局作用域下 var 声明的变量 是全局变量
- 特殊情况下，在函数内不使用 var 声明的变量也是全局变量（不建议使用）



**在函数体外使用var关键字声明的变量和在函数体内未使用任何关键字声明的变量是全局变量**



### 局部变量

在局部作用域下声明的变量叫做局部变量（在函数内部定义的变量）。

- 局部变量只能在该函数内部使用
- 在函数内部 var 声明的变量是局部变量
- 函数的形参实际上就是局部变量



**在函数体内使用var关键字声明的变量是局部变量**



### 区别

全局变量和局部变量的区别

- 全局变量：在任何一个地方都可以使用，只有在浏览器关闭时才会被销毁，因此比较占内存
- 局部变量：只在函数内部使用，当其所在的代码块被执行时，会被初始化；当代码块运行结束后，就会被销毁，因此更节省内存空间



## 作用域链

只要是代码都一个作用域中，写在函数内部的局部作用域，未写在任何函数内部即在全局作用域中；如果函数中还有函数，那么在这个作用域中就又可以诞生一个作用域；根据在**[内部函数可以访问外部函数变量]**的这种机制，用链式查找决定哪些数据能被内部函数访问，就称作作用域链。

示例1：内部函数访问外部函数变量

```js
function f1() {
    var num = 123;
    function f2() {
        console.log( num ); // 内部函数可以访问外部函数
    }
    f2();
}
var num = 456;
f1();
```

示例2：就近原则

```js
var a = 1;
function fn1() {
    var a = 2;
    var b = '22';
    fn2();
    function fn2() {
        var a = 3;
        fn3();
        function fn3() {
            var a = 4;
            console.log(a); // 4
            console.log(b); // '22'
        }
    }
}
fn1();
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200818074910.png)





## 预解析

JavaScript 代码是由浏览器中的 JavaScript 解析器来执行的。

JavaScript 解析器在运行 JavaScript 代码的时候分为两步：

​	预解析和代码执行。

- 预解析：在当前作用域下, JS 代码执行之前，浏览器会默认把带有 var 和 function 声明的变量在内存中进行提前声明或者定义，预解析也叫做变量、函数提升。

- 代码执行： 从上到下执行JS语句。

  注意：**预解析会把变量和函数的声明在代码执行之前执行完成。**



### 变量预解析

变量的**声明会被提升**到**当前作用域**的最上面，变量的**赋值不会提升**。

```js
console.log(num);  // undefined
var num = 10;
```

**注意：只提升声明，不提升赋值**



### 函数预解析

函数的声明会被提升到**当前作用域**的最上面，但是**不会调用函数**。

```js
fn();
function fn() {
    console.log('打印');   //打印
}
```

**注意：函数声明代表函数整体，所以函数提升后，函数名代表整个函数，但是函数并没有被调用，上面的代码是我们为演示自己进行了调用！**



### 函数表达式问题

函数表达式创建函数，会执行**变量提升**。

```js
fn();
var  fn = function() {
    console.log('failed');		// fn is not a function erro
}
```

解释：该段代码执行之前，会做变量声明提升，fn在提升之后的值是undefined；而fn调用是在fn被赋值为函数体之前，此时fn的值是undefined，所以无法正确调用



### 快速理解实例

**实例一**

```js
var num = 10;
fun();
function fun() {
    console.log(num);
    var num = 20;
}
```

其相当于以下代码片段

```js
var num;			// 全局提升		只提升声明不提升赋值
function fun() {	// 全局提升		只提升声明不调用
    var num;		// 局部提升		只提升声明不提升赋值
    console.log(num);
    num = 20;
}
num = 10;
fun();				// 作用域链就近原则 undefined
```



**实例二**

```js
var num = 10;
function fun() {
    console.log(num);
    var num = 20;
    console.log(num);
}
fun();
```

其相当于以下代码片段

```js
var num;					// 全局提升
function fun() {			// 全局提升
    var num;				// 局部提升
    console.log(num);
    num = 20;
    console.log(num);
}

num = 10;
fun();						// 作用域链就近原则 undefined 20
```

**实例三**

```js
var a = 18;
fun();
function fun() {
    var b = 9;
    console.log(a);
    console.log(b);
    var a = '123';
}
```

其相当于以下代码片段

```js
var a;
function fun() {
    var b;
    var a;
    b = 9;
    console.log(a);
    console.log(b);
    a = '123';
}

a = 18;
fun();				// undefined 9
```

**实例四**

```js
fun();
console.log(c);
console.log(b);
console.log(a);
function fun() {
    var a = b = c =9;
    console.log(a);
    console.log(b);
    console.log(c);
}
```

其相当于以下代码片段

```js
function fun() {
    var a;
    a = 9; b = 9; c = 9;
    console.log(a);
    console.log(b);
    console.log(c);
}
fun();					// 9 9 9
console.log(c);			// 9
console.log(b);			// 9    函数内部变量未声明直接赋值 全局变量
console.log(a);			// a is not defined erro
```





