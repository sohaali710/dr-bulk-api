const express = require('express')
const router = express.Router()
const { addAboutValidator } = require('../utils/validators/aboutValidator')
const { addAbout, getAbout } = require('../controllers/aboutController')
const AdminAuth = require('../middlewares/adminAuth')

router
    .route('/')
    .post(addAboutValidator, AdminAuth, addAbout)
    .get(getAbout)

module.exports = router