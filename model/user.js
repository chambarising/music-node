const mongoose = require("mongoose");
//引入joi模块，joi模块用户验证信息是否按规范填写
const joi = require('joi')

//创建用户集合
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxlength: 20,
    trim: true, 
  },
  email: {
    type: String,
    //保证邮箱的唯一性
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  //个人简介
  bid: {
    type: String,
    default:null
  },
  //喜欢的音乐id
  loveMusic: {
    type: String,
    default:null
  },
  //收藏歌单id
  musicListId: {
    type: String,
    default:null
  }
})
//创建集合
const User = mongoose.model("User", UserSchema);

//创建joi验证规则方法
const validateUser = async (user) => {
  const schema = {
    //joi.string为指定为字符串型
    name: joi.string().min(2).max(8).required().error(new Error('用户名填写有误，最少2个字符，最多8个字符！')),
    email: joi.string().email().error(new Error('邮箱格式有误，请填写正确的邮箱！')),
    password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required().error(new Error('密码格式有误,请输入至少6位有效字母或数字！')),
    //joi.valid为设置合法值
  }
  //实施验证，第一个参数为需要验证的对象，第二个为验证的规则
  await joi.validate(user, schema)
}

//将User集合导出，给其他文件在添加用户时使用
module.exports = {
  User,
  validateUser
};

