const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const ApiError = require("../utils/ApiError");

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) {
        next(new ApiError(401, "Wrong password or email"))
    }

    const token = await admin.generateAdminAuthToken()

    res.status(201).json({ msg: 'ok', token })
})

exports.changePassword = asyncHandler(async (req, res, next) => {
    const { email, password, newPassword } = req.body;
    // TODO It's better to use the req.user instead of email to get admin data
    // const {userId}=req.user
    // const { password, newPassword } = req.body;

    let admin = await Admin.findOne({ email })
    // let admin = await Admin.findById(id)
    if (!admin) {
        next(new ApiError(401, "Wrong password or email"))
    }

    // admin.password = await bcrypt.hash(newPassword, 8)
    admin.password = newPassword
    const newToken = await admin.generateAdminAuthToken()
    await admin.save()

    res.status(200).json({ msg: "ok", token: newToken })
})
