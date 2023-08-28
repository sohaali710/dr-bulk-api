const { check } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

exports.createCategoryValidator = [
    check('name')
        .notEmpty().withMessage('Category name is required')
        .isObject().withMessage('Category name must be an object'),
    check('name.en')
        .notEmpty().withMessage("En category name is required")
        .isLength({ min: 3 }).withMessage('En category must be unique')
        .isLength({ max: 32 }).withMessage('Too short en category name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('name.ar')
        .notEmpty().withMessage("Ar Category name is required")
        .isLength({ min: 3 }).withMessage('Ar Category must be unique')
        .isLength({ max: 32 }).withMessage('Too short ar category name'),
    validatorMiddleware
]

// get category by id
exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
]

exports.updateCategoryValidator = [
    check('id')
        .isMongoId().withMessage('Invalid category id format'),
    check('name')
        .notEmpty().withMessage('Category name is required')
        .isObject().withMessage('Category name must be an object'),
    check('name.en')
        .notEmpty().withMessage("En category name is required")
        .isLength({ min: 3 }).withMessage('En category must be unique')
        .isLength({ max: 32 }).withMessage('Too short en category name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('name.ar')
        .notEmpty().withMessage("Ar Category name is required")
        .isLength({ min: 3 }).withMessage('Ar Category must be unique')
        .isLength({ max: 32 }).withMessage('Too short ar category name'),
    validatorMiddleware
]

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
]