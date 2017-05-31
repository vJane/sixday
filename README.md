# sixday

> A Vue.js project

## 简介
这是一款个人日记单页面应用，分为日记列表、日记发布、动态地图、个人中心、日记详情、天气、日历7个页面，8个组件，19个功能点。

## 技术栈
vue2 + vue-router + webpack + weixin + axios + nodejs + postgresql
   

## 安装运行

``` bash
# install
git clone git@github.com:VivianWalker/sixday.git

cd sixday

npm install

# serve with hot reload at localhost:8080
npm run dev
```

# 目标功能
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

## 尚未完成任务
- [ ] tabbar点击颜色变化
- [ ] 微信分享测试
- [ ] 失败交互统一弹窗
- [ ] 打包&&入口
- [ ] 统一弹窗交互
- [ ] 图片上传绝对路径不可用
- [ ] store的传值
- [ ] token全局缓存
- [ ] 密码加盐
- [ ] 后台监测系统

## 总结
从2016年11月开始构思这个项目。先完成了功能需求分析和设计图。当时工作接触到了微信接口、地图接口、vue这些技术，但从未真正意义上从底层开始实现。机缘巧合在第二份工作时的面试题是地图，完成了地图接口后开始对做项目有了信心。在工作中开始学习构建项目，上传服务器。在2017年5月搭建好项目环境，从零开始完成一个个接口调用，尤其是微信的签名，开始以为我没有能力做出来，居然克服了一个个技术难题。然后回头再看，发现自己做的没有深度。不过这是我独自构建的项目，是我全栈开发的起点。
上传图像尝试了多种方法，微信上传，阿里云服务器，七牛云，最后还是存在了本地。
微信因为没有部署到阿里云服务器，无法做测试。

## 截图

### 日记列表页
<img src="https://github.com/VivianWalker/sixday/tree/master/screenshots/1.png" width="365" height="619"/> 

### 日记发布页
<img src="https://github.com/VivianWalker/sixday/tree/master/screenshots/2.png" width="365" height="619"/> 

### 动态地图页
<img src="https://github.com/VivianWalker/sixday/tree/master/screenshots/3.png"/> 

### 个人中心页
<img src="https://github.com/VivianWalker/sixday/tree/master/screenshots/4.png"/> 
<img src="https://github.com/VivianWalker/sixday/tree/master/screenshots/41.png"/> 

### 日记详情页
<img src="https://github.com/VivianWalker/sixday/tree/master/screenshots/21.png"/> 

### 天气页
<img src="https://github.com/VivianWalker/sixday/tree/master/screenshots/12.png"/> 

### 日历页
<img src="https://github.com/VivianWalker/sixday/tree/master/screenshots/11.png"/> 

## 项目布局

``` bash
server/后端服务器
src/components/组件
src/components/views/页面
```
<img src="https://github.com/VivianWalker/sixday/tree/master/screenshots/catalog.png"/> 