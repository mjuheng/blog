---
title: JavaScript变量提升
date: 2020-08-16
sidebar: false
categories:
 - FrontEnd
tags:
 - JavaScript
publish: true
---



```js
var num = 10;
fun();
function fun() {
    console.log(num);
    var num = 20;
}
```

JavaScript 中，函数及变量的声明都将被提升到作用域的最顶部。

JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。

<!-- more -->

## 简单实例

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



你可能认为这是一段错误的 Js 代码，其调用了未声明的变量或函数。其实这两个实例等价于：

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
var x = 5;
console.log(x)
console.log(y)
var y = 7;

/*
	5 undefined
*/
```

上面代码片段的 y 输出了 **undefined**，这是因为变量声明 (var y) 提升了，但是初始化(y = 7) 并不会提升，所以 y 变量是一个未定义的变量。



> 参考资料：[菜鸟教程 JavaScript变量提升](https://www.runoob.com/js/js-hoisting.html) 



## 深入

以上是参考菜鸟教程的简单说明，接下来我们将进一步理解变量/函数提升



### 执行原理

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

/*
	var num;
	console.log(num);
	num = 10;
*/
```

**注意：只提升声明，不提升赋值**



### 函数预解析

函数的声明会被提升到**当前作用域**的最上面，但是**不会调用函数**。

```js
fn();
function fn() {
    console.log('打印');
}

/*
	function fn() {
    	console.log('打印');
	}
	fn()
*/
```

**注意：函数声明代表函数整体，所以函数提升后，函数名代表整个函数，但是函数并没有被调用，上面的代码是我们为演示自己进行了调用！**



### 局部提升

所有的提升都是提升到当前作用域的顶部，全局变量提升到全局 window 下，局部变量提升到当前函数顶端。

我们姑且称全局变量的提升为全局提升，局部变量在函数体内的提升为局部提升。

```js
console.log(num);
var num;
fun();
function fun() {
    console.log(str);
    var str = 'string';
}

/*
	num 和 fun() 为全局变量和函数，进行全局提升
	str 为 fun() 的局部变量，在fun()中进行局部提升
	
	var num;
	function fun() {
		var str;
    	console.log(str);
    	str = 'string';
	}
	console.log(num);
	
	输出： undefined undefined
*/	
```



> 函数表达式型的函数会以变量提升的形式进行提升
>
> ```js
> fn();
> var  fn = function() {
>     console.log('failed');		
> }
> 
> /*
> 	输出： fn is not a function erro
> 	解析：
> 		fn 以变量方式提升，其赋值（函数体）不进行提升
> 		此时相当于
> 		
> 		var fn;
> 		fn();
> 		fn = function() {console.log('failed');}
> 		
> 		对 undefined 调用函数自然报错
> */
> ```



### 经典实例

以下几个实例可以让你快速理解 JavaScript 的变量/函数提升，也是面试试题。



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
fun();	
```

运行结果

```js
undefined
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

运行结果

```js
undefined 20
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
fun();
```

运行结果

```js
undefined 9
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
fun();					
console.log(c);			
console.log(b);		
console.log(a);			
```

运行结果

```js
9
9
9
9
9
9
a is not defined

/*
	在函数体内 b 和 c 未声明，直接赋值，成为全局变量
*/
```



## 总结

JavaScript 中，函数及变量的声明都将被提升到作用域的最顶部。

虽然从代码上看，是未进行声明直接调用，其实解析器已经将声明体提升到其作用域前。

个人见解，与其说变量提升是一种特性，不如说是 javascript 的语法缺陷，在 ES5 的严格模式中，不再允许变量未声明赋值调用。

















