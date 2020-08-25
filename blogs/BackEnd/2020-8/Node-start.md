---
title: Node.js 入门
date: 2020-08-24
sidebar: false
categories:
 - BackEnd
tags:
 - Node.js
publish: true
---

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200824132946.png)

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。Node.js 的包管理器 npm，是全球最大的开源库生态系统。

<!-- more -->



## Node 开发概述

### 为什么要学习服务器端开发基础

- 能够和后端程序员更加紧密的配合
- 网站业务逻辑前置，学习前端技术需要后端技术支撑 （Ajax)
- 扩宽知识视野，能够站在更高的角度审视整个项目



### 服务器端开发要做的事情

- 实现网站业务逻辑
- 数据的增删改查



### 为什么选择 Node

- 使用 JavaScript 语法开发后端应用
- 一些公司邀请前端工程师掌握Node开发
- 生态系统活跃，有大量开源库可以使用
- 前端开发工具大多基于 Node 开发



### 什么是 Node

Node 是一个基于 Chrome V8 引擎的 JavaScript 代码运行环境



**运行环境**

- 浏览器（软件）能够运行JavaScript代码，浏览器就是JavaScript代码的运行环境
- Node（软件）能够运行JavaScript代码，Node就是JavaScript代码的运行环境



## Node 运行环境搭建

