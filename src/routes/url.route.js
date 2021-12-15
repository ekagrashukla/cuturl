const express = require('express')
const router = express.Router()
const UrlController = require('../controllers/url.controller')
const AuthController = require('../controllers/auth.controller')
const {authenticate, isPublic} = require('../middleware/authenticate')

router.post('/short', authenticate, UrlController.shorturl)
router.get('/:shortid', isPublic, UrlController.unshorturl)
router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

module.exports = router