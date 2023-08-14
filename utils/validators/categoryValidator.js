const { check } = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

exports.createCategoryValidator = [
    check('name')
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3 }).withMessage('Too short category name')
        .isLength({ max: 32 }).withMessage('Too long category name'),
    validatorMiddleware
]

// get category by id
exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
]

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
]

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
]