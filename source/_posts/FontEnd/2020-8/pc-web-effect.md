---
title: PC端常见网页特效
date: 2020-08-07
sidebar: false
categories:
 - FrontEnd
tags:
 - Web Design
publish: true
---


## 元素偏移 offset

`offset` 偏移量，使用 `offset` 系列相关属性可以动态的得到该元素的位置（偏移），大小等。

- 获得元素距离带有定位的父元素位置 `position`
- 获得元素自身的宽度和高度
- 其返回数值不带单位



`offset` 常用属性

| 属性                   | 作用                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `element.offsetParent` | 返回作为该元素带有定位的父级元素 如果父级元素都没有定位则返回 `body` |
| `element.offsetTop`    | 返回元素相对带有定位父元素上方的偏移                         |
| `element.offsetLeft`   | 返回元素相对带有定位父元素左边框的偏移                       |
| `element.offsetWidth`  | 返回自身包括 `padding` ，`border`，内容区的宽度 不含单位     |
| `element.offsetHeight` | 返回自身包括 `padding` ，边框，内容区的高度度 不含单位       |



>偏移量计算是没有 `right` 和 `bottom` 的。





`offset` 与 `style` 区别

---

- offset` 可以得到任意样式表中的样式值

- `offset` 系列获得的数值没有单位
- `offsetWitdh` 包含 `pandding` `border` `width`
- `offsetWitdh` 等属性是只读属性，只能获取不能赋值  



- `style` 只能得到行内样式表中的样式值
- `style.width` 获得的是带有单位的字符串
-  `style.width` 获得不包含 `pandding` 和 `border` 的值
- `style.width` 是可读写属性，可以获取也可以赋值



> 样式表 css 有行内样式，内嵌样式，外链样式。













**案例：获取鼠标在盒子内的坐标**

---

1. 在盒子内点击，得到鼠标距离盒子左右的距离

2. 首先得到鼠标在页面中的坐标 `e.pageX` `e.pageY`

3. 其次得到盒子在页面中的距离 `box.offsetLeft` `box.offsetTop`
4. 用鼠标在页面中的坐标减去盒子在页面的距离，即可得到鼠标在盒子里的坐标
5. 如果想移动鼠标就得到参数，应该使用 `mouseover` 事件



```javascript
var fa = document.querySelector('.father');
fa.addEventListener('mousemove',function(e){
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    this.innerHTML = 'X:' + x + ' Y:' + y;
});
```







**案例：模态框拖拽**

---

需求：

- 点击弹出按钮，弹出模态框，并且显示灰色半透明的遮挡层
- 点击关闭按钮后，可以关闭模态框，并且同时关闭灰色半透明遮挡层
- 鼠标放到模态框最上面的一行，可以按住鼠标拖拽模态框
- 鼠标松开，停止拖拽



实现思路：

- 点击弹出层，模态框和遮挡层就会显示出来 `display:block`
- 点击关闭按钮，模态框和遮挡层就会隐藏 `display:none`

- 在页面拖拽的原理：鼠标按下 `mousedown` 并且移动 `mousemove` ，之后松开鼠标 `mouseup`

- 鼠标的坐标减去鼠标在盒子内的坐标，才是模态框的真正位置



```javascript
var loginshow = document.querySelector('.loginshow');
var loginform = document.querySelector('.loginform');
var clobtn = document.querySelector('.closebtn');
var loginbg = document.querySelector('.loginbg');
loginshow.addEventListener('click',function(){
    loginform.style.display = 'block';
    loginbg.style.display = 'block';
})

clobtn.addEventListener('click',function(){
    loginform.style.display = 'none';
    loginbg.style.display = 'none';
})

var movebar = document.querySelector('.logintitle')
movebar.addEventListener('mousedown',function(e){
    var x = e.pageX - loginform.offsetLeft;
    var y = e.pageY - loginform.offsetTop;
    document.addEventListener('mousemove', move)
    function move(e){
        loginform.style.left = e.pageX - x + 'px';
        loginform.style.top = e.pageY - y + 'px';
    }
    document.addEventListener('mouseup',function(){
        document.removeEventListener('mousemove', move);
    })
})
```







**案例：图片放大**

---

需求：

- 当用户鼠标触摸小图片时，出现可移动透明遮罩，并在相应位置出现遮罩内的放大内容。



实现思路：

- 鼠标经过小图片盒子，遮罩层和大图片盒子显示，离开隐藏

- 遮挡层跟随鼠标移动

- 移动遮挡层。大图片跟随移动

- 首先获得鼠标在盒子的坐标

- 之后把数值给遮挡层赋值 `left` `top`，注意调整高宽度的一半，使鼠标在遮挡层居中

- 要想遮挡层不能超出小图片盒子，添加判断条件，当遮挡层的宽高度小于或超过将其设置为0和相应距离

- 大图片移动距离公式：

  遮挡层移动距离/遮挡层最大移动距离 = 大图片移动距离/大图片最大移动距离



```javascript
var smdiv = document.querySelector('.smpic');
var bigpic = document.querySelector('.bigpic');
var mask = document.querySelector('.mask');

