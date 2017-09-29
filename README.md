## top-editor
开发中，敬请期待...
## 测试文章
## 开发环境和技术栈
操作系统：windows 10 64位
开发工具 ：webstrom sublime
前端：vue.js + vue-router + vuex
后端：node.js + mongodb (采用express框架)
##  特色功能
支持服务端渲染
支持标题动态切换
支持PWA
支持markdown语法，样式采用github风格，代码高亮
支持文章保存为草稿
支持标签和归档功能
## pc端效果图
#### 首页效果图

![](http://images2015.cnblogs.com/blog/1027889/201707/1027889-20170715232612634-975600624.png)

#### 代码高亮效果图
![](http://images2015.cnblogs.com/blog/1027889/201707/1027889-20170715232628150-1848712185.png)

#### 后台发布页面
![](http://images2015.cnblogs.com/blog/1027889/201707/1027889-20170715232637337-699897293.png)

#### 后台文章列表
![](http://images2015.cnblogs.com/blog/1027889/201707/1027889-20170715232710275-1613503487.png)

#### 修改个人信息
![](http://images2015.cnblogs.com/blog/1027889/201707/1027889-20170715232720025-3788839.png)

### 手机端效果图，以chrome浏览器演示
#### 添加到主屏
![](http://images2015.cnblogs.com/blog/1027889/201707/1027889-20170715232738884-694691833.png)

#### 启动效果
![](http://images2015.cnblogs.com/blog/1027889/201707/1027889-20170715232759447-492833846.png)

#### 首页效果
![](http://images2015.cnblogs.com/blog/1027889/201707/1027889-20170715232814650-1434911709.png)

#### 文章页效果

![](http://images2015.cnblogs.com/blog/1027889/201707/1027889-20170716104841425-721292357.png)

更多效果大家可通过线上演示地址查看
## 本地运行项目
1. 安装mongodb并启动
2. 安装git工具
3. 克隆项目到你的本地
4. 修改配置项信息，/server/settings.js，你也可以默认不修改，默认用户名:q，默认密码：q
```
let user = 'q';
let pass = md5('q');
let avatar = 'avatar.jpg';//头像
let intro ='Never too old to learn';
let nickname = 'VueBlog';
module.exports = {
    dbUrl:'mongodb://localhost:27017/vueblog',
    user:user,
    pass:pass,
    avatar:avatar,
    intro:intro,
    nickname:nickname
}
```
5. 打开本地终端，执行`npm run dev `,访问http://localhost:8080
## 结语
关于如何部署到线上和部署https，后面会更新相关教程。此项目我会长期更新，希望能和大家一起学习，共同进步