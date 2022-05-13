const express = require('express')
const router = express.Router()
const { HealthStatus } = require('../controllers/health')

router.get('/', HealthStatus)
module.exports = router
