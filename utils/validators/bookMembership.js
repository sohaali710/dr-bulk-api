const { check } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

exports.bookMembershipValidator = [
    check('membershipId').isMongoId().withMessage('Invalid id format')
        .notEmpty().withMessage('membership is required'),
    check('startsAt').default(new Date())
        .isISO8601().toDate().withMessage('startsAt should be Date format'),
    check('paymentMethod').notEmpty().withMessage('paymentMethod is required'),
    validatorMiddleware
]

exports.getBookingByIdValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware
]