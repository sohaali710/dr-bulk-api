const { check } = require('express-validator')
const bcrypt = require('bcryptjs')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const Admin = require('../../models/adminModel')

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

exports.loginValidator = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail()
        .custom(async (val, { req }) => {
            const admin = await Admin.findOne({ email: val })
            if (!admin) {
                return Promise.reject(new Error("Incorrect email or password"))
            }

            const isMatch = await bcrypt.compare(req.body.password, admin.password)
            // const isMatch = req.body.password === admin.password
            if (!isMatch) {
                return Promise.reject(new Error("Incorrect email or password"))
            }
        }),
    check('password')
        .notEmpty().withMessage('Password is required'),
    validatorMiddleware
]

exports.changePasswordValidator = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .custom(async (val, { req }) => {
            const admin = await Admin.findOne({ email: val })
            if (!admin) {
                return Promise.reject(new Error("Incorrect email or password"))
            }

            const isMatch = await bcrypt.compare(req.body.password, admin.password)
            // const isMatch = req.body.password === admin.password
            if (!isMatch) {
                return Promise.reject(new Error("Incorrect email or password"))
            }
        }),
    check('password')
        .notEmpty().withMessage('Password is required'),
    check('newPassword')
        .notEmpty().withMessage('The new password is required')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        }).withMessage('Password should be combination of one uppercase , one lower case, one digit and min 8'),
    validatorMiddleware
]