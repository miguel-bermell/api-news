const User = require('../models/User')

exports.getUsers = async () => await User.find({}).populate('news', {
  user: 0
})

exports.findUserByResource = async (resource) => {
  return await User.findOne(resource)
}

exports.createUser = async (user) => {
  return await new User(user).save()
}
