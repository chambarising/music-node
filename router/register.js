//引入用户集合用于验证
const { User, validateUser } = require('../model/user')

module.exports = async (req, res) => {
  //验证用户信息是否符合格式
  try {
    await validateUser(req.query)
  } catch (error) { 
    return res.send(JSON.stringify({ msg: error.message }))
  }
    //通过findone方法进行查询，若有返回值则说明用户存在
  const user = await User.findOne({ email: req.query.email })
  const username = await User.findOne({ name: req.query.name })
  if (user) {
    return res.send(JSON.stringify({ msg: '登录邮箱已存在！' }))
  } else if (username) {
    return res.send(JSON.stringify({ msg: '名称已存在！' }))
  }else { 
    User.create(req.query)
    let newuser = {}
    newuser.email = req.query.email
    newuser.password = req.query.password
    return res.send(JSON.stringify({ msg:true,newuser}))
  }
}
