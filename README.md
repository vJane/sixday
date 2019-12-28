# sixday

> A Vue.js project

## 简介
这是一款个人日记单页面应用，分为日记列表、日记发布、动态地图、个人中心、日记详情、天气、日历7个页面，8个组件，19个功能点。

## 技术栈
Vue2 + Vue-router + Webpack + weixin + Axios + Node.js + PostgreSQL
   

## 安装运行

``` bash
# install
git clone git@github.com:vJane/sixday.git

cd sixday

npm install

# serve with hot reload at localhost:8080
npm run dev
```

## 目标功能
- [x] 展示当地地点，天气
- [x] 上传图片
- [x] 微信qq分享
- [x] 发表日记
- [x] 日记详情
- [x] 日记列表
- [x] 日记筛选
- [x] 日记删除
- [x] 照相
- [x] 折线地图展示
- [x] 自动生成行走轨迹
- [x] 登录注册
- [x] 上传头像
- [x] 个人资料展示
- [x] 个人资料修改
- [x] 退出账号
- [x] 天气页面
- [x] 日历页面
- [x] 微信签名
- [ ] 微信分享测试
- [ ] 失败交互统一弹窗

## 总结
从大三开始构思，先完成了功能需求分析和设计图。当时工作接触到了微信接口、地图接口、vue这些技术，但从未真正意义上从底层开始实现，完成了地图接口后开始对做项目有了信心。在工作中开始学习构建项目，上传服务器，搭建好项目环境，完成接口调用。

## 截图

### 日记列表页
<img src="https://github.com/vJane/sixday/blob/master/screenshots/1.png" width="365" height="619"/> 

### 日记发布页
<img src="https://github.com/vJane/sixday/blob/master/screenshots/2.png" width="365" height="619"/> 

### 动态地图页
<img src="https://github.com/vJane/sixday/blob/master/screenshots/3.png" width="365" height="619"/> 

### 个人中心页
<img src="https://github.com/vJane/sixday/blob/master/screenshots/4.png" width="365" height="619"/> 
<img src="https://github.com/vJane/sixday/blob/master/screenshots/41.png" width="365" height="619"/> 

### 日记详情页
<img src="https://github.com/vJane/sixday/blob/master/screenshots/21.png" width="365" height="619"/> 

### 天气页
<img src="https://github.com/vJane/sixday/blob/master/screenshots/12.png" width="365" height="619"/> 

### 日历页
<img src="https://github.com/vJane/sixday/blob/master/screenshots/11.png" width="365" height="619"/> 

## 项目布局

```
.
sixday/
├── README.md                     // 说明文件
├── build                         // 打包文件
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.prod.conf.js
│   └── webpack.test.conf.js
├── config                         // 配置文件
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── eslintignore
├── eslintrc.js
├── index.html                     // 入口html文件
├── main.js
├── package.json
├── screenshots                    // 屏幕截图
├── server                         // node服务器
│   ├── api.js
│   ├── app.js
│   ├── configs
│   │   └── db.js
│   ├── controls
│   │   ├── diary.js
│   │   ├── file.js
│   │   ├── map.js
│   │   ├── qiniu.js
│   │   ├── user.js
│   │   └── weixin.js
│   ├── package.json
│   ├── routes
│   │   └── router.js
│   └── sql
│       ├── func.js
│       └── sixday.sql
├── src
│   ├── App.vue
│   ├── assets
│   ├── components                    // 公共组件
│   │   ├── Amap.vue
│   │   ├── HeaderBar2.vue
│   │   ├── Hello.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   ├── TabBar.vue
│   │   ├── UserModify.vue
│   │   └── Weather.vue
│   ├── main.js
│   ├── public
│   │   └── func.js
│   ├── router
│   │   └── index.js
│   ├── views                         // 页面文件
│   │   ├── Calendar.vue
│   │   ├── Details.vue
│   │   ├── Index.vue
│   │   ├── Lists.vue
│   │   ├── Map.vue
│   │   ├── Personal.vue
│   │   └── WeatherPage.vue
│   └── vuex                           // vuex
│       └── store.js
.

18 directories, 115 files
```
