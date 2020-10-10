---
title: Eclipse 安装与配置简明指南
date: 2020-10-10
sidebar: false
categories:
 - WorkEnv
tags:
 - Eclipse
 - Java
 - Jdk
publish: true
---

## Eclipse 安装与配置简明指南

### JDK-13 及以上版本 jre 生成命令
```bash
// 命令行确保在 JDK 目录下
bin\jlink.exe --module-path jmods --add-modules java.desktop --output jre
```

### Eclipse 汉化插件
访问[官网语言包项目](https://www.eclipse.org/babel/)下载相应语言包
解压之后，将解压文件中的 `eclipse` 下的两个文件 `feature` 和 `plugins` 移动到 eclipse 的安装目录下的 `dropins` 文件夹中

### Eclipse 为项目导入第三方 jar
在资源管理栏中右键项目文件夹，选择 `Build Path` 在顶栏选择 `Libraries` 选择 `modul path` 点击右侧 `Add External JARs` 选择已下载解压的 jar 包

### Eclipse 代码中文字符过小解决

1. 把字体设置为 Courier New ：
`Windows` -> `Preferences` -> `Genneral` -> `Appearance` -> `Colors and Font` -> 在右侧框展开`Basic`-> `Text Font` 点击`Edit` 按钮，在弹出窗选择 `Courier New`

2. 将脚本修改为 中欧字符 ：
`windows` -> `Preferences` -> `Genneral` -> `Appearance` -> `Colors and Font` 在右侧选中 `Text Font` 点击 `Edit` 按钮， 将 `西欧语言` 改成 `中欧字符`

> 推荐使用第二种解决方案，Consolas 字体个人感觉比 Courier New 好看

### Eclipse 代码补全
默认情况下 Eclipse 的代码补全是在键入 `.` 之后出现的，不像其他 IDE 键入任意字母提示补全。如果需要同其他 IDE 一样，需要自行修改补全规则

`Window` --> `Perferences` --> `Java` --> `Editor` --> `Content Assist`

在 `Auto Activation` 栏中勾选 `Enable auto activation` ，并设置 `Auto activation triggers for java` 选项为 `.qwertyuiopasdfghjklzxcvbnm` 即二十六个字母