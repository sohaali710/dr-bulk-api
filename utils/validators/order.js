const { check } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

exports.createOrderValidator = [
    check('items')
        .isArray().withMessage('items must be an array'),
    check('items.*.productId')
        .isMongoId().withMessage('Invalid id format')
        .notEmpty().withMessage('productId is required'),
    check('items.*.quantity')
        .notEmpty().withMessage('quantity is required')
        .isNumeric({ min: 0 }).withMessage('quantity should be positive number'),
    check('bill')
        .notEmpty().withMessage('bill is required')
        .isNumeric({ min: 0 }).withMessage('bill should be positive number'),
    check('status')
        .optional()
        .default('pending')
        .isIn(['pending', 'accepted', 'canceled']).withMessage("Type should be one of these options: pending, accepted or canceled"),
    check('paymentMethod').notEmpty().withMessage('paymentMethod is required'),
    validatorMiddleware
]

exports.getOrderByIdValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware
]