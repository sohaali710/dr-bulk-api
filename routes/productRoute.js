const express = require('express')
const router = express.Router()
const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator, removeProductImgValidator, addProductImgValidator, editorUpdateValidator } = require('../utils/validators/productValidator')
const { getProducts, createProduct, getProductById, updateProductById, deleteProductById, removeProductImg, addProductImg, editorUpdateProduct } = require('../controllers/productController')
const AdminAuth = require('../middlewares/adminAuth')
const EditorAuth = require('../middlewares/editorAuth')
const EditorAdminAuth = require('../middlewares/editorAdminAuth')

router
    .route('/')
    .get(getProducts)
    .post(createProductValidator, AdminAuth, createProduct)

router.route('/:id')
    .get(getProductValidator, getProductById)
    .put(updateProductValidator, EditorAdminAuth, updateProductById)
    .delete(deleteProductValidator, AdminAuth, deleteProductById)

router.route('/editor/:id')
    .put(editorUpdateValidator, EditorAuth, editorUpdateProduct)

router.post('/add-img/:id', addProductImgValidator, AdminAuth, addProductImg)
router.delete('/remove-img/:id', removeProductImgValidator, AdminAuth, removeProductImg)

module.exports = router