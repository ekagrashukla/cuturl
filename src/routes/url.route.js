const express = require('express')
const router = express.Router()
const UrlController = require('../controllers/url.controller')

router.post('/short', UrlController.shorturl)
router.get('/:shortid', UrlController.unshorturl)

module.exports = router