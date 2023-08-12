const express = require('express')
const router = new express.Router()
// const Auth = require('../middlewares/auth')
const { signup, login, logout, logoutFromAllSessions, getProfile, updateProfile } = require('../controllers/userController')


router.post('/signup', signup)
router.post('/login', login)


module.exports = router