---
title: JavaScipt高级（二）构造函数和原型
date: 2020-08-21
sidebar: false
categories:
 - FrontEnd
tags:
 - JavaScript
publish: true
---

在典型的 OOP 语言中 （如 `Java` ），都存在类的概念，类就是对象的模板，对象就是类的实例，但在 ES6 之前 `javascript` 并没有引入类的概念。



ES6 ，全称 ECMAScript6.0，于2015.6 发布。但是目前浏览器的 `javascript` 是 ES5 版本，大多数高版本浏览器也支持 ES6 ，不过只实现了 ES6 部分特性和功能



在 ES6 之前，对象不是基于类创建的，而是使用一种称为构造函数的特殊函数来定义对象。

<!-- more -->



## 构造函数和原型

### 创建对象的三种方式

1. 字面量方式

```js
var obj = {};
```

2. new关键字

```
var obj = new Object();
```

3. 构造函数方式

```js
function People(name,age){
    this.name = name;
    this.age = age;
}
var obj = new People('hy',21);
```



### 实例成员和静态成员



**实例成员**

---

实例成员就是构造函数内部通过 this 添加的成员，如下列代码中的 `uname` , `age` , `sing` 就是实例成员，实例成员只能通过实例化的对象来访问。

```js
function Star(uname, age) {
     this.uname = uname;
     this.age = age;
     this.sing = function() {
     	console.log('song');
    }
}
var ldh = new Star('hy', 18);
console.log(ldh.uname);	//实例成员只能通过实例化的对象来访问
```



**静态成员**

---

静态成员 在构造函数本身上添加的成员  如下列代码中 sex 就是静态成员,**静态成员只能通过构造函数来访问**

```js
function Star(uname, age) {
     this.uname = uname;
     this.age = age;
     this.sing = function() {
     	console.log('song');
    }
}
Star.sex = '男';
var ldh = new Star('hy', 18);
console.log(Star.sex);	//静态成员只能通过构造函数来访问
```



### 构造函数的问题

构造函数方法虽然好用，但是存在内存浪费问题

```js
function Star(uname, age) {
     this.uname = uname;
     this.age = age;
     this.sing = function() {
     	console.log('song');
    }
}
var ldh = new Star('ldh', 32);
var zxy = new Star('zxy',36);
console.log(ldh.sing === zxy.sing)  // false
```

在以上代码片段的构造函数 Start 中，sing 为复杂数据类型，两个实例对象开辟了两个内存空间，来存放同一个函数方法。





### 构造函数原型 prototype

构造函数通过原型分配的函数是所有对象所共享的。

JavaScript 规定，每一个构造函数都有一个 `prototype` 属性，指向另一个对象。注意这个 `prototype` 就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有。

我们可以把那些不变的方法，直接定义在 `prototype` 对象上，这样所有对象的实例就可以共享这些方法。



```js
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function() {
	console.log('song');
}
var ldh = new Star('刘德华', 18);
var zxy = new Star('张学友', 19);
ldh.sing();
zxy.sing();
console.log(ldh.sing === zxy.sing);  // true
```



### 对象原型 \__proto__

对象都会有一个属性 `__proto__ `指向构造函数的 `prototype` 原型对象，之所以我们对象可以使用构造函数 `prototype` 原型对象的属性和方法，就是因为对象有 `__proto__` 原型的存在。
`__proto__` 对象原型和原型对象 `prototype` 是等价的
`__proto__` 对象原型的意义就在于为对象的查找机制提供一个方向，或者说一条路线，但是它是一个非标准属性，因此实际开发中，不可以使用这个属性，它只是内部指向原型对象 `prototype`

```js
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function() {
	console.log('song');
}
var ldh = new Star('刘德华', 18);
var zxy = new Star('张学友', 19);
console.log(ldh.__proto__); // {sing: ƒ, constructor: ƒ}
console.log(ldh.__proto__ === Star.prototype); // true
console.log(ldh.__proto__.sing === Star.prototype.sing);	// true
console.log(ldh.__proto__ === zxy.__proto__); // true
```



### 构造函数 constructor

对象原型 `__proto__` 和构造函数 `prototype` 原型对象里面都有一个属性 `constructor` 属性 ，`constructor` 我们称为构造函数，因为它指回构造函数本身。

`constructor` 主要用于记录该对象引用于哪个构造函数，它可以让原型对象重新指向原来的构造函数。

一般情况下，对象的方法都在构造函数的原型对象中设置。如果有多个对象的方法，我们可以给原型对象采取对象形式赋值，但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 `constructor`  就不再指向当前构造函数了。此时，我们可以在修改后的原型对象中，添加一个 `constructor` 指向原来的构造函数。



