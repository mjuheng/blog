---
title: JavaScipt高级（五）ES6
date: 2020-08-23
sidebar: false
categories:
 - FrontEnd
tags:
 - JavaScript
publish: true
---



ECMAScript 6.0（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

<!-- more -->



## 前言



### ECMAScript 6

ECMAScript 6.0（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言



### ECMAScript和JavaScript的关系

一个常见的问题是，ECMAScript和JavaScript到底是什么关系？

要讲清楚这个问题，需要回顾历史。1996年11月，JavaScript的创造者Netscape公司，决定将JavaScript提交给国际标准化组织ECMA，希望这种语言能够成为国际标准。次年，ECMA发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript，这个版本就是1.0版。

该标准从一开始就是针对JavaScript语言制定的，但是之所以不叫JavaScript，有两个原因。一是商标，Java是Sun公司的商标，根据授权协议，只有Netscape公司可以合法地使用JavaScript这个名字，且JavaScript本身也已经被Netscape公司注册为商标。二是想体现这门语言的制定者是ECMA，不是Netscape，这样有利于保证这门语言的开放性和中立性。

因此，ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现（另外的ECMAScript方言还有Jscript和ActionScript）。日常场合，这两个词是可以互换的。



### ES6与ECMAScript 2015的关系

媒体里面经常可以看到”ECMAScript 2015“这个词，它与ES6是什么关系呢？

2011年，ECMAScript 5.1版发布后，就开始制定6.0版了。因此，”ES6”这个词的原意，就是指JavaScript语言的下一个版本。

但是，因为这个版本引入的语法功能太多，而且制定过程当中，还有很多组织和个人不断提交新功能。事情很快就变得清楚了，不可能在一个版本里面包括所有将要引入的功能。常规的做法是先发布6.0版，过一段时间再发6.1版，然后是6.2版、6.3版等等。

但是，标准的制定者不想这样做。他们想让标准的升级成为常规流程：任何人在任何时候，都可以向标准委员会提交新语法的提案，然后标准委员会每个月开一次会，评估这些提案是否可以接受，需要哪些改进。如果经过多次会议以后，一个提案足够成熟了，就可以正式进入标准了。这就是说，标准的版本升级成为了一个不断滚动的流程，每个月都会有变动。

标准委员会最终决定，标准在每年的6月份正式发布一次，作为当年的正式版本。接下来的时间，就在这个版本的基础上做改动，直到下一年的6月份，草案就自然变成了新一年的版本。这样一来，就不需要以前的版本号了，只要用年份标记就可以了。

ES6的第一个版本，就这样在2015年6月发布了，正式名称就是《ECMAScript 2015标准》（简称ES2015）。2016年6月，小幅修订的《ECMAScript 2016标准》（简称ES2016）如期发布，这个版本可以看作是ES6.1版，因为两者的差异非常小（只新增了数组实例的`includes`方法和指数运算符），基本上是同一个标准。根据计划，2017年6月将发布ES2017标准。

因此，ES6既是一个历史名词，也是一个泛指，含义是5.1版以后的JavaScript的下一代标准，涵盖了ES2015、ES2016、ES2017等等，而ES2015则是正式名称，特指该年发布的正式版本的语言标准。本书中提到“ES6”的地方，一般是指ES2015标准，但有时也是泛指“下一代JavaScript语言”。



### 为什么使用 ES6

每一次标准的诞生都意味着语言的完善，功能的加强。JavaScript语言本身也有一些令人不满意的地方。

- 变量提升特性增加了程序运行时的不可预测性
- 语法过于松散，实现相同的功能，不同的人可能会写出不同的代码



## ES6 新增语法

### let

ES6中新增了用于声明变量的关键字。

- let 声明的变量只在所处于的块级有效
  - {} 花括号代表块级作用域
  - 使用let关键字声明的变量才具有块级作用域，使用var声明的变量不具备块级作用域特性。

```js
if(true){
	var a = 10;
    let b = 20;
}
console.log(a);		// 10
console.log(b);		// b is not defined
```

- 防止循环变量污染

```js
for(var i = 0; i<2; i++){}
console.log(i);  	// 2

for(let j = 0; j<2; j++){}
console.log(j);  	// i is not defined
```

- 不存在变量提升

```js
console.log(a);		// a is not defined
let a = 20;
```

- 暂时性死区
  - 利用let声明的变量会绑定在这个块级作用域，不会受外界的影响

```js
var a = 10;
if(true) {
    console.log(a); //Cannot access 'a' before initialization
    let a = 20;
    console.log(a); // 20
}
```



**经典实例**

```js
var arr = [];
for (var i = 0; i < 2; i++) {
    arr[i] = function () {
    	console.log(i); 
    }
}
arr[0]();		// 2
arr[1]();		// 2

//(function(){console.log(i)})()
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200823112621.png)

此例的关键点在于变量i是全局的，函数执行时输出的都是全局作用域下的i值。

```js
var arr = [];
for (let i = 0; i < 2; i++) {
    arr[i] = function () {
    	console.log(i); 
    }
}
arr[0]();		// 0
arr[1]();		// 1
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200823112727.png)

