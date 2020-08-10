---
title: CSS3 渐变色字体
date: 2020-08-09
sidebar: false
categories:
 - FrontEnd
tags:
 - css
publish: true
---

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200809183455.png)

<!-- more -->

## CSS3 渐变色字体

### 实现步骤

首先肯定需要使用到渐变色彩语法

```css
background: linear-gradient(190deg, #45CAFF,#1471FB);
```



关键属性是设置背景渲染区域为文本 

```css
/* 注意该属性兼容性不是很好，请务必使用兼容方案 */
-webkit-background-clip: text;
-moz-background-clip: text;
background-clip: text;
```



再设置文本颜色为透明即可。

```css
color: transparent;
```



完整代码：

```html
<span class="color-liner">渐变色字体</span>
<style>
.color-liner {
	background: linear-gradient(190deg, #45CAFF,#1471FB);
    -webkit-background-clip: text;
	-moz-background-clip: text;
	background-clip: text;
    color: transparent;
    font-size:16px;
    font-weight: bold;
}
</style>
```



### 效果展示

效果：

<span class="color-liner">渐变色字体</span>

<style>
.color-liner {
	background: linear-gradient(190deg, #45CAFF,#1471FB);
    -webkit-background-clip: text;
	-moz-background-clip: text;
	background-clip: text;
    color: transparent;
    font-size:23px !important;
    font-weight: bold !important;
}
</style>