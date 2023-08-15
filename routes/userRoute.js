const express = require('express')
const router = new express.Router()
const { signup, login, logout, logoutFromAllSessions, getProfile, updateProfile } = require('../controllers/userController')
const { signupValidator, loginValidator } = require('../utils/validators/userValidator')


router.post('/signup', signupValidator, signup)
router.post('/login', loginValidator, login)


module.exports = router