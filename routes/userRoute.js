const express = require('express')
const router = new express.Router()
const { signup, verifyEmailCode, login, getAllUsers, getProfile, updateProfile } = require('../controllers/userController')
const { signupValidator, loginValidator, verifyEmailCodeValidator } = require('../utils/validators/userValidator')
const EditorAdminAuth = require('../middlewares/editorAdminAuth')

router.post('/signup', signupValidator, signup)
router.get('/verify-email-code/:code/:id', verifyEmailCodeValidator, verifyEmailCode)
router.post('/login', loginValidator, login)

router.get('/all-users', EditorAdminAuth, getAllUsers)


module.exports = router