[Node.js 官网](https://nodejs.org/zh-cn/) 



版本说明：

- LTS ：Long Term Support 长期支持版 稳定版
- Current ：拥有最新特性 实验版



安装路径请勿包含中文路径



安装完成后通过命令行工具键入下面命令查看是否安装成功

```bash
node -v
```



> 常见错误
>
> **2502，2503 **
>
> - 错误原因：系统账户权限不足
> - 解决方法
>   - 以管理员身份运行命令行
>   - 输入运行安装包命令 `msiexec /package nodePath.msi
>
> **无法识别命令**
>
> - 失败原因：Node安装目录写入环境变量失败
> - 解决方法：手动设定Node安装路径到PATH环境变量



## Node.js 快速入门

### Node.js 的组成

- JavaScript 由三部分组成：ECAMScript , DOM , BOM
- Node.js 是由 ECMAScript 及 Node环境提供的一些附加API组成，包括文件，网络，路径等等一些更加强大的API





### Node.js 基础语法

所有 ECMAScript 语法在 Node 环境中都可以使用



在项目文件下新建 `index.js` 文件，书写以下代码

```js
let hollo = "Hello Node.js";
const say = () => console.log(hello);
say();
```

在项目目录下打开终端，键入 node 命令运行 js

```bash
node index.js
```



使用技巧

- 在资源管理器的工作目录中按住 Shift 键 + 鼠标右键，弹出的菜单内会出现在此处打开 PowerShell 窗口，此时的终端目录就会定位在当前目录下。
- 在使用 node 键入执行文件名时，可以使用 Tab 键自动补全
- 终端会记录命令历史，使用方向键上下可以切换历史命令
- 使用 cls 命令清空终端页面缓冲





## Node.js 模块化开发

### JavaScript 开发弊端

JavaScript 在使用时存在两大问题，文件依赖和命名冲突



由于 JavaScript 执行机制，当文件之间反复依赖，或相互依赖，会很难理清文件依赖关系。



如果文件与文件中存在相同命名的变量，可能会出现命名冲突



### 生活中的模块开发

- 电脑
  - 屏幕
  - 显卡
  - 内存
  - 鼠标
  - 电源



### 软件中的模块化开发

一个功能就是一个模块，多个模块可以组成完整应用，抽离一个模块不会影响其他功能的运行。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200824113028.png)







### Node.js 模块化开发规范

- Node.js 规定一个 js 文件就是一个模块，模块内部定义的变量和函数默认情况下在外部无法得到
- 模块内部可以使用 exports 对象进行成员导出，使用 require 方法导入其他模块。



**模块成员导出**

```js
const add = (x,y) => x+y;
exports.add = add;

// 为 exports 属性新增 add 属性，其值为当前定义的 add函数
```

**模块成员引入**

```js
const a = require('./a.js')
// const a = require('./a') 可忽略后缀
// const {add} = require('./a') 使用对象解构方式
a.add(1,2); // 3

// a = { add: [Function: add] }
```



**模块成员导出的另一种方式**

```js
module.exports.key = value;
```



**两种导出方式的区别**

区别：exports 是 module.exports 的别名（地址引用关系），导出对象最终以 module.exports 为准

```js
// a.js
exports.x = 100;
module.exports.x = 200;
// b.js
const tmp = require('./a.js')
console.log( tmp ); // { x:200 }


//==========================


// a.js
exports.x = 100;
module.exports.x = 200;
exports = {
    name: 'zhangsan'
}
// b.js
const tmp = require('./a.js')
console.log( tmp ); // { x:200 }


//==========================


// a.js
exports.x = 100;
module.exports.x = 200;
exports = {
    name: 'zhangsan'
}
module.exports = {
    name: 'lisi'
}
// b.js
const tmp = require('./a.js')
console.log( tmp ); // { name:lisi }
```





### 系统模块

Node 运行环境提供的 API ，因为这些 API 都是以模块化的方式进行开发的，使用我们又称 Node 运行环境提供的 API 为系统模块。

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200824121832.png)



**文件模块 fs**

---

filesystem : 文件系统

```js
const fs = require('fs');
```

提供打印 fs ，可以获取到 fs 对象内的所有属性

::: details


```js
const fs = require('fs');
console.log(fs);
//=================================
{
  appendFile: [Function: appendFile],
  appendFileSync: [Function: appendFileSync],
  access: [Function: access],
  accessSync: [Function: accessSync],
  chown: [Function: chown],
  chownSync: [Function: chownSync],
  chmod: [Function: chmod],
  chmodSync: [Function: chmodSync],
  close: [Function: close],
  closeSync: [Function: closeSync],
  copyFile: [Function: copyFile],
  copyFileSync: [Function: copyFileSync],
  createReadStream: [Function: createReadStream],
  createWriteStream: [Function: createWriteStream],
  exists: [Function: exists],
  existsSync: [Function: existsSync],
  fchown: [Function: fchown],
  fchownSync: [Function: fchownSync],
  fchmod: [Function: fchmod],
  fchmodSync: [Function: fchmodSync],
  fdatasync: [Function: fdatasync],
  fdatasyncSync: [Function: fdatasyncSync],
  fstat: [Function: fstat],
  fstatSync: [Function: fstatSync],
  fsync: [Function: fsync],
  fsyncSync: [Function: fsyncSync],
  ftruncate: [Function: ftruncate],
  ftruncateSync: [Function: ftruncateSync],
  futimes: [Function: futimes],
  futimesSync: [Function: futimesSync],
  lchown: [Function: lchown],
  lchownSync: [Function: lchownSync],
  lchmod: undefined,
  lchmodSync: undefined,
  link: [Function: link],
  linkSync: [Function: linkSync],
  lstat: [Function: lstat],
  lstatSync: [Function: lstatSync],
  mkdir: [Function: mkdir],
  mkdirSync: [Function: mkdirSync],
  mkdtemp: [Function: mkdtemp],
  mkdtempSync: [Function: mkdtempSync],
  open: [Function: open],
  openSync: [Function: openSync],
  opendir: [Function: opendir],
  opendirSync: [Function: opendirSync],
  readdir: [Function: readdir],
  readdirSync: [Function: readdirSync],
  read: [Function: read],
  readSync: [Function: readSync],
  readv: [Function: readv],
  readvSync: [Function: readvSync],
  readFile: [Function: readFile],
  readFileSync: [Function: readFileSync],
  readlink: [Function: readlink],
  readlinkSync: [Function: readlinkSync],
  realpath: [Function: realpath] { native: [Function] },
  realpathSync: [Function: realpathSync] { native: [Function] },
  rename: [Function: rename],
  renameSync: [Function: renameSync],
  rmdir: [Function: rmdir],
  rmdirSync: [Function: rmdirSync],
  stat: [Function: stat],
  statSync: [Function: statSync],
  symlink: [Function: symlink],
  symlinkSync: [Function: symlinkSync],
  truncate: [Function: truncate],
  truncateSync: [Function: truncateSync],
  unwatchFile: [Function: unwatchFile],
  unlink: [Function: unlink],
  unlinkSync: [Function: unlinkSync],
  utimes: [Function: utimes],
  utimesSync: [Function: utimesSync],
  watch: [Function: watch],
  watchFile: [Function: watchFile],
  writeFile: [Function: writeFile],
  writeFileSync: [Function: writeFileSync],
  write: [Function: write],
  writeSync: [Function: writeSync],
  writev: [Function: writev],
  writevSync: [Function: writevSync],
  Dir: [Function: Dir],
  Dirent: [Function: Dirent],
  Stats: [Function: Stats],
  ReadStream: [Getter/Setter],
  WriteStream: [Getter/Setter],
  FileReadStream: [Getter/Setter],
  FileWriteStream: [Getter/Setter],
  _toUnixTimestamp: [Function: toUnixTimestamp],
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  constants: [Object: null prototype] {
    UV_FS_SYMLINK_DIR: 1,
    UV_FS_SYMLINK_JUNCTION: 2,
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    UV_DIRENT_UNKNOWN: 0,
    UV_DIRENT_FILE: 1,
    UV_DIRENT_DIR: 2,
    UV_DIRENT_LINK: 3,
    UV_DIRENT_FIFO: 4,
    UV_DIRENT_SOCKET: 5,
    UV_DIRENT_CHAR: 6,
    UV_DIRENT_BLOCK: 7,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFLNK: 40960,
    O_CREAT: 256,
    O_EXCL: 1024,
    UV_FS_O_FILEMAP: 536870912,
    O_TRUNC: 512,
    O_APPEND: 8,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_COPYFILE_EXCL: 1,
    COPYFILE_EXCL: 1,
    UV_FS_COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE: 2,
    UV_FS_COPYFILE_FICLONE_FORCE: 4,
    COPYFILE_FICLONE_FORCE: 4
  },
  promises: [Getter]
}
```

:::





**读取文件内容**

```js
fs.readFile('path'[,'filecode'],callback);
```

参数：

- `path` : 文件路径，包含文件
- `filecode` : 文件编码，可选
- `callback` ：回调函数，包含两个参数 
  - `err` ：object 错误对象 如果错误抛出 null
  - `doc` ：string 文件内容



实例

```js
const fs = require('fs');
fs.readFile('./a.jsp','utf-8',(err, doc) => {
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }
});
```





**写入文件内容**

```js
fs.writeFile('filepath','data',callback)
```

参数：

- `path` : 文件路径，包含文件，需要写入的文件
- `data` : 写入内容
- `callback` ：回调函数
  - `err` ：object 错误对象 如果错误抛出 null



该方法会覆盖文件原有内容，如果文件不存在则会新建



实例

```js
const fs = require('fs');
const content = 'exports.index = 333'
fs.writeFile('./a.js',content, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("写入成功");
});
```







**路径模块 path**

---

为什么要进行路径拼接：

- 不同操作系统的路径分隔符不统一
- windows 上是 \ /
- linux 上是 /



语法

```js
path.join('path1','path2',...);
```

实例

```js
const path = require('path');
let finialPath = path.join('css','index.css');
console.log(finialPath);
```



**相对路径与绝对路径**

- 大多数情况下使用绝对路径，因为相对路径有时候**相对的是命令行工具的当前工作目录**，很多情况下，命令行工具的工作目录是经常改变的
- 在读取文件或者设置文件路径时都会选择绝对路径
- 使用 `__dirname` 获取当前文件所在的绝对路径



```js
const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname,'./c.js');

