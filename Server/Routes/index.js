const express = require('express')
const router = express.Router()

router.use('/api/v1.0', require('./years.js'))
router.use('/api/v1.0', require('./makes.js'))
router.use('/api/v1.0', require('./models.js'))
router.use('/api/v1.0', require('./model-variations.js'))
router.use('/api/v1.0', require('./fuel-data.js'))

module.exports = router