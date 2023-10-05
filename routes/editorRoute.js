const express = require('express')
const router = new express.Router()
const AdminAuth = require('../middlewares/adminAuth')
const EditorAuth = require('../middlewares/editorAuth')
const { editorLogin, editorChangePassword } = require('../controllers/editorController')
const { loginValidator, changePasswordValidator } = require('../utils/validators/adminValidator')

router.post('/login', loginValidator, editorLogin)
router.post('/change-password', changePasswordValidator, EditorAuth, editorChangePassword)

module.exports = router