const User = require('../models/User');

exports.getUsers = async () => await User.find({}).populate('news', {
  user: 0,
});

exports.findUserById = async (id) => await User.findById(id);

exports.findUserByResource = async (resource) => await User.findOne(resource);

exports.createUser = async (user) => await new User(user).save();
