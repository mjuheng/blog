---
title: JavaScipt高级（四）正则表达式
date: 2020-08-22
sidebar: false
categories:
 - FrontEnd
tags:
 - JavaScript
publish: true
---



**正则表达式**（ Regular Expression ）是用于匹配字符串中字符组合的模式。在JavaScript中，正则表达式也是对象。

<!-- more -->



## 正则表达式概述



### 正则表达式初识

正则表达式（ Regular Expression ）是用于匹配字符串中字符组合的模式。在JavaScript中，正则表达式也是对象。

正则表通常被用来检索、替换那些符合某个模式（规则）的文本，例如验证表单：用户名表单只能输入英文字母、数字或者下划线， 昵称输入框中可以输入中文(匹配)。此外，正则表达式还常用于过滤掉页面内容中的一些敏感词(替换)，或从字符串中获取我们想要的特定部分(提取)等 。

其他语言也会使用正则表达式，本阶段我们主要是利用JavaScript 正则表达式完成表单验证。



> 正则表达式是一组由字母和符号组成的特殊文本，它可以用来从文本中找出满足你想要的格式的句子。

### 正则表达式特定

1. 灵活性、逻辑性和功能性非常的强。
2. 可以迅速地用极简单的方式达到字符串的复杂控制。
3. 对于刚接触的人来说，比较晦涩难懂。比如：`^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$` 
4. 实际开发,一般都是直接复制写好的正则表达式. 但是要求会使用正则表达式并且根据实际情况修改正则表达式.   比如用户名:   `/^[a-z0-9_-]{3,16}$/` 



## Js中的正则表达式

### 创建

在 JavaScript 中，可以通过两种方式创建一个正则表达式。

方式一：通过调用 `RegExp` 对象的构造函数创建 

```js
var regexp = new RegExp(/123/);
```

方式二：利用字面量创建 正则表达式

```js
var rg = /123/;
```



### 测试

`test()`  正则对象方法，用于检测字符串是否符合该规则，该对象会返回 `true` 或 `false` ，其参数是测试字符串。

```js
regexObj.test(str)
```

- `regexObj` ： 正则对象
- `str` ：测试字符串



## 正则表达式语法

### 语法结构

一个正则表达式可以由简单的字符构成，比如 /abc/，也可以是简单和特殊字符的组合，比如 /ab*c/ 。其中特殊字符也被称为元字符，在正则表达式中是具有特殊意义的专用符号，如 ^ 、$ 、+ 等。

特殊字符非常多，可以参考： 

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions) 

jQuery 手册：正则表达式部分

