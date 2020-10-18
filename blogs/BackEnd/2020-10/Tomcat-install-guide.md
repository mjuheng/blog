---
title: Tomcat 服务器安装与使用
date: 2020-10-19
sidebar: false
categories:
 - BackEnd
tags:
 - Tomcat
 - Java web
publish: true
---
![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201018230936.png)
<!-- more -->
## Tomcat 服务器安装与使用

### Web程序开发中常用的服务器有：
- **`Tomcat`**:
Tomcat是一个免费的开放源代码的Web 应用服务器，属于轻量级应用服务器，在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试JSP 程序的首选，**Apache开源组织项目，免费**
- **`weblogic`**:
WebLogic是美国Oracle公司出品的一个application server，确切的说是一个基于JAVAEE架构的中间件，WebLogic是用于开发、集成、部署和管理大型分布式Web应用、网络应用和数据库应用的Java应用服务器。**Oracle公司，收费**
- **`websphere`**:
WebSphere 是 IBM 的软件平台。它包含了编写、运行和监视全天候的工业强度的随需应变 Web 应用程序和跨平台、跨产品解决方案所需要的整个中间件基础设施，如服务器、服务和工具。**IBM公司，收费**

### Tomcat 的安装与使用
**1. 两种安装方式：**
- 前往官网下载压缩包，解压使用（绿色免安装）：[Apache Tomcat](http://tomcat.apache.org/)
- 官网下载安装程序，作为windows服务安装 (解压 `/bin` 下执行)
```bash
service.bat install
```

**2. 启动和关闭Tomcat服务**
**启动的三种方式**
- 在解压后的`/bin`目录下执行`startup.bat`文件
- 运行`tomcat9.exe`启动
- 任务管理器启动`tomcat`服务
测试开启成功与否：浏览器访问 http://localhost/8080 启动成功会访问到tomcat页面

**关闭**
- `/bin`目录下执行`shutdown.bat`文件
- 直接关闭挂载的命令行窗口
- 任务管理器关闭`tomcat`服务

> 开启服务的命令行窗口在服务运行时不要关闭，其挂载了服务器，一旦关闭服务器也会一起关闭


### Tomcat 目录结构
**`/bin`**：可执行文件
**`/conf/`**：服务配置文件
**`/lib`**：运行所需的依赖库jar
**`/logs`**：日志文件存储目录
**`/temp`**：运行时产生的临时文件
**`/wepapps`**：存放运行的web项目
**`/work`**：存放jsp产生的servlet文件

### Tomcat 诊断
tomcat启动常见的两种问题：
- 运行`startup.bat`时，命令行一闪而过：未正确配置`JAVA_HOME`环境变量
- 端口号被占用 socket bindException：解除端口占用或修改`/conf/serve.xml`文件更换端口
```XML
 <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
```
```bash
netstat -ano
```


### Tomcat 启动命令行乱码问题
修改tomcat的`conf`下的`logging.properties`中的参数为`GBK`
```
java.util.logging.ConsoleHandler.encoding = GBK
```