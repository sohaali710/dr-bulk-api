const express = require('express')
const router = express.Router()
const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator } = require('../utils/validators/productValidator')
const { getProducts, createProduct, getProductById, updateProductById, deleteProductById } = require('../controllers/productController')
const AdminAuth = require('../middlewares/adminAuth')

router
    .route('/')
    .get(getProducts)
    .post(createProductValidator, AdminAuth, createProduct)

router.route('/:id')
    .get(getProductValidator, getProductById)
    .put(updateProductValidator, AdminAuth, updateProductById)
    .delete(deleteProductValidator, AdminAuth, deleteProductById)

module.exports = router