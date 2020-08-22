---
title: JavaScipt高级（三）函数进阶
date: 2020-08-22
sidebar: false
categories:
 - FrontEnd
tags:
 - javascript
publish: true
---





- 函数
- this
- 严格模式
- 闭包
- 递归

<!-- more -->

## 函数

### 函数定义

1. 函数声明 function 关键字 （命名函数）

```js
function fn(){}
```

2. 函数表达式 （匿名函数）

```js
var fn = function(){}
```

3. new 关键字 (构造函数)

```js
var fn = new Function('参数1','参数2'..., '函数体')
```

- Function 里面参数都必须是字符串格式



### 函数调用

```js
/* 1. 普通函数 */
function fn() {}
fn();

/* 2. 对象的方法 */
var obj = {
  fn: function() {}
}
obj.fn();

/* 3. 实例函数*/
function fn(){}
new fn();

/* 4. 绑定事件函数*/
btn.onclick = function() {}; 

/* 5. 定时器函数*/
setInterval(function() {}, 1000);

/* 6. 立即执行函数(自调用函数)*/
(function() {})();
```





## 函数内的this指向

这些 this 的指向，是当我们调用函数的时候确定的。调用方式的不同决定了this 的指向不同，一般指向我们的调用者

| 调用方式     | this 指向                                 |
| ------------ | ----------------------------------------- |
| 普通函数调用 | window                                    |
| 构造函数调用 | 实例对象 原型对象里面的方法也指向实例对象 |
| 对象方法调用 | 该方法所属对象                            |
| 事件绑定方法 | 绑定事件对象                              |
| 定时器函数   | window                                    |
| 立即执行函数 | window                                    |



## 改变函数this指向



### call()

call()方法调用一个对象。简单理解为调用函数的方式，但是它可以改变函数的 this 指向

应用场景：继承

```js
var o = {
	name: 'andy'
}
 function fn(a, b) {
      console.log(this);
      console.log(a+b)
};
fn(1,2)// 此时的this指向的是window 运行结果为3
fn.call(o,1,2)//此时的this指向的是对象o,参数使用逗号隔开,运行结果为3
```



### apply()

apply() 方法调用一个函数。简单理解为调用函数的方式，但是它可以改变函数的 this 指向。

应用场景：数组

```js
var o = {
	name: 'andy'
}
function fn(a, b) {
      console.log(this);
      console.log(a+b)
};
fn()// 此时的this指向的是window 运行结果为3
fn.apply(o,[1,2])//此时的this指向的是对象o,参数使用数组传递 运行结果为3
```



### bind()

bind() 方法不会调用函数,但是能改变函数内部this 指向,返回的是原函数改变this之后产生的新函数

如果只是想改变 this 指向，并且不想调用这个函数的时候，可以使用bind

```js
var o = {
	name: 'andy'
};

function fn(a, b) {
    console.log(this);
    console.log(a + b);
};
var f = fn.bind(o, 1, 2); //此处的f是bind返回的新函数
f();//调用新函数  this指向的是对象o 参数使用逗号隔开
```



> call、apply、bind三者的异同
>
> - 共同点 : 都可以改变this指向
> - 不同点:
>   - call 和 apply  会调用函数, 并且改变函数内部this指向.
>   - call 和 apply传递的参数不一样,call传递参数使用逗号隔开,apply使用数组传递
>   - bind  不会调用函数, 可以改变函数内部this指向.
>
>
> - 应用场景
>   1. call 经常做继承. 
>   2. apply经常跟数组有关系.  比如借助于数学对象实现数组最大值最小值
>   3. bind  不调用函数,但是还想改变this指向. 比如改变定时器内部的this指向. 



## 严格模式

JavaScript 除了提供正常模式外，还提供了**严格模式（strict mode）**。ES5 的严格模式是采用具有限制性 JavaScript变体的一种方式，即在严格的条件下运行 JS 代码。