此例的关键点在于每次循环都会产生一个块级作用域，每个块级作用域中的变量都是不同的，函数执行时输出的是自己上一级（循环产生的块级作用域）作用域下的i值。







### const

声明常量，常量就是值（内存地址）不能变化的量

- 具有块级作用域

```js
if(true) {
    const a = 1;
    console.log(a)	// 1
}
console.log(a);		// a is not defined
```

- 声明常量时必须赋值

```js
const PI;	// Missing initializer in const declaration
```

- 常量赋值后，地址不能修改

```js
const PI = 3.14;
PI = 100; // Assignment to constant variable.
```

```js
// 对于复杂数据类型，不能修改地址，但能修改值
const ary = [100, 200];
ary[0] = 'a';
ary[1] = 'b';
console.log(ary); // ['a', 'b']; 
ary = ['a', 'b']; // Assignment to constant variable.
```



**var let const 区别**

|     var      |      let       |     const      |
| :----------: | :------------: | :------------: |
| 函数级作用域 |   块级作用域   |   块级作用域   |
|   变量提升   | 不存在变量提升 | 不存在变量提升 |
|   值可更改   |    值可更改    |   值不可更改   |



灵活使用 var let const 能有效提高程序效率。





### 解构赋值

ES6中允许从数组中提取值，按照对应位置，对变量赋值，对象也可以实现解构

**数组解构**

```js
let ary = [1, 2, 3];
// ES6 之前
let a = ary[0];
let b = ary[1];
let c = ary[2];

// ES6
let [d,e,f,g] = ary;
console.log(d);         //1
console.log(e);         //2
console.log(f);         //3
console.log(g);         //undefined
```



**对象解构**

```js
let person = {
    name: 'zhangsan', 
    age: 20,
    say: function(){
        console.log('hi');
    }
}

let {name, age, sex, say} = person;
console.log(name);     // zhangsan
console.log(age);      // 20
console.log(sex);      // undefined
say();

// 别名赋值
let {name: myName, age: myAge, say:speak} = person;
console.log(myName);   // zhangsan
console.log(myAge);    // 20
speak();
```





### 箭头函数

ES6中新增的定义函数的方式。

```js
() => {}
/*
	(): 代表函数 function()
	=>: 函数指向的代码块
	{}：函数体
*/
const fn = () => {}
```

实例：

```js
const fn = (x) => {
    console.log(x);
};

fn(2)       // 2
```

如果函数体内只有一句代码，切代码执行结果就是返回值，可以省略花括号

```js
function fn(x,y){
    return x+y;
}

// ES6
const fn = (x,y) => x+y ;
console.log( fn(2,3) );
```

如果形参只有一个，可以省略小括号

```js
function fn(x) {
    return x*x;
}

// ES6
const fn = x => x*x ;
console.log(fn(2));
```

**箭头函数中的this**

箭头函数不绑定this关键字，箭头函数中的this，指向的是函数定义位置的上下文this。

```js
const obj = { name: 'zhangsan'};
function fn(){
    console.log(this);
    return function(){
        console.log(this)	//function 谁调用指向谁
    }
}

const resFn = fn.call(obj);
resFn(); 
// {name: "zhangsan"}
// Window

//==========================================

const obj = { name: 'zhangsan'};
function fn(){
    console.log(this);
    return () => {
        console.log(this);	
        // 箭头函数定义的位置，那么这个箭头函数定义在fn里面，而这个fn指向是的obj对象，所以这个this也指向是obj对象
    }
}

const resFn = fn.call(obj);
resFn();
// {name: "zhangsan"}
// {name: "zhangsan"}
```



**经典面试**

```js
var age = 100;

var obj = {
    age : 20,
    say: () => {
        console.log(this.age);
    },
}

obj.say();	// 100
//箭头函数this指向的是被声明的作用域里面，而对象没有作用域的，所以箭头函数虽然在对象中被定义，但是this指向的是全局作用域
```



### rest ...

剩余参数语法允许我们将一个不定数量的参数表示为一个数组，不定参数定义方式，这种方式很方便的去声明不知道参数情况下的一个函数

```js
// ES6 之前
function sum() {
        var total = 0;
        for(var i =0 ; i<arguments.length; i++){
            total += arguments[i];
        }
        return total;
    }
console.log( sum(1,2,3,4) );

// ES6 之后
const sum = (...args) => {
    let total =0;
    args.forEach( value => total += value ) 
    return total;
}
console.log( sum(1,2,3,4) );
```



> 在 Function 对象中的 arguments 属性虽然是数组，但是其没有数组的 pop push 等方法。
>
> 
>
> 在箭头函数中没有 arguments 属性。



**剩余参数与解构**

```js
let students = ['wangwu', 'zhangsan', 'lisi'];
let [s1, ...s2] = students; 
console.log(s1);  // 'wangwu' 
console.log(s2);  // ['zhangsan', 'lisi']
```





