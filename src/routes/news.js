const express = require('express');

const router = express.Router();
const { upload } = require('../middlewares');
const {
  AllNews,
  FindNewsById,
  AddNews,
  ArchiveNews,
  DeleteNews,
  UpdateNews,
} = require('../controllers/news');
const { validateRequest } = require('../middlewares');
const { NEWS } = require('../enums/validations');

router.get('/', AllNews);

router.get('/:id', FindNewsById);

router.post('/', upload, validateRequest(NEWS), AddNews);

router.post('/archive/:id', ArchiveNews);

router.put('/:id', UpdateNews);

router.delete('/:id', DeleteNews);

module.exports = router;
