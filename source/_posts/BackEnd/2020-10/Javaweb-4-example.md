---
title: Java Web(四) 基础实例
date: 2020-10-25
sidebar: false
categories:
 - [BackEnd]
 - [FrontEnd]
tags:
 - Java Web
 - Java
publish: true
---

## Java Web(四) 基础实例
至此，你对Java Web已经有了基础的认知，现在开始一些实际需求的实现。下面的代码均是servlet类的实现，调用其参数 `response` 的方法。你均可以在 `java ee api docs`中查询相关方法与说明。

### 实例一：网页的定时跳转和定时刷新
定时跳转到其他页面：
```java
response.setHeader("Refresh", "5;url=/demo/login.html");
```
每秒刷新页面上的时间：
```java
response.setHeader("Refresh", "1");
```


### 实例二：网页重定向
```java
response.sendRedirect("/demo/login.html");
```

### 实例三：获取表单提交
```java
@WebServlet("/FromDataServlet")
public class FromDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	// 获取get提交参数
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Enumeration<String> key = request.getParameterNames();
		while (key.hasMoreElements()) {
			String name = (String) key.nextElement();
			String value = request.getParameter(name);
			response.getWriter().println(value);
		}
	}
	// 获取post提交参数
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Enumeration<String> key = request.getParameterNames();
		while (key.hasMoreElements()) {
			String name = (String) key.nextElement();
			String value = request.getParameter(name);
			response.getWriter().println(value);
		}
	}
}
```

### 实例四：用户登录
```java
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 获取登录表单信息
		String username = request.getParameter("username");
		String pwd = request.getParameter("pwd");
		
		// 数据库查询 模拟
		if(username.equals("admin") && pwd.equals("a123")) {
			// 登录成功
			response.sendRedirect("/demo/welcome.html");
		}else {
			// 登录失败
			response.sendRedirect("/demo/login.html");
		}
	}

}
```
> 关于重定向地址为什么可以使用url路径而不是服务器的路径?当服务器的响应头中携带重定向参数时，浏览器就会执行重定向行为，并发起该路径的访问，所以说这个路径应该是浏览器端访问服务器的url。

### 实例五：防盗链
`Referer`：防止盗链，通过`Referer`请求头判断来访用户的发起地址，如果不是自己的网站发起的请求，就不允许访问。
```java
@WebServlet("/ReferServlet")
public class ReferServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String refer = request.getHeader("Referer");
		String serverName = request.getServerName();
		if(refer != null && refer.contains(serverName)) {
			response.getWriter().print("downloading..........");
		}else {
			response.getWriter().print("failed location to our");
			response.sendRedirect("/demo/downlod.html");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
```

### 实例六：请求转发
