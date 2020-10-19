---
title: Java Web(一) 开发入门
date: 2020-10-18
sidebar: false
categories:
 - BackEnd
 - FrontEnd
tags:
 - Tomcat
 - Java Web
publish: true
---
Java Web，是用Java技术来解决相关web互联网领域的技术总和。web包括：web服务器和web客户端两部分。
[W3C JavaWeb 教程](https://www.w3cschool.cn/javaweb/)
<!-- more -->
## Java Web(一) 开发入门

### 基础概念
**web网页资源分为两类：**
- 静态资源：`html, css, javascript` 等，用户访问不会发生变化的资源数据
- 动态资源：`jsp, servlet, php, asp` 等，不同用户访问查看的数据资源不同

**web开发中的常见两种模式：**
- **`B/S`**：`browser` 和 `server`，浏览器和服务器模式，如淘宝，京东，天猫等
- **`C/S`**：`client` 和 `server`，客户端和服务器模式，如QQ，微信，火绒等

**`B/S`和`B/S`两种模式的区别：**
`B/S`模式可以不用安装客户端，直接使用浏览器访问网站，方便快捷，缺点：没有客户端，受网络影响明显
`B/S`模式，可以在电脑或手机直接打开，访问速度快，缺点：服务端更新，客户端也需要更新

### 使用Eclipse构建第一个Web应用
启动Eclipse打开工作空间，新建一个`Web -> Dynamic Web Project`项目，之后Eclipse就会为您构建一个Web项目的基础构架。
注意在最后一步时勾选 `Generate web.xml deployment descriptor` ，否则生成的项目将没有`web.xml`文件

> 基于Eclipse版本
> ```
> Eclipse IDE for Enterprise Java Developers (includes Incubating components)
> Version: 2020-09 (4.17.0)
> Build id: 20200910-1200
> ```


### web应用基本目录结构
web应用就是一个web项目，web项目下有可供用户访问的网页资源
![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201019000840.png)
`/src`：存放java文件或配置文件
`/WebContent`：存放网站内容
`/WebContent/WEB-INF/lib`：项目运行依赖jar包
`/WebContent/WEB-INF/web.xml`：项目配置信息
`/WebContent/classes`：存放java被编译成的class文件

### 配置web项目访问的默认页面
通过修改项目配置文件`WebContent/WEB-INF/web.xml`设置web项目访问的默认页面，如果页面在文件中不存在，就顺序往下访问。
示例：设置`WebContent/hi.html`文件为访问默认页面：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" version="3.0">
  <display-name>demo</display-name>
  <welcome-file-list>
    <welcome-file>hi.html</welcome-file>
  </welcome-file-list>
</web-app>
```
> 如果你在使用 Eclipse 构建项目时没有勾选生成配置导致没有`web.xml`文件，也可以手动生成
> 右键项目打开菜单 > Java EE Tools > Generate Deployment Descriptor Stub

### 为Eclipse配置Tomcat服务器
`Window -> Preferences -> Web Services -> Serve and Runtime`
设置 `Serve runtime` 为你的 `Tomcat` 版本
> Tomcat 服务器安装与使用参考同名博文

**设置web项目托管方式**
双击控制台`Servers`中的`Tomcat`服务器即可修改相关属性

现在我们将项目编译后的文件托管在Tomcat安装目录下的`/webapps`下，而不是默认的eclipse的工作空间中（可选）
![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201019004417.png)
### 为web项目配置Tomcat服务器
在项目控制台窗口选项卡，点击`Servers`点击输出台的链接，在弹出窗口选择相应版本Tomcat服务器，点击下一步，设置Tomcat在本机中的存储目录,确定即可

### 运行web项目
- 鼠标右键项目菜单 `-> Run As -> Run on Sever -> Tomcat` 即可
- 右键点击项目Severs控制台窗口下的 `Tomcat服务器 -> Add and Remove` 将项目托管至服务器区即可（推荐）

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201019004728.png)

> 如果你的工作空间或Tomcat的`webapps`下没有项目文件，你可能需要右键服务器点击Publish

现在你就可以通过浏览器访问 http://localhost:8080/demo/ 来查看你的web应用了。