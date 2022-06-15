const express = require('express')
const router = express.Router()

const { AllUsers, Signup } = require('../controllers/user')

router.get('/', AllUsers)

router.post('/', Signup)

module.exports = router
