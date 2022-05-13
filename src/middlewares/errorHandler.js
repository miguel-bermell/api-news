const { failure } = require('../utils/apiResponse')

const errorHandler = (error, req, res, next) => {
  const status = error.statusCode ?? 500
  if (error.name === 'CastError') {
    return res.status(400).json(failure('Invalid ID', res.statusCode))
  }
  res.status(status).json(failure(error.message, res.statusCode))
}

module.exports = errorHandler
