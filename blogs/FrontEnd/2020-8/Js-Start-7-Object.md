---
title: JavaScript基础（七）对象
date: 2020-08-18
sidebar: false
categories:
 - FrontEnd
tags:
 - JavaScript
publish: true
---



在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、函数等。

- 创建对象
- 操作对象
- 内置对象

<!-- more -->

## 对象概念

**什么是对象？**

​		在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、函数等。

**对象是由属性和方法组成的：**

- 属性：事物的特征，在对象中用属性来表示（常用名词）

- 方法：事物的行为，在对象中用方法来表示（常用动词）

**为什么需要对象？**

​		保存一个值时，可以使用变量，保存多个值（一组值）时，可以使用数组。如果要保存一个人的完整信息呢？例如，将“张三疯”的个人的信息保存在数组中的方式为：

```
var arr = [‘张三疯’, ‘男', 128,154];
```

​		上述例子中用数组保存数据的缺点是：数据只能通过索引值访问，开发者需要清晰的清除所有的数据的排行才能准确地获取数据，而当数据量庞大时，不可能做到记忆所有数据的索引值。

​		为了让更好地存储一组数据，对象应运而生：对象中为每项数据设置了属性名称，可以访问数据更语义化，数据结构清晰，表意明显，方便开发者使用。

使用对象记录上组数据为：

```js
var obj = {
    "name":"张三疯",
    "sex":"男",
    "age":128,
    "height":154
}
```

JS中的对象表达结构更清晰，更强大。



## 创建对象

### 字面量创建

花括号 { } 里面包含了表达这个具体事物（对象）的属性和方法；{ } 里面采取键值对的形式表示 

- 键：相当于属性名
- 值：相当于属性值，可以是任意类型的值（数字类型、字符串类型、布尔类型，函数类型等）

```js
var star = {
    name : 'QiJieH',
    age : 21,
    sex : '男',
    sayHi : function(){
        alert('Hi');
    }
};
```



**访问对象的属性**

```js
console.log(star.name)     // 调用名字属性
console.log(star['name'])  // 调用名字属性
```

**调用对象方法**

```js
star.sayHi(); 	// 调用 sayHi 方法,注意一定要带后面的括号
```



**区分变量，属性，函数，方法**

- 变量：单独声明赋值，单独存在

- 属性：对象里面的变量称为属性，不需要声明；方法是对象的一部分，函数是单独封装操作的容器

- 函数：单独存在的，通过“函数名()”的方式就可以调用

- 方法：对象里面的函数称为方法，方法不需要声明，使用“对象.方法名()”的方式就可以调用



### new Object

**创建空对象**

```js
var andy = new Object();  // 大小写敏感
```

通过内置构造函数Object创建对象，此时andy变量已经保存了创建出来的空对象



**给空对象添加属性和方法**

通过对象操作属性和方法的方式，来为对象增加属性和方法

```js
andy.name = 'QiJieH';
andy.age = 21;
andy.sex = '男';
andy.sayHi = function(){
    alert('Hi');
}
```



### 构造函数对象

构造函数：是一种特殊的函数，主要用来初始化对象，即为对象成员变量赋初始值，它总与 new 运算符一起使用。我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面。

```js
function 构造函数名(形参1,形参2,形参3) {
     this.属性名1 = 参数1;
     this.属性名2 = 参数2;
     this.属性名3 = 参数3;
     this.方法名 = 函数体;
}
```

构造函数的调用格式

```js
var obj = new 构造函数名(实参1，实参2，实参3);
```

注意事项

1.   构造函数约定**首字母大写**。
2.   函数内的属性和方法前面需要添加 **this** ，表示当前对象的属性和方法。
3.   构造函数中**不需要 return 返回结果**。
4.   当我们创建对象的时候，**必须用 new 来调用构造函数**。



new关键字的作用

1. 在构造函数代码开始执行之前，创建一个空对象；
2. 修改this的指向，把this指向创建出来的空对象；
3. 执行函数的代码
4. 在函数完成之后，返回this---即创建出来的对象



