const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const Admin = require('../models/adminModel')

/**
 * @Desc Editor or Admin Auth
 */
const editorAdminAuth = asyncHandler(async (req, res, next) => {
    if (!req.header('Authorization')) {
        return next(new ApiError(401, 'You\'re not logged in. Please login first.'))
    }

    const token = req.header('Authorization').replace('Bearer ', '')

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return next(new ApiError(400, err.message))
        }
        if (user.role == 'editor' || user.role == 'admin') {
            const isExist = await Admin.findById(user.userId)
            if (!isExist) {
                return next(new ApiError(401, 'This user doesn\'t exist.'))
            }

            req.user = user
            next();
        } else {
            return next(new ApiError(401, "Not allowed to access this route."))
        }
    })
})

module.exports = editorAdminAuth