smdiv.addEventListener('mouseover',function(){
    mask.style.display = 'block';
    bigpic.style.display = 'block';
})

smdiv.addEventListener('mouseout',function(){
    mask.style.display = 'none';
    bigpic.style.display = 'none';
})

smdiv.addEventListener('mousemove',function(e){
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    var maskx = x - mask.offsetWidth/2;
    var masky = y - mask.offsetHeight/2;
    var maskMaxX = smdiv.offsetWidth-mask.offsetWidth;
    var maskMaxY = smdiv.offsetHeight-mask.offsetHeight;
    if(maskx <= 0){ maskx = 0; }
    if(maskx >= maskMaxX){
        maskx = maskMaxX;
    }
    if(masky <= 0){ masky = 0; }
    if(masky >= maskMaxY){
        masky = maskMaxY;
    }
    mask.style.left = maskx + 'px';
    mask.style.top = masky + 'px';

    var bigImg = document.querySelector('.bigImg');
    var bigMaxX = bigImg.offsetWidth - bigpic.offsetWidth;
    var bigMaxY = bigImg.offsetHeight - bigpic.offsetHeight;

    var bigX = maskx * bigMaxX / maskMaxX;
    var bigY = masky * bigMaxY / maskMaxY;

    bigImg.style.left = -bigX + 'px';
    bigImg.style.top = -bigY + 'px';
})
```















## 元素可视区 client

`client` 客户端，我们使用 `client` 相关属性来获取元素可视区的相关信息，动态的得到该元素的边框大小，元素大小



| 属性                  | 说明                                                        |
| --------------------- | ----------------------------------------------------------- |
| `element.clientTop`   | 返回元素上边框的大小                                        |
| `element.clentLeft`   | 返回元素左边框的大小                                        |
| `element.clentWidth`  | 返回自身包括 `padding` ，内容区宽度，不含边框，返回不带单位 |
| `element.clentHeight` | 返回自身包括 `padding` ，内容区高度，不含边框，返回不带单位 |







立即执行函数

---

立即执行函数无需调用，声明即使用

```javascript
(function(){})()

(function(){}())
```

其主要作用是：创建了应该独立的作用域，避免了命名冲突





`pageshow` 与 `load` 事件的区别

`pageshow` 事件是当页面加载时触发，无论加载是否来自缓存，注意这个事件是 `window`  下的方法，通过 `e.persisted` 判断页面是否来自缓存

`load` 事件虽然也是当页面加载时触发，但是无法在加载缓存时触发





































## 元素滚动 scroll

使用 `scroll` 相关属性方法可以动态得到该元素的大小，滚动距离等



| 属性                   | 说明                                 |
| ---------------------- | ------------------------------------ |
| `element.scrollTop`    | 返回被卷去的上侧距离，不带单位       |
| `element.scrollLeft`   | 返回被卷去的左侧距离，不带单位       |
| `element.scrollWidth`  | 返回自身实际宽度，不含边框，不带单位 |
| `element.scrollHeight` | 返回自身实际高度，不含边框，不带单位 |





`offset` ，`client` 和 `scroll` 的区别总结

---

1. `offset` 用于获取元素位置
2. `client` 用于获取元素大小
3. `scroll` 用于获取元素滚动距离









**`mouseover` 和 `mouseenter` 事件的区别**

---

`mouseover` 鼠标经过自身或子盒子都会触发，`mouseenter` 只会触发经过自身

`mouseenter` 不会冒泡，`mouseover` 则会冒泡。

























**案例：悬浮工具栏**

---

实现思路：

- 页面滚动事件 `onscroll` ，事件源 `document` 
- 判断页面滚动距离 `window.pageYoffset`



```javascript
var slideBar = document.querySelector('.slider-bar');
var banner = document.querySelector('.banner');
var main = document.querySelector('.main');
var goBack = document.querySelector('.goBack');

