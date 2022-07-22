const { failure } = require('../utils/apiResponse');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, _next) => {
  const status = error.statusCode ?? 500;
  if (error.name === 'CastError') {
    return res.status(400).json(failure('Invalid ID', res.statusCode));
  }
  res.status(status).json(failure(error.message, res.statusCode));
};

module.exports = errorHandler;
