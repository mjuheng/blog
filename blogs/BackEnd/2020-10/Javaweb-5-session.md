---
title: Java Web(五) 会话管理
date: 2020-10-26
sidebar: false
categories:
 - BackEnd
 - FrontEnd
tags:
 - Java Web
 - Java
publish: true
---

## Java Web(五) 会话管理
会话是指，从用户打开网页窗口访问服务器到离开网页访问其他域（或关闭窗口），就是一次会话。
一次会话可以包含多次请求，一次完整的会话只针对一个用户。

会话管理技术：
- `cookie`：客户端技术
- `session`：服务端技术

其他对象存储数据的弊端：

**`request`**:
由于每次发起`request`请求都会产生一个`request`对象，导致某些累加的数据无法存储在`request`对象中。

**`ServletContext`域对象**：
一个web项目只有一个`ServletContext`域对象，这样就会导致不同用户的信息不能区分存储，当然尽管能够通过数据结构的方式做到区分存储，但是这样会极大加重服务器的负担。

为了解决上述问题的存在，出现了会话管理技术`cookie`和`session`来管理会话过程中产生的数据。


### Cookie 对象

Cookie是一种会话管理技术，它是用来保存会话过程中产生的数据，`cookie`对象由服务器端创建,并将其响应给浏览器，浏览器接收`cookie`将其存储在用户本地浏览器空间中，当下次用户发起请求时只需要在请求头携带`cookie`对象
```
Set-Cookie:key=value
```
服务器端就能接收这次会话的发起者数据。


#### Cookie 对象常用 API
得到`cookie`对象
```java
Cookie cookie = new Cookie(key,value);
Cookie cookie[] = request.getCookies();
```

回写`cookie`到浏览器
```java
response.addCookie(cookie);
```

得到`cookie`名称和值
```java
cookie.getName();
cookie.getValue(name);
```

为`cookie`设置生命时长
```java
cookie.setMaxAge(60*60*24*7)  //存活7天
```

为`cookie`设置路径，域名
```java
setPath(path);
setDomain(domain);
```

**Cookie 分类**

1. 会话级别`cookie`，浏览器关闭，`cookie`对象就销毁了
2. 持久化`cookie`，通过`setMaxAge()`方法设置

实例显示用户上次访问的时间：
```java
/**
 * 使用cookie 显示用户上次访问时间
 */
@WebServlet("/CookieServlet")
public class CookieServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		
		String lastTime = null;
        // 获取cookies，并查找lastAccess
		Cookie[] cookies = request.getCookies();
		for (int i = 0; cookies!=null && i < cookies.length; i++) {
			Cookie cookie = cookies[i];
			if(cookie.getName().equals("lastAccess")) {
				lastTime = cookie.getValue();
			}
		}
		
		if(lastTime == null) {
			response.getWriter().println("首次访问");
		}else {
			response.getWriter().println("上次访问时间为："+lastTime);
		}
		
        // 返回cookie更新携带lastAccess
		Cookie cookie = new Cookie("lastAccess", String.format("%tF%<tT",new Date()));
		// 持久化，7天 ：cookie.setMaxAge(60*60*24*7);
		response.addCookie(cookie);
	}
}
```
> 你可以尝试关闭浏览器，再打开浏览器查看重新访问网页，是否能记录上次访问时间。


### Session 对象

`session`是一种会话管理技术，用来保存会话过程中的数据，保存的数据存储在**服务器端**，`session`是基于`cookie`实现的。

#### HttpSession 对象常用API

得到`session`：`HttpSession session = getSession()`
得到`session`的ID：`getId()`
设置`session`的生命时常：`setMaxInactiveInterval(int interval)`
销毁`session`：`invalidate()`

`session`域对象，作用范围是一次完整会话。
存值：`setAttribute(String key,Object obj)`
取值：`getAttribute(String key)`
移除：`removeAttribute(String key)`


#### Session 超时管理
`session`具有生命时长，默认存活时间为30分钟。（Tomcat的`/conf/web.xml`中可查看设置）

```xml
<session-config>
	<session-timeout>30</session-timeout>
</session-config>
```

你可以通过生命时长相关方法修改该参数。


### 实例：简单购物车

1. 创建Book封装图书信息
2. 创建BookDB，模拟数据库，里面保存图书
3. 提供图书的购买页面：`ListBookServlet`
4. 添加购物车：`PurcharseServlet`
5. 回显购物车图书信息：`CartServlet`

> 如果浏览器禁用cookie，禁止用户访问并提示用户开启cookie

`Book.java`
::: details
```java
public class Book {
	private String id;
	private String name;
	
	public Book() {
		
	}

	public Book(String id, String name) {
		this.id = id;
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
```
:::

`BookDB.java`
::: details
```java
public class BookDB {
	private static Map<String, Book> map = new LinkedHashMap<String, Book>();
	
	static {
		map.put("1", new Book("1","Java Web"));
		map.put("2", new Book("2","HTML/CSS"));
		map.put("3", new Book("3","JDBC"));
		map.put("4", new Book("4","MySQL"));
		map.put("5", new Book("5","JSP"));
	}
	
	public static Collection<Book> getAll() {
		return map.values();
	}
	
	public static Book getBook(String id) {
		return map.get(id);
	}
	
}
```
:::

