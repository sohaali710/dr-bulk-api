const express = require('express')
const router = express.Router()
const { getCategories, createCategory, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/categoryController')
const AdminAuth = require('../middlewares/adminAuth')

router
    .route('/')
    .get(getCategories)
    .post(AdminAuth, createCategory)

router.route('/:id')
    .get(getCategoryById)
    .put(AdminAuth, updateCategoryById)
    .delete(AdminAuth, deleteCategoryById)

module.exports = router