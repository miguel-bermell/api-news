const userRepository = require('../repositories/user')
const HttpError = require('../utils/httpError')
const { insertUserSchema } = require('../validations/user')
const { VALIDATION_MESSAGES } = require('../utils/constants')

exports.getAllUsers = async () => await userRepository.getUsers()

exports.addNewUser = async ({ email, password, name }) => {
  const validationUser = await insertUserSchema.validateAsync({ email, password, name }, { abortEarly: false })
  const user = await userRepository.findUserByResource({ email })

  if (user) throw new HttpError(409, VALIDATION_MESSAGES.USER_EXIST_ERROR)

  return await userRepository.createUser(validationUser)
}
