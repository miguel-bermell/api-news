const userService = require('../services/user');
const { success } = require('../utils/apiResponse');

exports.AllUsers = async (req, res, next) => {
  try {
    const results = await userService.getAllUsers();
    res.status(200).json(success('All users loaded successfully', results, res.statusCode));
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await userService.getById(id);
    res.status(200).json(success('User loaded successfully', results, res.statusCode));
  } catch (error) {
    next(error);
  }
};

exports.Signup = async (req, res, next) => {
  try {
    const newUser = await userService.addNewUser(req.body);
    res.status(200).json(success('User created successfully', newUser, res.statusCode));
  } catch (error) {
    next(error);
  }
};
