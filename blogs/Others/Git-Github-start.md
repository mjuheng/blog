---
title: 初识 Git
date: 2020-08-07
sidebar: false
categories:
 - Others
tags:
 - Git
 - Github
publish: true
---

Git 是一个版本管理控制系统 *VCS* ，它可以在任何时间点，将文档的状态作为更新记录保存起来，也可以在任何时间点，将更新记录恢复回来。  
[Gitee Git Doc](https://gitee.com/help/articles/4104)  
[Github Git sue](https://docs.github.com/cn/github/using-git)  
[bootcss Git 简易指南](https://www.bootcss.com/p/git-guide/)  
[ProGit 进阶](https://www.progit.cn/) 
<!-- more -->



## 版本管理

版本管理是一种记录文件变化的方式，以便将来查阅特定版本的内容





## 部署下载

[Git官网](https://git-scm.com)



## 工作流程

工作区：项目在开发者设备上的目录

暂存区：用于暂时存储需要提交的仓库的文件，使用 `git add` 命令将文件提交到暂存区

本地仓库	：正式存储代码的位置，接收来自暂存区的文件，使用`git commit` 命令正式提交到仓库，注意在正式提交前务必对暂存区代码进行完整测试。

远程仓库：存储在公共网络上的代码托管网站。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807162249.png)



## 命令语法

| 命令            | 操作          |
| --------------- | ------------- |
| `git --version` | 查看 Git 版本 |



## Git使用

### 配置Git

在使用 git 前，需要告诉 git 你是谁，在向 git 仓库提交时需要辨识当前修改的提交者，这是利于多人协作的。

1. 配置提交人姓名：`git config --global user.name 提交人姓名`

2. 配置提交人邮箱：`git config --global user.email 提交人邮箱`
3. 查看 git 配置信息：`git config --list`



多次输入配置信息会覆盖之前的配置信息

除了通过使用命令行进行配置外，也可以找到 C:/user 下的 .gitconfig 





### 提交步骤

1. `git init` 初始化 git 仓库
2. `git status` 查看文件状态
3. `git add 文件列表` 添加/更新 文件到暂存区
4. `git commit -m 提交信息` 向仓库提交暂存区
5. `git log` 查看提交记录



每次 修改/增加 工作目录都需要执行 `git add `密码来加入暂存区



git 提交规范：

- 一次提交只包含一个改动
- 在提交到仓库之前，一定要经过完整测试
- commit message 不能忽略，书写提交信息一定要简洁明了，一句点明当前提交改动



### 恢复记录

用暂存区中的文件覆盖工作目录中的文件：`git checkout 文件`

将文件从暂存区中删除：`git rm --cached 文件`

将 git 仓库中指定的更新记录恢复，并且覆盖暂存区和工作目录：`git reset --hard commitID`

通过 `git log` 来查看commit ID





### 分支

分支相当于工作目录的副本，多人协作时，其他人可以通过分支将其从开发主线上分离出来，以免影响开发主线。

分支的意义：如果没有分支我们可以想象在一个开发流程下我们同时对代码进行新功能添加，bug修复，代码重构，UI更替等等操作，可想而知是十分繁杂凌乱的，通过分支我们可以将不同的模块细分出去，更好的管理开发流程

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807162313.png)



#### 分支细分

1. 主分支（master）：第一次向 git 仓库提交更新时会自动产生该分支。
2. 开发分支（develop）：作为开发的分支，基于 master 分支创建。
3. 功能分支（feature）：作为开发具体功能的分支，基于开发分支创建。





#### 分支命令

- `git brach` 查看分支列表

- `git branch 分支名称` 创建分支 

- `git checkout 分支名称` 切换分支
- `git merge 来源分支` 合并分支
- `git branch -d 分支名称` 删除分支（分支被合并后才能删除）`-D` 强制删除



在切换分支时务必保证暂存区的文件已经commit到仓库，否则暂存区文件会影响到切换分支的工作区。

在当前分支下时，是无法删除本分支的，只有切换到其他分支才能对分支进行删除操作。



## Git进阶



### 暂时保存更改

在 git 中，可以暂时提取分支上所有的改动并存储，让开发人员得到一个干净的工作副本，临时转向其他工作。

使用场景：分支临时切换

- `git stash` 存储临时改动
- `git stash pop` 恢复改动





# Github

在 Git 中有90%的操作都是在本地仓库中进行的，这样已经足以满足个人项目开发的所有需求了。但是往往一个项目是需要多人协作开发的，这时我们就需要一个别人也可以进行访问的远程仓库。

[Github](https://github.com)



## 团队协作开发流程

- A 在自己的计算机中创建本地仓库
- A 在 github 中创建远程仓库
- A 将本地仓库推送到远程仓库
- B 克隆远程仓库到本地进行开发
- B 将本地仓库开发内容推送到远程仓库
- A 将远程仓库中的最新内容拉取到本地



### 推送



创建新仓库并推送到远程仓库

```bash
echo "# git-demo" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/QiJieH/git-demo.git
git push -u origin master
```



推送已有仓库至远程仓库

```bash
git remote add origin https://github.com/QiJieH/git-demo.git
git push -u origin master
```

第一行代码是为远程仓库设置别名 `origin` ，这个名字是可更改的

第二行参数是以 `master` 分支推送至远程仓库 ，`-u` 参数是记忆当前操作，在下次推送时只需要使用 `git push` 即可。





### 克隆

克隆远程仓库到本地

```bash
git clone 仓库地址
```



如果需要推送给A需要在远程仓库的` Settings ->  Manage access -> Invate a collaborator `来添加协作者

并复制邀请链接给程序员B



程序员B 访问邀请链接，并接受邀请



github 的远程仓库账号存储在了 Windows凭据 下，如果需要切换登录需要手动删除凭据



### 拉取

拉取远程仓库到本地

```bash
git pull 仓库名称 分支名称
```



git pull 是在已经有本地仓库的基础上进行的，他会将本地仓库的版本与远程仓库版本进行比对，更新最新版本的代码。

git clone 是完全复制下远程仓库，是本地不存在仓库时进行。

如果远程仓库中的版本高于本地仓库的版本，本地仓库不能向远程仓库提交，只有先拉取远程仓库之后才能提交。



## 解决冲突

在多人协作时，可能会出现两个人对同一个文件的同一个地方进行了修改，就会发生冲突，冲突需要人为解决。

即只有第一个向远程仓库提交的人才能推送，第二个推送的人因为本地仓库版本低于远程仓库无法提交，只有拉取远程仓库进行提交，但是由于两个人修改了同一个文件的同一个地方，导致了冲突发生



报错提示

```
<<<<<<< HEAD
// 冲突原文
=======
// 修改内容
>>>>>>> idstringxxxxxxxxxxxxxxxxxxxxxxx
```

选择处理，删除多余字符，解决冲突



## 跨团队协作

作为非团队成员进行协作时，提交的代码需要审核才能生效



Fork 需要协作的仓库，会将目标仓库复制到自己的 github 账号下，之后可以进行远程仓库的克隆，然后开始修改，推送。

完成推送后在远程仓库点击 Pull requests -> New pull request -> Create pull request -> 与原仓库作者送信 -> Create pull request

这时在原仓库的作者的项目仓库下会有新的 Pull requests 拉取请求，点击之后就可以看见 fork者的合并请求，也可与 fork者进行回复，点击 Files changed 查看修改代码。

在对话页面点击 Marge pull request 即可应用合并。

 

## ssh免登陆

https协议进行远程仓库链接，每次推送操作都要输入账号密码进行验证，但是 Windows 系统为我们提供了凭证，可以让我们不用每次都进行输入验证，但是当在其他操作系统上时就无法这样了。

所以 Github 提供了另一种链接协议 ssh ，在 ssh 中身份验证通过密钥实现，分为公钥与私钥，只有当公私钥匹配成功才能通过验证。



生成密钥

```bash
ssh-keygen
```

存储在 C:/user/.ssh/

id_rsa 为私钥，必须存储在开发者系统下

id_rsa.pub 为公钥，这个公钥则需要存储在 Github 下

user -> Settings -> SSH and GPG keys -> new ssh key 填写key



之后再 仓库页面就可以通过 Clone or download 来切换获取 ssh 链接。



## Gitignore

在工作区添加 .gitignore 文件，在 push 时 GitHub 会忽略 .gitignore 文件中的文件
