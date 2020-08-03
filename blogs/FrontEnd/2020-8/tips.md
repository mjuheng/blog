---
title: GithubPages分页托管
date: 2020-8-1
sidebar: true
categories:
 - FrondEnd
tags:
 - vuepress
 - githubpage
---


tips

tree /f > list.txt



## 使用淘宝 NPM 镜像

大家都知道国内直接使用 npm 的官方镜像是非常慢的，这里推荐使用淘宝 NPM 镜像。

淘宝 NPM 镜像是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。

你可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

这样就可以使用 cnpm 命令来安装模块了：

```
$ cnpm install [name]
```

更多信息可以查阅：http://npm.taobao.org/。



使用list命令查看全局安装的模块

```powershell
npm list -g -depth 0
```



## 获取网站浏览器图标

```html
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

<link href="http://csdnimg.cn/www/images/favicon.ico" rel="SHORTCUT ICON">
```

