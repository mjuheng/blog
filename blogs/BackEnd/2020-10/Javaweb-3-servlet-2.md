---
title: Java Web(三) Servlet进阶
date: 2020-10-24
sidebar: false
categories:
 - BackEnd
 - FrontEnd
tags:
 - Java Web
 - Java
publish: true
---

##  Java Web(三) Servlet进阶

### Servlet 虚拟路径映射
**`servlet`映射路径的三种方式**:
- 完全目录匹配 如：`/hello`
- 通配目录匹配 如：`/*`
- 扩展名匹配 如：`*.action`（注意使用 `/*.action`这种写法是错误的）

优先级： 完全目录匹配 > 通配目录匹配 > 扩展名匹配

**`servlet`多重映射：**
`servlet`多重映射是指一个`servlet`可以被多个访问路径访问。
```xml
<servlet>
    <servlet-name>helloWorld</servlet-name>
    <servlet-class>per.qijieh.firstmyapp.servlet.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>helloWorld</servlet-name>
    <url-pattern>/hello1</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>helloWorld</servlet-name>
    <url-pattern>/hello2</url-pattern>
</servlet-mapping>
```

**`servlet`缺省**
当`servlet`的映射目录是`/`时，这就是一个缺省的`servlet`。
缺省`servle`是为了处理资源找不到和错误访问路径的问题（404）



### ServletConfig对象
`servlet`的配置对象，作用是获取与`servlet`的初始化参数,其子类是`GeneriServlet`和`HttpServlet`,其实例化是通过web服务器实现的。

####  ServletConfig 常用方法
|方法|说明|
|---|---|
|`getInitParameter(String name)`|获取`servlet`初始化参数的值|
|`getInitParameterNames()`|获取`servlet`初始化参数名集合|
|`getServletContext()`|获取`servletContext`对象|
|`getServletName()`|获取`servlet`名称|

#### 获取一个 getServletConfig 对象
通过继承`GeneriServlet`或`HttpServlet`类，调用其中的`getServletConfig`方法获取到一个`ServletConfig`对象。

实例代码：
```java
public class ServletConfigServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 得到servletConfig对象
		ServletConfig config = this.getServletConfig();
		// 获取servlet名称 web.xml标签值
		String servletName = config.getServletName();
		// 获取servlet的初始化参数
		String encodeValue = config.getInitParameter("encoding");
		// 获取servlet初始化参数名集合
		Enumeration<String> er = config.getInitParameterNames();
		while (er.hasMoreElements()) {
			String name = (String) er.nextElement();
			String value = config.getInitParameter(name);
			System.out.println("初始化参数名称："+name+"\t初始化参数值: "+value);
		}
		System.out.println("servlet名称："+servletName+"\t初始化参数: encoding="+encodeValue);
	}
}
```
```xml
<servlet>
    <servlet-name>sc</servlet-name>
    <servlet-class>per.qijieh.firstmyapp.servlet.ServletConfigServlet</servlet-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
</servlet>
<servlet-mapping>
    <servlet-name>sc</servlet-name>
    <url-pattern>/ServletConfigServlet</url-pattern>
</servlet-mapping>
```

访问`/ServletConfigServlet`输出：
```
初始化参数名称：encoding	初始化参数值: utf-8
servlet名称：sc	初始化参数: encoding=utf-8
```

### ServletContext对象

`ServletContext`对象在web服务器(JVM)启动时就由web服务器创建，并且每个web项目只有一个`ServletContext`对象。
作用是获取web项目的全局初始化参数，在web项目共享数据，获取web项目的资源文件；


#### 获取一个 ServletContext 对象
- 通过`ServletConfig`对象调用`getServletContext`方法。
- 通过父类`GeneriServlet`方法`getServletContext`直接获取

