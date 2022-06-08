//引入用户集合用于验证
const { User } = require('../model/user')

module.exports = async (req, res) => { 
  const user = await User.findOne({ email: req.query.email })
  if (user) { 
    if (user.password == req.query.password) {
      return res.send(JSON.stringify({ msg: 'welcome', user }))
    } else { 
      return res.send(JSON.stringify({msg:'邮箱或密码有误！'}))
    }
  } else { 
    return res.send(JSON.stringify({msg:'邮箱或密码有误！'}))
  }
}
