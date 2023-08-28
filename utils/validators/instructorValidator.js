const { check } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const Instructor = require('../../models/instructorModel')

exports.addInstructorValidator = [
    check('name')
        .isObject().withMessage('Instructor name must be an object'),
    check('name.en')
        .notEmpty().withMessage('En instructor name is required')
        .isLength({ min: 2 }).withMessage('Too short En instructor name')
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
    check('name.ar')
        .notEmpty().withMessage('Ar instructor name is required')
        .isLength({ min: 2 }).withMessage('Too short Ar instructor name'),
    check('bio')
        .isObject().withMessage('Instructor name must be an object'),
    check('bio.en')
        .notEmpty().withMessage('En bio is required')
        .isLength({ min: 10 }).withMessage('Too short En bio'),
    check('bio.ar')
        .notEmpty().withMessage('Ar bio is required')
        .isLength({ min: 10 }).withMessage('Too short Ar bio'),
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
        .isObject().withMessage('Instructor name must be an object'),
    check('name.en')
        .notEmpty().withMessage('En instructor name is required')
        .isLength({ min: 2 }).withMessage('Too short En instructor name')
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
    check('name.ar')
        .notEmpty().withMessage('Ar instructor name is required')
        .isLength({ min: 2 }).withMessage('Too short Ar instructor name'),
    check('bio')
        .isObject().withMessage('Instructor name must be an object'),
    check('bio.en')
        .notEmpty().withMessage('En bio is required')
        .isLength({ min: 10 }).withMessage('Too short En bio'),
    check('bio.ar')
        .notEmpty().withMessage('Ar bio is required')
        .isLength({ min: 10 }).withMessage('Too short Ar bio'),
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