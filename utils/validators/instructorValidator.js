const { check } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const Instructor = require('../../models/instructorModel')

exports.addInstructorValidator = [
    check('name')
        .notEmpty().withMessage('Instructor name is required')
        .isLength({ min: 2 }).withMessage('Too short instructor name')
        .custom(val =>
            Instructor.findOne({ name: val }).then(instructor => {
                if (instructor) {
                    return Promise.reject(new Error("This instructor name is added before"))
                }
            })
        )
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('bio')
        .notEmpty().withMessage('Instructor bio is required')
        .isLength({ min: 10 }).withMessage('Too short instructor bio'),
    check('phoneNumber')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Please enter a valid phone number.'),
    // check('image')
    //     .optional(),
    validatorMiddleware
]

exports.getInstructorValidator = [
    check('id').isMongoId().withMessage('Invalid instructor id format'),
    validatorMiddleware
]

exports.updateInstructorValidator = [
    check('id').isMongoId().withMessage('Invalid instructor id format'),
    check('name')
        .custom((val, { req }) => {
            if (val) {
                req.body.slug = slugify(val)
            }
            return true
        }),
    validatorMiddleware
]

exports.deleteInstructorValidator = [
    check('id').isMongoId().withMessage('Invalid instructor id format'),
    validatorMiddleware
]

// exports.addInstructorImgValidator = [
//     check('id').isMongoId().withMessage('Invalid instructor id format'),
//     validatorMiddleware
// ]