`ListBook.java`
::: details
```java
/**
 * 提供购买图书页面
 */
@WebServlet("/list")
public class ListBookServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		// 获取数据库图书
		Collection<Book> books = BookDB.getAll();
		// 显示在页面
		PrintWriter out = response.getWriter();
		out.print("贩卖列表:<br><br>");
		for(Book b:books) {
			String name = b.getName();
			String id = b.getId();
			// 动态生成请求参数
			String buyUrl = "<a href='/demo/purcharse?id="+id+"'>点击购买</a>";
			out.print("《"+name+"》          "+buyUrl+"<br>");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
```
:::

`PurcharseServlet.java`
::: details
```java
/**
 * 添加购物车
 */
@WebServlet("/purcharse")
public class PurcharseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		// 获取请求参数
		String id = request.getParameter("id");
		// 如果没有购买
		if(id == null) {
			response.sendRedirect("/demo/list");
			return;
		}
		// 获取图书信息
		Book book = BookDB.getBook(id);
		// 获取购物车
		HttpSession session = request.getSession();
		List<Book> list = (List<Book>) session.getAttribute("cart");
		// 首次购买
		if(list == null) {
			list = new ArrayList<Book>();
			session.setAttribute("cart", list);
		}
		// 添加图书
		list.add(book);
		// 更新cookie
		Cookie cookie = new Cookie("JESSIONID", session.getId());
		cookie.setMaxAge(60*60*24);
		cookie.setPath("/demo");
		response.addCookie(cookie);
		// 跳转购物车页面
		response.sendRedirect("/demo/cart");
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
```
:::

`CartServlet.java`
::: details
```java
/**
 * 购物车
 */
@WebServlet("/cart")
public class CartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		
		PrintWriter out = response.getWriter();
		// 得到购物车
		List<Book> cart = null;
		HttpSession session = request.getSession(false);
		// 判断购物车是否为空
		boolean cartFlag = true;
		if(session == null) {
			cartFlag = false;
		}else {
			cart = (List<Book>) session.getAttribute("cart");
			if(cart == null) {
				cartFlag = false;
			}
		}
		// 显示购物车
		out.print("购物车：<br><br>");
		if(!cartFlag) {
			out.print("购物车无商品，前往<a herf='/demo/list'>商品列表</a><br>");
		}else {
			for(Book b:cart) {
				out.print(b.getName()+"</br>");
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
```
:::



### 实例：用户登录

1. 提供User类，封装用户名和密码
2. 提供首页html，提示欢迎用户登录：IndexServlet
3. 提供登录servlet，处理登录请求
4. 提供登出servlet，处理登出请求

`User.java`
::: details
```java
public class User {
	private String username;
	private String password;
	
	public User() {
		
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}	
}
```
:::

`IndexServlet.java`
::: details
```java
@WebServlet("/index")
public class IndexServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		// 获取用户信息
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("key");
		if(user == null) {
			response.getWriter().print("您未登录，即将为您跳转登录页面");
			response.setHeader("Refresh", "3;url=/demo/login.html");
		}else {
			String name = user.getUsername();
			String loginoutUrl = "<a href='/demo/LoginOutServlet'>退出登录</a>";
			response.getWriter().print("欢迎您，"+name+"       "+loginoutUrl);
			
			
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
```
:::

`LoginServlet.java`
::: details
```java
@WebServlet("/index")
public class IndexServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		// 获取用户信息
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("key");
		if(user == null) {
			response.getWriter().print("您未登录，即将为您跳转登录页面");
			response.setHeader("Refresh", "3;url=/demo/login.html");
		}else {
			String name = user.getUsername();
			String loginoutUrl = "<a href='/demo/LoginOutServlet'>退出登录</a>";
			response.getWriter().print("欢迎您，"+name+"       "+loginoutUrl);
			
			
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
```
:::

`LoginOutServlet.java`
::: details
```java
/**
 * 退出登录
 */
@WebServlet("/LoginOutServlet")
public class LoginOutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		session.removeAttribute("key");
		session.invalidate();
		response.sendRedirect("/demo/login.html");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
```
:::

`login.html`
::: details
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<div class="container">
	<div class="row">
	  <div class="col-xs-6 col-md-3"></div>
	  <div class="col-xs-6 col-md-6" style="margin-top:100px">
		  <form class="form-horizontal" action="/demo/LoginServlet" method="get">
		  	<div class="form-group">
		    	<label for="inputEmail3" class="col-sm-2 control-label">Email</label>
			    <div class="col-sm-10">
			      <input type="email" name="username" class="form-control" id="inputEmail3" placeholder="Email">
			    </div>
		  	</div>
		  	<div class="form-group">
			    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
			    <div class="col-sm-10">
			      <input type="password" name="password" class="form-control" id="inputPassword3" placeholder="Password">
			    </div>
		 	 </div>
		 	<div class="form-group">
		    <div class="col-sm-offset-2 col-sm-10">
		      <div class="checkbox">
		        <label>
		          <input type="checkbox" name="remember"> Remember me
		        </label>
		      </div>
		    </div>
		  </div>
		  <div class="form-group">
		    <div class="col-sm-offset-2 col-sm-10">
		      <button type="submit" class="btn btn-default">Sign in</button>
		    </div>
		  </div>
		</form>
	  </div>
	  <div class="col-xs-6 col-md-3"></div>
	</div>
</div>
</body>
</html>
```
:::








