const express = require("express");
const router = express.Router();
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
  removeProductImgValidator,
  addProductImgValidator,
  editorUpdateValidator,
} = require("../utils/validators/productValidator");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  removeProductImg,
  addProductImg,
  editorUpdateProduct,
} = require("../controllers/productController");
const AdminAuth = require("../middlewares/adminAuth");
const EditorAuth = require("../middlewares/editorAuth");
const EditorAdminAuth = require("../middlewares/editorAdminAuth");

/**
 * @swagger
 * /products:
 *  post:
 *    summary: Create product
 *    tags:
 *      - Products
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateProduct'
 *    responses:
 *      201:
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateProductResponse'
 *      400:
 *        description: Images required. Please upload at least one image.
 */
router.post("/", createProductValidator, AdminAuth, createProduct);

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Get all products
 *    tags:
 *      - Products
 *    responses:
 *      200:
 *        description: Products fetched successfully
 */
router.route("/").get(getProducts);

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    summary: Update product by id
 *    tags:
 *      - Products
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product id
 *        example: 66d0698274ce90ad6b88718a
 *    requestBody:
 *      required: true
 *
 *    responses:
 *      200:
 *        description: Product updated successfully
 *
 */
router.put("/:id", updateProductValidator, EditorAdminAuth, updateProductById);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    summary: Get product by id
 *    tags:
 *      - Products
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product id
 *        example: 66d0698274ce90ad6b88718a
 *    responses:
 *      200:
 *        description: Product fetched successfully
 *      404:
 *        description: Product not found
 */
router.get("/:id", getProductValidator, getProductById);

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    summary: Delete product by id
 *    tags:
 *      - Products
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product id
 *        example: 66d0681519dd3610f8d5a478
 *    responses:
 *      200:
 *        description: Product deleted successfully
 *      404:
 *        description: Product not found
 *      401:
 *        description: Unauthorized
 */
router.delete("/:id", deleteProductValidator, AdminAuth, deleteProductById);

router
  .route("/editor/:id")
  .put(editorUpdateValidator, EditorAuth, editorUpdateProduct);

router.post("/add-img/:id", addProductImgValidator, AdminAuth, addProductImg);
router.delete(
  "/remove-img/:id",
  removeProductImgValidator,
  AdminAuth,
  removeProductImg
);

module.exports = router;
