const express = require('express')
const router = express.Router()
const { addAboutValidator } = require('../utils/validators/aboutValidator')
const { addAbout, getAbout } = require('../controllers/aboutController')
const EditorAdminAuth = require('../middlewares/editorAdminAuth')

router
    .route('/')
    .post(addAboutValidator, EditorAdminAuth, addAbout)
    .get(getAbout)

module.exports = router