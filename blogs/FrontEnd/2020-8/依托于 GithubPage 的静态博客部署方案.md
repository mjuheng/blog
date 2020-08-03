---
title: 依托于GithubPage的静态博客部署方案
date: 2020-7-31
sidebar: true
categories:
 - FrondEnd
tags:
 - vuepress
 - githubpage
---
# 依托于 GithubPage 的静态博客部署方案



使用代码托管平台的 Page 服务，我们可以很轻松的搭建出博客项目，无需服务器和数据库，依靠 git 来轻松管理博客文章。











## 快速开始



使用 npx  命令快速部署项目到本机

```powershell
npx @vuepress-reco/theme-cli init my-blog
```



>**What style do you want your home page to be?**
>
>该选择支会确定你的博客首页样式，分别为 
>
>- 博客式 bolg
>- [文档式](https://cqcppsdk.cqp.moe/) doc
>- [午后南杂](https://www.recoluan.com/) afternoon-grocery
>
>根据自己需求选择合适样式，本博文以博客式进行部署





一切就绪后按照提示，进入项目目录，并安装依赖项

```powershell
# 进入项目目录
cd my-blog
# 安装依赖
npm install
```





安装完成后你的项目目录结构应该为

```powershell
.
├── .vuepress
│   ├── public (网站静态资源)
│   └── config.js (vue配置文件入口)
│   
├── blogs (博客文章存储位置)
├── docs  (文档存储位置)
├── node_modules
├── .gitignore
├── package.json
└── README.md (博客首页设置)
```





通过命令行键入以下命令，并访问监听端口即可查看网站

```powershell
npm run dev
```







## 基本配置

通过访问网页我们可以发现还有很多页面信息是默认未经更改的，接下来我们将开始通过修改 `.vuepress/config.js` 文件，来向网站注入我们的个人信息。



在开始 blog 的配置之前你应该对 [VuePress](https://www.vuepress.cn/) 和 [vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/) 有一个基本了解。

vuepress-theme-reco 是基于 VuePress 的一个第三方主题，其特性是继承了 @vuepress/theme-default 官方文档的默认主题。



配置一共可以分为四个部分

- 网站配置 `title` , `description` , `head`
- 主题配置 `themeConfig`
- 插件配置 `plugins` （目前暂无）
- MD配置 `markdown`





**一般你只需要手动配置以下几项:**



-  `title` 											：网站标题
- `logo`                                                ：logo 
- `head > rel > href`                     ：浏览器窗口favicon
- `description `                                  ：slogan



>参考文档：[VuePress配置]([https://www.vuepress.cn/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE](https://www.vuepress.cn/config/#基本配置))



- `themeConfig > nav`                     ：Tab选项卡
- `themeConfig > author`               ：博主昵称
- `themeConfig > authorAvatar`  ：博主头像



> 参考文档：[VuePress默认主题配置](https://www.vuepress.cn/theme/default-theme-config.html)





> 如果你没有在官方默认主题配置中发现相关配置，或者需要了解更多关于 reco 主题的配置可以参考[reco主题配置](https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html)



通过修改上述属性，再次在命令行运行 `npm run dev` 指令，构建完成后再次访问网站，我们可以发现我们的个人信息已经注入进了网站之中。







## 首页配置

更换博客首页的 Banner 或 slogan 是单独在项目根目录下的 `README.md` 文件进行的。

由于 [reco官方文档首页配置]([https://vuepress-theme-reco.recoluan.com/views/1.x/home.html#%E4%BB%8B%E7%BB%8D](https://vuepress-theme-reco.recoluan.com/views/1.x/home.html#介绍)) 已经详细介绍，这里不再进行赘述。







## 个人定制

如果你不满足于主题提供的默认样式，VuePress 提供了一些简单的接口文件，可以让你能够很方便地定制你自己想要的效果。



### 修改主题颜色

你可以通过配置 `.vuepress/styles/palette.styl` （手动创建）来快速修改主题的一些颜色属性。

```stylus
// 默认值
$accentColor = #3eaf7c                      // 主题颜色
$textColor = #2c3e50                        // 文本颜色
$borderColor = #eaecef                      // 边框线颜色
$codeBgColor = #282c34                      // 代码块背景色
$backgroundColor = #ffffff                  // 悬浮块背景色
```



> 色彩网站：[日式传统色](https://nipponcolors.com/)
>
> 测试配色可读性：[Color.review](https://color.review/)







### 修改主题样式

你可以创建一个 `.vuepress/styles/index.styl`文件以方便地添加额外样式。这是一个 Stylus 文件，但你也可以使用正常的 CSS 语法。



在网站任何可以访问的页面都可以通过 `index.styl` 文件书写 CSS 样式，通过**浏览器开发者工具**我们能够十分轻松的选择元素并添加或修改样式。

```css
// 修改网页背景色，增强可读性
body {
    background-color: #f2f2f2 !important;
}
// 修改导航栏搜索框圆弧化
.search-box input {
    border-radius: 1.25rem !important;
}
// 博文 box 背景
.page-title,
.theme-reco-content {
    background-color: #ffffff!important;
    border-radius: 0.25rem;
    box-shadow: var(--box-shadow);
    border: solid 1px var(--border-color);
}
// 分离博文标题与内容
.page-title {
    margin-bottom: 32px!important;
}

...
```







运行 `npm run dev` 查看我们修改的样式







## 插件配置

至此一个完整的博客已经配置出来，但是如果你需要其他需求如 背景音乐播放器，live2d看板娘，代码快捷复制， markdown语法扩展等等，可以通过导入第三方插件来完善你的博客。



reco 主题已经内置了一些实用的插件，这些插件已经完全足够博客基本功能。[点击查看](https://vuepress-theme-reco.recoluan.com/views/plugins/)

但是你依旧可以通过访问 [vuepress插件社区](https://github.com/vuepressjs/awesome-vuepress#plugins) 或 [reco主题插件广场](https://vuepress-theme-reco.recoluan.com/views/other/recommend.html) 来新添插件







接下来我们将格外引入一个音乐播放器插件 [meting](https://github.com/moefyit/vuepress-plugin-meting) 做为示例

1. install 插件

```powershell
npm install vuepress-plugin-meting -D
```

2. 在 `.vuepress/config.js` 文件中引入插件并安装插件文档配置相关属性

```javascript
module.exports = {
    
//....
    
"plugins": [
    [
      "meting", {
        meting: {
          auto: "https://music.163.com/#/playlist?id=5156784198"
        },
        aplayer: {
          lrcType: 0
        },
        mobile: {
          cover: false,
          lrc: false
        }
      }
    ]
    
//...
    
}

```



3. `npm run dev` 查看效果



## 部署上线

















