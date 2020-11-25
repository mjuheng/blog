---
title: Java Web(十一) JSP开发模型
date: 2020-11-4
sidebar: false
categories:
 - [BackEnd]
 - [FrontEnd]
tags:
 - Java Web
 - Java
 - JDBC
publish: false
---

## Java Web(十一) JSP开发模型

sun公司开发了JSP技术后，为我们提供了jsp的两种开发模型 Model1,Model2

### JSP Model1

在早期web项目开发中，只是使用jsp技术来完成所有操作，包括用jsp来接收用户请求，处理响应，处理数据等，这样就会造成jsp页面中存在大量java代码，导致程序混乱，不便与后期维护和二次开发，所以sun提出了jsp model1开发模型。

JSP Model1 = JSP + JavaBean
JSP负责业务操作以及数据显示，JavaBean负责处理数据
优点：使用简单，技术要求低，主要用于小型web项目

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201104133611.png)


### JSP Model2

Model2在Model1的基础上提出，新增了Servlet技术。

JSP Model2 = JSP + Servlet + JavaBean
JSP负责页面数据显示
Servlet负责业务逻辑处理
JavaBean处理数据
优点：分层明显，利于后期维护和开发，适用于开发一些复杂的web项目

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201104134003.png)


### MVC 设计模式

MVC即模型，视图，控制器

模型：模型层Model，用来管理应用程序的业务数据，定义访问控制以及修改这些数据的业务规划，当模型的状态发送改变时，通知视图层更新数据

视图：View，用来负责与用户进行交互，它从模型中获取数据向用户展示，同时也能将数据传递给控制器进行处理。其会根据模型中的数据保持一致。

控制器：Controller，负责应用程序的用户交互部分，接受视图传递过来的数据，并向模型发送数据。

### JavaWeb开发中的三层架构

web层，service层，dao层。

web层包含了jsp,servlet,javabean的相关内容，接受用户请求，处理请求，响应请求

service层也称为bussiness，处理业务逻辑操作

dao层DataBase Access Object，数据库持久化对象，数据层。即针对数据库的CRUD操作

> 在开发项目时先确定项目架构，再确定采用哪种设计模式