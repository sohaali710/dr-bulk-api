const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const ApiError = require('../utils/ApiError')
const User = require('../models/userModel')

exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, gender, phoneNumber } = req.body

    const user = await User.create({
        name,
        email,
        password,
        gender,
        phoneNumber
    })

    res.status(201).json({ msg: 'ok' })
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    // const user = await User.findByCredentials(email, password)

    const user = await User.findOne({ email })
    // const isMatch = await bcrypt.compare(password, user.password)

    if (!user) {
        return next(new ApiError(404, "Incorrect email or password"))
    }

    const token = await user.generateAuthToken()

    res.status(201).json({ msg: 'ok', token })
})