---
title: Java Web(七) EL表达式和JSTL标签库
date: 2020-11-1
sidebar: false
categories:
 - BackEnd
 - FrontEnd
tags:
 - Java Web
 - Java
publish: false
---


## Java Web(七) EL表达式和JSTL标签库


### JavaBean

JavaBean 是java开发中常用的组件，其实就是一个java类，用于封装数据。
书写JavaBean需要满足五个规范：
- 该类被`public`修饰
- 该类提供公共无参构造方法
- 该类要有私有属性
- 该类的私有属性必须有`get`和`set`方法
- 该类要实现`Serializable`接口(可选)

```java
public class Book implements Serializable{
	// 私有属性
	private String id;
	private String name;
	// 无参构造方法
	public Book() {};
	
	// get&set
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

**JavaBean的属性**
类的成员变量和属性的关系：在普通的java类里面，成员变量可以说成是属性，但是在javabean里，只有能被get&set的成员变量才被称为属性。


### BeanUtils

BeanUtils 是apache提供的一套封装JavaBean的工具类。要想使用`BeanUtils`工具类，需要导入相关jar包到项目。

[commons-beanutils-1.9.4.jar](http://commons.apache.org/proper/commons-beanutils/)  
[commons-logging-1.2.jar](http://commons.apache.org/proper/commons-logging/download_logging.cgi)


**BeanUtils常用API:**

**`setProperty`**

设置`javabean`属性值

基础语法：
```java
setProperty(bean, name, val)
```

**`getProperty`**

获取`javabean`的属性值

基础语法：
```java
getProperty(bean, name)
```

**`populate`**

设置`javabean`属性值通过`map`集合

```java
populate(bean, properties)
```
参数说明：
- `properties`：map key 对应`javabean attr`, map value 对应`javabean attr-val`

`BeanUtils`常用来封装表单的提交数据，因为`request`提供了`getParameterMap()`方法将提交参数合并为一个`map`对象，我们可以直接使用`BeanUtils`的`populate()`方法直接封装数据

```java
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Person person = new Person();

		// 传统表单提交与赋值
		String name = request.getParameter("username"); 
		String passwd = request.getParameter("password");
		  
		person.setName(name); 
		person.setAge(passwd);
		
		// BeanUtils
		try {
			BeanUtils.populate(person, request.getParameterMap());
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		
	}
```

> 注意`BeanUtils`是JavaWeb项目的第三方jar包，在其他项目下你可能无法这种使用它。
> 使用`BeanUtils`时，还需要注意属性名和值的对应关系。



### EL 表达式

EL 在开发中通常用来获取域对象中保存的值。

基本语法
```
${object}
```
```html
<!-- 提供脚本元素获取域对象值 -->
<%= request.getAttribute("name") %> <br>
<%= request.getAttribute("major") %> <br>

<!-- 使用EL表达式 -->
${name} <br>
${major} <br>
```

当el表达式中的值不存在时，不会在页面中显示任何信息，即返回""

**EL 标识符**

在el书写过程中，使用一些符号来标记变量，函数名等。

书写规范：
- 不能以数字开头
- 不能包含el关键字：`and`,`or`等
- 不能使用el表达式的隐式对象
- 不能包含特殊符号：`\ / : , =`

**EL 变量**

基本格式：`${object}`，其中的`objec`就可以理解为el中的变量，无需定义可以直接使用。

**EL 常量**

布尔常量，数字常量，字符串常量，`null`常量

**EL 运算符**

点运算符，方括号运算符，算术运算符，比较运算符，逻辑运算符，`empty`运算符，三目运算符


```html
<%
    Person p = new Person();
    BeanUtils.setProperty(p, "username", "qijieh");
    BeanUtils.setProperty(p, "password", "a123");
    request.setAttribute("person", p);
%>
    <!-- empty运算符用于判断域对象中的属性是否存在，不存在返回true -->
    ${empty person}
    <!-- 点运算符用于获取域对象中的属性值 -->
    ${person.username}<br>
    
<%
    Map<String, String> map = new HashMap<String, String>();
    map.put("my-name","qijieh");
    request.setAttribute("user", map);
%>
    <!-- 如果属性名包含特殊字符时，使用方括号运算符获取该值 -->
    ${user["my-name"]}<br>
    
<!-- 算术运算符 -->
1+1=${1+1}<br>
1>2?${1>3}<br>
```


**EL 隐式对象**
`pageContext`
```
${pageContext.request.contextPath}
${pageContext.request.requestURI}
```
`pageScope`,`requestScope`,`sessionScope`,`applicationScope`

作用域的隐式对象是为了解决各个域中的重名获取问题，默认从小范围开始寻值。

`param`,`paramValues`

当前页面中表单提交参数对象
```html
<form action="/demo/demo.jsp" method="get">
num1:<input type="text" name="num1"></input><br>
num2:<input type="text" name="num"></input><br>
num3:<input type="text" name="num"></input><br>
<button type="submit" value="submin"></button>
</form>

