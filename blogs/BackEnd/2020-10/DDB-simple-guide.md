---
title: 初识Oracle分布式数据库
date: 2020-10-15
sidebar: false
categories:
 - BackEnd
tags:
 - Oracle
publish: true
---
![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201019005612.png)
<!-- more -->
## Oracle 分布式数据库

### 什么是分布式数据库
数据物理上被存放在网络的多个节点上，逻辑上是一个整体
![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201015232534.png)


### 分布式数据库的独立性
分布数据库的独立性指用户不必关心数据如何分割和存储，只需关心他需要什么数据

### Oracle 分布式RDBMS


本地操作
```SQL
sqlplus scott/tiger@localhost:1521/orcl
```

远程操作
```SQL
sqlplus scott/tiger@192.168.1.23:1521/orcl
```

**分布操作**
- 跨节点数据的创建及查询
- 跨节点数据更新

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/20201015233849.png)

**定义数据库链路 DBLINK**
```sql
-- 创建DBLINK需要相应权限
-- GRANT CREATE DATABASE LINK TO scott

CREATE DATABASE LINK remoteDB CONNECT TO scott IDENTIFIED BY tiger using '192.168.25.23:1521/orcl';
```

> 修改主机 `tnsnames.ora` 文件以创建连接的服务名替代使用IP地址
>```
>REMOTEORCL =
>   (DESCRIPTION =
>       (ADDRESS_LIST =
>           (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.1.23)(PORT = 1521))
>       )
>       (CONNECT_DATA =
>           (SERVICE_NAME = orcl)
>       )
>)
>```
>```sql
>CREATE DATABASE LINK remoteDB CONNECT TO scott IDENTIFIED BY tiger using remoteorcl;
>```


**通过链路查询远端数据库**
```sql {2}
SELECT ename,dname
FROM dept,emp@remoteDB
WHERE emp.depton = dept.depton;
```

>在SQL命令符下使用 `host c` 可以清屏
> ```sql
>SQL> host c
>```

**使用同义词替换远端数据库**
```sql
CREATE SYNONYM remoteemp FOR emp@remoteDB;
-- 使用同义词查询
SELECT ename,dname
FROM dept,remoteemp
WHERE remoteemp.depton = dept.depton;
```
使用同义词替换远端表名后，上述SQL语句已经与本地SQL语句无异，但是其实际上是访问的远端数据库数据，这样就达到了对用户欺骗，造成数据在本机上的效果。

**建立远程表的本地视图**
```sql
CREATE VIEW allemp AS
    SELECT * FROM emo
    UNION
    SELECT * FROM remoteemp;
```

**分布式数据库的其他操作**
插入操作：
```sql
INSERT INTO emp SELECT * FROM remoteemp;
```
数据复制：
```sql
CREATE TABLE emp AS SELECT * FROM remoteemp;
```


**分布式数据库的跨节点更新**
- 快照
定义快照维护关系表的异步副本，用于主表修改少，但频繁查询的表
```sql
CREATE SNAPSHOT emp
    REFRESH START WITH sysdba
        NEXT next_day(sysdba.'Monday')
    AS SELECT * FROM emp@maindb;
-- 注意：快照是定义在备份端，这里的连接应该是客机连接主机的链路
```
- 触发器
在主机上创建触发器，实现数据的同步更新
```sql
CREATE OR REPLACE TRIGGER update_emp
AFTER UPDATE ON emp
FOR EACH ROW
BEGIN
    UPDATE remoteemp SET emp.sal = :new.sal
    WHERE emp.empno = :new.empno;
END;
```