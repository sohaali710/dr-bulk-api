const express = require('express')
const router = new express.Router()

const AdminAuth = require('../middlewares/adminAuth')
const { login, changePassword } = require('../controllers/adminController')

router.post('/login', login)
router.post('/change-password', AdminAuth, changePassword)

module.exports = router