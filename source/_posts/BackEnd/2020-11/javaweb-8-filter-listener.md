---
title: Java Web(八) Filter和Listener
date: 2020-11-2
sidebar: false
categories:
 - BackEnd
 - FrontEnd
tags:
 - Java Web
 - Java
publish: false
---

## Java Web(八) Filter和Listener

### Filter 过滤器对象

在开发中，通过浏览器访问服务器端资源时，通过Filter可以拦截请求，如果Filter判断请求合理，允许访问目标资源否则拒绝访问请求，一个请求可以通过多个Filter。简单来说就是路由管理。

Filter的生命周期：
- `init()`
- `doFilter()`
- `destroy()`

#### 实现第一个Filter

通过创建class类继承Filter接口实现。

通过IDE直接创建一个Filter类。

```java
/**
 * Servlet Filter implementation class MyFilter
 */
@WebFilter("/HelloFilterServlet")
public class MyFilter implements Filter {

    /**
     * Default constructor. 
     */
    public MyFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here

		// pass the request along the filter chain
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
```

拦截的具体配置会写入`web.xml`文件中
```xml
<filter-mapping>
    <filter-name>MyFilter</filter-name>
    <url-pattern>/MyServlet</url-pattern>
</filter-mapping>
```


#### Filter 映射

拦截匹配目录:
```
/MyServlet
/*
/userhome/*
*.do
```

拦截请求方式：
```
REQUEST(default) FORWARD INCLUDE ERROR
```


#### Filter 链

在一个web项目中可以存在多个Filter对同一个请求进行拦截，这些Filter就被称为Filter链。多个过滤器拦截一个请求时，拦截顺序和web.xml的配置顺序有关，谁配置在前谁先拦截


#### FilterConfig

`FilterConfig`是`Filter`的配置对象，用来获取与`Filter`相关的参数信息。

获取初始化参数值
```java
String getInitParamete(String name)
```
获取所有的初始化参数名称
```java
Enumeration getInitParameterNames()
```

获取`ServletContext`对象
```java
getServletContext()
```

#### Filter 相关应用

**使用Filter实现用户自动登录**

通过请求拦截判断cookie中存储的用户信息，并使用这些信息登录

**Filter实现统一全站编码**

```java
/**
 * 统一全站编码
 */
@WebFilter("/*")
public class CharacterFilter implements Filter {
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		// 处理响应中文乱码问题
		res.setContentType("text/html;charset=utf-8");
		
		// 处理POST请求中文乱码问题 GET请求在新版本中不需要进行额外处理
		String method = req.getMethod();
		if(method.equalsIgnoreCase("post")) {
			req.setCharacterEncoding("utf-8");
		}
        // CharacterRequest creq = new CharacterRequest(req);
        // chain.doFilter(creq, res);
		chain.doFilter(req, res);
	}
}
```

旧版本需要处理Get请求中文乱码问题，解决方案为使用装饰者模式增强getParameter方法
```java
/**
 * 处理get请求的中文乱码问题
 * 增强getParameter方法
 * @author qijieh
 *
 */
public class CharacterRequest extends HttpServletRequestWrapper {
	// 引入被增强对象
	private HttpServletRequest request;
	
	public CharacterRequest(HttpServletRequest request) {
		// 给引入对象赋值
		super(request);
		this.request = request;
	}
	
	@Override
	public String getParameter(String name) {
		String value = request.getParameter(name);
		System.out.println(value);
		if(value==null) {
			return null;
		}
		
		String method = request.getMethod();
		System.out.println(method);
		if(method.equalsIgnoreCase("get")) {
			try {
				value = new String(value.getBytes("iso-8859-1"),"utf-8");
				System.out.println("转码："+value);
			} catch (UnsupportedEncodingException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
		}

		return value;
	}
}
```

### Listenter 监听器对象

Servlet监听器由四个重要部分组成：
1. 事件
2. 事件源
3. 事件监听器
4. 事件处理器

Servlet监听器有八种和三大类：
1. 监听域对象的创建和销毁：`request,session,servletContext`
2. 监听域对象属性的创建和销毁：`setAttribute(),removeAttribute(),getAttribute()`
3. 监听`session`域对象中对象属性的状态

Listenter 的生命周期

监听器对象创建应在被监听对象之前创建，熟悉各个域对象的创建与销毁时期：
`ServletContext`域对象：在服务器启动时创建，服务器关闭时销毁
`request`对象：每次发起请求时创建，请求响应之后销毁
`session`对象：在一次会话时创建，会话结束销毁，超过过期时间销毁，服务器关闭销毁，`invalidate()`方法销毁


通过IDE可以轻松创建一个Listener类。

demo
::: details
```java
@WebListener
public class MyListener implements ServletRequestListener, HttpSessionListener, ServletContextListener {

    public MyListener() {
        System.out.println("监听器对象创建...");
    }

    public void sessionCreated(HttpSessionEvent se)  { 
    	System.out.println("session对象创建监听...");
    }

    public void requestDestroyed(ServletRequestEvent sre)  { 
    	System.out.println("request对象销毁监听...");
    }

    public void requestInitialized(ServletRequestEvent sre)  { 
         System.out.println("request对象创建监听...");
    }

    public void sessionDestroyed(HttpSessionEvent se)  { 
    	System.out.println("session对象销毁监听...");
    }

    public void contextDestroyed(ServletContextEvent sce)  { 
    	System.out.println("context对象销毁监听...");
    }

    public void contextInitialized(ServletContextEvent sce)  { 
    	System.out.println("context对象创建监听...");
    }
	
}
```
:::


#### 监听域对象属性变更

在开发中经常使用的是监听域对象属性变更。

```java
// ServletContext
attributeAdded(ServletContextAttributeEvent scae)
attributeRemoved(ServletContextAttributeEvent scae)

// ServletRequest
attributeAdded(ServletRequestAttributeEvent srae)
attributeRemoved(ServletRequestAttributeEvent srae)
attributeReplaced(ServletRequestAttributeEvent srae)

// HttpSession
attributeAdded(HttpSessionBindingEvent se)
attributeRemoved(HttpSessionBindingEvent se)
```

通过参数中的事件源可以得到修改的属性和属性值。










