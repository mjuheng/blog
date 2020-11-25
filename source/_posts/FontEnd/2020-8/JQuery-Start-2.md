---
title: JQuery 入门（二）
date: 2020-08-18
sidebar: false
categories:
 - FrontEnd
tags:
 - JavaScript
 - JQuery
publish: true
---



- JQuery 属性操作
- JQuery 文本内容
- JQuery 节点操作
- JQuery 尺寸位置

<!-- more -->

## JQuery 属性操作

jQuery 常用属性操作有三种

- `prop() `
- `attr() `
- `data()`



### prop()

固有属性操作

所谓元素固有属性就是元素本身自带的属性，比如 `<a>` 元素里面的 `href` ，比如 `<input>` 元素里面的 `type`。 

**语法**

1. 获取属性

```js
prop("属性")
```

2. 设置属性

```js
prop("属性","属性值")
```



prop() 除了普通属性操作，更适合操作表单属性：`disabled / checked / selected` 等。



### attr()

自定义属性操作

用户自己给元素添加的属性，我们称为自定义属性。 比如给 `div` 添加 `index =“1”`。 

**语法**

1. 获取属性

```js
attr("属性")      		// 类似原生 getAttribute()
```

2. 设置属性

```js
attr("属性","属性值")			// setAttribute()
```



attr() 除了普通属性操作，更适合操作自定义属性。（该方法也可以获取 H5 自定义属性）

### data()

数据缓存

`data()` 方法可以在指定的元素上存取数据，并不会修改 DOM 元素结构。一旦页面刷新，之前存放的数据都将被移除。 

**语法**

1. 附加数据

```js
data("name","value");
```

2. 获取数据

```js
data("name")
```



## JQuery 文本属性

jQuery的文本属性值常见操作有三种：`html() / text() / val()`  分别对应JS中的 `innerHTML innerText value` 属性。



### html()

```js
html()				//获取
html("content")		//修改
```



### text()

```js
text()				//获取
text("content")		//修改
```



### val()

表单值操作

```js
val()				//获取
val("value")		//修改
```





## JQuery 节点操作

jQuery 元素操作主要讲的是用jQuery方法，操作标签的遍历、创建、添加、删除等操作。





### 遍历元素

jQuery 隐式迭代是对同一类元素做了同样的操作。 如果想要给同一类元素做不同操作，就需要用到遍历。



**语法1**

```js
$("div").each(function(index,domEle){
    // code
})
```

- `function` ：回调函数
  - `index` ：元素索引号
  - `domEle` ：DOM 元素对象

此方法用于遍历 jQuery 对象中的每一项，回调函数中元素为 DOM 对象，想要使用 jQuery 方法需要转换 `$(domEle)` 。



**语法2**

```js
$.each(object,function(index,domEle){
    // code
})
```

`$.each()` 方法可以用于遍历任何对象。主要用于数据处理，比如数组，对象。



### 增删元素

jQuery方法操作元素的创建、添加、删除方法很多，则重点使用部分，如下：

**创建**

```js
$("<li></li>")
```

**内部添加** 父子添加

```js
element.append("内容")
```

把内容放入匹配元素内部的最后面，类似原生 `appendChild`

```js
element.prepend("内容")
```

把内容放入匹配元素最前面



**外部添加** 兄弟添加

```js
element.after("内容")			// 把内容放入目标元素后面
element.before("内容")		// 把内容放入目标元素前面
```



**删除元素**

```js
element.remove()		// 删除匹配元素本身
element.empty()			// 删除匹配元素内子节点
element.html("")		// 情况匹配元素内子节点
```





## JQuery 尺寸操作

jQuery 尺寸操作包括元素宽高的获取和设置，且不一样的API对应不一样的盒子模型。

| 语法                                   | 说明                                            |
| -------------------------------------- | ----------------------------------------------- |
| `width() / height()`                   | 取得匹配元素的宽高度 只算 width / height        |
| `innerWidth() / innerHeight()`         | 取得匹配元素的宽高度 包含 padding               |
| `outerWidth() / outerHeight()`         | 取得匹配元素的宽高度 包含 padding border        |
| `outerWidth(true) / outerHeight(true)` | 取得匹配元素的宽高度 包含 padding border margin |

有了这套 API 我们将可以快速获取盒子的宽高，至于其他属性想要获取和设置，还要使用 css() 等方法配合



## JQuery 位置操作

jQuery的位置操作主要有三个： `offset()、position()、scrollTop()/scrollLeft() `, 具体介绍如下:



**`offset()`**

- 设置或返回被选元素相对于文档的偏移坐标，和父级无关
- 该方法有两个属性 `left` , `top` 。`offset().top` 用于获取距离文档顶部的距离，`offset().left` 用于获取距离文档左侧的距离。
- 设置元素偏移 ： `offset({top:10,left:10})`



**`position()`**

- 返回被选元素相对于带有定位的父级偏移坐标，如果父级没有定位，这相对于文档。
- 该方法有两个属性值 `left` `top`
- 该方法只能获取



**`scrollTop() / scrollLeft()`**

- 设置或返回被选元素被卷去的头部
- 设置 `scrollTop(100)`

