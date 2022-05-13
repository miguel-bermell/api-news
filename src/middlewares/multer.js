const { multer, storage, fileFilter } = require('../config/multer')

const upload = multer({ storage, fileFilter })

exports.upload = upload.single('image')