> 这个构造函数可以泛理解为 类 class ，创建对象时的 new 可以理解为对象实例化。



## 遍历对象

```js
for (变量 in 对象名字) {
    // code
}
```

语法中的变量是自定义的，它需要符合命名规范，通常我们会将这个变量写为 k 或者 key。

```js
for (var k in obj) {
    console.log(k);      // 这里的 k 是属性名
    console.log(obj[k]); // 这里的 obj[k] 是属性值
}
```



## 内置对象

JavaScript 中的对象分为3种：**自定义对象 、内置对象、 浏览器对象**
​

前面两种对象是JS 基础 内容，属于 ECMAScript；  第三个浏览器对象属于 JS 独有的， JS API 讲解内置对象就是指 JS 语言自带的一些对象，这些对象供开发者使用，并提供了一些常用的或是**最基本而必要的功能**（属性和方法），内置对象最大的优点就是帮助我们快速开发



JavaScript 提供了多个内置对象：Math、 Date 、Array、String等	



查找文档：学习一个内置对象的使用，只要学会其常用成员的使用即可，我们可以通过查文档学习，可以通过MDN/W3C来查询。

Mozilla 开发者网络（MDN）提供了有关开放网络技术（Open Web）的信息，包括 HTML、CSS 和万维网及 HTML5 应用的 API。

