---
title: Java Web(二) Servlet基础
date: 2020-10-19
sidebar: false
categories:
 - [BackEnd]
 - [FrontEnd]
tags:
 - Java Web
 - Java
publish: true
---


##  Java Web(二) Servlet 基础
### Servlet概述

**什么是servlet**

servlet 是运行在 Web 服务器中的小型 Java 程序。简单来说就是一个java类，在使用servlet时，需要导入javax.servlet下的jar包。比如：Tomcat服务器就提供了servlet的jar包，所以在开发时使用tomcat服务器就不需要再导入servletd的jar包（某些IDE或JDK集成了servlet，如 MyEclipse）

```
..\apache-tomcat-9.0.39\lib\servlet-api.jar
```

Servlet也是一个资源，用户也能访问，他同时也是一个动态资源

**servlet作用**

servlet 通常通过 HTTP（超文本传输协议）接收和响应来自 Web 客户端的请求

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/image-20201019174543796.png)

### Servlet 基础

查询 JavaEE-API文档中的Servlet类，该类主要有五个方法 (文档描述)

| 返回            | 方法                                                    | 描述                                                         |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| `void`          | **`init(ServletConfig config)`**                        | servlet 容器仅在实例化  servlet  之后调用 `init` 方法一次。在  servlet 可以接收任何请求之前，`init` 方法必须成功完成。 |
| `ServletConfig` | `getServletConfig()`                                    | 返回 `ServletConfig` 对象，该对象包含此 servlet 的初始化和启动参数。返回的 `ServletConfig` 对象是传递给  `init` 方法的对象。  此接口的实现负责存储 `ServletConfig` 对象，以便此方法可以返回该对象。实现此接口的 `GenericServlet` 类已经这样做了。 |
| `void`          | **`service(ServletRequest  req, ServletResponse res)`** | 由 servlet 容器调用，以允许 servlet 响应某个请求。  此方法仅在 servlet 的 `init()` 方法成功完成之后调用。  应该为抛出或发送错误的 servlet 设置响应的状态代码。  servlet 通常运行在可同时处理多个请求的多线程 servlet 容器中。开发人员必须知道要同步对所有共享资源（比如文件、网络连接以及 servlet  的类和实例变量）的访问。 |
| `String`        | `getServletInfo()`                                      | 此方法返回的字符串应该是纯文本，不应该是任何种类的标记（比如 HTML、XML，等等）。 这个方法在开发中几乎不使用。 |
| `void`          | **`destroy() `**                                        | 由 servlet 容器调用，指示将从服务中取出该 servlet。此方法仅在 servlet 的 `service`  方法已退出或者在过了超时期之后调用一次。在调用此方法之后，servlet 容器不会再对此 servlet 调用 `service` 方法。  此方法为 servlet 提供了一个清除持有的所有资源（比如内存、文件句柄和线程）的机会，并确保任何持久状态都与内存中该 servlet  的当前状态保持同步。 |

**创建Servlet的三种方式**
1. 直接实现Servlet接口
2. 继承GenericServlet类
3. 继承HttpServlet类

一般开发中，创建servlet通常去继承HttpServlet类，如：
```java
class MyServlet extends HttpServlet { code... }
```
> 暴露接口和继承是为了将来新的技术出现时可以同步接口技术，如HttpsServlet
预留未来的开发接口

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201019223231.png)



### Servlet 的生命周期

从servlet被创建，被调用，到最终被销毁，整个过程就是servlet的生命周期
与servlet生命周期相关的三个方法：
- **`init()`**：初始化
- **`service()`**：服务方法
- **`destroy()`**：销毁

servlet生命周期测试实例：
```java
/**
 * servlet的生命周期
 * @author qijieh
 *
 */
public class LifeServlet extends GenericServlet {
	/**
	 * 初始化方法
	 */
	@Override
	public void init() throws ServletException {
		System.out.println("首次访问时，调用初始化方法："+this.getClass().getName());
	}
	
	/**
	 * 服务方法
	 */
	@Override
	public void service(ServletRequest arg0, ServletResponse arg1) throws ServletException, IOException {
		System.out.println("每次发送请求时，调用服务方法："+this.getClass().getName());
	}
	
	/**
	 * 销毁方法
	 */
	@Override
	public void destroy() {
		System.out.println("在服务器关闭时，调用销毁方法："+this.getClass().getName());
	}
}
```
注意修改相应的web.xml访问路径和执行的servlet方法
```xml
<!-- 配置/hello路径访问的servlet -->
<servlet>
	<servlet-name>lifeservlet</servlet-name>
	<servlet-class>per.qijieh.firstmyapp.servlet.LifeServlet</servlet-class>
</servlet>
<!-- 配置浏览器访问servlet的路径 -->
<servlet-mapping>
	<servlet-name>lifeservlet</servlet-name>
	<url-pattern>/life</url-pattern>
</servlet-mapping>
```

访问 `http://localhost:8080/demo/life` 查看控制台输出
```
console >>>>
首次访问时，调用初始化方法：per.qijieh.firstmyapp.servlet.LifeServlet
每次发送请求时，调用服务方法：per.qijieh.firstmyapp.servlet.LifeServlet
每次发送请求时，调用服务方法：per.qijieh.firstmyapp.servlet.LifeServlet
信息: 正在停止服务[Catalina]
在服务器关闭时，调用销毁方法：per.qijieh.firstmyapp.servlet.LifeServlet
```

