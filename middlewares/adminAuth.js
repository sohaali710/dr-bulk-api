const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiErrorHandling')
const Admin = require('../models/adminModel')

/**
 * @desc Authentication middleware to protect Admin private routes and verify the token
 */
const adminAuth = asyncHandler(async (req, res, next) => {
    if (!req.header('Authorization')) {
        return next(new ApiError(401, 'You\'re not logged in. Please login first.'))
    }

    const token = req.header('Authorization').replace('Bearer ', '')

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return next(new ApiError(400, err.message))
        }
        if (user.role == 'admin') {
            const isExist = await Admin.findById(user.userId)
            if (!isExist) {
                return next(new ApiError(401, 'This user doesn\'t exist.'))
            }

            // TODO check if user changed his password before this token so it becomes an invalid token.

            req.user = user
            next();
        } else {
            return next(new ApiError(401, "Not allowed to access this route."))
        }
    })
})

module.exports = adminAuth