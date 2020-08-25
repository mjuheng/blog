---
title: Markdown 语法入门
date: 2020-08-07
sidebar: false
categories:
 - Others
tags:
 - Markdown
publish: true
---

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200825181934.png)

书写文档从未如此优雅  
<!-- more -->

## 1. 初识



Markdown 是一种轻量级的标记语言，可用于在纯文本文档中添加格式化元素。Markdown 由 John Gruber 于 2004 年创建，如今已成为世界上最受欢迎的标记语言之一。

- [Markdown中文指南](https://www.markdown.xyz/cheat-sheet/)

- [简书语法速查](https://www.jianshu.com/p/191d1e21f7ed/)

- [菜鸟入门教程](https://www.runoob.com/markdown/md-tutorial.html)



你可能想知道为什么人们使用 Markdown 而不是所用即所得（WYSIWYG）编辑器。当你可以通过按下界面中的按钮来设置文本格式时，为什么还要使用 Markdown 来书写呢？事实证明，人们使用 Markdown 而不是 WYSIWYG 编辑器的原因有两个：

- Markdown 处处可用。人们使用它来创建 网站、文档、便签、书籍、演示文稿、邮件 和 技术文档。
- Markdown 是可移植的。几乎可以使用任何应用程序打开包含 Markdown 格式的文本文件。如果你不喜欢当前使用的 Markdown 应用程序了，则可以将 Markdown 文件导入另一个 Markdown 应用程序中。这与 Microsoft Word 等文字处理应用程序形成了鲜明的对比，Microsoft Word 将你的内容锁定在专有文件格式中。
- Markdown 是独立于平台的。你可以在运行任何操作系统的任何设备上创建 Markdown 格式的文本。
- Markdown 能适应未来的变化。即使你正在使用的应用程序将来会在某个时候不能使用了，你仍然可以使用文本编辑器读取 Markdown 格式的文本。当涉及需要无限期保存的书籍、大学论文和其他里程碑式的文件时，这是一个重要的考虑因素。
- Markdown 无处不在。例如 Reddit 和 GitHub 等网站都支持 Markdown，许多桌面和基于 Web 的应用程序也都支持 Markdown。













## 2. 编辑器



### 1.1 在线

- [Dillinger](https://dillinger.io/) 



### 1.2 应用

- [Mou](http://25.io/mou/)
- [MarkdownPad](http://markdownpad.com/)
- **[Typora](https://www.typora.io/)**

- [Atom](https://atom.io/)

- [Haroopad](http://pad.haroopress.com/user.html)
- **[SublimeText](http://www.sublimetext.com/)**
- [Cmd Markdown](https://www.zybuluo.com/mdeditor)
- [Byword](https://bywordapp.com/)
- [CuteMarkEd](https://cloose.github.io/CuteMarkEd/)



### 1.3 插件

- [Atom](https://atom.io/)
- [SublimeText](http://www.sublimetext.com/)

- [Dillinger](https://dillinger.io/)















## 3. 基础语法



### 3.1 标题

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```



### 3.2 转行

```
在需要转行的句末连续两个空格  

或者间隔一个空行，这段文字连续转行2次
```



### 3.3 分割线

```
---
------
***
****
```



### 3.4 字体样式

```
~~需要删除的内容~~
<u>下划线内容</u>
*倾斜字体*
**加粗强调**
***加粗斜体***
```

下划线目前 markdown 暂时没有支持语法，可以依靠 html 语法实现



### 3.5 列表

```
- 无序列表
+ 无序列表
* 无序列表的三种方式
1. 有序列表
2. 有序列表
```

列表之间允许嵌套列表和其他语法格式



### 3.6 引用

```
> 这是引用内容
> > 引用的嵌套
```

引用允许嵌套引用和其他语法格式



### 3.7 图片

```
![图片注释](图片地址可以是url也可以是文件路径 "鼠标悬浮提示,可加可不加")

![图片7-1](D:/image/01.png)
```



### 3.8 超链接

```
[百度](https://www.baidu.com)

[Google](https://www.google.com)
```



### 3.9 表格

```
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

第二行分割表头和内容。
文字默认居左
两边加：表示文字居中
右边加：表示文字居右
```



### 3.10 代码

```
`单独代码`


​```language
code here
​```
```








## 4. 扩展语法



### 4.1 HTML元素

不在 Markdown 涵盖范围之内的标签，都可以直接在文档里面用 HTML 撰写。

```
<kbd> <b> <i> <em> <sup> <sub> <br> <a>

使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑
```





### 4.2 转义字符

Markdown 使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用转义字符，Markdown 使用反斜杠转义特殊字符：

```
\是转义符

\*\*不再是加粗强调\*\*
```





### 4.3 数学公式

当你需要输入数学公式时，即可使用公式块：

```
$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix} 
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
${$tep1}{\style{visibility:hidden}{(x+1)(x+1)}}
$$
```





### 4.4 流程图

由于流程图语法较为复杂，这里仅显示简单的流程图代码，如需深入了解，参考

```
​```mermaid
graph LR
A[方形] -->B(圆角)
    B --> C{条件a}
    C -->|a=1| D[结果1]
    C -->|a=2| E[结果2]
    F[横向流程图]
​```
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807160743.png)



### 4.5 目录

目录会在指定位置自动生成当前文档的标题结构

```
[TOC]
```





### 4.6 脚注

```
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
```





### 4.7 完成清单

```
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```





### 4.8 Emoji表情

完整 emoji 表情请参考 [list of emoji shortcodes](https://gist.github.com/rxaviers/7360908)

```
Gone camping! :tent: Be back soon.

That is so funny! :joy:

:sad:
```



### 4.9 锚点定位

```
markdown语法
[定位至标题1](#heading-1)
### 标题1 {#heading-1}


html语法
<a href="custom-id">定位至标题2</a>
<h3 id="custom-id">标题2</h3>
```







## 5. 流程图示例

Markdown 支持在文档中使相关语法创建流程图。这些流程图都是通过渲染代码生成的。



### 5.1 初识

```
// Left to Right
graph LR
A --> B

// Top to Bottom
graph TB
A --> B

// Right to Left
graph RL
A --> B

// Bottom to Top
graph BT
A --> B
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807160818.png)



```
默认节点 A
方形节点 B[Bname]
圆角节点 C(Cname)
圆形节点 D((dname))
非对称节点 E>ename]
菱形节点 F{fname}

// ABCDEF 是节点的变量名,name才是显示的节点名
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807160842.png)



```
箭头连接 A1-–>B1
开放连接 A2—--B2
虚线连接 A3-.-B3
虚线箭头 A4-.->B4
文本标识 A5-->|text|B5
// 箭头> 文本|text|
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807160900.png)



### 5.2 横向流程图

```
​```mermaid
graph LR
A[方形] -->B(圆角)
    B --> C{条件a}
    C -->|a=1| D[结果1]
    C -->|a=2| E[结果2]
    F[横向流程图]
​```
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807160911.png)





### 5.3 标准流程图

```
​```flow
st=>start: 开始框
op=>operation: 处理框
cond=>condition: 判断框(是或否?)
sub1=>subroutine: 子流程
io=>inputoutput: 输入输出框
e=>end: 结束框
st->op->cond
cond(yes)->io->e
cond(no)->sub1(right)->op
​```
```

@flowstart
st=>start: 开始框
op=>operation: 处理框
cond=>condition: 判断框(是或否?)
sub1=>subroutine: 子流程
io=>inputoutput: 输入输出框
e=>end: 结束框

st->op->cond
cond(yes)->io->e
cond(no)->sub1(right)->op
@flowend





### 5.4 UML时序图

```
​```sequence
对象A->对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B-->对象A: 我很好(响应)
对象A->对象B: 你真的好吗？
​```
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807161058.png)







### 5.5 UML时序图复杂

```
​```sequence
Title: 标题：复杂使用
对象A->对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B-->对象A: 我很好(响应)
对象B->小三: 你好吗
小三-->>对象A: 对象B找我了
对象A->对象B: 你真的好吗？
Note over 小三,对象B: 我们是朋友
participant C
Note right of C: 没人陪我玩
​```
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807161116.png)





### 5.6 UML标准时序图

```
​```mermaid
%% 时序图例子,-> 直线，-->虚线，->>实线箭头
  sequenceDiagram
    participant 张三
    participant 李四
    张三->王五: 王五你好吗？
    loop 健康检查
        王五->王五: 与疾病战斗
    end
    Note right of 王五: 合理 食物 <br/>看医生...
    李四-->>张三: 很好!
    王五->李四: 你怎么样?
    李四-->王五: 很好!
​```
```

![image-20200807161136631](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20200807161136631.png)







### 5.7 甘特图

```
​```mermaid
%% 语法示例
        gantt
        dateFormat  YYYY-MM-DD
        title 软件开发甘特图
        section 设计
        需求                      :done,    des1, 2020-01-06,202020-01-08
        原型                      :active,  des2, 2020-01-09, 3d
        UI设计                    :         des3, after des2, 5d
    未来任务                       :         des4, after des3, 5d
        section 开发
        学习准备理解需求            :crit, done, 2020-01-06,24h
        设计框架                  :crit, done, after des2, 2d
        开发                     :crit, active, 3d
        未来任务                  :crit, 5d
        耍                       :2d
        section 测试
        功能测试                 :active, a1, after des3, 3d
        压力测试                 :after a1  , 20h
        测试报告                 : 48h
​```
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807161148.png)







