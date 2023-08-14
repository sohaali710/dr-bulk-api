const { validationResult } = require('express-validator')

/**
 * @desc Middleware to find the validation errors in the request
 */

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next()
}

module.exports = validatorMiddleware