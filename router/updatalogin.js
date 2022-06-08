//引入用户集合用于验证
const { User } = require('../model/user')

module.exports = async (req, res) => {
  const user = await User.findOne({ name: req.query.name })
  let login
  if (user) {
    login = true
    return res.send(JSON.stringify({ login, user }))
  } else { 
    login = false
    res.send(req.query)
  }
}
