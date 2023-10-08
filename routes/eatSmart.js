const express = require('express')
const router = express.Router()
const { addEatSmartValidator, getEatSmartValidator, updateEatSmartValidator, deleteEatSmartValidator, editorUpdateEatSmartValidator } = require('../utils/validators/eatSmart')
const { getEatSmarts, getVIPEatSmarts, addEatSmart, getEatSmartById, updateEatSmartById, deleteEatSmartById, editorUpdateEatSmart } = require('../controllers/eatSmart')
const AdminAuth = require('../middlewares/adminAuth')
const EditorAuth = require('../middlewares/editorAuth')
const EditorAdminAuth = require('../middlewares/editorAdminAuth')

router
    .route('/')
    .get(getEatSmarts)
    .post(addEatSmartValidator, AdminAuth, addEatSmart)

router.route('/:id')
    .get(getEatSmartValidator, getEatSmartById)
    .put(updateEatSmartValidator, EditorAdminAuth, updateEatSmartById)
    .put(editorUpdateEatSmartValidator, EditorAuth, editorUpdateEatSmart)
    .delete(deleteEatSmartValidator, AdminAuth, deleteEatSmartById)

router.route('/editor/:id')
    .put(editorUpdateEatSmartValidator, EditorAuth, editorUpdateEatSmart)

module.exports = router