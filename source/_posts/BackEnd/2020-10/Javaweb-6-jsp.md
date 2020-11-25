---
title: Java Web(六) JSP
date: 2020-10-28
sidebar: false
categories:
 - [BackEnd]
 - [FrontEnd]
tags:
 - Java Web
 - Java
publish: true
---

## Java Web(六) JSP
JSP (Java Server Pages)，java服务器端页面，是一种建立在servlet规范基础上的动态网页开发技术，JSP 允许书写 java 代码和 html 标签，它运行在服务器端，其本质就是一种servlet。

这和 JS 前端的模板语法十分相似，都是为了解决向前端页面书写后台数据的需求，其摆脱了在servlet中通过字符串拼接来解决该需求的落后性，使代码更加规范简洁。

### 编写第一个JSP

在使用 Eclipse 在你的项目下创建第一个 JSP 文件时，我们需要修改一下 Eclipse 中创建 JSP 文件使用的模板中的编码变量参数。

`Windows -> Prederences -> Web -> JSP File`修改`Encoding`项为 `ISO 10645/Unicode(UTF-8)`

示例：
```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
 	<% response.getWriter().print("hello jsp"); %>
</body>
</html>
```

JSP文件会生成java文件，编译成class后，会托管到tomcat的`/work`目录下，通过查看其源码，不难发现其说继承servlet实现的。


### JSP 运行原理

JSP文件本质是Servlet的另一种实现，其本质依旧是一个servlet。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201028185815.png)




### JSP 基础语法

要想在JSP文件中书写java代码，就需要使用固定的JSP语法格式。

#### JSP 脚本

在JSP页面书写java的三种方式

JSP Scriptlets
```
<% java代码段 %>
```

声明语句
```
<%! 定义变量或方法 %>
```

表达式
```
<%=表达式 %>
```

示例代码：
:::details

hello.jsp
```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
 	<%!
 		int a = 1; 
 		int b = 2;
 	%>
 	<%!
 		public String print() {
 			String str = "hello jsp";
 			return str;
 		}
 	%>
 	<% out.println(a+b); %>
 	<br>
 	<% out.println(print()); %>
 	<br>
 	a+b=<%= a+b %>
 	<br>
 	<%="str="+print() %>
</body>
</html>
```
页面输出：
```
3
hello jsp
a+b=3
str=hello jsp
```
:::


#### JSP 注释

html注释
```html
<!-- somehere -->
```

java注释
```java
// somehere
/* somehere */
```

jsp注释
```html
<%-- somehere -->
```

示例代码：
::: details
```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
 	<!-- html注释，该注释可以在浏览器检查查看 -->
 	
 	<%
 		// 在代码块内java注释，其可以在生成的java中查看到
 	%>
 	
 	<%-- 该注释不会显示在浏览器检查中，其只存在jsp文件中 --%>
</body>
</html>
```
:::


#### JSP 指令

**`page`指令**
```
<%@ page options="values" options2="values2" options3="values3">
```
page指令用于设置与jsp页面的相关信息，如jsp编码格式，默认语言等。
常用属性：
- `language`: 默认java
- `pageEncoding`：设置页面编码格式
- `contentType`: 内容类型
- `session`：`true(default)/false`，设置该页面是否可以使用`session`
- `import`：和java项目中一样，为页面内的java代码导入相应的包


**`include`指令**
```
<%@ include file="urlpath" %>
```

通过`include`指令我们可以在当前页面中包含其他的页面，这种方式又称为静态包含，其特点是：
- 把多个页面的内容合并输出
- 多个页面生成一个java文件，编译成一个class文件

这种方式与前端模板语法的模板套用十分相似。

实例：
::: details
include.jsp
```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	显示当前时间：
	<%@ include file="date.jsp" %>
</body>
</html>
```

date.jsp
```html
<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<% out.println(new Date().toLocaleString()); %>
</body>
</html>
```
:::

### JSP 隐式对象