## ES6 内置对象扩展



### Array 扩展方法

**扩展运算符（展开语法）**

---

扩展运算符可以将数组或者对象转为用逗号分隔的参数序列

```js
let ary = [1, 2, 3];
console.log(...ary);
console.log(1,2,3);
// 在 console.log 中逗号被当成参数分隔符进行解析
// 其实 ...ary 存储的应该是 1,2,3
```

扩展运算符可以应用于合并数组

```js
let ary1 = [1,2,3];
let ary2 = [4,5,6];
let ary3 = [...ary1,...ary2];
console.log(ary3);      // [1,2,3,4,5,6]

ary1.push(...ary2);
console.log(ary1);      // [1,2,3,4,5,6]
```

将类数组或可遍历对象转换为真正的数组

```js
let oDivs = document.getElementsByTagName('div'); 
oDivs = [...oDivs];
```



**构造函数方法 Array.from()**

---

将伪数组或可遍历对象转换为真正的数组

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

let arr2 = Array.from(arrayLike);
console.log(arr2);      // ['a', 'b', 'c']

// 接收函数作为参数，每次遍历数组都会执行该函数
let arr3 = Array.from(arrayLike, item => item + 'mark');
console.log(arr3);		// ["amark", "bmark", "cmark"]
```



**实例方法 find()**

---

用于找出第一个符合条件的数组成员，如果没有找到返回undefined

```js
let ary = [{
    id: 1,
    name: '张三'
},{
    id: 2,
    name: '李四'
}];
let target = ary.find((item, index, ary) => item.id == 2);
//找数组里面符合条件的值，当数组中元素id等于2的查找出来
//注意，只会匹配第一个
console.log(target);    // {id: 2, name: "李四"}
```



**实例方法 findIndex()**

---

用于找出第一个符合条件的数组成员的位置，如果没有找到返回 -1

```js
let ary = [1,2,3,4,5,6,7,8];
let index = ary.findIndex(item=>item==4);
console.log(index); // 3
```



**实例方法 includes()**

---

判断某个数组是否包含给定的值，返回布尔值。

```js
let ary = [1,2,3,4,5,6,7,8];
console.log( ary.includes(5) );     // true
console.log( ary.includes(9) );     // false
```



### String 扩展方法

**模板字符串**

---

ES6新增的创建字符串的方式，使用反引号定义

```js
let tmp = `template`;
```

模板字符串中可以使用 `${}` 解析变量

```js
let vari = "variable";
let tmp = `temp ${vari} late`;
console.log(tmp);		// temp variable late
```

模板字符串中可以换行

```js
let info = {
    name: 'zhangsan',
    sex: '男',
    age: 20,
}

let infoNav = `
    <div>
        <span>${info.name}</span>
        <span>${info.sex}</span>
        <span>${info.age}</span>
    </div>
`;
```

在模板字符串中调用函数，在函数位置会显示函数返回值

```js
const sayHi = () => "hi";
let people = `zhangsan say ${sayHi()} .`
console.log(people); // zhangsan say hi .
```



**实例方法 startsWith() 和 endsWith()**

---

- `startsWith()`：表示参数字符串是否在原字符串的头部，返回布尔值
- `endsWith()`：表示参数字符串是否在原字符串的尾部，返回布尔值

```js
let str = 'Hello world!';
str.startsWith('Hello') // true 
str.endsWith('!')       // true
```



**实例方法 repeat()**

---

repeat方法表示将原字符串重复n次，返回一个新字符串

```js
'x'.repeat(3)      // "xxx" 
'hello'.repeat(2)  // "hellohello"
```



### Set 数据结构

ES6 提供了新的数据结构  Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。



Set本身是一个构造函数，用来生成  Set  数据结构

```js
const s = new Set();
```

Set函数可以接受一个数组作为参数，用来初始化。

```js
const set = new Set([1, 2, 3, 4, 4]);	//{1, 2, 3, 4}
```

- Set 是以 Object 形式进行存储的
- 参数为数组时会自动过滤数组中的重复元素



> 应用场景：搜索历史存储



利用 Set 对数组去重

```js
const dr = ary => [...new Set(ary)];
console.log( dr([1,2,2,3,4,3]) ); 
```





**操作数据**

---



- `add()` : 添加某个值，返回 Set 结构本身
- `delete()` ： 删除某个值，返回一个布尔值，表示删除是否成功
- `has()` : 返回一个布尔值，是否存在 Set 成员
- `clear()` ：清除所有成员，没有返回值

实例：

```js
 const s = new Set();
 s.add(1).add(2).add(3);// 向 set 结构中添加值 
 s.delete(2)           // 删除 set 结构中的2值   
 s.has(1)             // 表示 set 结构中是否有1这个值 返回布尔值 
 s.clear()           // 清除 set 结构中的所有值
 
//注意：删除的是元素的值，不是代表的索引
```





**遍历**

---

Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。

```js
set.forEach(value => console.log(value))
```