var bannerTop = banner.offsetTop;
var sliderBarTop = slideBar.offsetTop - bannerTop;
var mainTop = main.offsetTop;
document.addEventListener('scroll',function(){
    if(window.pageYOffset >= bannerTop){
        slideBar.style.position = 'fixed';
        slideBar.style.top = sliderBarTop + 'px';
    }else{
        slideBar.style.position = 'absolute';
        slideBar.style.top = '80%';
    }

    if(window.pageYOffset >= mainTop){
        goBack.style.display = 'block';
    }else{
        goBack.style.display = 'none';
    }
})
```





> `onscroll` 滚动事件，当滚动条发生变化触发该事件。



























## 动画函数封装



**动画实现原理**

通过定时器 `setInterval` 不断使元素移动

基本步骤：

1. 获得元素当前位置
2. 让盒子在当前位置上移动
3. 通过定时器不断重复
4. 加一个结束定时器的条件
5. 移动元素必须添加定位才能移动



**动画函数简单封装**

注意函数需要传递两个参数，动画对象和移动到的距离

```javascript
function animate(obj, target){
    var moveFun = setInterval(function(){
    if(obj.offsetLeft >= target){
            clearInterval(moveFun);
        }
        obj.style.left = obj.offsetLeft + 1 +'px';
    },30)
}
```



给不同的元素设置不同的定时器

从封装函数不难看出，每次声明这个函数都要开辟一个函数空间，而且每次都声明了同一个定时器，这样造成了性能浪费

JS 是一门动态语言，可以很方便的给当前对象添加属性

```javascript
function animate(obj, target){
    obj.moveFun = setInterval(function(){
    if(obj.offsetLeft >= target){
            clearInterval(obj.moveFun);
        }
        obj.style.left = obj.offsetLeft + 1 +'px';
    },30)
}
```



定时器清除，避免定时器叠加

```javascript
function animate(obj, target){
    clearInterval(obj.moveFun);
    obj.moveFun = setInterval(function(){
    if(obj.offsetLeft >= target){
            clearInterval(obj.moveFun);
        }
    obj.style.left = obj.offsetLeft + 1 +'px';
    },30)
}
```



**缓动效果原理**

缓动动画就是让元素运动速度有所变化，最常见的是让速度慢慢停下来

思路：

- 让盒子每次移动的距离逐渐变小，速度就会慢下来
- 核心算法：（目标值 - 现在位置）/ 10 做为每次步长
- 当盒子位置等于目标位置就停止定时器



```javascript
function animatePro(obj, target){
    clearInterval(obj.moveFun);
    obj.moveFun = setInterval(function(){
        var step = (target - obj.offsetLeft)/10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 正负移动
        if(obj.offsetLeft == target){
            clearInterval(obj.moveFun);
        }
        obj.style.left = obj.offsetLeft + step +'px';
    },30)
}
```





**动画函数添加回调函数**

```javascript
function animatePro(obj, target, callback){
    clearInterval(obj.moveFun);
    obj.moveFun = setInterval(function(){
        var step = (target - obj.offsetLeft)/10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 正负移动
        if(obj.offsetLeft == target){
            clearInterval(obj.moveFun);
            if(callback){
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step +'px';
    },30)
}
```

`callback` 传递一个函数即可。





**动画函数封装到单独 JS 文件**

将函数抽离单独存放在一个 js 文件中，在项目需要使用时，引入该文件即可







**案例：工具栏显示隐藏**

---

```javascript
var sliderBar = document.querySelector('.sliderbar');
var con = document.querySelector('.con');
sliderBar.addEventListener('mouseenter',function(){
    animate(con,-140,function(){
        sliderBar.children[0].innerHTML = 'hide';
    });
})
sliderBar.addEventListener('mouseleave',function(){
    animate(con,0,function(){
        sliderBar.children[0].innerHTML = 'show';
    });
})
```





















## 常见网页特效



### 轮播图



需求：

- 鼠标触摸 banner 显示切换按钮，移除鼠标则隐藏
- 动态生成 banner 图片计数
- 计数圆点的排他思想





节流阀

防止快速连续点击轮播按钮造成播放速度叠加 bug

当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法触发

利用回调函数，添加变量来控制，锁住和解锁函数





### 回到顶部

滚动窗口至文档中的特定位置

```javascript
window.scroll(x,y)
```





































