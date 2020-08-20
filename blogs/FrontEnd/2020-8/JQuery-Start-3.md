---
title: JQuery 入门（三）
date: 2020-08-20
sidebar: false
categories:
 - FrontEnd
tags:
 - javascript
 - jquery
publish: true
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

**需求**

1. 文本框里面输入内容，按下回车，就可以生成待办事项。
2. 点击待办事项复选框，就可以把当前数据添加到已完成事项里面。
3. 点击已完成事项复选框，就可以把当前数据添加到待办事项里面。
4. 页面刷新内容不会丢失。



**分析**

1. 刷新页面不会丢失数据，因此需要用到本地存储 `localStorage`
2. 不管按下回车，还是点击复选框，都是把本地存储的数据加载到页面中，这样保证刷新关闭页面不会丢失数据
3. 存储的数据格式：`var todolist =  [{ title : ‘xxx’, done: false}]`
4. 注意点1： 本地存储 `localStorage` 里面只能存储字符串格式 ，因此需要把对象转换为字符串 `JSON.stringify(data)`。
5. 注意点2： 获取本地存储数据，需要把里面的字符串转换为对象格式 `JSON.parse()` 我们才能使用里面的数据。



**功能实现**

---



**新添todo**

1. 切记： 页面中的数据，都要从本地存储里面获取，这样刷新页面不会丢失数据，所以先要把数据保存到本地存储里面。
2. 利用事件对象 `.keyCode` 判断用户按下回车键（13）。
3. 声明一个数组，保存数据。
4. 先要读取本地存储原来的数据（声明函数 `getData()` ），放到这个数组里面。
5. 之后把最新从表单获取过来的数据，追加到数组里面。
6. 最后把数组存储给本地存储 (声明函数 `savaDate()` )



**加载todo**

1. 因为后面也会经常渲染加载操作，所以声明一个函数 `load` ，方便后面调用
2. 先要读取本地存储数据。（数据不要忘记转换为对象格式）
3. 之后遍历这个数据（ `$.each()` ），有几条数据，就生成几个小 `li` 添加到 `ol` 里面
4. 每次渲染之前，先把原先里面 `ol` 的内容清空，然后渲染加载最新的数据



**删除todo**

1. 点击里面的a链接，不是删除的 `li` ，而是删除本地存储对应的数据。
2. 先获取本地存储数据，删除对应的数据，保存给本地存储，重新渲染列表li
3. 我们可以给链接自定义属性记录当前的索引号
4. 根据这个索引号删除相关的数据----数组的 `splice(i, 1)` 方法
5. 存储修改后的数据，然后存储给本地存储
6. 重新渲染加载数据列表
7. 因为a是动态创建的，我们使用 `on()` 绑定事件



**完成todo**

1. 当我们点击了小的复选框，修改本地存储数据，再重新渲染数据列表。
2. 点击之后，获取本地存储数据。
3. 修改对应数据属性 `done` 为当前复选框的 `checked` 状态。
4. 之后保存数据到本地存储
5. 重新渲染加载数据列表
6. `load` 加载函数里面，新增一个条件,如果当前数据的 `done` 为 `true` 就是已经完成的，就把列表渲染加载到 `ul` 里面
7. 如果当前数据的 `done` 为 `false` ， 则是待办事项，就把列表渲染加载到 `ol` 里面



**统计todo**

1. 在我们 `load` 函数里面操作
2. 声明2个变量 ：`todoCount` 待办个数  `doneCount` 已完成个数   
3. 当进行遍历本地存储数据的时候， 如果 数据 `done` 为 `false` ， 则 `todoCount++` , 否则 `doneCount++`
4. 最后修改相应的元素 `text() ` 



