---
title: Java Web(十) 数据库连接池和DBUtils
date: 2020-11-2
sidebar: false
categories:
 - BackEnd
 - FrontEnd
tags:
 - Java Web
 - Java
 - JDBC
publish: false
---

## Java Web(十) 数据库连接池和DBUtils

### 数据库连接池

在使用jdbc编程时，每次访问数据库都需要创建链连接对象，访问完毕后也需要断开连接（销毁对象），当数据库访问量巨大时，将频繁创建和销毁连接对象，拉低数据库的执行效率。

**数据库连接池技术**

为了解决这个弊端，产生了数据库连接池技术来管理连接对象。通过数据库连接池将有以下优势：
1. 应用程序不再需要创建和销毁连接对象，而是交给数据库连接池进行管理。
2. 应用程序断开连接时，不再销毁对象继而将连接对象归还连接池。

不难看出数据库连接池技术和线程池异曲同工之妙。

数据库连接池的基本参数：
1. 初始化连接数
2. 最大连接数
3. 最大等待时间
4. 最大空闲连接
5. 最小空闲连接

**数据库连接池与传统模式的区别：**

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201102234025.png)


**DataSource接口**

数据库连接池技术是基于`DataSource`接口实现，该接口由sun公司制定规范，数据库厂商提供接口实现自家的数据库连接池。

目前流行的数据库连接池技术有：DBCP 和 C3P0

#### DBCP 数据源

DBCP (DataBases Connection Pool 数据库连接池),是由开源组织Apache提供的数据库连接池技术。