fs.readFile( filePath, 'utf-8', (err, doc) => {
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }
})
```





### 第三方模块

**什么是第三方模块**

---

别人写好的、具有特定功能的、我们能直接使用的模块即第三方模块，由于第三方模块通常都是由多个文件组成并且被放置在一个文件夹中，所以又名包。



第三方模块存在的两种形式：

- 以js文件的形式存在，提供实现项目具体功能的API接口。
- 以命令行工具形式存在，辅助项目开发





**获取第三方模块**

***

[npmjs.com](https://www.npmjs.com/) ： 第三方模块的存储和分发仓库



npm (node package manager) ：node 包管理器

- 下载：npm install 模块名称
- 删除：npm uninstall 模块名称

本地安装和全局安装

- 默认进行本地安装，只有当前项目能够使用，一般库文件进行本地安装
- 全局安装是使用 -g 参数进行，能够让该计算机上的所有项目使用，一般对命令行工具进行全局安装



该命令会在命令行工作目录下创建 node_modules 和 packages-lock.json 两个文件，其中模块会存储在 node_modules 下。





**nodemon**

---

nodemon 是一个命令行工具，用以辅助项目开发

在 Node.js 中，每次修改文件都要在命令行重新执行该文件，非常繁琐

而 nodemon 会为我们监控文件修改，一旦修改立即执行文件。



使用：

1. 使用 `npm install nodemon -g` 下载
2. 在命令行工具中使用 nodemon 命令替代 node
3. 使用 ctrl + c 关闭监控





**nrm**

---

nrm (npm registry manager): npm 下载地址切换工具

npm  默认下载地址在国外，国内下载速度很慢



使用：

1. 使用 `npm install nrm -g` 下载
2. 查询可用下载列表 `nrm ls`
3. 切换 npm 下载地址 nrm use 名称





单独使用 cnpm：

1. 使用命令下载

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

2. 查看是否成功 `cnpm -v`
3. 使用 `cnpm` 替代 `npm` 命令





### Gulp

---

![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200824132817.png)

gulp.js - 基于流(stream)的自动化构建工具。Grunt 采用配置文件的方式执行任务，而 Gulp 一切都通过代码实现。

基于node平台开发的前端构建工具

将机械化操作编写成任务, 想要执行机械化操作时执行一个命令行命令任务就能自动执行了

用机器代替手工，提高开发效率。







**Gulp 能做什么**

---

- 项目上线，HTML、CSS、JS文件压缩合并

- 语法转换（es6、less ...）

- 公共文件抽离

- 修改文件浏览器自动刷新





**Gulp 使用**

---

1. 下载

```bash
npm install gulp
```

2. 在项目根目录下建立 `gulpfile.js` 文件

3. 重构项目的文件夹结构 `src` 目录放置源代码文件 `dist` 目录存放构建后文件

4. 在 `gulpfile.js` 文件中编写任务
5. 在命令行工具中执行 gulp 任务



**Gulp中提供的方法**

---

`gulp.src()`：获取任务要处理的文件

`gulp.dest()`：输出文件

`gulp.task()`：建立gulp任务

`gulp.watch()`：监控文件的变化



```js
// gulpfile.js
const gulp = require('gulp');
// 使用gulp.task()方法建立任务
gulp.task('first', () => {
    // 获取要处理的文件
    gulp.src('./src/css/base.css') 
    // 将处理后的文件输出到dist目录
    .pipe(gulp.dest('./dist/css'));
});
```



想要运行 gulp 文件，需要下载 gulp 提供的另一个模块

```bash
npm install gulp-cli -g
```

之后使用执行任务，gulp 会自动寻找 gulpfile.js 文件中的 first 任务并执行

```bash
gulp first
```



**Gulp插件**

---

- gulp-htmlmin ：html文件压缩

- gulp-csso ：压缩css

- gulp-babel ：JavaScript语法转化

- gulp-less: less语法转化

- gulp-uglify ：压缩混淆JavaScript

- gulp-file-include： 公共文件包含

- browsersync： 浏览器实时同步





实例

::: details

```js
// 引用gulp模块
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// 使用gulp.task建立任务
// 1.任务的名称
// 2.任务的回调函数
gulp.task('first', () => {
	console.log('我们人生中的第一个gulp任务执行了');
	// 1.使用gulp.src获取要处理的文件
	gulp.src('./src/css/base.css')
		.pipe(gulp.dest('dist/css'));
});

