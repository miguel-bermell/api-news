const express = require('express');

const health = require('./health');
const news = require('./news');
const user = require('./user');

const router = express.Router();

router.use('/', health);
router.use('/news', news);
router.use('/user', user);

module.exports = router;
