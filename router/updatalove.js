//引入用户集合用于验证
const { User } = require('../model/user')

module.exports = async (req, res) => {
  const user = await User.findOne({ name: req.query.name })
  if (user) { 
    await User.updateOne({ name: req.query.name }, {
      loveMusic:req.query.musicid
    })
  }
}
