const express = require('express')
const router = express.Router()
const { getInstructorValidator, addInstructorValidator, updateInstructorValidator, deleteInstructorValidator, removeInstructorImgValidator, addInstructorImgValidator } = require('../utils/validators/instructorValidator')
const { getInstructors, addInstructor, getInstructorById, updateInstructorById, deleteInstructorById } = require('../controllers/instructorController')
const AdminAuth = require('../middlewares/adminAuth')
const EditorAdminAuth = require('../middlewares/editorAdminAuth')

router
    .route('/')
    .get(getInstructors)
    .post(addInstructorValidator, AdminAuth, addInstructor)

router.route('/:id')
    .get(getInstructorValidator, getInstructorById)
    .put(updateInstructorValidator, EditorAdminAuth, updateInstructorById)
    .delete(deleteInstructorValidator, AdminAuth, deleteInstructorById)

// router.post('/add-img/:id', addInstructorImgValidator, AdminAuth, addInstructorImg)

module.exports = router