实例代码：
```java
@WebServlet("/ServletContextServlet")
public class ServletContextServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 得到SevletContext对象
		ServletContext sc = this.getServletContext();
		// 获取全局初始化参数
		Enumeration<String> er = sc.getInitParameterNames();
		while (er.hasMoreElements()) {
			String name = (String) er.nextElement();
			String value = sc.getInitParameter(name);
			System.out.println("全局初始化参数："+name+"="+value);
		}
	}
}
```
```xml
<!-- 配置全局初始化参数 -->
<context-param>
    <param-name>user</param-name>
    <param-value>qijieh</param-value>
</context-param>
<context-param>
    <param-name>age</param-name>
    <param-value>21</param-value>
</context-param>
```
访问`/ServletContextServlet`输出:
```
全局初始化参数：user=qijieh
全局初始化参数：age=21
```


#### ServletContext 域
`ServletContext`对象就是一个域对象，指能在一定范围内存值取值。因为整个项目只有一个`ServletContext`对象，所以可以通过其实现多个`servlet`对象共享数据。
域对象的相关方法：
- 存值：`setAttribute(String key,Object obj);`
- 取值：`getAttribute(String key)`
- 删值：`removeAttribute(String key)`

实例代码：
```java
/**
 * 在ShareDataServlet种存储一些值
 */
@WebServlet("/ShareDataServlet")
public class ShareDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 得到ServletContext对象
		ServletContext sc =this.getServletContext();
		// 存值
		sc.setAttribute("ShareDataServlet", "i saved by ShareDataServlet");
	}
}
```
```java
/**
 * 从ServletContext中取出ShareDataServlet存的值
 */
@WebServlet("/ShareDataToServlet")
public class ShareDataToServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 获取ServletContext 对象
		ServletContext sc = this.getServletContext();
		// 取值
		Object obj = sc.getAttribute("ShareDataServlet");
		String value = obj.toString();
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().print(value);
	}
}
```
先访问`/ShareDataServlet`进行存值，之后访问`/ShareDataToServlet`就可以看见页面输出`i saved by ShareDataServlet`。


#### ServletContext 获取web资源文件
通过`ServletContext`对象能够获取web项目下面文件的字节输入流，或者文件的绝对路径。

**路径问题**
普通的java项目使用jdk编译java文件，文件路径是相对与工作空间的。
但是web项目是运行在Tomcat服务器下的，其文件路径是相对与Tomcat服务器的。
```java
// 普通java项目
Properties prop = new Properties();
InputStream inStream = new FileInputStream(new File("src/config.properties"));
prop.load(inStream);
String value = prop.getProperty("key");
System.out.println(value);

/* 
* java web
* 现在在src目录下新建一个config.properties文件，内容为：
* key=configFile
*
* src目录下的java文件编译成class托管到Tomcat服务器的/WEB-INF/classes下
* 非java文件不会进行操作也存放在该目录下
*/
@WebServlet("/FilePathServlet")
public class FilePathServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ServletContext sc = this.getServletContext();
		InputStream in = sc.getResourceAsStream("\\WEB-INF\\classes\\config.properties");
		Properties prop = new Properties();
		prop.load(in);
		String value = prop.getProperty("key").toString();
		response.getWriter().print(value);
		
		//获取某个文件在服务器上的真实路径
		String realPath = sc.getRealPath("\\WEB-INF\\classes\\config.properties");
		System.out.println(realPath); 
                // C:\Java\apache-tomcat-9.0.39\webapps\demo\WEB-INF\classes\config.properties
	}
}
```
### HttpServletRequest对象
请求：浏览器访问网址，发生表单提交等行为都会触发请求行为，常见的请求方式有`get post delete put` 等。

`HttpServletRequest`是一个接口，其父接口为 `ServletRequest`，在开发中通常使用 `HttpServletRequest`。

请求消息分为三部分：请求行，请求头，请求参数。

#### HttpServletRequest 对象常用方法

获取请求行的相关方法：

| 方法|说明|实例|
| ---|---|---|
|`getMethod()`|获取请求提交方式|`GET`|
|`getProtocol()`|获取请求协议|`HTTP/1.1`|
|`getContextPath()`|获取根路径|`/demo`|
|`getServletPath()`|获取`servlet`路径|`/RequestServlet`|
|`getRequestURI()`|获取请求路径|`/demo/RequestServlet`|
|`getRequestURL()`|获取请求完整路径|`http://localhost:8080/demo/RequestServlet`|

