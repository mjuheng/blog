---
title: "[项目实战] 多人博客管理系统"
date: 2020-08-07
sidebar: false
categories:
 - [FrontEnd]
 - [BackEnd]
tags:
 - ProjectPractice
 - Node.js
 - MongoDB
 - Express
 - Art-template
publish: true
---
![](https://gitee.com/QiJieH/blog-image-bed/raw/master//20200807151042.png =700x)

技术栈：`node.js` + `express` + `mongodb` + `bootstrap`

实现功能：
- 登录注册
- 文章管理
- 用户管理
- 文章评论

> 项目仓库地址 ：[QiJieH/BlogMS](https://github.com/QiJieH/BlogMS)
> <!-- more -->
>
> # 项目实战   多人博客管理系统

 **快速预览:**

![](https://i.loli.net/2020/08/07/o3YrjK1gZlhs74e.png =700x)

![](https://i.loli.net/2020/08/07/IASwVrNeqoE6KCa.png =700x)

![](https://i.loli.net/2020/08/07/AxdSEKN6kg8Q5si.png =700x)

![](https://i.loli.net/2020/08/07/aqegQXNLhJSEYPc.png =700x)




## 运行说明

请使用 `nodemon` 开启网站监听。
注意初次部署你可能需要自行添加数据库中的用户信息。



## 1. 项目环境搭建

nodejs + mongodb + express





### 1.1 项目介绍

- 博客内容展示
- 博客管理功能



### 1.2 案例初始化

1. 建立项目文件结构
   - public 静态资源
   - model 数据库操作
   - route 路由
   - views 模板
2. 初始化项目描述文件
   - npm init -y
3. 下载项目依赖的第三方模块
   - npm install express mongoose art-template express-art-template
4. 创建网站服务器
5. 构建模块化路由
6. 构建博客管理页面模板





## 2. 登录

---

包含一般正常的登录逻辑，即账号密码验证





### 2.1 登录功能实现步骤

1. 创建用户集合，初始化用户
   1. 连接数据库
   2. 创建用户集合
   3. 初始化用户
2. 为登录表单设置请求地址，请求方式以及表单项name属性
3. 当用户点击登录按钮时，客户端验证用户是否填写了登录表单
4. 如果其中一项没有输入，阻止表单提交
5. 服务器端接收请求参数，验证用户是否填写了表单
6. 如果其中一项没有输入，为客户端做出响应，阻止程序向下执行
7. 根据邮箱地址查询用户信息
8. 如果用户不存在，为客户端做出响应，阻止程序向下运行
9. 如果用户存在，将用户名和密码进行对比
10. 对比成功，用户登录成功
11. 对比失败，用户登录失败



## 3. 密码加密


在数据库中直接明文存储用户密码是不安全的，一但数据库信息泄露，可能导致恶意登录操作用户账户，所以需要对数据库的用户密码进行加密。



### 3.1 密码加密 bcrypt

哈希加密是单程加密方式：123 => abcd

但是这种方式仍有方法破解，攻击者可以通过创建账号密码拿到加密字符，通过字符对比获取到的其他用户数据库存储加密明文密码进行破解。

在加密的密码中加入随机字符串可以增加解密难度。



### 3.2 bcrypt 环境部署

python 2.7

https://www.python.org/downloads/

注意添加环境变量



node-gyp

`npm install node-gyp -g`



windows-build-tool

`npm install --global --production windows-build-tools`



### 3.3 bcrypt 测试

```javascript
const bcrypt = require('bcrypt');

// 异步同步
async function run() {
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    // 加密
    const result = await bcrypt.hash('123456', salt);
    console.log(result);
}

run();
```



```javascript
async function creatUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('admin', salt);
    const user = await User.create({
        username : 'QiJieH',
        email : '1279656042@qq.com',
        password : pass,
        role : 'admin',
        state : 0
    });
} 


creatUser();
```

 

### 3.4 密码比对

```javascript
// 方法示例
let isEqual = await bcrypt.compare('明文密码', '加密密码');

// 查询用户信息
let user = await User.findOne({email});
let isVaild = await bcrypt.compare(password, user.password)
if(user && isVaild ) {
    res.send('登录成功');
}else {
    res.status(400).render('./home/error', {msg:'邮箱地址或密码错误'});
}
```





## 4. cookie与session

cookie: 浏览器在电脑硬盘中开辟的一块空间，主要提供服务器存储数据

- cookie中的数据是以域名的形式进行区分
- cookie具有过期时间
- cookie中的数据会随请求被自动发送到服务器端



session: 实际上是一个对象，存储在服务器端的内存中，在session对象中也可以存储多条数据，每一条数据都有一个sesssionid作为唯一标识





### 4.1 c&s环境部署

在node.js中需要借助express-session实现session功能

`npm install express-session`



```javascript
const session = require('express-session');
app.use(session({secret: 'secret key'}));
```



```javascript
// 将用户数据存储到session session会自动将信息存储到客户端
req.session.username = user.username;

// 公开模板信息
req.app.locals.userInfo = user;
```



### 4.2 登录拦截

```javascript
app.use('/admin', (req, res, next) => {
    if(req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    }else{
        next();
    }
})
```



### 4.3 登录注销

```javascript
module.exports = (req, res) => {
    res.clearCookie('connect.sid');
    res.redirect('/admin/login')
};
```





## 5. 新增用户

---



1. 为用户列表新增添加按钮链接
2. 添加一个链接对应的路由，在路由处理函数中渲染新增用户模板
3. 为新增用户表单指定请求地址，请求方式，为表单项添加name属性
4. 增加实现添加用户的功能路由
5. 接收到客户端传递过来的参数
6. 对请求参数格式进行验证
7. 验证当前要注册的邮箱地址是否已经注册过
8. 对密码进行加密处理
9. 将用户信息添加到数据库
10. 重定向到用户列表页面





### 5.1 输入验证 Joi

javascript对象的规则描述和验证器

`npm install joi`

```javascript
const Joi = require('joi');

const schema = {
    username :  Joi.string().required().min(2).max(5).error(new Error('username 未通过')),
    birth    :  Joi.number().min(1900).max(2020)
};

async function run() {
    try{
        await Joi.validate({username:'add',birth: 1999}, schema);
    }catch(e) {
        console.log(e.message);
        return;
    }
    console.log('pass');
}

run();
```



```javascript
const Joi = require('joi');

const schema = {
    username:   Joi.string().required().min(2).max(12).error(new Error('用户名不符合规则')),
    email   :   Joi.string().email(),
    password:   Joi.string().required().regex(/^[a-zA-Z0-9]{6,24}$/).error(new Error('邮箱格式错误')),
    role    :   Joi.string().required().valid('normal','admin').error(new Error('角色值错误')),
    state   :   Joi.number().required().valid(0,1).error(new Error('状态值错误'))

};


module.exports = async (req, res) => {
    try{
        await Joi.validate(req.body, schema);
    }catch(e) {
        res.redirect(`/admin/user-edit?message=${e.message}`);
    }
    res.send(req.body);
}
```



### 5.2 完整实现

```javascript
const Joi = require('joi');
const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

const schema = {
    username:   Joi.string().required().min(2).max(12).error(new Error('用户名不符合规则')),
    email   :   Joi.string().email().error(new Error('邮箱不符合规则')),
    password:   Joi.string().required().regex(/^[a-zA-Z0-9]{6,24}$/).error(new Error('密码不符合规则')),
    role    :   Joi.string().required().valid('normal','admin').error(new Error('角色值错误')),
    state   :   Joi.number().required().valid(0,1).error(new Error('状态值错误'))

};


module.exports = async (req, res) => {
    // 验证表单
    try{
        await Joi.validate(req.body, schema);
    }catch(e) {
        return res.redirect(`/admin/user-edit?message=${e.message}`);
    }
    // 查询账户存在
    let user = await User.findOne({email : req.body.email});
    if(user) {
        return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
    }
    // 加密密码
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    // 添加数据库
    await User.create(req.body);


    res.redirect('/admin/user');
}
```



## 6. 用户列表

---



### 6.1 完整显示



```javascript
{{each users}}
                <tr>
                    <td>{{@$value._id}}</td>
                    <td>{{$value.username}}</td>
                    <td>{{$value.email}}</td>
                    <td>{{$value.role == 'admin' ? '管理员' : '用户'}}</td>
                    <td>{{$value.state == 0 ? '启用' : '禁用'}}</td>
                    <td>
                        <a class="btn btn-default btn-xs" href="user-edit" role="button">
                            <span style="color: #337ab7;" class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                        </a>
                        <a class="btn btn-default btn-xs" href="#" role="button">
                            <span style="color:#d9534f" class="glyphicon glyphicon-floppy-remove" aria-hidden="true"></span>
                        </a>
                    </td>
                </tr>
                {{/each}}
```



### 6.2 分页显示

当数据库中数量非常多时，数据需要分批显示，这时就需要用到数据分页功能



核心要素：

1. 当前页，用户通过点击上一页或下一页产生，客户端通过get参数方式传递到服务器端
2. 总页数，根据总页数判断当前页面是否是最后一页，根据判断结果做响应操作



mongodb限制查询

`limit(2) // 限制查询数量 传入每页数据数量`

`skip() // 跳过查询条目数量 传入每页数据的开始位置`



### 6.3 完整实现

```javascript
res.render('admin/user', {
        users : users,
        page  : page,
        total : total
});



 <!-- Footer page -->
        <nav aria-label="Page navigation" style="text-align: center;">
            <ul class="pagination">
                <li style="display: <%= page-0-1 ? 'inline;' : 'none;' %>">
                    <a href="/admin/user?page=<%=page-1%>" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <% for (var i=1; i<=total; i++){ %>
                    <li><a href="/admin/user?page=<%=i%>">{{i}}</a></li>
                    <%} 
                %>
                <li style="display: <%= page-0+1 > total ? 'none;' : 'inline;' %>">
                    <a href="/admin/user?page=<%=page-0+1%>" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
```



### 6.4 修改用户







## 7.数据分页

mongoose-sex-page

```javascript
const pagination = require('mongoose-sex-page');
pagination(集合构造函数).page(1).size(20).dispkay(8).exec();
```



## 8.mongodb数据库添加账号

1. 以管理员身份运行PowerShell

2. 连接数据库mongo

3. 查看数据库 show dbs

4. 切换到admin数据库 use admin

5. 创建超级管理员账号 db.createUser()

   `db.createUser({user:'root',pwd:'LINKSTART',roles:['root']}`

6. 切换到blog数据 use blog

7. 创建普通账号 db.createUser()

   `db.createUser({user:'blogadmin',pwd:'admin',roles:['readWrite']})`

8. 卸载mongodb服务

   1. 停止服务 net stop mongodb
   2. mongod --remove

9. 创建mongodb服务

   ```powershell
   mongod --logpath="C:\Program Files\MongoDB\Server\4.2\log\mongod.log" --dbpath="C:\Program Files\MongoDB\Server\4.2\data" --install -auth
   ```

   

10. 启动mongodb服务



在项目中使用账号连接数据库

mongoose.connect('mongodb://blogadmin:LINKSTART@localhost:/blog')



## 9.开发环境与生产环境

环境，就是指项目运行的地方，当项目处于开发阶段，项目运行在开放人员的电脑上，项目所处的环境就是开发环境。当项目开发完成以后，将项目发到真实的网站服务器中运行，项目所处的环境就是生产环境。

为什么要区分开发环境与生成环境

因为在不同的环境中，项目的配置是不一样的，需要在项目代码中判断当前项目的运行环境，根据不同的环境应用不同的配置

将当前环境设置进系统变量之中。

```
NODE_ENV = development // production
```



```javascript
if(process.env.NODE_ENV == development){
    // 开发环境
    // app.use(morgan('dev'));
}else{
    // 生产环境
}
```

npm install morgan

`app.use(morgan('dev'));`



## 10.config

允许开发人员将不同运行环境下的应用配置信息抽离到单独的文件中，模块内部会自动判断当前应用的运行环境，并读取对应的配置信息，极大降低了提供应用配置信息的维护成本，避免了当运行环境重复多次切换时，手动到代码中修改配置信息

1. npm install config

2. 新建 config 文件

3. /config/ 新建 default.json, development.json, production.json

4. require导入

5. 使用模块内部提供的get方法获取配置信息



将敏感信息存储在环境变量中



## 11.文章评论

1. 创建评论集合
2. 判断用户是否登录，如果用户登录，再允许用户提交评论表单
3. 在服务器端创建文章评论功能对应路由
4. 在路由请求处理函数中接收客户端传递过来的评论信息
5. 将评论信息存储在评论集合中
6. 将页面重定向到文章详情页面