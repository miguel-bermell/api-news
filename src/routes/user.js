const express = require('express');

const router = express.Router();
const { validateRequest } = require('../middlewares');

const { AllUsers, Signup, getById } = require('../controllers/user');
const { USER } = require('../enums/validations');

router.get('/', AllUsers);

router.get('/:id', getById);

router.post('/', validateRequest(USER), Signup);

module.exports = router;