[正则测试工具](http://tool.oschina.net/regex) 



> 个人推荐快速入门Guide:
>
> [ziishaned/learn-regex](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md) 



### 元字符

正则表达式主要依赖于元字符。 元字符不代表他们本身的字面意思，他们都有特殊的含义。一些元字符写在方括号中的时候有一些特殊的意思。以下是一些元字符的介绍：

| 元字符 | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| .      | 句号匹配任意单个字符除了换行符。                             |
| [ ]    | 字符种类。匹配方括号内的任意字符。                           |
| [^ ]   | 否定的字符种类。匹配除了方括号里的任意字符                   |
| *      | 匹配>=0个重复的在*号之前的字符。                             |
| +      | 匹配>=1个重复的+号前的字符。                                 |
| ?      | 标记?之前的字符为可选.                                       |
| {n,m}  | 匹配num个大括号之前的字符或字符集 (n <= num <= m).           |
| (xyz)  | 字符集，匹配与 xyz 完全相等的字符串.                         |
| \|     | 或运算符，匹配符号前或后的字符.                              |
| \      | 转义字符,用于匹配一些保留的字符 `[ ] ( ) { } . * + ? ^ $ \ |` |
| ^      | 从开始行开始匹配.                                            |
| $      | 从末端开始匹配.                                              |



### 边界符

正则表达式中的边界符（位置符）用来提示字符所处的位置，主要有两个字符

| 边界符 | 说明                           |
| ------ | ------------------------------ |
| ^      | 表示匹配行首的文本（以谁开始） |
| $      | 表示匹配行尾的文本（以谁结束） |

如果 ^和 $ 在一起，表示必须是精确匹配。

```js
var rg = /abc/; // 正则表达式里面不需要加引号 不管是数字型还是字符串型
// 包含abc的字符串
console.log(rg.test('abc'));		// true
console.log(rg.test('abcd'));		// true
console.log(rg.test('aabcd'));		// true
console.log('---------------------------');
var reg = /^abc/;
// 以abc开头的字符串
console.log(reg.test('abc')); 		// true
console.log(reg.test('abcd')); 		// true
console.log(reg.test('aabcd')); 	// false
console.log('---------------------------');
var reg1 = /^abc$/; 
// 精确匹配 要求必须是abc字符串才符合规范
console.log(reg1.test('abc')); 		// true
console.log(reg1.test('abcd')); 	// false
console.log(reg1.test('aabcd')); 	// false
console.log(reg1.test('abcabc')); 	// false
```



### 字符类

字符类表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内。

**[]方括号**

表示有一系列字符可供选择，只要匹配其中一个就可以了

::: details

```js
var rg = /[abc]/; 
// 只要包含有a 或 b 或 c
console.log(rg.test('andy'));		//true
console.log(rg.test('baby'));		//true
console.log(rg.test('color'));		//true
console.log(rg.test('red'));		//false
var rg1 = /^[abc]$/; 
// 三选一 只有是a 或者是 b  或者是c 这三个字母才返回 true
console.log(rg1.test('aa'));		//false
console.log(rg1.test('a'));			//true
console.log(rg1.test('b'));			//true
console.log(rg1.test('c'));			//true
console.log(rg1.test('abc'));		//true
------------------------------------------
var reg = /^[a-z]$/ 
//26个英文字母任何一个字母返回 true  - 表示的是a到z的范围  
console.log(reg.test('a'));			//true
console.log(reg.test('z'));			//true
console.log(reg.test('A'));			//false
--------------------------------------
var reg1 = /^[a-zA-Z0-9]$/; 
// 字符组合 26个英文字母(大写和小写都可以)任何 一个 字母或数字 返回 true
console.log(reg1.test('a'));		//true
console.log(reg1.test('A'));		//true
console.log(reg1.test('9'));		//true
console.log(reg1.test('A3'))		//false
--------------------------------------
var reg2 = /^[^a-zA-Z0-9]$/;
//取反 方括号内部加上 ^ 表示取反，只要包含方括号内的字符，都返回 false
console.log(reg2.test('a'));		//false
console.log(reg2.test('B'));		//false
console.log(reg2.test(8));			//false
console.log(reg2.test('!'));		//true
```

:::

> 转义字符 反斜线 \
>
> ```js
> var reg = /^[a-zA-Z0-9\-]$/;
> // 转义 - 符
> console.log(reg.test('-'));		//true
> ```
>
> 取反操作
>
> ```js
> var reg = /^[^a-z]$/;
> // 任何一个a-z字母 返回false
> console.log(reg.test('q'));		//false
> console.log(reg.test('A'));		//true
> ```



**量词符**

量词符用来设定某个模式出现的次数。

| 量词  | 说明            |
| ----- | --------------- |
| *     | 重复0次或更多次 |
| +     | 重复1次或更多次 |
| ?     | 重复0次或1次    |
| {n}   | 重复n次         |
| {n,}  | 重复n次或更多次 |
| {n,m} | 重复n到m次      |



```js
var reg = /^a+$/;
console.log(reg.test(''));			//false
console.log(reg.test('a'));			//true
console.log(reg.test('aaaaa'));		//true

var reg1 = /^a?$/;
console.log(reg1.test(''));			//true
console.log(reg1.test('a'));		//true
console.log(reg1.test('aaaaa'));	//false

var reg2 = /^a{3,}$/;		
console.log(reg.test(''));			//false
console.log(reg.test('a'));			//false
console.log(reg.test('aaaaa'));		//true
```





### 预定义类

正则表达式提供一些常用的字符集简写。如下:

| 简写 | 描述                                               |
| ---- | -------------------------------------------------- |
| .    | 除换行符外的所有字符                               |
| \w   | 匹配所有字母数字，等同于 `[a-zA-Z0-9_]`            |
| \W   | 匹配所有非字母数字，即符号，等同于： `[^\w]`       |
| \d   | 匹配数字： `[0-9]`                                 |
| \D   | 匹配非数字： `[^\d]`                               |
| \s   | 匹配所有空格字符，等同于： `[\t\n\f\r\p{Z}]`       |
| \S   | 匹配所有非空格字符： `[^\s]`                       |
| \f   | 匹配一个换页符                                     |
| \n   | 匹配一个换行符                                     |
| \r   | 匹配一个回车符                                     |
| \t   | 匹配一个制表符                                     |
| \v   | 匹配一个垂直制表符                                 |
| \p   | 匹配 CR/LF（等同于 `\r\n`），用来匹配 DOS 行终止符 |



### 修饰符

```js
/表达式/[switch]
```

`switch` 可选，按照什么样的模式来匹配

- g : 全局匹配
- i : 忽略大小写
- gi : 全局匹配 + 忽略大小写

实例

```js
/^[a-z]/g
```



## 匹配行为

如同 `test()` 方法，可以返回是否匹配的布尔值，存在另外的匹配行为。

### 校验 test

```js
regexObj.test(str)
```

###  替换 replace

```js
str.replace(regexObj,replaceContent)
```

> `replace()` 是 String 下的方法。

实例

```js
var str = 'andy和red';

var newStr2 = str.replace(/andy/, 'baby');
console.log(newStr2)	//baby和red
```



## 在线工具

[菜鸟在线工具](https://c.runoob.com/front-end/854) 

[regex101](https://regex101.com/) 





## 案例

### 用户表单验证

功能需求:

1. 如果用户名输入合法, 则后面提示信息为:  用户名合法,并且颜色为绿色
2. 如果用户名输入不合法, 则后面提示信息为:  用户名不符合规范, 并且颜色为红色

分析:

1. 用户名只能为英文字母,数字,下划线或者短横线组成, 并且用户名长度为6~16位.
2. 首先准备好这种正则表达式模式/$[a-zA-Z0-9-_]{6,16}^/
3. 当表单失去焦点就开始验证. 
4. 如果符合正则规范, 则让后面的span标签添加 right类.
5. 如果不符合正则规范, 则让后面的span标签添加 wrong类.



源码:

::: details

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="jquery.min.js"></script>
</head>

<body>
    <input type="text" class="uname"> <span>请输入用户名</span>
</body>
<script>
    var uname = $(".uname");
    var info = $("span");
    var reg = /^[a-z0-9A-Z]{6,16}$/;
    uname.on("blur",function(){
        console.log(this);
        if(reg.test($(this).val())){
            info.text('格式正确').css({
                color : "green"
            })
        }else{
            info.text('格式错误').css({
                color : "red"
            })
        }
    })
</script>

</html>
```

:::



### 验证座机号码

```js
var reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
var reg = /^\d{3,4}-\d{7,8}$/;
```





### 邮箱验证

```js
var reg = /^\d{4,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
```



### 敏感词过滤

```html
<textarea name="" id="message"></textarea> <button>提交</button>
<div></div>
<script>
    var text = document.querySelector('textarea');
    var btn = document.querySelector('button');
    var div = document.querySelector('div');
    btn.onclick = function() {
    	div.innerHTML = text.value.replace(/激情|gay/g, '**');
    }
</script>
```