// html任务
// 1.html文件中代码的压缩操作
// 2.抽取html文件中的公共代码
gulp.task('htmlmin', () => {
	gulp.src('./src/*.html')
		.pipe(fileinclude())
		// 压缩html文件中的代码
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'));
});

// css任务
// 1.less语法转换
// 2.css代码压缩
gulp.task('cssmin', () => {
	// 选择css目录下的所有less文件以及css文件
	gulp.src(['./src/css/*.less', './src/css/*.css'])
		// 将less语法转换为css语法
		.pipe(less())
		// 将css代码进行压缩
		.pipe(csso())
		// 将处理的结果进行输出
		.pipe(gulp.dest('dist/css'))
});

// js任务
// 1.es6代码转换
// 2.代码压缩
gulp.task('jsmin', () => {
	gulp.src('./src/js/*.js')
		.pipe(babel({
			// 它可以判断当前代码的运行环境 将代码转换为当前运行环境所支持的代码
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// 复制文件夹
gulp.task('copy', () => {

	gulp.src('./src/images/*')
		.pipe(gulp.dest('dist/images'));

	gulp.src('./src/lib/*')
		.pipe(gulp.dest('dist/lib'))
});

// 构建任务
gulp.task('default', ['htmlmin', 'cssmin', 'jsmin', 'copy']);
```

:::



## Node.js 文件结构



### node_modules

---

文件夹及文件过多过碎，当我们将项目整体拷贝给别人的时候，传输速度会很慢

复杂的模块依赖关系需要被记录，确保模块的版本和当前保持一致，否则会导致当前项目运行报错

在 node_modules 文件中存储的是当前项目的各项依赖，这个文件会十分复杂碎片且庞大。



### package.json

---

项目描述文件，记录了当前项目信息，例如项目名称、版本、作者、github地址、当前项目依赖了哪些第三方模块等。

在项目根目录下使用 `npm init ` 命令生成，使用 `npm init -y` 快速生成，无需填写相关信息

```json
{
  "name": "NodePkg",		// 项目名称
  "version": "1.0.0",		// 项目版本
  "description": "",		// 项目描述
  "main": "index.js",		// 入口函数
  "scripts": {				// 命令别名
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],			// 关键字
  "author": "",				// 作者
  "license": "ISC"			// 开源许可
}
```



当项目中存在 package.json 文件后，每次 install 第三方模块都会记录到`dependencies` 字段中

```bash
npm install formidable mime
```

```json
{
    //...
    
    "dependencies": {
    	"formidable": "^1.2.2",
    	"mime": "^2.4.6"
  	}
}
```

> 需要注意的是如果你使用 cnpm 命令下载，是不会构建到 dependencies 中去的。



别人可以根据 `package.json` 获取你当前项目的依赖，`npm install` 会自动根据 `package.json` 文件下载相关依赖。







**项目依赖**

- 在项目的开发阶段和线上运营阶段，都需要依赖的第三方包，称为项目依赖
- 使用 `npm install 包名` 命令下载的文件会默认被添加到 `package.json` 文件的 `dependencies` 字段中



**开发依赖**

- 在项目的开发阶段需要依赖，线上运营阶段不需要依赖的第三方包，称为开发依赖
- 使用 `npm install 包名 --save-dev` 命令将包添加到 `package.json` 文件的 `devDependencies` 字段中



```bash
npm install gulp --save-dev
```

```json
{
	//...
    
	"devDependencies": {
		"gulp": "^3.9.1"
	}
}
```



开发环境：使用 `npm install` 下载全部依赖

生产环境：使用 `npm install --production` 不下载开发环境依赖





### package-lock.json

---

- 锁定包的版本，确保再次下载时不会因为包版本不同而产生问题
- 加快下载速度，因为该文件中已经记录了项目所依赖第三方包的树状结构和包的下载地址，重新安装时只需下载即可，不需要做额外的工作





### scripts

命令别名，当命令行命令过长或复杂时，可以为将其键入 scripts 中，并赋予简单的别名，之后便可以提高 `npm run 别名` 执行这段命令。





## Node.js 模块加载机制



### 模块查找规则

```js
require('./find.js')
require('./find')
```

1. require方法根据模块路径查找模块，如果是完整路径，直接引入模块。

2. 如果模块后缀省略，先找同名JS文件再找同名JS文件夹

3. 如果找到了同名文件夹，找文件夹中的index.js

4. 如果文件夹中没有index.js就会去当前文件夹中的package.json文件中查找main选项中的入口文件

5. 如果找指定的入口文件不存在或者没有指定入口文件就会报错，模块没有被找到



**无路径无后缀**

```js
require('find')
```

1. Node.js 会假设它是系统模块
2. Node.js 会去 node_modulcs 文件中去查找
3. 查找同名 js 文件
4. 查找同名文件夹下的 index.js
5. 查看文件夹的 package.json 的 main 选项，并去文件查找
6. 如果仍未找到，报错





## Node.js 全局对象

在浏览器中全局对象是window，在node中全局对象是global

node全局对象中有以下方法，可以在任何地方使用，global可以省略

- `console.log()` ：控制台输出
- `setTimeout()` ： 设置超时定时器
- `cleartimeout()`：清除超时定时器
- `setInterval()` ：设置间歇定时器
- `clearInterval()` ：清除间歇定时器













