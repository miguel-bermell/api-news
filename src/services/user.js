const userRepository = require('../repositories/user');
const HttpError = require('../utils/httpError');
const { VALIDATION_MESSAGES } = require('../utils/constants');

exports.getAllUsers = async () => await userRepository.getUsers();

exports.findUserById = async (id) => {
  const user = await userRepository.findUserByResource({ id });
  if (!user) throw new HttpError(400, VALIDATION_MESSAGES.USER_INVALID_ID);
  return user;
};

exports.addNewUser = async ({ email, password, name }) => {
  const user = await userRepository.findUserByResource({ email });

  if (user) throw new HttpError(409, VALIDATION_MESSAGES.USER_EXIST_ERROR);

  return await userRepository.createUser({ email, password, name });
};
