const multer = require('multer')

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, 'src/public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `news-${Date.now()}${file.originalname}`)
  }

})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only images are allowed!'))
  }

  cb(null, true)
}

module.exports = {
  storage,
  fileFilter,
  multer
}