```js
function Star(uname, age) {
	this.uname = uname;
	this.age = age;
}
// Star.prototype.sing = function(){
//     console.log('song');
// }
// Star.prototype.movie = function(){
//     console.log('film');
// }
// var ldh = new Star('ldh', 32);
// console.log(ldh.__proto__);  
// 输出 {sing: ƒ, movie: ƒ, constructor: f Star(uname, age)} 
// 通过一般形式添加方法，constructor 指向没有改变
Star.prototype = {
    // constructor: Star, //手动指定构造函数
    sing:function(){
        console.log('song');
    },
    movie:function(){
        console.log('film');
    }
}
var ldh = new Star('ldh', 32);
console.log(ldh.__proto__);
// 输出 {sing: ƒ, movie: ƒ}
// 通过对象形式添加方法，丢失 constructor 属性
// 此时需要手动自定其指向
// 注意通过对象形式，会覆盖原本的 prototype 属性
```



### 构造函数 实例 原型对象三角关系

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200821131936.png)



### 原型链

每一个实例对象又有一个 `__proto__` 属性，指向的构造函数的原型对象，构造函数的原型对象也是一个对象，也有 `__proto__` 属性，这样一层一层往上找就形成了原型链。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200821135207.png)





根据上图，我们可以建立庞大复杂的对象模型，请严格遵守链式调用规则，比如我需要访问 ldh 实例对象 的构造函数时，遵循原型链，其语法应该为：

```js
// 先访问原型对象，再通过原型对象访问构造函数。
ldh.__proto__.constructor
```



### 成员查找机制

1. 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。
2. 如果没有就查找它的原型
3. 如果还没有就查找原型对象的原型（Object的原型对象）。
4. 依此类推一直找到 Object 为止（null）。



`__proto__` 对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线。





### 原型对象中的this指向

构造函数中的this和原型对象的this,都指向我们new出来的实例对象。

```js
var here,that;
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
    here = this;
}
Star.prototype.sing = function () {
    that = this;
}
var ldh = new Star('刘德华', 18);
console.log(here === ldh); // true
// 1. 在构造函数中,里面this指向的是对象实例 ldh
ldh.sing();
console.log(that === ldh); // true
// 2.原型对象函数里面的this 指向的是 实例对象 ldh
```



### 扩展内置对象

通过对象原型，对原来的内置对象进行扩展自定义方法。比如，我们为内置对象 `Array` 扩展一个求数组总和的方法 `sum()`

```js
Array.prototype.sum = function(){
    var sum = 0;
    for(var i=0; i < this.length; i++){
        sum += this[i];
    }
    return sum;
}
var arr = [1,2,3,4,5,6,7,8,9];
console.log(arr.sum());
```



## 组合继承

在 ES6 之前，并没有 `extends` 关键字，我们只能通过构造函数+原型对象模拟实现继承，被称为组合继承



### call() 方法

`call()` 可以调用函数

`call()` 可以修改 `this` 的指向,使用 `call()` 的时候 参数一是修改后的 `this` 指向,参数2,参数3..使用逗号隔开连接

```js
function fn(x, y) {
     console.log(this);
     console.log(x + y);
}
var o = {
	name: 'andy'
};
fn.call(o, 1, 2);//调用了函数此时的this指向了对象o

// 输出：
// {name: "andy"}
// 3
```



### 构造函数继承属性

通过 `call()` 关键字，修改父构造函数的 `this` 指向为 子构造函数的实例。

```js {11}
 // 1. 父构造函数
function Father(uname, age) {
	// this 指向父构造函数的对象实例
	this.uname = uname;
	this.age = age;
}
// 2 .子构造函数 
function Son(uname, age, score) {
    // this 指向子构造函数的对象实例
// 3.使用call方式实现子继承父的属性
	Father.call(this, uname, age);
  	this.score = score;
}
var son = new Son('刘德华', 18, 100);
console.log(son);
```

以上实例 Son 构造函数继承了父亲 Father 的 `uname` 和 `age` 属性。



### 原型对象继承方法

1. 先定义一个父构造函数
2. 再定义一个子构造函数
3. 子构造函数继承父构造函数的属性(使用call方法)

```js
// 1. 父构造函数
function Father(uname, age) {
  // this 指向父构造函数的对象实例
  this.uname = uname;
  this.age = age;
}
Father.prototype.money = function() {
  console.log(100000);
 };
// 2 .子构造函数 
  function Son(uname, age, score) {
      // this 指向子构造函数的对象实例
      Father.call(this, uname, age);
      this.score = score;
  }
// Son.prototype = Father.prototype;  
// 这样直接赋值会传递地址,如果修改子原型对象,父原型对象也会跟着一起变化
Son.prototype = new Father();
// 如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
Son.prototype.constructor = Son;
// 这个是子构造函数专门的方法
Son.prototype.exam = function() {
	console.log('孩子要考试');
}
var son = new Son('刘德华', 18, 100);
console.log(son);
```



