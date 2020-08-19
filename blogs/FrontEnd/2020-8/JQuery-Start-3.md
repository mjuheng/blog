---
title: JQuery 入门（三）
date: 2020-08-16
sidebar: false
categories:
 - FrontEnd
tags:
 - javascript
 - jquery
publish: false
---



## JQuery 事件注册

jQuery 为我们提供了方便的事件注册机制，优缺点如下：

- 优点: 操作简单，且不用担心事件覆盖等问题。
- 缺点: 普通的事件注册不能做事件委托，且无法实现事件解绑，需要借助其他方法。

**语法**

```js
$("div").click(function(){})
```

事件类型和原生js基本一致 `mouseover` , `mouseout` , `blur` , `focus` , `keydown` , `resize` ...



## JQuery 事件处理

因为普通注册事件方法的不足，jQuery又开发了多个处理方法 ：

- `on()`: 用于事件绑定，目前最好用的事件绑定方法
- `off()`: 事件解绑
- `trigger() / triggerHandler()`: 事件触发



### 事件绑定

因为普通注册事件方法的不足，jQuery又创建了多个新的事件绑定方法 `bind() / live() / delegate() / on()` 等，其中最好用的是: `on()`



```js
// 多事件绑定
$("div").on({
    mouseover:function(){},
    mouseout :function(){},
    click	 :function(){}
});

// 如果事件处理程序相同
$("div").on({
    "mouseover mouseout",function(){};
});

// 事件委派
$("ul").on("click","li",function(){})
// 在此之前有 bind() live() delegate()等方法处理事件委托 现以用 on() 替代


// 动态创建元素绑定
$("div").on("click","p",function(){})
$("div").append($("<p>future elem</p>"));
```



### 事件解绑

当某个事件上面的逻辑，在特定需求下不需要的时候，可以把该事件上的逻辑移除，这个过程我们称为事件解绑。jQuery 为我们提供 了多种事件解绑方法：`die() / undelegate() / off() ` 等，甚至还有只触发一次的事件绑定方法 `one()` ，在这里我们重点讲解一下 `off() `;



**`off()`**

```js
$("p").off()					// 解绑全部事件
$("p").off("click")				// 解绑指定事件
$("ul").off("click","li")		// 解绑事件委托
```



### 自定触发事件

有些时候，在某些特定的条件下，我们希望某些事件能够自动触发, 比如轮播图自动播放功能跟点击右侧按钮一致。可以利用定时器自动触发右侧按钮点击事件，不必鼠标点击触发。由此 jQuery 为我们提供了两个自动触发事件 `trigger()` 和  `triggerHandler()` ; 



**`trigger()`**

```js
elemnet.click()
element.trigger("type")
```



**`triggerHandler()`**

```js
element.triggerHandler(type)
```

`triggerHandler()` 不会触发元素的默认行为，如输入框获取焦点后，光标闪烁。





## JQuery 事件对象

jQuery 对DOM中的事件对象 event 进行了封装，兼容性更好，获取更方便，使用变化不大。事件被触发，就会有事件对象的产生。

```js
element.on(events,[selector],function(e){})
```

- 阻止默认行为：`e.preventDefault()`
- 阻止冒泡：`e.stopPropagation()` 



## JQuery 拷贝对象

如果想要把某个对象拷贝（合并）给另外一个对象使用，此时可以使用 `$.extend()` 方法



**`$.extend()`**

```js
$.extend([deep],待拷贝对象,拷贝原件,[objectN])
```

- `deep` ：拷贝深浅，默认浅拷贝
  - 浅拷贝目标对象引用被拷贝对象的地址，修改目标对象**会影响**被拷贝对象，对象嵌套
  - 深拷贝完全克隆一份对象，修改目标对象**不会影响**被拷贝对象，对象嵌套
- `target` ：需要拷贝的对象
- `object` ：待拷贝对象
- `objectN` ：复数拷贝

```js
var tobj = {};
var obj = {
    id: 1,
    name: "andy",
    msg:{
        pid: 999
    }
};
$.extend(tobj,obj);
obj.msg.pid = 66666;
console.log(tobj,obj);

// msg 被拷贝地址，原对象和拷贝对象都指向一个内存地址
```





## JQuery 多库共存

实际开发中，很多项目连续开发十多年，jQuery版本不断更新，最初的 jQuery 版本无法满足需求，这时就需要保证在旧有版本正常运行的情况下，新的功能使用新的jQuery版本实现，这种情况被称为，jQuery 多库共存。



可能存在这样的情况，其他 js 库或函数使用了 $ 符作为函数封装，这样就会与 JQuery 产生冲突，JQuery 为我们提供了解决方案



1. 使用 `JQuery() `替代 `$()` 
2. JQuery 释放 `$` 符控制权：`var Pick = $.noConfilict()` ，这样我们就可以使用 `Pick()` 

```js
$(function() {
    // 让jquery 释放对$ 控制权 让用自己决定
    var suibian = jQuery.noConflict();
    console.log(suibian("span"));
})
```









## JQuery 插件

jQuery 功能比较有限，想要更复杂的特效效果，可以借助于 jQuery 插件完成。 这些插件也是依赖于 jQuery 来完成的，所以必须要先引入 jQuery 文件，因此也称为 jQuery 插件。



jQuery 插件常用的网站：

- [JQuery插件库](http://www.jq22.com/ ) 
- [JQuery之家](http://www.htmleaf.com/ ) 







## 综合案例 toDoList









