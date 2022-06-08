const express = require("express");
const session = require('express-session');
const path = require("path");

const app = express();
app.use(session({
  secret: 'secret key',
  saveUninitialized: false,
  cookie: {
    maxAge:24*60*60*1000
  }
}))
//引入connect文件连接数据库
require("./model/connect");
//配置接收post请求参数
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//开放静态资源文件(默认文件路径)
app.use(express.static(path.join(__dirname, "./public")));
app.all('*', (req, res, next) => { 
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
//注册路由
app.use('/register',require('./router/register'))
//登录路由
app.use('/login', require('./router/login'))
//更新用户喜欢的音乐路由
app.use('/updatalove', require('./router/updatalove'))
//根据数据库更新用户更新状态
app.use('/updatalogin', require('./router/updatalogin'))
//更新用户收藏的歌单路由
app.use('/addmusiclist', require('./router/addmusicListId'))
//图片测试
app.use('/pic',require('./router/test'))
app.listen(3001);
console.log("启动");
