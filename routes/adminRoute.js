const express = require('express')
const router = new express.Router()
const AdminAuth = require('../middlewares/adminAuth')
const EditorAuth = require('../middlewares/editorAuth')
const { adminLogin, changePassword } = require('../controllers/adminController')
const { loginValidator, changePasswordValidator } = require('../utils/validators/adminValidator')

router.post('/login', loginValidator, adminLogin)
router.post('/change-password', changePasswordValidator, AdminAuth, changePassword)

module.exports = router