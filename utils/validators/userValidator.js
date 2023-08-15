const { check } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const User = require('../../models/userModel')

const passwordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;

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
        .matches(passwordRegex, "i").withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8'),
    check('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['M', 'F']).withMessage('Gender should equal to M (for male) or F (for female)'),
    check('image')
        .optional(),
    validatorMiddleware
]

exports.loginValidator = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail()
        .custom(val =>
            User.findOne({ email: val }).then(user => {
                if (!user) {
                    return Promise.reject(new Error("Incorrect email or password"))
                }
            })
        ),
    check('password')
        .notEmpty().withMessage('Password is required')
        // TODO check this on postman
        .custom((val, { req }) => {
            const user = User.findOne({ email: val }).then(user => {
                const isMatch = await bcrypt.compare(req.body.password, user.password)
                if (!isMatch) {
                    return Promise.reject(new Error("Incorrect email or password"))
                }
            })

            return user
        }
        ),
    validatorMiddleware
]