## ES5 新增方法

### 数组方法

迭代（遍历）数组：`forEach()` , `map()` , `filter()` , `some()` , `every()` 



**`forEach()`**

该方法会遍历当前数组，并提供一个带参数的回调函数。

```js
arr.forEach(function(value, index, array) {
    console.log("第" + index + "数组元素：" + value);
	//console.log("当前数组：" + array);
})
// 注意回调函数中的参数命名是可以自定义的
```



**`map()`**

`map()` 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

```js
var array1 = [1, 4, 9, 16];

// pass a function to map
var map1 = array1.map(function(value, index, array){
    return value*2;
});

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```



**`filter()`**

`filter()` 方法会遍历当前数组，并为每个元素执行函数，返回新的数组。

```js
var arr = [12, 66, 4, 88, 3, 7];
var newArr = arr.filter(function(value, index, array) {
 	return value %2 == 0;
});
console.log(newArr);	// 返回数组中的偶数
```



**`some()`**

`some()` 方法用于查找当前数组中元素是否满足条件，其返回一个布尔值，查找到返回 true , 否则 false。如果查找到第一个符号条件，跳出循环。

```js
var arr = [10, 30, 4];
var flag = arr.some(function(value,index,array) {
	return value < 3;
});
console.log(flag); // false
```



**`every()`**

`every()` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

```js
var arr = [1, 30, 39, 29, 10, 13];
var flag = arr.every(function(value,index,array) {
    console.log(value);
    return value < 60
});
console.log(flag);		// true
```





**筛选商品案例**

::: details

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="jquery.min.js"></script>
    <title>Document</title>
    <style>
        table {
            width: 400px;
            border: 1px solid #000;
            border-collapse: collapse;
            margin: 0 auto;
        }
        td,
        th {
            border: 1px solid #000;
            text-align: center;
        }
        input {
            width: 50px;
        }
        .search {
            width: 600px;
            margin: 20px auto;
        }
    </style>
</head>

<body>
    <div class="search">
        按照价格查询: <input type="text" class="start"> - <input type="text" class="end"> <button class="search-price">搜索</button> 按照商品名称查询: <input type="text" class="product"> <button class="search-pro">查询</button>
    </div>
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>产品名称</th>
                <th>价格</th>
            </tr>
        </thead>
        <tbody>


        </tbody>
    </table>
    <script>
        var data = [{
            id: 1,
            pname: '小米',
            price: 3999
        }, {
            id: 2,
            pname: 'oppo',
            price: 999
        }, {
            id: 3,
            pname: '荣耀',
            price: 1299
        }, {
            id: 4,
            pname: '华为',
            price: 1999
        }, ];

        var tbody = $("tbody");
        var search = $(".search-price");
        var start = $(".start");
        var end = $(".end");
        var product = $(".product");
        var searchpro = $(".search-pro")

        updata(data)
        function updata(data){
            data.forEach(function(value){
                var tr = $("<tr></tr>");
                tr.html(`
                    <td>${value.id}</td>
                    <td>${value.pname}</td>
                    <td>${value.price}</td>
                `);
                tbody.append(tr);
            });
        };
        function clsdata(){
            tbody.empty();
        };
        

        search.on("click",function(){
            var newdata = data.filter(function(value){
                return value.price >= start.val() && value.price <=  end.val();
            });
            clsdata();
            updata(newdata);
        });

        searchpro.on("click",function(){
            var newdata = data.filter(function(value){
                return value.pname == product.val();
            });
            clsdata();
            updata(newdata);
        });

    </script>
</body>

</html>
```

:::







### 字符串方法



**`trim()`**

`trim()` 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。

```js
var greeting = '   Hello world!   ';

console.log(greeting);
// expected output: "   Hello world!   ";

console.log(greeting.trim());
// expected output: "Hello world!";
```





### 对象方法

**`Object.keys()`**

`Object.keys()` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

```js
var data = {
    id: 1,
    pname: '小米',
    price: 3999
};

var newdata = Object.keys(data);
console.log(newdata);
// expected output:
// Array(3)
// 0: "id"
// 1: "pname"
// 2: "price"
```



**`Object.defineProperty()`**

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```js
var data = {
    id: 1,
    pname: '小米',
    price: 3999
};
Object.defineProperty(data,'num',{
    value:1000,
    writable: false, // 不允许重写
    enumerable: true, // 允许遍历 默认false
    configurable: false // 不允许删除 不允许特性修改
})

// delete data.num;
```

**语法**

```
Object.defineProperty(obj, prop, descriptor)
```

**参数**

- `obj`

  要定义属性的对象。

- `prop`

  要定义或修改的属性的名称或 `Symbol`。

- `descriptor`

  要定义或修改的属性描述符。

**返回值**

被传递给函数的对象。











