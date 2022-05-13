const errorHandler = require('./errorHandler')
const notFound = require('./notFound')
const { upload } = require('./multer')

module.exports = {
  errorHandler,
  notFound,
  upload
}
