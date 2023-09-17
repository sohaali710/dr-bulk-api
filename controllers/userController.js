const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const ApiError = require('../utils/ApiError')
const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')
const generateCode = require('../utils/generateCode')


exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, gender, phoneNumber } = req.body

    const user = await User.create({
        name,
        email,
        password,
        gender,
        phoneNumber,
        verifyEmailCode: generateCode(6),
        points: 10
    })

    sendEmail(email, user.verifyEmailCode, user._id, "/../views/verify_email.ejs")
    res.status(201).json({ msg: 'ok' })
})

exports.verifyEmailCode = asyncHandler(async (req, res, next) => {
    const { id, code } = req.params

    const user = await User.findById(id)
    if (!user) {
        return next(new ApiError(404, `No user for this id ${id}`))
    }
    if (user.verifyEmailCode !== code) {
        return next(new ApiError(404, `Wrong code`))
    }

    user.verified = true
    await user.save

    return res.status(200).redirect("https://dr-bulk.netlify.app/login")
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return next(new ApiError(404, "Incorrect email or password"))
    }

    if (!user.verified) {
        return next(new ApiError(400, "Please, verify your email first"))
    }

    const token = await user.generateAuthToken()

    res.status(201).json({ msg: 'ok', token })
})