通过查看jsp文件的生成的java文件不难发起，在该类预定义了一些对象，在jsp文件中使用这些对象就可以直接调用。

`request`：`HttpServletRequest`
`response`：`HttpServletResponse`
`session`：`HttpSession`
`application`：`ServletContext`
`config`：`ServletConfig`
`out`：`JspWriter`,`PrintWriter`
`page`：`Object`，代表当前jsp页面对象
`pageContext`：`PageContext`
`exception`：`Throwable`，异常对象，用来捕获异常信息

> 仅当page指令设置参数`isErrorPage="true"`时，才会拥有`exception`隐式对象

#### out 对象

out对象的优先级问题(了解即可)
```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		// 使用隐式对象 out 输出
		out.println("first line <br>");
	
		// 使用PrintWriter输出
		response.getWriter().println("second line <br>");
	%>
</body>
</html>
```
访问上方页面，发现输出为：
```
second line
first line
```

这涉及jsp文件的编译过程和相关对象的优先级问题



#### pageContext 对象

`pageContext`是开发过程中常用的一对象，通过`pageContext`对象，能够获取其它八个隐式对象和操作三个域对象`request,session,application`

获取其他隐式对象方法:
`getRequest()`
`getResponse()`
`getOut`
`...`

操作其他域对象的存取值：
`setAttribute(String name, Object obj, int scope)`
`getAttribute(String name, int scope)`
`findAttribute(String name)`

参数说明
- `name`：要设置的属性名称
- `value`：要设置的属性值。
- `scope`：要设置属性的范围对象

`scope` 参数的取值有`APPLICATION_SCOPE`,`REQUEST_SCOPE`,`SESSION_SCOPE`,`PAGE_SCOPE`

`findAttribute`的寻值过程 `pageContext -> request -> session -> application`，即从小范围到大范围查找。

> 如果你无法使用这些方法和属性，你需要在`tomcat/lib`下寻找`jsp-api.jar`包导入至项目


#### exception 对象

通过`exception`对象，我们能够捕获到页面中的异常，想要使用`exception`对象必须设置相应的page指令属性`isErrorpage="true"`

实例：
::: details
`exception.jsp`
```html
<%@ page language="java" contentType="text/html; charset=UTF-8" errorPage="error.jsp"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<% 
		int a = 3;
		int b = 0;
	%>
	
	<%= a/b %>
</body>
</html>
```

`error.jsp`
```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isErrorPage="true"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%= exception.getMessage() %>
</body>
</html>
```

out:
```
/ by zero
```
:::


### JSP 动作元素


#### include

实现页面包含

基础语法：
```
<jsp:include page="urlPath" flush="true/false"></jsp:include>
```
参数说明
- `page`：被包含的页面路径
- `flush`：`true`立即包含，包含完毕后在输出，`false` 先输出当前页面，再加载被包含文件

> 动态包含会生成多个java文件和class编译文件
> 静态包含只会生成一个合并后的java文件和class文件

实例：
::: details
`dynamicInclude.jsp`
```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	dynamic include to >>>>>>>>>
	<jsp:include page="included.jsp" flush="false"></jsp:include>
</body>
</html>
```

`included.jsp`
```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<% Thread.sleep(3000); %>
	
	this is include page content
	
</body>
</html>
```
:::


#### forward

实现请求转发，效果等同与`RequestDispathcer.forward()`

基础语法：
```
<jsp:forward page="urlPage"></jsp:forward>
```
请求转发依旧是服务器内部行为，无需书写项目名称。


### JSP 模板套用
如同前端的模板语法一样，jsp提供相应的语法支持模板套用，从而提高代码的复用性。

新建`index.jsp`文件跳转到首页
```html
<jsp:forward page=""></jsp:forward>
```

页面分离与包含
```html
<%@include file="header.jsp">
<%@include file="search.jsp">
<%@include file="foot.jsp">
```

注意处理文件路径问题。
```html
${pageContent.request.contextPath}
```



