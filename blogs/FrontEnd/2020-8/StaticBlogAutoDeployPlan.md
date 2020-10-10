---
title: 依托于GithubPages的Vuepress静态博客GithubAction自动部署方案
date: 2020-08-04
sidebar: false
categories:
 - FrontEnd
tags:
 - Github Pages
 - Github Action
 - Vuepress
 - Github
 - Gitee
 - Git
publish: true
---


博客发表流程：

1. 项目文件下新建 Markdown 文章

2. `git push`



借助 GithubAction 实现 Github & Gitee 双端自动部署。

<!-- more -->

## 开始之前

>这是我的第一个博客网站，前后花费了差不多一个星期，期间参考了大量博文，文档。
>
>总结建站前后的经验写下第一篇关于本博客的部署教程的博文，希望能够帮助和我一样摸索建站的人。
>
>​																																									于朝阳升起处，我将踏上旅程



**项目描述**

- 一个基于 Vuepress 第三方主题 vuepress-theme-reco 搭建的静态博客

- 托管项目代码在 Github 仓库，并使用 Github Pages 服务运行网站。

- 使用 Github Action 实现自动编译部署。
- 使用 Github Action 实现同步推送仓库代码至 Gitee 和更新 Gitee Pages 服务。



> Github My Blog : [https://qijieh.github.io/blog](https://qijieh.github.io/blog)
>
> Gitee My Blog : [https://qijieh.gitee.io/blog](https://qijieh.gitee.io/blog)





**项目优越**

- 纯静态页面，无需后台数据库。
- Github Pages 服务，无需单独服务器。
- Git 更新，管理网站。
- Github Action 自动部署，专注写作。
- Gitee 同步推送，自动更新 Gitee Pages , 更好的国内访问体验





**项目技术**

本项目使用 Vuepress 第三方主题 vuepress-theme-reco 构建，在开始之前你应该对 Vuepress 有一个基本了解，并对其构建流程有一定的初步掌握。

强烈建议按照官方文档在个人电脑上构建一个官方的 Vuepress 项目，以便更好的开始使用接下来的 Vuepress 第三方博客主题。

除此之外，你还需要掌握基本的 Git 使用方法以及对 Github 仓库各项配置的理解和使用，包括 Github Action 的初步认知。



> [Vuepress 中文文档](https://www.vuepress.cn/)
>
> [vuepress-theme-reco 官方文档](https://vuepress-theme-reco.recoluan.com/)
>
> [阮一峰 GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)









## 快速开始



**npx**

```bash
npx @vuepress-reco/theme-cli init
```

**npm**

```bash
# 初始化
npm install @vuepress-reco/theme-cli -g
theme-cli init
```

**yarn**

```bash
# 初始化
yarn global add @vuepress-reco/theme-cli
theme-cli init
```





一切就绪后按照提示，进入项目目录，并安装依赖 (本文之后都将使用 npm 进行管理)

```powershell
# 进入项目目录
cd my-blog
# 安装依赖
npm install
```





通过命令行键入以下命令，并访问监听端口即可查看网站

```powershell
npm run dev
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200804232214.png)




## 修改配置

网站的各项信息配置存储在了 `.vuepress/config.js`

通过修改 `config.js` 文件，你可以修改替换网站的大部分预设内容，如 网站标题，logo图标，导航栏Tab选项卡等等。



`.vuepress/config.js` 可以分为以下几个部分

- 基本配置 `title` `description` 等等
- 主题配置 `theme` `themeConfig`
- 插件配置 `plugins`
- Markdown 配置 `markdown`



其中的各项属性说明和配置方法你均可在 [Vuepress 配置](https://www.vuepress.cn/config/) ，[Vuepress 默认主题配置](https://www.vuepress.cn/theme/default-theme-config.html) 和 [reco Config.js](https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html) 中查询得到。

请自行参考文档说明替换相应属性值。



> 网站的静态资源存储在了 `.vuepress/public` 目录下，其设定了全局的相对路径，你只需要以 `/` 开头对其进行直接引用。
>
> 比如替换网站的 logo 图片为 `.vuepress/public/web-img/logo.png`
>
> ```javascript
> // .vuepress/config.js
> module.exports = {
>   themeConfig: {
>     logo: 'web-img/logo.png',
>   }
> }
> ```



> 关于主题的夜间模式配置请单独参考：
>
> [暗色模式适配](https://vuepress-theme-reco.recoluan.com/views/1.x/mode.html)
>
> 
>
> 404 腾讯公益关闭方法：
>
> ```js
> // .vuepress/config.js
> module.exports = {
>   theme: 'reco',
>   themeConfig: {
>     noFoundPageByTencent: false
>   }  
> }
> ```









---
这里需要额外注意 base 和 dest 属性：



**base**

- 类型: `string`
- 默认值: `/`

部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 GitHub pages，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`，它的值应当总是以斜杠开始，并以斜杠结束。

`base` 将会作为前缀自动地插入到所有以 `/` 开始的其他选项的链接中，所以你只需要指定一次。



**dest**

- 类型: `string`
- 默认值: `.vuepress/dist`

指定 `vuepress build` 的输出目录。如果传入的是相对路径，则会基于 `process.cwd()` 进行解析。



此处先做提醒可不做添加或修改，在 部署上线 步骤中再做详细讲解。

---





运行命令，查看修改

```powershell
npm run dev
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805152255.png =700x)












## 首页配置

更换博客首页的 Banner 或 slogan 是单独在项目根目录下的 `README.md` 文件进行的。

由于 [reco 首页配置](https://vuepress-theme-reco.recoluan.com/views/1.x/home.html) 已经详细介绍，这里不再进行赘述。





> reco 提供了三种首页样式，在 npx reco主题时，提供了选择支。
>
> - blog式
> - 文档式
> - 午后南杂
>
> 
>
> 如果你需要从文档式切换至blog式，只需修改 `.vuepress/config.js` 主题配置的 `type` 属性
>
> ```javascript
> // .vuepress/config.js
> 
> module.exports = {
>   theme: 'reco',
>   themeConfig: {
>     type: 'blog'
>   }
> }
> ```





修改完成后，运行命令，查看修改

```javascript
npm run dev
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805155833.png =700x)






## 自定样式

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
/** .vuepress/styles/index.styl **/

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



> 如果你对样式修改没有头绪可以参考其他使用 reco主题的博客样式并自行修改
>
> [reco 优秀博客案例](https://vuepress-theme-reco.recoluan.com/views/other/theme-example.html)
>
> 如果你需要本博客的自定义样式，可以访问博客仓库
>
> [qijieh/blog](https://github.com/QiJieH/blog)







运行 `npm run dev` 查看我们修改的样式

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805160856.png =700x)

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805161235.png =700x)




### 引用脚本与样式

你可以通过配置 `.vuepress/config.js` 中的 `head` 来引入自己的js脚本与样式。

通过外挂css和js来对主题样式曾铁，例如点击效果，花瓣雨等等特效。

```js
// .vuepress/config.js
module.exports = {
  head: [
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" }],
    ["script", { src: "scripts/demo.js" }]
  ]
}
```

比如上面的配置就会被解析为

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css">
  <script src="scripts/demo.js"></script>
</head>
```

关于 `head` 的详细配置说明请参考[官方文档 head 配置](https://v1.vuepress.vuejs.org/zh/config/#head)



**以引入鼠标点击效果为例：**

在`.vuepress\public\js`文件夹下创建`MouseClickEffect.js`文件，填入以下代码

```js
var a_idx = 0;

function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
jQuery(document).ready(function ($) {
    $("body").click(function (e) {
        var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": `rgb(${getRandom(255,0)},${getRandom(255,0)},${getRandom(255,0)})`,
            "user-select": 'none',
            "cursor": 'default'
        });
        $("body").append($i);
        $i.animate({
                "top": y - 180,
                "opacity": 0
            },
            1500,
            function () {
                $i.remove();
            });
    });
});
```



然后在主题配置文件`config.js`下的`head`引入以上js，这里的jquery必须引入，鼠标点击代码才能生效

```javascript
// .vuepress/config.js
module.exports = {
	head: [
    // 网页标签栏图标
    ['link', { rel: 'icon', href: '/vuepress/favicon.ico' }],
    // 移动栏优化
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    // 引入jquery
    ["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"
    }],
    // 引入鼠标点击脚本
    ["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "/js/MouseClickEffect.js"
    }]
  ],
}
```



> 参考博文：[vuepress-theme-reco个人向优化](https://vuepress-theme-reco.recoluan.com/views/other/reco-optimization.html)











## 添加文章

在开始插件配置之前，先向网站添加几篇文章。

通过查看项目目录不难发现博客文章被存储在了 `blogs`  下，除此之外还有另外一个名为 `docs` 的目录存储文档文件。如果你的博客网站不需要文档类型的博文，可以删除改 `docs` 目录并删除 `config.js` 中的 `themeConfig > nav` 中的 Docs Tab选项。





在 [reco issue](https://vuepress-theme-reco.recoluan.com/views/other/question.htm) 中提到：

>Q：文章的存放位置有规定吗？
>
>A：你可以将你的文章存放在任意位置，但是你需要保证它是 VuePress 可以解析的位置，比如你使用的命令是 `vuepress dev docs` ，那么请将所有文章存放在 `docs/` 中，但是主题并不会强制你放在哪个子目录，这个按照你的喜好来即可，详情见 [详细的 VuePress 目录结构配置](https://vuepress.vuejs.org/zh/guide/directory-structure.html)。



尽管主题对文章存放位置没有硬性要求，但是你的项目结构应该保持整洁，建议沿用默认的存储路径。

比如有当前一篇文章 `Vue框架学习记录.md` 拥有以下 Front Matter ：

```yaml
---
title: Vue框架学习记录
date: 2020-08-05
categories:
 - FrontEnd
