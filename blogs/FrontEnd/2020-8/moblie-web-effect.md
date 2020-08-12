---
title: 移动端常见网页特效
date: 2020-08-07
sidebar: false
categories:
 - FrontEnd
tags:
 - Web Design
publish: true
---



## 触屏事件

移动端浏览器兼容性较好，我们不需要考虑 JS 兼容问题，可以放心使用原生 js 书写效果，但是移动端也有自己独特的地方，比如触屏事件 `touch` 。



`touch` 对象代表一个触摸点，触摸点可能是一根手指，也可能是一根触摸笔。触屏事件可以响应用户手指对屏幕或触控板的操作。



常见的触屏事件：

| 事件         | 说明                            |
| ------------ | ------------------------------- |
| `touchstart` | 触摸到一个 DOM 元素时触发       |
| `touchmove`  | 在一个 DOM 上滑动时触发         |
| `touchend`   | 手指从一个 DOM 元素上移开时触发 |









**触摸事件对象**

---

`touchstart` , `touchmove` ,`touchend`  三个事件都有各自的事件对象



`TouchEvent` 是一类描述手指在触摸平面的状态变化的事件。这类事件作用与描述一个或多个触点，使开发者可以检测触点的移动，触点的增加和减少，等等。



| 属性对象         | 说明                                         |
| ---------------- | -------------------------------------------- |
| `touches`        | 正在触摸屏幕的所有手指的一个列表             |
| `targetTouches`  | 正在触摸当前 DOM 元素上的手指的一个列表      |
| `changedTouches` | 手指状态发生了改变的列表，从无到有，从有到无 |





**移动端拖动元素**

- `touchstarts`,`touchmove`,`touchend` 可以实现拖动元素
- 但是拖动元素需要当前手指的坐标值，我们可以使用 `tarfetTouches[0]` 里的 `pageX` 和 `pageY`
- 在手指移动时计算出手指移动距离，然后用盒子原来的位置加上手指移动的距离

实现关键：

1. 触摸元素 `touchstart` ：获取手指初始坐标，同时获得盒子原来的位置
2. 移动手指 `touchmove` ： 计算手指的滑动距离，并且移动盒子
3. 离开手指 `touchend`



> 手指移动也会触发滚动屏幕，所以这里要阻止默认的屏幕滚动 `e.preventDefalut()`















## 移动端常见特效



### 轮播图

- 自动播放功能
  1. 开启定时器
  2. 移动端移动，可以使用 `transale` 移动
  3. 添加过渡效果 `transition`

- 无缝滚动
  1. 判断条件应等到图片滚动完毕后再去判断，就是过渡完成后判断
  2. 过渡完成检测事件 `transitionend`
  3. 如果索引号是最后一张，说明已经完成一个流程，此时索引号复原
  4. 注意需要去除过渡效果

- 圆点跟随变化
  1. 把 `ol` 里面 `li` 带有 `current` 类名的选出来去点类名 `classList.remove`
  2. 让当前索引的加上 `classList.add` `current` 类





`classList` 属性是 HTML5 新增的一个属性，返回元素的类名。

该属性用于在元素中添加，移除以及切换 css 类。

添加类：

```javascript
element.classList.add('classname')
```

删除类：

```javascript
element.classList.remove('classname')
```

切换类：

```javascript
element.classList.toggle('classname')
```