获取请求头的相关方法：

| 方法|说明|
| ---|---|
|`getHeader(String name)`|获取请求头的信息|
|`getHeaderNames()`|获取请求头的名称集合|

获取请求参数的相关方法：

| 方法|说明|
| ---|---|
|`getParameter(String name)`|获取请求参数值|
|`getParameterValues(String name)`|获取请求参数的名称集合|
|`getParameterMap()`|获取所有值|


获取其他常用对象的相关方法：

| 方法|说明|
| ---|---|
|`getRequestDispatcher()`|获取该请求的调度器对象|



获取请求参数实例代码：
```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	String username = request.getParameter("username");
	String pwd = request.getParameter("password");
	
	String[] rem = request.getParameterValues("remember");
	
	response.getWriter().println(username);
	response.getWriter().println(pwd);
	response.getWriter().println(Arrays.toString(rem));
	
	Map<String, String[]> map = request.getParameterMap();
	for(Map.Entry<String, String[]> entry : map.entrySet()) {
		response.getWriter().println("Key = " + entry.getKey() + ", Value = " + Arrays.toString(entry.getValue()));
	}
}
```

#### 解决请求参数的中文乱码问题
处理`get`请求方式提交的中文乱码：使用 `String` 构造方法解决 
```java
String username = request.getParameter("username");
String dealedUsername = new String(username.getBytes("ISO8859-1"),"utf-8");
```
`post`提交会将参数首先提交到`request`对象的缓冲区中，缓冲区默认编码是ISO8859-1,只需要将其设置成支持中文的编码即可
```java
request.setCharacterEncoding("utf-8");
```

#### HttpServletRequest 传递数据
利用`Request`对象传递数据是利用了其域对象的特性，在**一次请求中**可以通过其存值与取值。
|方法|说明|
|---|---|
|`setAttribute(String key, Obeject obj)`|存值|
|`getAttribute(String key)`|取值|
|`removeAttribute(String key)`|移除值|


### HttpServletResponse对象
响应：服务器根据浏览器的请求，返回相应数据到浏览器的行为。

`HttpServletResponse` 是一个接口，他的父接口是 `ServletResponse`，在开发中通常使用 `HttpServletResponse`，通过`HttpServletResponse`我们可以设置响应数据的相关参数。

响应信息分为三部分：响应行，响应头，响应正文（响应体）

#### HttpServletResponse 对象常用方法 ####
设置响应行和响应头的相关的方法：
| 方法|说明|
| ---|---|
|`setStatus(int sc)`| 返回响应状态码，常见响应状态码：200  302 400 404 500 等。 |
|`setError(int sc)`| 发送错误状态码 |
|`setStatus(int sc, String msg)`| 发送错误状态码和错误信息|
|`setHeader(String key, String value)`|一对一键值对|
|`addHeader(String key, String value)`|一键对多值|
|`setContentLength(int src)`|设置响应数据长度|
|`setCharacterEncoding(String a)`|设置编码方式，参数为码表格式 `utf-8`|
|`setContentType(String a)`|设置响应数据的类型和码表格式 `text/html;charset=utf-8`|


发送响应体相关的方法：
| 方法|说明|
| ---|---|
|`getoutputStream`|得到一个字节流`ServletOutputStream`对象，返回文本，图片，视频等二进制文件|
|`getWriter()`|得到一个字符流`PrintWriter`对象，返回字符数据|

通过字节和字符流返回响应字符串：
```java
String value = "qijieh";
ServletOutputStream out = response.getOutputStream();
out.print(value); // out.write()

PrintWriter pw = response.getWriter();
pw.print(value); //pw.write()
```


**解决中文输出乱码的问题**
通过字节流向浏览器输出中文时可能会出现乱码问题，其原因是**服务器端和浏览器端的编码格式不一致引起的**。
解决方式就是使服务器端编码和浏览器端编码保持一致。
```java
@WebServlet("/HttpResponseServlet")
public class HttpResponseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String str = "中文字符";
		
		ServletOutputStream out = response.getOutputStream();
		// 告诉浏览器返回的数据是utf-8编码
		response.setHeader("Content-Type", "text/html;charset=utf-8");
		// response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		out.write(str);
	}
}
```

