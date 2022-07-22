const HttpError = require('../utils/httpError');
const Validations = require('../validations');

exports.validateRequest = (schema) => async (req, _, next) => {
  if (!Object.getOwnPropertyDescriptor(Validations, schema)) {
    throw new Error(`${schema} validator does not exist`);
  }

  const options = {
    abortEarly: false,
  };
  try {
    const validated = await Validations[schema].validateAsync(req.body, options);
    req.body = validated;
    next();
  } catch (error) {
    next(new HttpError(422, error.message));
  }
};
