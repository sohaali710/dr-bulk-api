const express = require('express')
const router = express.Router()
const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator, removeProductImgValidator, addProductImgValidator } = require('../utils/validators/productValidator')
const { getProducts, createProduct, getProductById, updateProductById, deleteProductById, removeProductImg, addProductImg } = require('../controllers/productController')
const AdminAuth = require('../middlewares/adminAuth')
const EditorAdminAuth = require('../middlewares/editorAdminAuth')

router
    .route('/')
    .get(getProducts)
    .post(createProductValidator, AdminAuth, createProduct)

router.route('/:id')
    .get(getProductValidator, getProductById)
    .put(updateProductValidator, EditorAdminAuth, updateProductById)
    .delete(deleteProductValidator, AdminAuth, deleteProductById)

router.post('/add-img/:id', addProductImgValidator, AdminAuth, addProductImg)
router.delete('/remove-img/:id', removeProductImgValidator, AdminAuth, removeProductImg)

module.exports = router