通过字符流向浏览器输出中文时一定是乱码的，乱码形式:`???`，中文的编码格式iso8859-1，这种编码格式不支持中文。
解决方法是设置服务器端编码为`utf-8`，注意这和上面的字节流处理方式有区别。
```java
@WebServlet("/HttpResponseServlet")
public class HttpResponseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String str = "中文字符";

		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		//response.setContentType("text/html;charset=GBK18030");
		PrintWriter pw = response.getWriter();
		pw.print(str);
	}
}
```

### RequestDispatcher 对象
在开发中，当web资源被访问到以后，需要服务器跳转到另一个web资源去处理请求，可以通过sendRedirect这个方法实现，转发对象的`forward`方法。

得到一个`RequestDispatcher`对象
```java
forwardObj.forward(request,response)
```

**`RequestDispatcher`对象常用方法：**
|方法|说明|
|---|---|
|`forward(request,response)`|请求转发|
|`include(request,response)`|请求包含|

#### 请求转发和重定向  
请求转发和重定向虽然实现的功能一致，但是其内部实现原理是不同的，必须明确两者的整个流程。

![](https://gitee.com/qijieh/blog-image-bed/raw/master/20201026001455.png)

1. 请求转发

通过调用`RequestDispatcher.forward()`方法，将当前的`request`发送给指定`servlet`对象
```java
// 转发的 servlet
@WebServlet("/RequestFowardServlet")
public class RequestFowardServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 1. 获取转发对象
		RequestDispatcher rd = request.getRequestDispatcher("/RequestResultServlet");
		// 2. 调用转发方法，实现转发效果
		request.setAttribute("Servlet01", "this is deal by servlet01");
		rd.forward(request, response);
	}
}
```
```java
// 最终接受请求的 servlet
@WebServlet("/RequestResultServlet")
public class RequestResultServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("Servlet02", "finnal deal by Servlet02");
		Object obj = request.getAttribute("Servlet01");
		Object obj2 = request.getAttribute("Servlet02");
		response.getWriter().println(obj.toString());
		response.getWriter().println(obj2.toString());
	}
}
```

2. 请求重定向

重定向的`requset`是无法携带参数，因为浏览器无法在第二次发起请求时，无法处理第一次请求响应的数据并携带其至第二次请求中。


#### 请求包含

请求包含又不同于另外两个方式，请求包含是在服务器内部完成的，其路径和请求转发一样也不需要携带项目名称。与请求转发不同的是，这种方式最终响应浏览器的是初始请求的`servlet`。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201028150431.png)

**实例代码：**
```java
/**
 * 这是一个包含的Servlet，其包含了其他web资源
 */
@WebServlet("/RequestIncludeServlet")
public class RequestIncludeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 1. 获取调度器对象
		RequestDispatcher rd = request.getRequestDispatcher("/RequestIncludedServlet");

		PrintWriter out = response.getWriter();
		out.println("including..............");
		// 2. 请求包含
		rd.include(request, response);
		
		// 3. 包含完毕后，原对象可握有request对象
		out.println("includ commplet");
	}
}
```

```java
/**
 * 这是一个被包含的Servlet
 */
@WebServlet("/RequestIncludedServlet")
public class RequestIncludedServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		out.println("I'm included servlet, this word is by me");
	}
}
```

访问`/RequestIncludeServlet`，查看网页：
```
including..............
I'm included servlet, this word is by me
includ commplet
```

注意，虽然被包含的`servlet`操作了`response`但是这个`response`对象最终依旧是归原`servlet`握有的，也是由原`servlet`响应给客户端的。（通过中文编码测试可验证）

> 请求转发和页面重定向可以从浏览器明显感觉到，页面重定向会刷新页面并更改页面的url地址，但是请求转发只会发起一次请求，自始至终url也没有变化。




