const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const ApiError = require("../utils/apiError");

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // const admin = await Admin.findByCredentials(email, password)

    const admin = await Admin.findOne({ email })
    if (!admin) {
        next(new ApiError(400, "Wrong password or email"))
    }

    // const isMatch = await bcrypt.compare(password, admin.password)
    const isMatch = password === admin.password
    if (!isMatch) {
        next(new ApiError(400, "Wrong password or email"))
    }

    const token = await admin.generateAdminAuthToken()

    res.status(201).json({ msg: 'ok', token })
})

exports.changePassword = asyncHandler(async (req, res, next) => {
    const { email, password, newPassword } = req.body;

    let admin = await Admin.findOne({ email })
    if (!admin) {
        next(new ApiError(400, "Wrong password or email"))
    }

    // const isMatch = await bcrypt.compareSync(password, admin.password)
    const isMatch = password === admin.password
    if (!isMatch) {
        next(new ApiError(400, "Wrong password or email"))
    }

    // admin.password = await bcrypt.hash(newPassword, 8)
    admin.password = newPassword
    const newToken = await admin.generateAdminAuthToken()
    await admin.save()

    res.status(200).json({ msg: "ok", token: newToken })
})
