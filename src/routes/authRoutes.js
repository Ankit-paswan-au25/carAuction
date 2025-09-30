const express = require('express')
const router = express.Router()

//controllers
const auth = require('../controllers/authController/index')


router.post('/register', auth.register)
router.post('/login', auth.login)
module.exports = router