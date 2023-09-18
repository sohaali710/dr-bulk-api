const { check } = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

/**
 * @desc validator layer to validate on variables before pass it to mongoose
 */

exports.addEatSmartValidator = [
    check('title')
        .isObject().withMessage('title must be an object'),
    check('title.en')
        .notEmpty().withMessage('En title is required')
        .isLength({ min: 3 }).withMessage('Too short En title')
        .isLength({ max: 32 }).withMessage('Too long En title'),
    check('title.ar')
        .notEmpty().withMessage('Ar title is required')
        .isLength({ min: 3 }).withMessage('Too short Ar title')
        .isLength({ max: 32 }).withMessage('Too long Ar title'),
    check('description')
        .isObject().withMessage('description must be an object'),
    check('description.en')
        .notEmpty().withMessage('En description is required')
        .isLength({ min: 10 }).withMessage('Too short En description'),
    check('description.ar')
        .notEmpty().withMessage('Ar description is required')
        .isLength({ min: 10 }).withMessage('Too short Ar description'),
    check('duration')
        .notEmpty().withMessage('Duration is required'),
    check('type')
        .notEmpty().withMessage('Type is required')
        .isIn(['Weekly', 'Monthly']).withMessage("Type should be one of these options: Weekly or Monthly"),
    check('price')
        .notEmpty().withMessage('price is required')
        .isNumeric({ min: 0 }).withMessage('Price should be positive number'),
    check('points')
        .optional()
        .isNumeric({ min: 0 }).withMessage('Points should be a number'),
    check('image')
        .optional(),
    validatorMiddleware
]

exports.getEatSmartValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware
]

exports.updateEatSmartValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    check('title')
        .isObject().withMessage('title must be an object'),
    check('title.en')
        .notEmpty().withMessage('En title is required')
        .isLength({ min: 3 }).withMessage('Too short En title')
        .isLength({ max: 32 }).withMessage('Too long En title'),
    check('title.ar')
        .notEmpty().withMessage('Ar title is required')
        .isLength({ min: 3 }).withMessage('Too short Ar title')
        .isLength({ max: 32 }).withMessage('Too long Ar title'),
    check('description')
        .isObject().withMessage('description must be an object'),
    check('description.en')
        .notEmpty().withMessage('En description is required')
        .isLength({ min: 10 }).withMessage('Too short En description'),
    check('description.ar')
        .notEmpty().withMessage('Ar description is required')
        .isLength({ min: 10 }).withMessage('Too short Ar description'),
    check('duration')
        .notEmpty().withMessage('Duration is required'),
    check('type')
        .notEmpty().withMessage('Type is required')
        .isIn(['Weekly', 'Monthly']).withMessage("Type should be one of these options: Weekly or Monthly"),
    check('price')
        .notEmpty().withMessage('price is required')
        .isNumeric({ min: 0 }).withMessage('Price should be positive number'),
    check('points')
        .optional()
        .isNumeric({ min: 0 }).withMessage('Points should be a number'),
    // check('image')
    //     .optional(),
    validatorMiddleware
]

exports.deleteEatSmartValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware
]

// exports.addEatSmartImgValidator = [
//     check('id').isMongoId().withMessage('Invalid id format'),
//     validatorMiddleware
// ]

// exports.removeEatSmartImgValidator = [
//     check('id').isMongoId().withMessage('Invalid id format'),
//     validatorMiddleware
// ]