严格模式在 IE10 以上版本的浏览器中才会被支持，旧版本浏览器中会被忽略。

严格模式对正常的 JavaScript 语义做了一些更改： 

1. 消除了 Javascript 语法的一些不合理、不严谨之处，减少了一些怪异行为。

2. 消除代码运行的一些不安全之处，保证代码运行的安全。

3. 提高编译器效率，增加运行速度。

4. 禁用了在 ECMAScript 的未来版本中可能会定义的一些语法，为未来新版本的 Javascript 做好铺垫。比如一些保留字如：class,enum,export, extends, import, super 不能做变量名



### 开启严格模式

严格模式可以应用到整个脚本或个别函数中。因此在使用时，我们可以将严格模式分为为 **脚本开启严格模式** 和为 **函数开启严格模式** 两种情况。

- 脚本开启严格模式

```html
(function (){
	//在当前的这个自调用函数中有开启严格模式
	"use strict";
})();

<script>
    //当前script标签开启了严格模式
  　"use strict"; 
</script>
```

- 为函数开启严格模式

```js
function fn(){
　　"use strict";
} 
//当前fn函数开启了严格模式
```



### 严格模式规范

**变量规定**

- 在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种做法，变量必须先声明再使用

```js
'use strict';
num = 10;
// output: num is not defined
```

- 不允许使用 `delete` 关键字删除变量

```js
'use strict';
var num;
delete num;
// output: Delete of an unqualified identifier in strict mode.
```

- 全局声明函数（包括构造函数）中的 `this` 不再指向 `window` 而是 `undefined`

```js
'use strict';
function fn(){
    console.log(this)
}
fn();
// output: undefined
```

- 定时器函数内指向仍是 `window` , 对于构造函数，`this` 仍指向实例对象（类名调用除外）
- 不允许函数参数同名

```js
'use strict';
function fn(a,a){
    
}
fn(1,2);
// output: Duplicate parameter name not allowed in this context
```

- 不允许在非函数的代码块内声明函数

```js
'use strict';
if(true){
    function fn(){};	// error
};
for(){
    function fn(){};	// error
}
function fn(){
    function fn2(){};	// allow
}
```



## 高阶函数

高阶函数是对其他函数进行操作的函数，它接收函数作为参数或将函数作为返回值输出。

```js
// 将函数作为参数传递
function fn(callback){
    callback && callback();
}
fn(function(){
    console.log('hi')
})

// 将函数作为返回值
function fn(){
    return function(){
        console.log('hi')
    }
}
var fnl = fn();
```

函数也是一种数据类型，同样可以作为参数，传递给另外一个参数使用。最典型的就是作为回调函数。

同理函数也可以作为返回值传递回来



## 闭包

### 变量作用域

变量根据作用域的不同分为两种：全局变量和局部变量。

1. 函数内部可以使用全局变量。
2. 函数外部不可以使用局部变量。

当函数执行完毕，本作用域内的局部变量会销毁。



### 闭包定义

闭包（closure）指有权访问另一个函数作用域中变量的函数。 -----《JavaScript高级程序设计》



简单理解就是 ，一个作用域可以访问另外一个函数内部的局部变量。

```js
function fn1(){			// fn1 就是闭包函数
    var num = 10;
    function fn2(){
        console.log(num)	// 10
    }
    fn2()
}
fn1();
```



通过浏览器的断点调试中 Scope 属性我们能够清除看见当前函数是否闭包。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200822120427.png)



### 闭包的作用

- 延伸变量的作用范围。
- 防止变量环境污染。
- 利于模块化设计和方法封装

```js
function fn1(){
    var num = 10;
    return function fn2(){
        console.log(num);
    }
}
var f = fn1();
f();
```



### 闭包案例

**1. 循环注册点击事件**

```js
var lis = document.querySelectorAll('.nav li');
for(var i = 0; i < lis.length; i++){
    (function(i){
        lis[i].onclick = function(){
            console.log(i);
        }
    })(i)
}
```