tags:
 - Vue
---
```

那么它的存储路径应该为 `blogs/FrontEnd/2020-8/Vue框架学习记录.md` 。



>主题不会根据你的文件路径来进行文章分类，而是对 Markdown 文件的 Front Matter 中的相关标签进行分类解析。
>
>但是为了保持项目结构整洁请务必设置路径为分类名称。
>
>[Vuepress Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.htm) 
>
>[reco Front Matter 示例](https://vuepress-theme-reco.recoluan.com/views/1.x/frontMatter.html)



根据具体场景新建md文章，并修改存储路径。删除主题的测试文章，添加一篇自己的测试博文 （建议长度一定，拥有标题结构和代码块，方便后期测试）。


这是一个博文存储结构的示例：

    blogs
    ├── FrontEnd
    │   ├── 2020-8
    │   │   └── article01.md
    │   └── 2020-7
    ├── Java
    │   ├── 2020-8
    │   └── 2020-7
    └── Python




> 向文章添加摘要，显示在博文列表中
>
> ```
> 这是摘要，在 more 标签之前的内容会展示到博文列表上
> **支持md语法**
> <!-- more -->
> ```
>
> [reco 添加摘要](https://vuepress-theme-reco.recoluan.com/views/1.x/abstract.html)
>
> 更多 Vuepress Markdown 支持语法请查看：
>
> [Vuepress Markdown扩展](https://www.vuepress.cn/guide/markdown.html)
> 
> 存储博文时务必以英文命名，否则可能导致 URL 混乱









**添加完成后，运行命令，查看添加成功与否**

```powershell
npm run dev
```

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805174613.png =700x)

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805174844.png =700x)










## 插件配置

关于插件的配置语法 [Vuepress 插件](https://www.vuepress.cn/plugin/) 中已经详细说明，请自行参考文档了解其语法和使用方法。





至此一个完整的博客已经配置出来，但是如果你需要其他需求如 背景音乐播放器，live2d看板娘，代码快捷复制， markdown语法扩展等等，可以通过导入第三方插件来完善你的博客。



reco 主题已经内置了一些实用的插件，这些插件已经完全足够博客基本功能。[点击查看](https://vuepress-theme-reco.recoluan.com/views/plugins/)

但是你依旧可以通过访问 [vuepress插件社区](https://github.com/vuepressjs/awesome-vuepress#plugins) 或 [reco主题插件广场](https://vuepress-theme-reco.recoluan.com/views/other/recommend.html) 来新添插件。



> 你可以通过这种方式来对主题内置插件的配置进行覆盖，甚至禁用一个内置插件
>
> 只需将 Options 设置成 `false` 便可禁用该插件
>
> 就像这样
>
> ```javascript
> module.exports = {
>   plugins: [
>     ["@vuepress-reco/vuepress-plugin-loading-page", false],     // 禁用加载页面
>     ["@vuepress-reco/vuepress-plugin-back-to-top",  // 返回顶部按钮
>     	visibilityHeight: 500	// 覆盖其默认配置，重新设置为出现高度为 500
>     ]
>   ]
> };
> ```





**接下来引入一个音乐播放器插件 [meting](https://github.com/moefyit/vuepress-plugin-meting) 做为示例**

1. install 插件

```powershell
npm install vuepress-plugin-meting -D
```

2. 在 `.vuepress/config.js` 文件中引入插件并按照插件文档配置相关属性

```javascript
// .vuepress/config.js
module.exports = {
    
//....
    
"plugins": [
    [
      "meting", {
        meting: {
          auto: "https://music.163.com/#/playlist?id=5156784198"
        },
        aplayer: {
          lrcType: 0 	//禁用歌词显示
        },
        mobile: {		// 移动端设置
          cover: false // 取消封面覆盖
        }
      }
    ]
    
//...
    
}

```

3. `npm run dev` 查看效果

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805180316.png =700x)


> 对于新增的播放器，你也可以通过 `.vuepress/styles/index.styl` 来为其修改样式
>
> 在浏览器通过**开发者工具**选中播放器，查看元素类名
>
> ```css
> .aplayer-body {
>     box-shadow: var(--box-shadow) !important; // 为播放器添加阴影
> }
> ```
>
> [Vuepress Styling](https://www.vuepress.cn/zh/config/#styling)





下面将列出推荐的插件链接：

- [meting](https://github.com/moefyit/vuepress-plugin-meting) ：简单易用的播放器插件，支持自动解析网易云单曲/歌单链接
- [@vuepress/pwa](https://www.vuepress.cn/plugin/official/plugin-pwa.html) ：网页内容更新提醒
- [vuepress-plugin-nuggets-style-copy](https://www.npmjs.com/package/vuepress-plugin-nuggets-style-copy) ：为代码块添加复杂按钮，并在复制成功后弹出提示信息
- [flowechart](https://github.com/ulivz/vuepress-plugin-flowchart) ：使你的 Markdown 支持 flow 流程图
- [img-lazy](https://github.com/tolking/vuepress-plugin-img-lazy) ：图片惰性加载
- [copyright](https://vuepress.github.io/zh/plugins/copyright/) ：控制网站的复制行为
- [vuepress-plugin-smooth-scroll](https://vuepress.github.io/zh/plugins/smooth-scroll) ：更圆滑的页面滚动



插件的安装引入大同小异，请自行参照插件文档进行配置。

**由于评论插件 Vssue （ 已集合到 reco 自带插件 [comments](https://vuepress-theme-reco.recoluan.com/views/plugins/comments.html) 中）的特殊性（需要配置项目仓库）将放在 部署上线 之后再进行配置**



## 部署上线

在正式开始部署上线之前，你应该对 vuepress 的构建流程有一个大致了解。



之前我们使用的 `npm run dev` 模式运行了 vuepress 的开发模式，这个模式下是不会产生我们需要的静态资源的。

```json
// packages.json
{
  // ...
    "scripts": {
    	"dev": "vuepress dev .",
    	"build": "vuepress build ."
  	},
  // ...
}
```



只有运行 `npm run build` 时才会在指定目录下构建出我们的博客网页

```javascript
// .vuepress/config.js
module.exports = {
    //...
    	"dest": ".vuepress/dist"   // 指定 vuepress build 的输出目录
    //...
}
```



命令行运行 `npm run build` ，检查在 `.vuepress/dist` 下是否能构建出资源文件。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805193936.png)


> Error: cannot find module '../dist/manifest/client.json'
>
> 如果在构建过程中出现此项错误，你的系统环境变量中可能设置了 `NODE_ENV : development` 将其修改为 `NODE_ENV ：production` 即可。
>
> 详情查看 [vue.js issue](https://github.com/vuejs/vuepress/issues/2194)







### 双端部署

本博客同时部署到了 Github 和 Gitee 上，你可以尝试访问

> Github My Blog : [https://qijieh.github.io/blog](https://qijieh.github.io/blog)
>
> Gitee My Blog : [https://qijieh.gitee.io/blog](https://qijieh.gitee.io/blog)



**在此之前你应该明白 Github 和 Gitee 的 Pages 服务差异**

> Github 允许用户使用个人域名即 `https://[userName].github.io` ，只需要在创建仓库时将仓库命名为 `[userName].github.io` 即可
>
> 但是 Gitee 却不允许用户使用个人域名，即无论创建仓库命名为何，都只能指向 `https://[userName].gitee.io/[repoName]` 



这种差异增加了我们博客双端部署的难度，因为 Vuepress 对于部署到非根路径的项目有着相应配置参考 [基础路径](https://www.vuepress.cn/guide/assets.html) ，如果对部署到二级路径的项目没有设置 `config.js` 文件中的 `base` 值，将会导致网页资源的错误加载。



综上所述，为了保持项目的一致性我们不得不放弃使用 Github 提供的个人域名，去与 Gitee 保持一致使用二级域名，这也是为什么上方两个博客链接都不是非根路径的原因所在。



::: tip

如果你只需要部署到一个平台，请酌情参考本博文。

:::



**新建仓库**

登录 Github 新建仓库，仓库命名自定，本博文以 `blog` 命名仓库。

> 如果你需要进行双端部署切勿命名为 `[userName].github.io` ，详见上方说明。
>
> 如果你只想部署在 Github 推荐以 `[userName].github.io` 命名。



> 其实命名为 `blog`  会导致博客 Url 混乱，因为reco主题的 router 设置了 /blogs/ 路由，将会导致出现这样的访问链接：
>
> `https://qijieh.github.io/blog/blogs/FrontEnd/2020-8/article.html`
>
> 建议命名为：`space` ，`personal` ，`room` 等等



登录 Gitee 新建仓库，建议仓库名与 Github 仓库名一致，方便访问。



**部署方式**

部署方式分为两种 手动部署 和 自动部署，两种部署方式唯一的区别在于是否需要本地编译 `npm run build` 出网页源码。

其详细流程如下：

- 手动部署 （易）
  1. 书写博文 或 修改主题
  2. 构建网页文件 `npm run build` 
  3. `git push`
- 自动部署 （难）
  1. 书写博文 或 修改主题
  2. `git push` 



>自动部署会在服务器端进行网页的构建和编译 `npm run build`，而不是在开发机上，管理员只需要专注于文章写作，构建部署工作全部交由服务器端完成。
>
>尽管自动部署方案在实行时可能会花费大量时间成本，但是仍然建议你使用自动部署方案，感受 Github Action 的强大之处，并且其一旦完成，后期的维护成本将明显降低。



::: warning

注意！！！只有自动部署方案才能实现 Gitee 的代码同步和 GiteePages 的自动更新，如果你需要将你的博客网站如同本博客一样在双平台自动部署，请参考自动部署方案。

:::



### 手动部署

由于 GithubPages 服务的渲染目录只预设了 `root` 和 `docs` ，我们得**重新指定 build 的输出目录，将其重新设定为 `docs`**

```javascript
// .vuepress/config.js
module.exports = {
    //...
    	"dest": "docs"  // vuepress 生成目录
    //...
}
```

这样 `npm run build` 的文件便会生成在 `docs` 目录下。



**构建并上传**

```
// 确保在项目根目录
npm run build
.....
build success

git init
.....
git push
```



> 注意新建 `.gitignore` 文件
>
> ```
> node_modules/
> ```





上传完成之后，我们需要打开 Github 仓库页面，配置项目的 GithubPages 服务。

点击 仓库Setting 下拉找到 GithuPages 在 Source 中设置如下

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805210322.png)

注意设置为 `/docs` 目录，而不是默认的 `/root` ，这样 GithubPages 就会解析我们 `/docs`  目录下的博客网页了。

现在点击上方的网址访问你的博客吧。





**现在你的博客发布流程为：**

1. 写博客 或 修改主题
2. `npm run build`
3. `git push`













**Gitee 同步解决方案**

::: warning

手动部署方案适合单仓库部署，如果你执意双端部署将会明显提高维护成本。

:::



1. 打开创建的 Gitee 仓库  **管理 > 基本设置 > 仓库远程地址** 输入 Github 的仓库地址

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805211042.png =750x)