num1:${param.num1 }<br>
num2:${param.num[0] }<br>
num3:${param.num[1] }<br>
```

`cookie`
```html
<% response.addCookie(new Cookie("userName","qijieh")); %>
获取cookie对象：${cookie.userName }
获取cookie对象名称: ${cookie.userName.name }
获取cookie对象值：${cookie.userName.value }
```


### JSTL

JSP标准标签库（JSTL JSP Stander Tag Libray）是一个JSP标签集合，它封装了JSP应用的通用核心功能。

JSTL支持通用的、结构化的任务，比如迭代，条件判断，XML文档操作，国际化标签，SQL标签。 除了这些，它还提供了一个框架来使用集成JSTL的自定义标签。

根据JSTL标签所提供的功能，可以将其分为5个类别。

- 核心标签
- 格式化标签
- SQL 标签
- XML 标签
- JSTL 函数

#### JSTL下载和使用

前往[apache官网](http://tomcat.apache.org/download-taglibs.cgi)下载 `taglibs-standard-impl-1.2.5.jar`和`taglibs-standard-spec-1.2.5.jar`两个jar包，将其导入项目即可。



> 上面的链接指向了1.2版本的，如果你需要使用旧版本即1.1版本的可以前往[apache release](http://archive.apache.org/dist/jakarta/taglibs/standard/binaries/)下载`jakarta-taglibs-standard-1.1.2.zip`解压该文件后将lib目录下的`jstl.jar`和`standard.jar`引入项目文件即可。

将jar包导入项目，在jsp文件中通过`taglibs`引入标签库。
```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
```

在jsp中使用标签测试是否引入成功
```
<c:out value="hello jstl"></c:out>
```

#### JSTL 标签

**`<c:out>`**

向网页输出内容
```
<c:out value="el表达式获取值" default="默认值" escapeXml="true或false"></c:out>
<c:out value="el表达式获取值" escapeXml="true或false">默认值</c:out>
```
参数说明：
- `value`：输出内容
- `default`：输出内容不存在时，显示默认值
- `escapeXml`：原文输出和`HTML`输出，默认`true`


**`<c:if>`**

条件判断
```
<c:if test="条件表达式" var="变量名称" scope="作用域"></c:if>
<c:if test="条件表达式" var="变量名称" scope="作用域">标签体内容</c:if>
```
实例：
```
<c:set var="salary" scope="request" value="${2000*2}"/>
<c:if test="${salary > 2000}">
    <p>我的工资为: <c:out value="${salary}"/><p>
</c:if>
```

**`<c:choose>`**

条件选择
```
<c:choose>
    <c:when test="条件表达式">标签体内容</c:when>
    <c:when test="条件表达式">标签体内容</c:when>
    ......
    <c:otherwise>标签体内容</c:otherwise>
</c:choose>
```
实例：
```
<c:choose>
    <c:when test="${empty param.username }">未知用户</c:when>
    <c:when test="${param.username=='qijieh' }">${param.username }，欢迎你</c:when>
    <c:otherwise>未经授权的用户</c:otherwise>
</c:choose>
```

**`<c:forEach>`**

遍历域对象或集合
```
<c:forEach var="遍历元素名" items="数组或集合"></c:forEach>
<c:forEach var="遍历元素名" items="数组或集合" begin="遍历开始下标" end="遍历结束下标" step="遍历增量"></c:forEach>
```
实例：
```
<% 
    String[] book = {"Java 入门到精通","Spring 项目实战","Oracle 数据库高级教程","Java Web 快速入门"};
    request.setAttribute("books", book);
%>
遍历数组：<br>
<c:forEach var="iter" items="${books }">
    ${iter }<br>
</c:forEach>

<%
    Map<String,String> userMap = new HashMap<>();
    userMap.put("001", "qijieh");
    userMap.put("002", "Tom");
    userMap.put("003", "Jack");
    userMap.put("004", "Mary");
    request.setAttribute("users", userMap);
%>
遍历集合：<br>
<c:forEach var="iter" items="${users }">
    ${iter.key}  ${iter.value }<br>
</c:forEach>

<% 
    List<String> numList = new ArrayList<String>();
    numList.add("1");
    numList.add("2");
    numList.add("3");
    numList.add("4");
    numList.add("5");
    request.setAttribute("nums", numList);
%>
指定遍历：<br>
<c:forEach var="iter" items="${nums }" begin="1" end="4" step="2">
    ${iter}<br>
</c:forEach>
```
输出：
```
遍历数组：
Java 入门到精通
Spring 项目实战
Oracle 数据库高级教程
Java Web 快速入门
遍历集合：
001 qijieh
002 Tom
003 Jack
004 Mary
指定遍历：
2
4
```
如同前端的模板语法一样，`<c:forEach>`标签也拥有一些索引属性
```
<c:forEach var="iter" items="Array" varStatus="vsu">
序号：${vsu.count}
索引：${vsu.index}
是否为第一个元素：${vsu.first}
是否为最后一个元素：${vsu.last}
元素的值：${iter}
</c:forEach>
```
注意区分序号和索引的区别，序号指当前输出元素的序数，索引指的是当前元素在集合中的下标

**`<c:url>` `<c:param>`**

传递参数和设置路径
```
<c:url var="变量名称" url="路径值">
    <c:param name="attrName" value="attrValue"></c:param>
    <c:param name="attrName" value="attrValue"></c:param>
    ......
</c:url>
```
实例：
```
<c:url var="URL" value="/login.html">
    <c:param name="username" value="qijieh"></c:param>
</c:url>
<a href="${URL }">Link 2 login.html</a>
```