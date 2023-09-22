const { check } = require('express-validator')
const bcrypt = require('bcryptjs')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const User = require('../../models/userModel')

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

exports.signupValidator = [
    check('name')
        .notEmpty().withMessage('User name is required')
        .isLength({ min: 2 }).withMessage('Too short user name'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email')
        .custom(val =>
            User.findOne({ email: val }).then(user => {
                if (user) {
                    return Promise.reject(new Error("This user email is already signed in"))
                }
            })
        ),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        }).withMessage('Password should be combination of one uppercase , one lower case, one digit and min 8'),
    check('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['M', 'F']).withMessage('Gender should equal to M (for male) or F (for female)'),
    check('phoneNumber')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Please enter a valid phone number.'),
    check('image')
        .optional(),
    validatorMiddleware
]

exports.loginValidator = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail()
        .custom(async (val, { req }) => {
            const user = await User.findOne({ email: val })
            if (!user) {
                return Promise.reject(new Error("Incorrect email or password"))
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) {
                return Promise.reject(new Error("Incorrect email or password"))
            }
        }),
    check('password')
        .notEmpty().withMessage('Password is required'),
    validatorMiddleware
]

exports.verifyEmailCodeValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    check('code').isNumeric().withMessage('code should be a number'),
    validatorMiddleware
]