在项目中使用DBCP的基本步骤：
1. 下载DBCP的jar包：[`commons-dbcp2-2.8.0.jar`](http://commons.apache.org/proper/commons-dbcp/download_dbcp.cgi),[`commons-pool2-2.9.0.jar`](https://commons.apache.org/proper/commons-pool/download_pool.cgi)
2. DBCP获取连接对象，设置连接参数。
第一种：直接使用BasicDataSource类创建连接对象
第二种：通过读取DBCP配置文件创建连接对象

```java
/**
 * 第一种方式，在代码中完成配置
 * @author qijieh
 *
 */
public class DBCPdemo {
	public static DataSource ds = null;
	
	static {
		// 获取DBCP数据源实现类对象
		BasicDataSource bds = new BasicDataSource();
		// 设置连接数据库需要的四个参数
		bds.setDriverClassName("com.mysql.cj.jdbc.Driver");
		bds.setUrl("jdbc:mysql://localhost:3306/test");
		bds.setUsername("root");
		bds.setPassword("root");
		// 设置连接池参数
		bds.setInitialSize(5);
		
		ds=bds;
	}
	
	public static void main(String[] args) throws SQLException {
		Connection con = ds.getConnection();
		DatabaseMetaData metaData = con.getMetaData();
		System.out.println(metaData.getURL());
		System.out.println(metaData.getUserName());
		System.out.println(metaData.getDriverName());
	}
}
```
```java
/**
 * 第二种，通过读取配置文件方式
 * @author qijieh
 *
 */
public class DBCPdemo02 {
	public static  DataSource ds = null;
	static {
		Properties prop = null;
		try {
			prop = new Properties();
			InputStream in = new DBCPdemo02().getClass().getClassLoader().getResourceAsStream("dbConfig.properties");
			prop.load(in);
			ds = BasicDataSourceFactory.createDataSource(prop);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public static void main(String[] args) throws SQLException {
		Connection con = ds.getConnection();
		DatabaseMetaData metaData = con.getMetaData();
		System.out.println(metaData.getURL());
		System.out.println(metaData.getUserName());
		System.out.println(metaData.getDriverName());
	}
}
```
```
# dbConfig.properties
# 参数文档：http://commons.apache.org/proper/commons-dbcp/configuration.html
# 数据库基础信息
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/test
username=root
password=root
```

#### C3P0 数据源

C3P0数据源是目前主流的数据库连接池技术之一，其性能更加优越，还提供了数据框架hibernate等很好的支持。

在项目开发中使用C3P0的基本步骤：
1. 下载C3P0的jar包并导入项目：[`c3p0-0.9.5.5.jar`](https://sourceforge.net/projects/c3p0/),`mchange-commons-java-0.2.19.jar`
2. 设置连接参数
第一种：通过ComboPoole构造方法获取
第二种：通过读取配置文件进行配置

```java
/**
 * 第一种通过ComboPooledDataSource下方法
 * @author qijieh
 *
 */
public class C3P0demo {
	public static DataSource ds = null;
	
	static {
		ComboPooledDataSource cpds = new ComboPooledDataSource();
		try {
			cpds.setDriverClass("com.mysql.cj.jdbc.Driver");
			cpds.setJdbcUrl("jdbc:mysql://localhost:3306/test");
			cpds.setUser("root");
			cpds.setPassword("root");
			
			cpds.setInitialPoolSize(5);
			cpds.setMaxPoolSize(15);
			ds = cpds;
		} catch (PropertyVetoException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
	}
	
	
	public static void main(String[] args) throws SQLException {
		System.out.println(ds.getConnection());
	}
}
```
```java
/**
 * 第二种，通过配置文件
 * @author qijieh
 *
 */
public class C3P0demo2 {
	public static DataSource ds = null;
	
	static {
		// cpds构造函数会自动查找 c3p0-config.xml 配置文件
		ComboPooledDataSource cpds = new ComboPooledDataSource();
		ds = cpds;
	}
	
	public static void main(String[] args) throws SQLException {
		System.out.println(ds.getConnection());
	}
}
```
```xml
<?xml version="1.0" encoding="UTF-8"?>
<c3p0-config>
	<default-config>
		<property name="jdbcUrl">jdbc:mysql://localhost:3306/test</property>
		<property name="driverClass">com.mysql.cj.jdbc.Driver</property>
		<property name="user">root</property>
		<property name="password">root</property>
		<property name="acquireIncrement">3</property>
		<property name="initialPoolSize">10</property>
		<property name="minPoolSize">2</property>
		<property name="maxPoolSize">10</property>
	</default-config>
	<named-config name="test">
		<property name="jdbcUrl">jdbc:mysql://localhost:3306/test</property>
		<property name="driverClass">com.mysql.cj.jdbc.Driver</property>
		<property name="user">root</property>
		<property name="password">root</property>
	</named-config>
</c3p0-config>
```


### DBUtils

DBUtils 由开源组织Apache发布的commons组件，是对JDBC的封装工具类，减少了操作数据库的代码。

`commons-dbutils-1.7.jar` [下载地址](http://commons.apache.org/proper/commons-dbutils/download_dbutils.cgi)

**QueryRunner类**
`QueryRunner`类是DBUtils组件下的核心类，通常和ResultSerHandler接口配合使用。

**`query()`**

执行查询语句

**`update()`**

执行增删改语句(DDL)

**ResultSerHandler接口**

处理`ResultSet`结果集对象，封装数据，转换成对象或集合

`ResultSerHandler`实现类：
- `BeanHandler`：把结果集中第一行的数据转化成javaBean对象
- `BeanListHandler`：把结果集中所有数据转换成javaBean的List
- `ScalarHandler`：把结果集数据转换成对象

```java
/**
 * 模拟实现
 * @author qijieh
 *
 */

public class BaseDao {
	/*
	 * sql:查询语句
	 * rsh:结果集句柄
	 * params:PreparedStatment占位替换参数
	 */
	public static Object query(String sql, ResultSetHandler<?> rsh, Object...params) {
		Connection conn = null;
		PreparedStatement pstms = null;
		ResultSet rs = null;
		
		try {
			conn = JDBCUtils.getConnection();
			pstms = conn.prepareStatement(sql);
			for (int i = 0;params != null && i < params.length; i++) {
				pstms.setObject(i+1, params[i]);
			}
		} catch (Exception e) {
			rs = pstms.executeQuery();
			Object obj = rsh.handle(rs);
			return obj;
		} finally {
			JDBCUtils.release(rs, pstms, conn);
		}
		
		return rs;
	}
}
```

#### 使用DBUtils实现CRUD

```java
public class DBUtilsDao {
	private QueryRunner runner = null;
	private static final String insertSql = "insert into user(name,password) values(?,?)";
	private static final String updatetSql = "update user set name=?,password=? where id=?";
	private static final String deleteSql = "delete from user where id=?";
	private static final String findAllSql = "select * from user";
	private static final String findOneByIdSql = "select * from user where id=?";
	
	public Boolean insert(User user) throws SQLException {
		runner = new QueryRunner(C3P0Utils.getDataSource());
		int num = runner.update(insertSql,user.getName(),user.getPassword());
		if(num > 0) {
			return true;
		}
		return false;
	}
	
	public Boolean update(User user) throws SQLException {
		runner = new QueryRunner(C3P0Utils.getDataSource());
		int num = runner.update(updatetSql,user.getName(),user.getPassword(),user.getId());
		if(num > 0) {
			return true;
		}
		return false;
	}
	
	public Boolean delete(User user) throws SQLException {
		runner = new QueryRunner(C3P0Utils.getDataSource());
		int num = runner.update(deleteSql,user.getId());
		if(num > 0) {
			return true;
		}
		return false;
	}
	
	
	public List findAll() throws SQLException {
		runner = new QueryRunner(C3P0Utils.getDataSource());
		List list = runner.query(findAllSql, new BeanListHandler<User>(User.class));
		return list;
	}
	
	public User findOneById(int id) throws SQLException {
		runner = new QueryRunner(C3P0Utils.getDataSource());
		User user = runner.query(findOneByIdSql, new BeanHandler<User>(User.class),id);
		return user;
	}
}
```











