---
title: Navicat Premium 15 连接本机 OracleDB
date: 2020-10-10
sidebar: false
categories:
 - BackEnd
tags:
 - OracleDB
publish: true
---
## Navicat Premium 15 连接本机 OracleDB

> 本教程基于作者学校机房环境的特殊配布，请酌情参考

### 开始之前

你需要清楚当前计算机的OracleDB环境和版本

- Oracle Database 版本：

  ```
  Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - 64bit Production
  ```

- Oracle Database 在本机的安装路径：

  ```
  C:\app\hp\product\11.2.0\dbhome_1
  ```

- Oracle Database 管理员账号：

  ```
  system/a123 as sysdba
  ```

除此之外，你还需要知道两个必要的 OracleDB 服务进程

```
OracleServiceORCL  						// 主进程
OracleOraDb11g_home1TNSListener			// 监听进程
```

> 在本机中 OracleServiceORCL  服务默认是禁用的，你需要进入服务详情页右键属性更改为自动之后，才能正常启动
>
> ![](https://gitee.com/QiJieH/blog-image-bed/raw/master/image-20201006173923665.png)
>
> ![](https://gitee.com/QiJieH/blog-image-bed/raw/master/image-20201006174003337.png)







### 开始

**1. 修复 `OracleOraDb11g_home1TNSListener`  服务**

​	由于本机的历史遗留问题导致 OracleOraDb11g_home1TNSListener 服务无法正常启动，需要手动修复。（OracleDB安装时的计算机名为PCxx，可能由于机房环境更改计算机名变更为VOIPCxx）

- 打开目录 `C:\app\hp\product\11.2.0\dbhome_1\NETWORK\ADMIN`

- 打开文件 `listener.ora`  修改相关属性

```
# listener.ora Network Configuration File: C:\app\hp\product\11.2.0\dbhome_1\network\admin\listener.ora
# Generated by Oracle configuration tools.

SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (SID_NAME = orcl)  		# 修改 CLRExtProc 为 orcl
      (ORACLE_HOME = C:\app\hp\product\11.2.0\dbhome_1)
      # (PROGRAM = extproc) 	# 删除或使用'#'注释本句
      (ENVS = "EXTPROC_DLLS=ONLY:C:\app\hp\product\11.2.0\dbhome_1\bin\oraclr11.dll")
    )
  )

LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
      (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))      # 修改 PCxx 为 localhost
    )
  )

ADR_BASE_LISTENER = C:\app\hp
```

- 打开 `tnsnames.ora` 修改相关属性

```
# tnsnames.ora Network Configuration File: C:\app\hp\product\11.2.0\dbhome_1\network\admin\tnsnames.ora
# Generated by Oracle configuration tools.

ORACLR_CONNECTION_DATA =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
    )
    (CONNECT_DATA =
      (SID = CLRExtProc)
      (PRESENTATION = RO)
    )
  )

ORCL =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))			# 修改 PCxx 为 localhost
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = orcl)
    )
  )
```

> 你也可以直接使用本教程目录下 `ADMIN` 文件夹中同名文件进行替换

**一般只要修改这两个文件后 `OracleOraDb11g_home1TNSListener` 服务便可以正常启动，如果你仍然无法启动确保你修改的值正确，或执行以下操作**



- 新添系统环境变量 （非必需）

  ```
  ORACLE_HOME : C:\app\hp\product\11.2.0\dbhome_1
  ```

  ![](https://gitee.com/QiJieH/blog-image-bed/raw/master/image-20201006172319448.png)

- 修改 `OracleOraDb11g_home1TNSListener` 注册表 （非必需）

  使用 `win + r` 打开运行，输入 `regedit` 回车进入注册表编辑器

  查找目录

  ```
  计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\OracleOraDb11g_home1TNSListener
  ```

  修改其 `ImagePath` 属性为 `C:\app\hp\product\11.2.0\dbhome_1\BIN\TNSLSNR.EXE`

  ![](https://gitee.com/QiJieH/blog-image-bed/raw/master/image-20201006172802275.png)



至此对  `OracleOraDb11g_home1TNSListener`  服务的修复已经完成。





**2. 重启数据库关键进程**

在任务管理器中重启以下两个进程

```
OracleServiceORCL  						// 主进程
OracleOraDb11g_home1TNSListener			// 监听进程
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/image-20201006173553681.png)





**3. 安装 Navicat Premium 15 并按照图片填写相关值**

![](https://gitee.com/QiJieH/blog-image-bed/raw/master/image-20201006173241119.png)

> **在连接之前，你必须在数据库中创建一个账号，你无法使用管理员账号进行连接**
>
> 创建账号步骤：
>
> 1. 按住 `shift` 键在桌面空白处点击鼠标右键，点击 在此处打开 Powershell
>
> 2. 键入 `sqlplus system/a123 as sysdba` 命令，即以管理员身份登陆数据库
>
> 3. 创建账号并授权
>
>    ```bash
>    create user root identified by root
>    grant dba to root
>    ```
>
> 4. 测试连接
>
>    ```bash
>    conn root/root
>    ```



4. 点击测试连接，连接成功（如果失败，请逐步排查）




### 开启远程连接配布

由于机房环境问题，如果需要开启OracleDB的远程连接，需要对 `listener.ora` 新增属性，注意缩进严格。
```
LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
      (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
    )
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
      (ADDRESS = (PROTOCOL = TCP)(HOST = 本机IP)(PORT = 1521))
    )
  )

ADR_BASE_LISTENER = C:\app\hp
```