const { check } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

exports.bookEatSmartValidator = [
    check('eatSmartId').isMongoId().withMessage('Invalid id format')
        .notEmpty().withMessage('eatSmartId is required'),
    check('paymentMethod').notEmpty().withMessage('paymentMethod is required'),
    validatorMiddleware
]

exports.getBookingByIdValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware
]