```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        ul,ol,li{
            list-style: none;
        }
        .focus{
            width: 100%;
            height: auto;
            position: relative;
            overflow: hidden;
        }
        .focus ul{
            width: 500%;
            overflow: hidden;
            margin-left: -100%;
        }
        .focus ul li{
            float: left;
            width:20%;
        }
        .focus ul li img{
            width: 100%;
        }
        .focus ol{
            position: absolute;
            bottom: 18px;
            right: 5px;
            margin: 0;
            z-index: 200;
        }
        .focus ol li{
            width: 5px;
            height: 5px;
            background-color: white;
            display: inline-block;
            border-radius: 4px;
            transition: all .3s;
        }
        .focus ol li.current{
            width: 15px;
        }
    </style>
</head>

<body>
    <div class="focus">
        <ul>
            <li><img src="05.jpg" alt=""></li>
            <li><img src="03.jpg" alt=""></li>
            <li><img src="04.jpg" alt=""></li>
            <li><img src="05.jpg" alt=""></li>
            <li><img src="03.jpg" alt=""></li>
        </ul>
        <ol>
            <li class="current"></li>
            <li></li>
            <li></li>
        </ol>
    </div>
    <script>
        var focus = document.querySelector('.focus');
        var ul = focus.children[0];
        var w = focus.offsetWidth;
        var index = 0;
        var ol = focus.children[1];
        var timer = setInterval(function(){
            person = false;
            index++;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX('+ -index*w +'px)';
        },2000);
        
        ul.addEventListener('transitionend',function(){
            if(index>=3){
                index = 0;
                ul.style.transition = 'none';
                ul.style.transform = 'translateX('+ -index*w +'px)';
            }
            if(index < 0){
                index = 2;
                ul.style.transition = 'none';
                ul.style.transform = 'translateX('+ -index*w +'px)';
            }
            
            ol.querySelector('.current').classList.remove('current');
            ol.children[index].classList.add('current');
        })

        var startX = 0;
        var moveX = 0;
        var flag = false;
        
        ul.addEventListener('touchstart',function(e){
            startX = e.targetTouches[0].pageX;
            clearInterval(timer);
        })
        ul.addEventListener('touchmove',function(e){
            e.preventDefault();
            moveX = e.targetTouches[0].pageX - startX;
            var translateX = -index * w + moveX;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX('+ translateX +'px)';
            flag = true;
        })
        ul.addEventListener('touchend',function(e){
            e.preventDefault();
            clearInterval(timer);
            if(flag){
                if(Math.abs(moveX) > 50){
                    if(moveX > 0){
                        index--;
                    }else{
                        index++;
                    }
                    var translateX = -index * w;
                    ul.style.transition = 'all .3s';
                    ul.style.transform = 'translateX('+ translateX +'px)';
                }else{
                    var translateX = -index * w;
                    ul.style.transition = 'all .3s';
                    ul.style.transform = 'translateX('+ translateX +'px)';
                }
            };

            timer = setInterval(function(){
                index++;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX('+ -index*w +'px)';
            },2000);
            
        });
        

    </script>
</body>

</html>
```







**click 延时解决方案**

---

移动端 `click` 事件会有 300ms 的延时，原因是移动端屏幕双击会缩放页面 （double tap to zoom）



解决方案：

1. 禁止用户缩放

```html
<meta name="viewport" content="user-scalable=no">
```

2. 利用 `touch` 事件封装函数解决
3. 使用 `fastclick` 插件（见移动端常用开发插件）



[Github：fastclick](https://github.com/ftlabs/fastclick)









## 移动端常用开发插件

移动端要求的是快速开发，所以我们经常会借助一些插件来帮助我们完成操作。

JS 插件是 js 文件，它遵循一定的规范编写，方便程序展示效果，拥有特定的功能且方便调用。如轮播图和瀑布流插件。

特点：专门为了解决某个问题而存在，功能单一，体积较小



插件使用：

1. 引入 JS 文件。
2. **查看文档说明。**





**Swiper**

https://www.swiper.com.cn/

**superslide**

https://www.superslide2.com

**iscroll**

https://github.com/cubiq/iscroll



移动端视频插件 zy.media.js









## 移动端常用开发框架

框架，顾名思义就是一套架构，它会基于自身的特点向用户提供一套较为完整的解决方法。构架的控制权在框架本身，使用者要按照框架所规定的某种规范进行开发



[Bootstrap中文网](https://www.bootcss.com/)

[Vue.js](https://cn.vuejs.org/v2/guide/)






















