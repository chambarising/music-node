const mongoose = require("mongoose");

//连接数据库 localhost:27017(这里是需要的端口号，默认27017可以省略)/music"
mongoose
  .connect("mongodb://localhost/music")
  .then(() => {
    console.log("连接成功");
  })
  .catch((err) => {
    console.log("连接失败");
  });
