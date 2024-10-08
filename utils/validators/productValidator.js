const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateProduct:
 *      type: object
 *      required:
 *        - title
 *        - category
 *        - description
 *        - price
 *        - images
 *      properties:
 *        title:
 *          type: object
 *          properties:
 *            en:
 *              type: string
 *              default: Product name
 *            ar:
 *              type: string
 *              default: اسم المنتج
 *        category:
 *          type: string
 *          default: 64d5fa04a69d722aace91386
 *        description:
 *          type: object
 *          properties:
 *            en:
 *              type: string
 *              default: Product description
 *            ar:
 *              type: string
 *              default: وصف المنتج
 *        price:
 *          type: number
 *          default: 100
 *        images:
 *          type: array
 *          default: ["image-1.jpg", "image-2.jpg" ]
 *    CreateProductResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *             ar:
 *               type: string
 *         category:
 *           type: string
 *         description:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *             ar:
 *               type: string
 *         slug:
 *           type: string
 *         price:
 *           type: number
 *         points:
 *           type: number
 *         images:
 *           type: array
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         __v:
 *           type: number
 *
 */
exports.createProductValidator = [
  check("title").isObject().withMessage("Product title must be an object"),
  check("title.en")
    .notEmpty()
    .withMessage("En Product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short En product title")
    .isLength({ max: 32 })
    .withMessage("Too long En product title")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("title.ar")
    .notEmpty()
    .withMessage("Ar Product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short Ar product title")
    .isLength({ max: 32 })
    .withMessage("Too long Ar product title"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to category")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id ${categoryId}`)
          );
        }
      })
    ),
  check("description")
    .isObject()
    .withMessage("Product description must be an object"),
  check("description.en")
    .notEmpty()
    .withMessage("En description is required")
    .isLength({ min: 10 })
    .withMessage("Too short En description"),
  check("description.ar")
    .notEmpty()
    .withMessage("Ar description is required")
    .isLength({ min: 10 })
    .withMessage("Too short Ar description"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Price should be a number")
    .isLength({ min: 1 })
    .withMessage("Price should be positive number"),
  check("points")
    .optional()
    .isNumeric()
    .withMessage("Points should be a number"),
  // check('imageCover')
  //     .notEmpty().withMessage('Product cover image is required'),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images should be array of string"),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  check("title").isObject().withMessage("Product title must be an object"),
  check("title.en")
    .notEmpty()
    .withMessage("En Product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short En product title")
    .isLength({ max: 32 })
    .withMessage("Too long En product title")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("title.ar")
    .notEmpty()
    .withMessage("Ar Product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short Ar product title")
    .isLength({ max: 32 })
    .withMessage("Too long Ar product title"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to category")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id ${categoryId}`)
          );
        }
      })
    ),
  check("description")
    .isObject()
    .withMessage("Product description must be an object"),
  check("description.en")
    .notEmpty()
    .withMessage("En description is required")
    .isLength({ min: 10 })
    .withMessage("Too short En description"),
  check("description.ar")
    .notEmpty()
    .withMessage("Ar description is required")
    .isLength({ min: 10 })
    .withMessage("Too short Ar description"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Price should be a number")
    .isLength({ min: 1 })
    .withMessage("Price should be positive number"),
  check("points")
    .optional()
    .isNumeric()
    .withMessage("Points should be a number"),

  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.addProductImgValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.removeProductImgValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

/** Editor */
exports.editorUpdateValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  check("title").isObject().withMessage("Product title must be an object"),
  check("title.en")
    .notEmpty()
    .withMessage("En Product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short En product title")
    .isLength({ max: 32 })
    .withMessage("Too long En product title")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("title.ar")
    .notEmpty()
    .withMessage("Ar Product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short Ar product title")
    .isLength({ max: 32 })
    .withMessage("Too long Ar product title"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to category")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id ${categoryId}`)
          );
        }
      })
    ),
  check("description")
    .isObject()
    .withMessage("Product description must be an object"),
  check("description.en")
    .notEmpty()
    .withMessage("En description is required")
    .isLength({ min: 10 })
    .withMessage("Too short En description"),
  check("description.ar")
    .notEmpty()
    .withMessage("Ar description is required")
    .isLength({ min: 10 })
    .withMessage("Too short Ar description"),
  check("points")
    .optional()
    .isNumeric()
    .withMessage("Points should be a number"),

  validatorMiddleware,
];