**2. 3秒钟之后,打印所有li元素的内容**

```js
 for (var i = 0; i < lis.length; i++) {
   (function(i) {
     setTimeout(function() {
     console.log(lis[i].innerHTML);
     }, 3000)
   })(i);
}
```

**3. 计算打车价格 **
打车起步价13(3公里内),  之后每多一公里增加 5块钱.  用户输入公里数就可以计算打车价格
如果有拥堵情况,总价格多收取10块钱拥堵费

```js
var car = (function() {
    var start = 13; // 起步价  局部变量
    var total = 0; // 总价  局部变量
    return {
        // 正常的总价
        price: function(n) {
            if (n <= 3) {
                total = start;
            } else {
                total = start + (n - 3) * 5
            }
            return total;
        },
        // 拥堵之后的费用
        yd: function(flag) {
            return flag ? total + 10 : total;
        }
    }
})();
console.log(car.price(5)); // 23
console.log(car.yd(true)); // 33
```



### 经典实例

```js
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        return function() {
            return this.name;
    	};
	}
};
console.log(object.getNameFunc()())		// The Window
// console.log(function(){return this.name;}())	
-----------------------------------------------------------------
var name = "The Window";　　
var object = {　　　　
    name: "My Object",
    getNameFunc: function() {
    	var that = this;
    	return function() {
    		return that.name;
    };
  }
};
console.log(object.getNameFunc()())		// My Object
```





## 递归

### 递归定义

**递归：**如果一个函数在内部可以调用其本身，那么这个函数就是递归函数。简单理解:函数内部自己调用自己, 这个函数就是递归函数

**注意：**递归函数的作用和循环效果一样，由于递归很容易发生“栈溢出”错误（stack overflow），所以必须要加退出条件return。

```js
function fn(x) {
    if(x){
        console.log(--x);
        fn(x);
    }else{
        return;
    }
}
fn(5);
```

### 阶乘

```js
function fn(x) {
    if(x == 1){
        return 1;
    }
    return x*fn(x-1);
}
console.log(fn(3));  // 6
```



### 斐波那契数列

```js
function fb(n) {
    if(n == 1 || n==2){
        return 1;
    }
    return fb(n-1) + fb(n-2);
}
console.log(fb(6));  // 8
```





### 遍历

```js
var data = [{
    id: 1,
    name: '家电',
    goods:
        [
            {
                id: 11,
                gname: '冰箱',
                goods:
                    [
                        {
                            id: 111,
                            gname: '海尔'
                        },
                        {
                            id: 112,
                            gname: '美的'
                        },
                    ]
            },
            {
                id: 12,
                gname: '洗衣机'
            }
        ]
}, {
    id: 2,
    name: '服饰'
}];

function getID(json, id) {
    json.forEach(function (item, index, arr) {
        if (item.id == id) {
            console.log(item);
        } else if (item.goods && item.goods.length) {
            getID(item.goods, id);
        }
    })
}
getID(data, 111);
```



递归遍历与DFS(深度优先遍历效果一致)





## 深浅拷贝

**浅拷贝**只会拷贝一层，更深层次的对象只会引用地址

**深拷贝**拷贝多层，所有数据都会创建新内存空间



```js
var obj = {
    id : 1,
    name : 'ws',
    msg : {
        content : 'string---'
    }
};
var n = {};

// 直接引用相同地址
n = obj;

// 原生js实现浅拷贝
for(var k in obj){
    n[k] =obj[k];
}

// ES6 新增浅拷贝方法
Object.assign(n,obj);

// 原生js实现深拷贝
function deepCopy(target, source){
    for(var k in source){
        var item = source[k];
        // 注意数组也属于 Object 应在 Object 前判断
        if( item instanceof Array ){
            target[k] = [];
            deepCopy(target[k],item);
        }else if(item instanceof Object){
            target[k]={};
            deepCopy(target[k],item);
        }else{
            target[k] = item
        }
    }
}
```











