const express = require('express')
const router = express.Router()
const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator, removeProductImgValidator, addProductImgValidator } = require('../utils/validators/productValidator')
const { getProducts, createProduct, getProductById, updateProductById, deleteProductById, removeProductImg, addProductImg } = require('../controllers/productController')
const AdminAuth = require('../middlewares/adminAuth')
const upload = require('../middlewares/fileUpload')

router
    .route('/')
    .get(getProducts)
    .post(createProductValidator, AdminAuth, upload.array('images'), createProduct)

router.route('/:id')
    .get(getProductValidator, getProductById)
    .put(updateProductValidator, AdminAuth, updateProductById)
    .delete(deleteProductValidator, AdminAuth, deleteProductById)

router.post('/add-img/:id', addProductImgValidator, AdminAuth, upload.array('images'), addProductImg)
router.delete('/remove-img/:id', removeProductImgValidator, AdminAuth, removeProductImg)

module.exports = router