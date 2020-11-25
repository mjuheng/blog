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
 - Java
publish: true
---
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
注意在最后一步时勾选 `Generate web.xml deployment descriptor` ，否则生成的项目将没有`web.xml`文件 *(Dynamic web module version >= 3.0 之后不再使用`web.xml`而是通过servlet的注释方式进行路径配置，但是并不建议入门跳过`web.xml`的认知)*

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
通过修改项目配置文件`WebContent/WEB-INF/web.xml`设置web项目访问的默认页面，如果该页面在文件中不存在，就顺序往下访问。
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
> `右键项目打开菜单 > Java EE Tools > Generate Deployment Descriptor Stub`

### 为Eclipse配置Tomcat服务器
假设你已经了解Tomcat服务器并成功启动。
在Eclipse顶部工具条点击 `Window -> Preferences -> Web Services -> Serve and Runtime`
设置 `Serve runtime` 为你的 `Tomcat` 版本，并指定你的`tomcat`存放根目录
> Tomcat 服务器安装与使用参考同名博文

**设置web项目托管方式**
双击控制台`Servers`中的`Tomcat`服务器即可修改相关属性

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201019004417.png)

配置项说明：
- 三个单选选择：
这是选择web项目编译后的文件托管方式，
第一项是存放在Eclipse的工作空间下
第二项是存放在Tomcat的安装路径下
第三项是使用用户自定义路径
- `Server path` 是引用的`tomcat`存储根目录
- `Deploy path` 存储在Tomcat安装路径下的哪个文件下（注意如果使用eclipse默认的选项，你将无法在Tomcat安装路径下查看，推荐更改为Tomcat的规范托管文件夹 `webapps`）

### 运行web项目
第一种方式：鼠标右键项目菜单 `-> Run As -> Run on Sever -> Tomcat` 即可
第二种方式：右键点击项目Severs控制台窗口下的 `Tomcat服务器 -> Add and Remove` 将项目托管至服务器区即可（推荐）

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201019004728.png)


现在你就可以通过浏览器访问 http://localhost:8080/projectName/ 来查看你的web应用了。