const errorHandler = require('./errorHandler');
const notFound = require('./notFound');
const { upload } = require('./multer');
const { validateRequest } = require('./validateRequest');

module.exports = {
  errorHandler,
  notFound,
  upload,
  validateRequest,
};
