const express = require('express')
const router = express.Router()
const { addEatSmartValidator, getEatSmartValidator, updateEatSmartValidator, deleteEatSmartValidator } = require('../utils/validators/eatSmart')
const { getEatSmarts, getVIPEatSmarts, addEatSmart, getEatSmartById, updateEatSmartById, deleteEatSmartById } = require('../controllers/eatSmart')
const AdminAuth = require('../middlewares/adminAuth')

router
    .route('/')
    .get(getEatSmarts)
    .post(addEatSmartValidator, AdminAuth, addEatSmart)

router.route('/:id')
    .get(getEatSmartValidator, getEatSmartById)
    .put(updateEatSmartValidator, AdminAuth, updateEatSmartById)
    .delete(deleteEatSmartValidator, AdminAuth, deleteEatSmartById)

module.exports = router