[MDN Doc](https://developer.mozilla.org/zh-CN/) 



### Math

Math 对象不是构造函数，它具有数学常数和函数的属性和方法。跟数学相关的运算（求绝对值，取整、最大值等）可以使用 Math 中的成员。

| 属性、方法名            | 功能                                         |
| ----------------------- | -------------------------------------------- |
| `Math.PI`               | 圆周率                                       |
| `Math.floor()`          | 向下取整                                     |
| `Math.ceil()`           | 向上取整                                     |
| `Math.round()`          | 四舍五入版 就近取整   注意 -3.5   结果是  -3 |
| `Math.abs()`            | 绝对值                                       |
| `Math.max()/Math.min()` | 求最大和最小值                               |
| `Math.random()`         | 获取范围在[0,1)内的随机值                    |



**获取指定范围内的随机整数**：

```js
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}
```



### Date

Date 对象和 Math 对象不一样，Date是一个构造函数，所以使用时需要实例化后才能使用其中具体方法和属性。Date 实例用来处理日期和时间



实例化：

```js
var now = new Date();
```

获取指定时间的日期对象:

```js
var future = new Date('2020/8/18');
```

注意：如果创建实例时并未传入参数，则得到的日期对象是当前时间对应的日期对象



| 方法名          | 说明            |
| --------------- | --------------- |
| `getFullYear()` | 获取年          |
| `getMonth()`    | 获取月（0-11）  |
| `getDate()`     | 获取天          |
| `getDay()`      | 获取星期（0-6） |
| `getHours()`    | 获取小时        |
| `getMinutes()`  | 获取分钟        |
| `getSeconds()`  | 获取秒          |

**通过Date实例获取总毫米数**

```js
// 实例化Date对象
var now = new Date();
// 1. 用于获取对象的原始值
console.log(date.valueOf());
console.log(date.getTime());
// 2. 简单写可以这么做
var now = + new Date();			
// 3. HTML5中提供的方法，有兼容性问题
var now = Date.now();
```



### Array

| 方法                | 说明                                                         | 返回值              |
| ------------------- | ------------------------------------------------------------ | ------------------- |
| `Array.isArray()`   | 判断是否是数组                                               | true false          |
| `push()`            | 末尾添加一个或多个元素                                       | 返回新长度          |
| `pop()`             | 删除最后一个元素                                             | 返回删除元素        |
| `unshift()`         | 首项插入一个或多个元素                                       | 返回新长度          |
| `shift()`           | 删除首元素                                                   | 返回删除元素        |
| `reverse()`         | 颠倒顺序                                                     | 返回新数组          |
| `sort()`            | 升序参数： `function(a,b){ return a-b;}`   降序参数：`function(a,b){ return b-a;}` | 返回新数组          |
| `indexOf()`         | 查找参数的第一个索引                                         | 返回索引号，无则 -1 |
| `lastIndexOf()`     | 查找参数的最后一个索引                                       | 返回索引号，无则 -1 |
| `toString()`        | 把数组转换成字符串，逗号分隔                                 | 返回字符串          |
| `join('分隔符');`   | 把数组转换成字符串，分隔符分隔                               | 返回字符串          |
| `concat()`          | 连接两个或多个数组，不影响原数组                             | 返回新数组          |
| `slice(begin,end)`  | 数组截取                                                     | 返回截取新数组      |
| `splice(index,num)` | 删除数组 修改原数组                                          | 返回被删除数组。    |



> `instanceof` 运算符
>
> instanceof 运算符与 typeof 运算符相似，用于识别正在处理的对象的类型。与 typeof 方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型。
>
> ```js
> var arr = [1, 23];
> var obj = {};
> console.log(arr instanceof Array); // true
> console.log(obj instanceof Object); // true
> ```



**数组去重案例**

```js
function unique(arr) {
	var temp = [];
	for (var i = 0; i < arr.length; i++) {
		if( temp.indexOf(arr[i]) == -1 ) {
			temp.push(arr[i]);
        }
    }
    return temp;
}
```





### String

为了方便操作基本数据类型，JavaScript 还提供了三个特殊的引用类型：String、Number和 Boolean。

基本包装类型就是把简单数据类型包装成为复杂数据类型，这样基本数据类型就有了属性和方法。

```js
// 下面代码有什么问题？
var str = 'andy';
console.log(str.length);
```

按道理基本数据类型是没有属性和方法的，而对象才有属性和方法，但上面代码却可以执行，这是因为 js 会把基本数据类型包装为复杂数据类型，其执行过程如下 ：

```js
// 1. 生成临时变量，把简单类型包装为复杂数据类型
var temp = new String('andy');
// 2. 赋值给我们声明的字符变量
str = temp;
// 3. 销毁临时变量
temp = null;
```



**字符串的不可变性**

指的是里面的值不可变，虽然看上去可以改变内容，但其实是地址变了，内存中新开辟了一个内存空间。

当重新给字符串变量赋值的时候，变量之前保存的字符串不会被修改，依然在内存中重新给字符串赋值，会重新在内存中开辟空间，这个特点就是字符串的不可变。
​

由于字符串的不可变，在**大量拼接字符串**的时候会有效率问题



| 方法                   | 说明                                          |
| ---------------------- | --------------------------------------------- |
| `indexOf('str',index)` | 从index开始查找str字符并访问索引号，找不到 -1 |
| `lastIndex()`          | 从后往前找，只找第一个匹配的                  |
| `charAt(index)`        | 返回指定索引号的字符                          |
| `charCodeAt(index)`    | 获取指定索引号的ASCII码                       |
| `str[index]`           | 获取指定位置处字符                            |
| `concat(str1,str2...)` | 拼接字符串                                    |
| `substr(start,length)` | 从start开始截取 length 个长度                 |
| `slice(start,end)`     | 从start开始，截取到end位置                    |
| `substring(start,end)` | 从start开始，截取到end位置 不接受负值         |
| `replace(str,newstr)`  | 将str替换成 newstr 只替换匹配到的第一个       |
| `split()`              | 将字符串中的匹配参数分割 返回新数组           |

**案例：求一个字符串中出现最多的字符和其出现次数**

1. 核心算法：利用 charAt(） 遍历这个字符串

2. 把每个字符都存储给对象， 如果对象没有该属性，就为1，如果存在了就 +1

3. 遍历对象，得到最大值和该字符

```js
function fun(arr) {
            var temp = {};
            for(var i=0; i<arr.length; i++){
                var chars = arr.charAt(i);
                if(temp[chars]){
                    temp[chars]++;
                }else{
                    temp[chars]=1;
                }
            }
            console.log(temp);
            var str;
            var max=0;
            for(var t in temp) {
                if(temp[t]>max){
                    max = temp[t];
                    str = t;
                } 
            }
            console.log(str + ' ' + max);
        }
```