2. 返回仓库代码页，**点击仓库名旁边的同步按钮完成推送**

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805211244.png =750x)


3. 这样 Github 仓库的代码便会同步至该仓库下，接下来只需要开启该仓库的 Gitee Pages 服务 ：**服务 > Gitee Pages**

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200805211627.png =750x)


4. 点击链接访问你的网站吧。







**为什么不推荐手动部署的双端托管？**

- 首先你得知道 Gitee 仓库的同步功能是不支持自动同步的，也就是说，即使你更新了 Github 仓库的代码，Gitee 这边仍然需要你过来手动点击同步按钮来更新同步。
- 同样糟糕的是 Gitee Pages 服务和 Github Pages 服务不同，使用 GitHub Pages 时，每当项目有更新，GitHub 会自动帮我们重新部署 GitHub Pages。而 Gitee Pages 则不会如此，它仍需要你点击 Pages 服务的更新按钮来刷新内容！或者开通 Gitee Pages Pro 功能。而 Pro 功能的开通，需要满足以下其中一个条件：
  - 花钱开通 Pro 功能，￥99/年。
  - Gitee 项目足够优秀，得到 Gitee 官方的推荐，那么 Gitee 就会提示“您的项目为推荐项目，已自动为您开通 Gitee Pages Pro。



