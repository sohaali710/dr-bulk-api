const express = require('express')
const router = express.Router()
const { getCategories, createCategory, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/categoryController')
const { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator, getCategoryValidator } = require('../utils/validators/categoryValidator')
const AdminAuth = require('../middlewares/adminAuth')

router
    .route('/')
    .get(getCategories)
    .post(createCategoryValidator, AdminAuth, createCategory)

router.route('/:id')
    .get(getCategoryValidator, getCategoryById)
    .put(updateCategoryValidator, AdminAuth, updateCategoryById)
    .delete(deleteCategoryValidator, AdminAuth, deleteCategoryById)

module.exports = router