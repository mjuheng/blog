---
title: 京东移动端Banner背景圆弧实现
date: 2020-08-09
sidebar: false
categories:
 - FrontEnd
tags:
 - CSS
publish: true
---







在京东移动端复刻时，发现了一个比较有意思的实现。基于 2020-8-9 的京东移动端。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200809121252.png)







刚开始以为是图片背景，查看源码后发现不是这么简单，应该是使用 `css` 实现的样式。经过一番查阅和推敲实现了目标样式。



```html
<!-- Banner -->
<div class="main_content">
   <div class="bgradius"></div>
</div>

<style>
.main_content {
    width: 100%;
    height: 190px;
    position: relative;
    overflow: hidden;
}
.bgradius {
    width: 100%;
    height: 145px;
}
.bgradius::after {
    content: "";
    width: 140%;
    height: 145px;
    left: -20%;
    border-radius: 0 0 50% 50%;
    background-image: linear-gradient(#c82519, #ee4d38);
    position: absolute;
}
</style>
```



基本实现思路：

- 使用父子两个 `div` 进行嵌套。
- 设置子 `div` 的 `border-radius: 0 0 50% 50%;` 
- 此时的圆弧并不符合要求，将其 `width` 放大到 `140%` 得到更加圆润的弧部
- 再将其移至中心 `left: -20%;` 移动多放大的 `40%` 的一半 `20%` 即可。
- 通过父 `div`  `overflow: hidden;` 裁去多余部分即可。



理解图示：

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200809124050.png)

> 由于在手机检查下无法看见溢出，使用了PC预览宽度被拉伸了一些，重在理解。



最终实现：

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200809124139.png)