这样将意为着每次你在 Github 轻松完成了`git push` ，你仍然需要登录你的 Gitee 仓库点击强制同步按钮拉取代码，再去点击 Pages 服务的刷新按钮更新网页。



**手动部署双端托管的博客发布流程：**

1. 写文章
2. `npm run build`
3. `git push`
4. 登录 Gitee 仓库
5. 点击强制同步按钮
6. 点击 Pages 服务的更新按钮



显然这是十分不友好的，但是当你只部署在 Github 平台上时就可以不用管 Gitee 了。









### 自动部署

如果你阅读了上方手动部署的解决方案，可以深感其的不便性，特别是进行 Github 和 Gitee 双平台托管的场景时。

接下来的部署方案，将让你从繁杂的提交流程中抽离出来，让你更加专注博客内容，而不是操心与网站的部署。



现在我们在 Github 和 Gitee 上各拥有一个 blog 仓库，而我们的自动部署方案将在 Github 上进行，借助于 Github Action 我们能够优雅的实现两个仓库的自动同步更新。



#### 初识GithubAction

[GitHub Actions](https://github.com/features/actions) 是 GitHub 的[持续集成服务](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)，于2018年10月推出。

># Automate your workflow from idea to production
>
>GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want.



关于 Github Action 的初步入门教程可以参考 [阮一峰 GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html) ，其中也大致介绍了什么是 Github Action 。

如果你对 Github Action 感兴趣，希望深入了解其语法结构可以自行查阅 [官方文档](https://docs.github.com/cn/actions)





#### 编写workflows文件

要想使用 Github Action 我们得在项目根目录下创建  `.github/workflows/main.yml` 。

GitHub 只要发现`.github/workflows`目录里面有`.yml`文件，就会自动运行该文件。



`.github/workflows/main.yml`：

::: details

```yaml
name: Deploy GitHub Pages And Gitee Pages
on:
  push:
    branches:
      - master
jobs:
  # 构建并部署
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # 拉取仓库代码
      - name: Checkout
        uses: actions/checkout@v2.3.1
        with:
          persist-credentials: false

      # 构建
      - name: Build
        env:
          # 注意在 Settings->Secrets 配置 VSSUE_CLIENT_ID : OAuth Apps
          VSSUEID: ${{ secrets.VSSUE_CLIENT_ID }}
          VSSUESECRET: ${{ secrets.VSSUE_CLIENT_SECRET }}
        run: npm install && npm run build

      # 部署到分支
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@3.5.9
        with:
          # 注意在 Settings->Secrets 配置 ACCESS_TOKEN : Personal access tokens
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # 需要部署的分支
          BRANCH: gh-pages
          # vue项目 build 目录
          FOLDER: .vuepress/dist
          
  # 同步 gitee 并 更新 giteepages
  sync-to-gitee:
    needs: build-and-deploy
    runs-on: ubuntu-latest
    steps:
      # 克隆项目至 gitee
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@v1.0.1
        env:
            # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY : id_rsa
            # 个人设置 -> SSH公钥 -> 上传公钥
            SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
            # 注意替换为你的 GitHub 源仓库地址 SSH
            source-repo: "git@github.com:QiJieH/blog.git"
            # 注意替换为你的 Gitee 目标仓库地址
            destination-repo: "git@gitee.com:qijieh/blog.git"

      # 更新部署 gitee pages
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@v1.1.3
        with:
            # 注意替换为你的 Gitee 用户名
            gitee-username: QiJieH
            # 注意在 Settings->Secrets 配置 GITEE_PASSWORD : gitee password
            gitee-password: ${{ secrets.GITEE_PASSWORD }}
            # 注意替换为你的 Gitee 仓库
            gitee-repo: qijieh/blog
            # 构建分支
            branch: gh-pages
```

:::



::: warning

注意 YAML 语法对于Tab缩进有着严格要求，请务必确保代码缩进格式正确！！！

:::



以上是本博客的 workflows 流程，如果你熟悉 Github 和 Gitee 的相关配置你可以直接套用并替换相关属性即可。当然，我也会在下方逐一带领配置。



首先确保你的 `main.yml` 文件路径正确，此时你的项目结构应该大致为：

```
.
├── .github
│   └── workflows
│		└── main.yml
├── .vuepress
├── blogs
├── node_modules
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```



> 关于 `.gitignore` 文件说明：
>
> 由于现在方案的编译环节 `npm run build` 交由了 Github Action 完成，我们不再需要上传生成的静态文件目录
>
> ```   
> node_modules/
> .vuepress/dist/
> ```





接下来将会对 `.github/workflows/main.yml` 代码进行逐一讲解配置。



#### 基本字段说明

**1. `name`**

`name ` 字段是 workflow 的名称。如果省略该字段，默认为当前 workflow 的文件名。

```bash
name: Deploy GitHub Pages And Gitee Pages
```

**2. `on`**

`on ` 字段指定触发 workflow 的条件，通常是某些事件。

```bash
on:
  push:
    branches:
      - master
```

当推送至 `master` 分支时，触发 workflow。

**3. `jobs`**

`jobs` 字段是 workflow 的主体当满足 `on` 的条件时就会运行 `jobs` 中的各项任务

```yaml
jobs:
  build-and-deploy:
  sync-to-gitee:
```

**4. `needs`**

`needs` 字段当前 `job` 的依赖关系，只有当 `needs` 中的 `job` 运行完成后才会执行当前 `job`

```yaml
jobs:
  build-and-deploy:
  sync-to-gitee:
  	needs: build-and-deploy
```

其可以是一个 `job` 数组 `[job1,job2]`

**5. `runs-on`**

当前 `job` 运行的虚拟机环境，必填字段

```yaml
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
```

可用虚拟机如下

- `ubuntu-latest`，`ubuntu-18.04 ` 或 `ubuntu-16.04`
- `windows-latest`，`windows-2019 `  或 `windows-2016`
- `macOS-latest` 或 `macOS-10.14`

**6.`steps`**

`steps`字段指定每个 `Job` 的运行步骤，可以包含一个或多个步骤。每个步骤都可以指定以下三个字段。

> - `name`：步骤名称。
> - `use` ：使用市场发布的 action 脚本
> - `run`：该步骤运行的命令或者 action。
> - `env`：该步骤所需的环境变量。
> - `with` ：额外配置信息

将 action 抽离出来，并设立市场复用代码正是 Github Action 的优越之处，在 [Markplace](https://github.com/marketplace?type=actions) 中发布了大量的 action 脚本，你可以直接在 yml 文件中以代码仓库的方式引用。



#### 工作流程梳理

`main.yml`  的工作流程可以总结为：

1. 每当代码 push 到 master分支 时触发 wrokflow ，其一共有两个 `job`
2. 执行 `build-and-deploy` 任务，其分为三步 `step`
   1. `Checkout` ：使用了 [actions/checkout](https://github.com/marketplace/actions/checkout) 拉取代码到虚拟机
   2. `build` ：在虚拟机运行命令行 `npm install && npm run build`  **就是在这一步服务器帮我们编译生成了网页数据**
   3. `Deploy` ：使用 [JamesIves/github-pages-deploy-action](https://github.com/marketplace/actions/deploy-to-github-pages) 将生成的网页源码部署到 `gh-pages` 分支上
3. 当 `build-and-deploy` 执行完毕后，运行 `sync-to-gitee` 任务，其一共有两步 `step` 
   1. `Sync to Gitee` ：使用 [wearerequired/git-mirror-action](https://github.com/wearerequired/git-mirror-action) 强制同步 Gitee 仓库
   2. `Build Gitee Pages` ：使用 [yanglbme/gitee-pages-action](https://github.com/yanglbme/gitee-pages-action) 更新 Gitee Pages 服务，设置 `gh-pages` 分支的根目录为渲染目录



::: warning

注意：在自动部署方案中，我们不再使用单分支开发，我们将额外创建一个独立分支 `gh-pages` 用来托管生成的网页源码。

我们的项目分支结构应该为：

- `master` ：存储 vuepress 构建代码
- `gh-pages` ：存储编译生成的网页源码

该分支必须命名为 `gh-pages` ，否则无法使用 Github Pages 服务，你无需手动创建，`JamesIves/github-pages-deploy-action` 会自动帮我们创建该分支。

:::





#### workflow敏感数据

在某些 `step` 中，访问仓库，操作仓库等等一系列操作，会需要进行身份验证，这样就涉及到一些仓库令牌，访问密码之类的敏感数值，我们不能直接将其明文暴露在 `yml` 文件中，所以我们使用了系统环境变量的方式存储在了你的仓库（虚拟机）中，通过 
::: v-pre
`${{ secret.NAME }}`
:::
方法，能让我们从虚拟机中拿到这些数值。



接下来我们将逐个生成和设置这些敏感数据



##### **`Deploy`**  
---

在这一步中虚拟机会将  `FOLDER` 下的生成内容推送至 Github 仓库的 `gh-pages` 分支，所以需要一个仓库的访问令牌，你可以参考 [官方文档 创建个人访问令牌](https://docs.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token) ，生成一个用于命令行访问仓库的个人令牌。

```yaml
      # 部署到分支
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@3.5.9
        with:
          # 注意在 Settings->Secrets 配置 ACCESS_TOKEN : Personal access tokens
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # 需要部署的分支
          BRANCH: gh-pages
          # vue项目 build 目录
          FOLDER: .vuepress/dist
```





**个人头像 > Setting > Developer settings > [Personal access tokens](https://github.com/settings/tokens) > Generate new token**

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806154720.png =780x)


`Note` 仅用于提示令牌信息，**需要注意勾选 `Scopes` 中的 `repo` 和 `workflow`**，点击 `Generate token` 按钮生成 `token`

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806155101.png =780x)


之后页面会跳转会 `Personal access token` ，并出现蓝色提示框，里面的字符串便是生成的个人令牌，这串数值只会显示这一次，当你离开当前页面后就会被永久隐藏，请务必保管好。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806155442.png =780x)

虽然你可以将其直接复制到 `.giyhub/workflowes/main.yml` 文件的 `Deploy.with.ACCESS_TOKEN` ，但是这样是十分不安全的。**接下来我们将其保存至仓库的 Secrets 下。**

> Secrets are environment variables that are **encrypted** and only exposed to selected actions. Anyone with **collaborator** access to this repository can use these secrets in a workflow.

Secrets 相当于当前虚拟机的系统环境变量，在该仓库运行的 workflow 文件可以通过
::: v-pre
`${{secrets.NAME}}`
:::
访问这些系统变量。

**仓库 > Setting > Secrets > New Secrets** 按照以下方式填写

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806160224.png)



Name 是存储系统环境变量的名称，你可以随意填写只需修改 workflow 文件中的变量名即可。点击 Add secret 即可完成仓库系统环境的添加，只后只要在 workflow 文件中以
::: v-pre
`${{ secrets.ACCESS_TOKEN }}`
:::
的方式即可访问预先设置好的环境变量。

```yaml {5}
- name: Deploy
        uses: JamesIves/github-pages-deploy-action@3.5.9
        with:
          # 注意在 Settings->Secrets 配置 ACCESS_TOKEN : Personal access tokens
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # 需要部署的分支
          BRANCH: gh-pages
          # vue项目 build 目录
          FOLDER: .vuepress/dist
```







##### **`Sync to Gitee`**  
---

在这一步中 action 会完成 Gitee 仓库代码的同步，这里将会使用 [SSH公私钥配对](https://docs.github.com/cn/github/authenticating-to-github/connecting-to-github-with-ssh) 的方式进行 Gitee 身份验证。如果你熟悉 Github SSH 的配布方式可以自行设置。

```yaml
      # 克隆项目至 gitee
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@v1.0.1
        env:
            # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY : id_rsa
            # 个人设置 -> SSH公钥 -> 上传公钥
            SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
            # 注意替换为你的 GitHub 源仓库地址 SSH
            source-repo: "git@github.com:QiJieH/blog.git"
            # 注意替换为你的 Gitee 目标仓库地址
            destination-repo: "git@gitee.com:qijieh/blog.git"
```



**生成新 SSH 密钥**

> 如果你计算机中曾经设置过 Github 或 Gitee 的 SSH 服务可以跳过此步。

1. 打开 Git Bash。

2. 键入以下命令。

   ```bash
   ssh-keygen
   ```

3. 提示您“Enter a file in which to save the key（输入要保存密钥的文件）”时，按 Enter 键。 这将接受默认文件位置。

   ```shell
   > Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]
   ```

4. 在提示时输入安全密码。 更多信息请参阅[“使用 SSH 密钥密码”](https://docs.github.com/cn/articles/working-with-ssh-key-passphrases)。

   ```shell
   > Enter passphrase (empty for no passphrase): [Type a passphrase]
   > Enter same passphrase again: [Type passphrase again]
   ```



运行上面步骤后在你的 `/c/Users/you/.ssh/` 目录下会拥有两个文件

```
/c/Users/you/.ssh/
	> id_rsa    	// 私钥存储在客户端
	> id_rsa_pub	// 公钥存储在服务端
```

你可以通过文本方式打开文件进行查看，接下来只需要将 `id_rsa_pub` 上传至远程仓库即可。



> 这里参考的是 Github 的中文文档（文档比 Gitee 详细），SSH 公私钥生成是 Git 提供的服务，文档通用 。
>
> Github 和 Gitee 都是基于 SSH 协议的 Git 服务，如果你在 Github 已经配置了 SSH ，你完全可以使用同一份公钥在 Gitee ，这样我们只使用一个私钥在两个平台都能进行验证。这里只需要在 Gitee 设置 SSH 。



**[Gitee SSH 公钥设置](https://gitee.com/help/articles/4191)**

> 注意此处我们需要生成的是 账户SSH Key 不是 仓库SSH Key，其区别如下：
>
> 和仓库"只读"权限的 SSH Key 相比，账户的 SSH Key **同时具备`推送/拉取`的权限，对用户创建/参与的仓库均能使用**，使用起来更加方便。



主页右上角 **「个人设置」->「安全设置」->「SSH公钥」->「[添加公钥](https://gitee.com/profile/sshkeys)」** ，添加生成的 public key 添加到当前账户中。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806164348.png)



点击确定即可，可以不用管 SHA256 。

接下来，只需要将配套的将我们的 私钥`id_rsa` 储存在 Github 仓库的 Secrects 中，这样 workflow文件就能通过读取系统环境变量
::: v-pre
`${{secrect.Name}}`
:::
的方式用私钥与 Gitee 上的公钥进行配对，以此验证身份，获得仓库操作权限。



**Github 仓库 > Setting > Secrets > New Secrets**

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806174117.png)


通过
::: v-pre
`${{ secrtes.GITEE_RSA_PRIVATE_KEY }}`
:::
与 Gitee 仓库进行 SSH 验证，获得 Gitee 仓库的操作权限。

```yaml {5}
      # 克隆项目至 gitee
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@v1.0.1
        env:
            SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
            # 注意替换为你的 GitHub 源仓库地址SSH Clone
            source-repo: "git@github.com:QiJieH/blog.git"
            # 注意替换为你的 Gitee 目标仓库地址 Sync
            destination-repo: "git@gitee.com:qijieh/blog.git"
```





##### **`Build Gitee Pages`**  
---

完成代码的同步后，我们需要更新 Gitee Pages 服务，刷新网页内容。

> Gitee Pages 服务不支持自动更新，开通会员的 Gitee Pages Pro 服务将支持。
>
> 该 yanglbme/gitee-pages-action 的 Action 应该是使用了类似网页脚本的方法替代了手动点击 Gitee Pages 的更新按钮。
>
> 注意：该 action 需要事先开启 Gitee 仓库的 Pages 服务才能正常运行。但是此时我们的 Gitee 仓库还是为空，无法启动 Gitee Pages 服务，所以你需要在第一次推送后手动前往 Gitee Pages 开启。

```yaml
# 更新部署 gitee pages
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@v1.1.3
        with:
            # 注意替换为你的 Gitee 用户名
            gitee-username: QiJieH
            # 注意在 Settings->Secrets 配置 GITEE_PASSWORD : gitee password
            gitee-password: ${{ secrets.GITEE_PASSWORD }}
            # 注意替换为你的 Gitee 仓库
            gitee-repo: qijieh/blog
            # 构建分支
            branch: gh-pages
```



这个 action 需要我们提供 Gitee 的账户密码，我们依旧将其存放在 Github 仓库的 Secrtes 中。

**Github 仓库 > Setting > Secrets > New Secrets**

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806175611.png)



点击 Add secret ，这样 workflow 文件便可以提供系统环境变量的方式
::: v-pre
`${{ GITEE_PASSWORD }}`
:::
访问到我们的 Gitee 账户密码。

```yaml {8}
# 更新部署 gitee pages
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@v1.1.3
        with:
            # 注意替换为你的 Gitee 用户名
            gitee-username: QiJieH
            # 注意在 Settings->Secrets 配置 GITEE_PASSWORD : gitee password
            gitee-password: ${{ secrets.GITEE_PASSWORD }}
            # 注意替换为你的 Gitee 仓库
            gitee-repo: qijieh/blog
            # 构建分支
            branch: gh-pages
```





#### Vssue评论插件  
---

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806184726.png =700x)

[Vssue](https://vssue.js.org/zh/guide/) 是一款无需后台的评论系统，其由 Vue 驱动并基于 Github 仓库的 Issue 实现。被广泛运用于博客，文档等无后端评论场景。

由于其配置需要 Github 仓库的 Issue 所以需要通过 [Github OAuth Apps](https://github.com/settings/developers) 的接口数据。



由于 reco 主题已经将 Vssue 集合在了官方插件 [comment](https://vuepress-theme-reco.recoluan.com/views/plugins/comments.html) 中，我们无需额外 `npm install`  ，通过参考 [文档](https://vuepress-theme-reco.recoluan.com/views/plugins/comments.html) 在项目的 `.vuepress/config.js` 中引入插件

```javascript {13,14}
// .vuepress/config.js
module.exports = {
  theme: 'reco',
  plugins: [
    [
        '@vuepress-reco/comments', 
        {
    		solution: 'vssue',
    		options: {
      			platform: 'github',
      			owner: 'OWNER_OF_REPO',
      			repo: 'NAME_OF_REPO',
      			clientId: 'YOUR_CLIENT_ID',
      			clientSecret: 'YOUR_CLIENT_SECRET',
    		}
  		}
    ],
  ] 
}
```



其中的 `owner` 填写仓库拥有者，`repo` 填写仓库名称，`clientId` 和 `clientSecret` 需要前往 Github 仓库设置。

> 我个人仓库的地址是 https://github.com/QiJieH/blog 配置如下：
>
> ```javascript
> owner: 'QiJieH',
> repo: 'blog',
> ```

依次点击 Github 的 **个人头像 > Setting > Developer setting > [OAuth Apps](https://github.com/settings/developers) > New OAuth App** 

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806185536.png)



`Homepage URL` ：需要授权的网址

`Authorization callback URL` ：授权回调地址

请自行修改该属性，填写完成后**点击 Register application 提交**。

只后我们在 OAuth Apps 列表便可以看见列表了，点击其进入

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806190302.png =700x)



其中的 `Client ID` 和 `Client Secret` 便是 Vssue 插件需要的配置值了。

将 `Client ID` 和 `Client Secret` 直接填写在 `config.js` 的 Vssue 插件配置中是不理智的，我们依旧可以使用 Github 仓库的 Secret 来存储这两个值，在 workflow 的编译 `build` 阶段将其以
::: v-pre
`${{ secret.Name }}`
:::
的方式访问其值。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806192128.png =700x)

这里不再详细说明设置方法，请自行参考之前几个 Secret 的配置教程。



添加成功后在我们的 workflow 文件中添加相应代码，**将其添加进编译过程的环境中**

```yaml {5,6}
      # 构建
      - name: Build
        env:
          # 注意在 Settings->Secrets 配置 VSSUE_CLIENT_ID : OAuth Apps
          VSSUEID: ${{ secrets.VSSUE_CLIENT_ID }}
          VSSUESECRET: ${{ secrets.VSSUE_CLIENT_SECRET }}
        run: npm install && npm run build
```



这样在虚拟机运行时在环境中就拥有了 `VSSUEID` 和 `VSSUESECRET` 两个变量，而 node 为我们提供在一个 `process.env` 方法，让我们能够**在编译的时候访问当前进程的环境变量**，我们只需要在 `config.js` 的 Vssue 配置中使用该方法即可

```javascript {13,14}
// .vuepress/config.js
module.exports = {
  theme: 'reco',
  plugins: [
    [
        '@vuepress-reco/comments', 
        {
    		solution: 'vssue',
    		options: {
      			platform: 'github',
      			owner: 'QiJieH',
      			repo: 'blog',
      			clientId: process.env.VSSUEID,
      			clientSecret: process.env.VSSUESECRET,
    		}
  		}
    ],
  ] 
}
```





#### 开始推送

确保你已经替换 workflow 文件中的数据，并在 Github 和 Gitee 设置好了相应配置。检查你的 `main.yml` 文件是否正确存储在路径 `.github/workflows/` 下。



一切准备就绪后开始你的 Git 流程，并见证 Github Action 的强大。

```bash
git add .
git commit -m "first deploy"
git push
```



推送完成后，打开 Github仓库的 Actions 按照图片依次点击进入 Action 运行日志

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806194019.png =700x)

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806194126.png =700x)



之后你便可以看见你的 workflow 文件正在被逐一执行。



> 绿勾代表执行成功
>
> 黄色代表正在执行
>
> 红叉代表执行出错
>
> 
>
> **你可以在这里检查出错原因，请根据原因自行 debug ，这里列出几个常见的错误：**
>
> - main.yml 语法错误，请检查Tab缩进
>
>   ![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806195900.png =600x)
>
> - 仓库操作错误，令牌或密码配置不正确，请根据该步骤需要的数据检查
>
>   ![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806200032.png =600x)
>
> - 部分 action 配置错误，以下错误是以为在 Deploy 中设置生成目录 `.vuepress/dist` ，却在 `config.js` 中设置 `dest` 为 `docs` ，导致虚拟机编译 `npm run build` 后没有生成文件在 `.vuepress/dist` 下，进而致使 Deploy 环节无法从 `.vuepress/dist` 目录拉取代码到 `gh-pages` 分支。
>
>   ```yaml {10}
>   # 部署到分支
>         - name: Deploy
>           uses: JamesIves/github-pages-deploy-action@3.5.9
>           with:
>             # 注意在 Settings->Secrets 配置 ACCESS_TOKEN : Personal access tokens
>             ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
>             # 需要部署的分支
>             BRANCH: gh-pages
>             # vue项目 build 目录
>             FOLDER: .vuepress/dist
>   ```
>
>   ```js {2}
>   module.exports = {
>     dest: ".vuepress/dist",  // 确保这个目录与 FOLDER 保存一致
>   }
>   ```
>
>   ![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806200421.png =680x)



当所有的 Action 正常执行完成后，你可以查看 Github 仓库是否更新了 `gh-pages` 分支，其是否存储了网页源码。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806194559.png =700x)

再访问你的 Gitee 仓库查看其是否同步了代码和分支。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806194734.png =700x)

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806194823.png =700x)


接下来你只需要手动配置一次两个仓库的 Pages 服务。



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806195000.png =700x)



![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806195059.png =700x)





之后便无需操心，每次提交 Github Action 都会为你完成一系列的工作。



#### 访问你的博客

至此所有的自动部署已经完成，现在你的博客提交流程为：

1. 书写博文，修改主题
2. `git push`



Github Action 在你看不见的地方为了完成了一系列操作：

1. 从仓库拉取代码
2. 编译代码，生成网页源码，并推送到 `gh-pages` 分支
3. 同步 Gitee 代码
4. 更新 Gitee Pages 服务



现在，访问你的博客网站吧！







## 图床搭建

尽管你可以在 Markdown 文件中使用相对路径对项目下的 `public` 文件夹的图片进行引用，但是这样做无疑增加了我们仓库的容量占用，特别是当网站中引用大量图片时，我们不可能全部将其存储在 `public` 文件夹下，这对网站性能和仓库容量都是一种极大的浪费。



对此我选择了 `PicGo + Gitee` 在线图床的解决方案。借助于第三方的在线图床服务，我们可以在 Markdown 文件中通过 src 的方式访问在线的图片。



下载 [PicGo](https://github.com/Molunerfinn/PicGo) 软件至你的电脑，安装并打开。

在插件设置中搜索 gitee 并安装插件。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806202625.png =700x)

安装成功后，打开 **图床设置 > Gitee图床**

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806204132.png =700x)

`owner` ：仓库所有者

`repo` ：仓库名称

`token` ：个人令牌



访问 Gitee 创建图床仓库

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806203152.png =700x)



> 注意勾选 使用Readme文件初始化这个仓库



点击 个人头像 > 设置 > 私人令牌 > 生成新令牌

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806203354.png =700x)



**点击提交之后，令牌token会出现，请复制妥善保存。将其填入 PicGo 图床设置 > Gitee图床 > token 栏中。**



以我的仓库为例：

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806204018.png =700x)



应该填写：

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806202758.png =700x)




之后保持 PicGo 后台运行，当你的剪切板有图片或图片URL时，使用快捷键 Crtl + Shift + P 快速上传图片至仓库，随后你的剪切板将会返回图片的引用代码。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200806204417.png =700x)


在此处可以选择引用何种代码片段。



PicGo 除了支持 Gitee 外还支持其他图床，你可以自行百度配置。

> Gitee 单仓库容量 500M
>
> Github 单仓库容量 1G
>
> SM.MS 容量 5G ，但是上传有时间限制





## SEO优化

todo...