const { check } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const Category = require('../../models/categoryModel')

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

exports.createProductValidator = [
    check('title')
        .notEmpty().withMessage('Product title is required')
        .isLength({ min: 3 }).withMessage('Too short product title')
        .isLength({ max: 32 }).withMessage('Too long product title')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('category')
        .notEmpty().withMessage('Product must be belong to category')
        .isMongoId().withMessage('Invalid id format')
        .custom(categoryId =>
            Category.findById(categoryId).then(category => {
                if (!category) {
                    return Promise.reject(new Error(`No category for this id ${categoryId}`))
                }
            })
        ),
    check('description')
        .notEmpty().withMessage('Product description is required')
        .isLength({ min: 10 }).withMessage('Too short product description'),
    check('price')
        .notEmpty().withMessage('Product price is required')
        .isNumeric().withMessage('Price should be a number')
        .isLength({ min: 1 }).withMessage('Price should be positive number'),
    check('points')
        .optional(),
    // check('imageCover')
    //     .notEmpty().withMessage('Product cover image is required'),
    check('images')
        .optional()
        .isArray().withMessage('Images should be array of string'),
    validatorMiddleware
]

exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleware
]

exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid product id format'),
    check('title')
        .custom((val, { req }) => {
            if (val) {
                req.body.slug = slugify(val)
            }
            return true
        }),
    validatorMiddleware
]

exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleware
]

exports.addProductImgValidator = [
    check('id').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleware
]

exports.removeProductImgValidator = [
    check('id').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleware
]