### Servlet 源码解析 HttpServlet
浏览器访问服务器端资源时需要遵守网络传输协议，比如`http,https,file`等，所以在创建servlet时,我们一般通过继承`HttpServlet`类来实现。

>如果你需要查看`HttpServlet`的源码，你需要前往[Tomcat](https://tomcat.apache.org/)官网下载`Source Code Distributions`源码压缩包，并在项目引入的`servlet-api.jar`中绑定源码文件

以下是部分`HttpServlet`类的源码：
```java
public abstract class HttpServlet extends GenericServlet {
	//...
	    protected void doOptions(HttpServletRequest req,
            HttpServletResponse resp)
        throws ServletException, IOException {
			// ...
			String allow = null;
			if (ALLOW_GET)
				allow=METHOD_GET;
			if (ALLOW_HEAD)
				if (allow==null) allow=METHOD_HEAD;
				else allow += ", " + METHOD_HEAD;
			if (ALLOW_POST)
				if (allow==null) allow=METHOD_POST;
				else allow += ", " + METHOD_POST;
			if (ALLOW_PUT)
				if (allow==null) allow=METHOD_PUT;
				else allow += ", " + METHOD_PUT;
			if (ALLOW_DELETE)
				if (allow==null) allow=METHOD_DELETE;
				else allow += ", " + METHOD_DELETE;
			if (ALLOW_TRACE)
				if (allow==null) allow=METHOD_TRACE;
				else allow += ", " + METHOD_TRACE;
			if (ALLOW_OPTIONS)
				if (allow==null) allow=METHOD_OPTIONS;
				else allow += ", " + METHOD_OPTIONS;

			resp.setHeader("Allow", allow);
   		}

	// ...
}
```

在`HttpServlet`里重写方法时，一般不会重写其内部`service`方法，因为在其方法内部，最终调用了`doGet,doPost`等方法，所以我们只需要重写其`doGet`和`doPost`等方法


**继承HttpServlet实例代码：**
```java
/**
 * 继承HttpServlet类，处理get和post请求
 * @author qijieh
 *
 */
public class MyHttpServlet extends HttpServlet {
	/**
	 * 接受客户端发送的get请求
	 */
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String method = req.getMethod();
		System.out.println("接受到get请求："+method);
	}
	
	/**
	 * 接受客户端发送的post请求
	 */
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String method = req.getMethod();
		System.out.println("接受到post请求："+method);
	}
}
```


### Servlet ON Eclipse

#### 项目导入servlet-api.jar
Eclipse并不提供和支持自动导入`servlet`包，需要我们手动为项目导入jar包。
`Tomcat/lib`目录下的`servlet-api.jar`提供了jar包我们直接将其复制到项目的`WebContent/WEB-INFO/lib`下即可，成功复制导入之后在项目的`JavaResources/Libraries`下会新增`Web App Libraries/servlet-api.jar`。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201019225258.png)


> 整个WEB项目的jar包都应该通过这种方式导入到项目中，即复制jar到`WebContent/WEB-INFO/lib`目录下，这对项目可移植性友好。


#### 在Eclipse开发工具中创建Servlet的两种方式


**1. 手动创建`Servlet`继承`GenericServlet`，部署到tomcat服务器**
第一种是创建普通java类，通过实现`Servlet`接口或继承`HttpServlet(GenericServlet)`类。之后，你还需要手动在`web.xml`中配置访问该`servlet`的访问信息。
1. 创建`HelloServlet`类，继承`GenericServlet`
2. 重写父类`GenericServlet`的`service`方法
3. 在`service`方法里面，处理客户端请求，把数据返回客户端
```java
/**
 * 自己创建的Servlet，继承GenericServlet
 * 重写service方法
 * @author qijieh
 *
 */
public class HelloServlet extends GenericServlet{

	@Override
	public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
		// 处理客户端请求，响应数据
		System.out.println("client request recevied .............");
		// 与浏览器绑定输出流，向浏览器输出数据
		PrintWriter pw = res.getWriter();
		pw.print("Hello world");
	}
	
}
```
4. 客户端想要访问Servlet，需要提供servlet的访问路径，在web.xml中键入地图指向。你可以右键实现的servlet类，点击复制限定名即可快速复制该类在项目中的路径引用。
```xml
<!-- 配置/hello路径访问的servlet -->
<servlet>
    <servlet-name>helloWorld</servlet-name>
    <servlet-class>per.qijieh.firstmyapp.servlet.HelloServlet</servlet-class>
</servlet>
<!-- 配置浏览器访问servlet的路径 -->
<servlet-mapping>
    <servlet-name>helloWorld</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
```
4. 托管项目到Tomcat服务器，访问设置的路径查看是否成功 `http://localhost/demo/hello`


**2. 使用新建Servlet类的方式，自动创建**
第二种是通过开发工具新建`Servlet`，这种方式会自动向`web.xml`中添加访问该`servlet`的访问信息。

通过Eclipse创建`servlet`时，弹出窗口会引导你填写servlet名，描述，该Servlet的访问路径，重写的请求方法等。

以下是通过Eclipse新建的`servlet`类的部分代码：
```java {18}
@WebServlet("/autoBuildServlet")
public class AutoBuildServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * 自动生成的重写doGet方法
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * 自动生成的重写doPost方法
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
```
可以看见，其通过继承`HttpServlet`类的方式实现`servlet`，此外注意高亮标识行，其在`doPost`方法中调用了`doGet`方法，这是为了简化开发，即允许同一种需求使用Get和Post请求完成服务。