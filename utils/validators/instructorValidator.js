const { check } = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const Instructor = require('../../models/instructorModel')

exports.addInstructorValidator = [
    check('name')
        .isObject().withMessage('name must be an object'),
    check('name.en')
        .notEmpty().withMessage('En name is required')
        .isLength({ min: 2 }).withMessage('Too short En name')
        .custom(val =>
            Instructor.findOne({ name: val }).then(instructor => {
                if (instructor) {
                    return Promise.reject(new Error("This name is added before"))
                }
            })
        ),
    check('name.ar')
        .notEmpty().withMessage('Ar name is required')
        .isLength({ min: 2 }).withMessage('Too short Ar name'),
    check('bio')
        .isObject().withMessage('name must be an object'),
    check('bio.en')
        .notEmpty().withMessage('En bio is required')
        .isLength({ min: 10 }).withMessage('Too short En bio'),
    check('bio.ar')
        .notEmpty().withMessage('Ar bio is required')
        .isLength({ min: 10 }).withMessage('Too short Ar bio'),
    check('phoneNumber')
        .optional()
        .isMobilePhone().withMessage('Please enter a valid phone number.'),
    check('image')
        .optional(),
    validatorMiddleware
]

exports.getInstructorValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware
]

exports.updateInstructorValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    check('name')
        .isObject().withMessage('name must be an object'),
    check('name.en')
        .notEmpty().withMessage('En name is required')
        .isLength({ min: 2 }).withMessage('Too short En name')
        .custom(val =>
            Instructor.findOne({ name: val }).then(instructor => {
                if (instructor) {
                    return Promise.reject(new Error("This name is added before"))
                }
            })
        ),
    check('name.ar')
        .notEmpty().withMessage('Ar name is required')
        .isLength({ min: 2 }).withMessage('Too short Ar name'),
    check('bio')
        .isObject().withMessage('name must be an object'),
    check('bio.en')
        .notEmpty().withMessage('En bio is required')
        .isLength({ min: 10 }).withMessage('Too short En bio'),
    check('bio.ar')
        .notEmpty().withMessage('Ar bio is required')
        .isLength({ min: 10 }).withMessage('Too short Ar bio'),
    check('phoneNumber')
        .optional()
        .isMobilePhone().withMessage('Please enter a valid phone number.'),
    check('image')
        .optional(),
    validatorMiddleware
]

exports.deleteInstructorValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware
]