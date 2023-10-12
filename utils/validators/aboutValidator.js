const { check } = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const About = require('../../models/aboutModel')

exports.addAboutValidator = [
    check('drBulkSpotlit')
        .isObject().withMessage('drBulkSpotlit must be an object'),
    check('drBulkSpotlit.en')
        .notEmpty().withMessage('En drBulkSpotlit is required')
        .isLength({ min: 2 }).withMessage('Too short En drBulkSpotlit'),
    check('drBulkSpotlit.ar')
        .notEmpty().withMessage('Ar drBulkSpotlit is required')
        .isLength({ min: 2 }).withMessage('Too short Ar drBulkSpotlit'),
    check('gymAbout')
        .isObject().withMessage('name must be an object'),
    check('gymAbout.en')
        .notEmpty().withMessage('En gymAbout is required')
        .isLength({ min: 10 }).withMessage('Too short En gymAbout'),
    check('gymAbout.ar')
        .notEmpty().withMessage('Ar gymAbout is required')
        .isLength({ min: 10 }).withMessage('Too short Ar gymAbout'),
    validatorMiddleware
]