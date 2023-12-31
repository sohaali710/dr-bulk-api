const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const ApiError = require("../utils/ApiError");

exports.adminLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) {
        next(new ApiError(401, "Wrong password or email"))
    }

    // const token = await admin.generateAdminAuthToken()
    const token = jwt.sign({ userId: admin._id.toString(), role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })

    res.status(201).json({ msg: 'ok', token })
})
exports.changePassword = asyncHandler(async (req, res, next) => {
    const { email, password, newPassword } = req.body;

    // TODO : better to use --> confirmPassword + req.user
    // const { email, password, newPassword,confirmPassword } = req.body;
    // const {userId}=req.user
    // const { password, newPassword } = req.body;

    let admin = await Admin.findOne({ email })
    // let admin = await Admin.findById(id)
    if (!admin) {
        next(new ApiError(401, "Wrong password or email"))
    }

    admin.password = await bcrypt.hash(newPassword, 8)
    // admin.password = newPassword
    await admin.save()

    // const newToken = await admin.generateAdminAuthToken()
    const newToken = jwt.sign({ userId: admin._id.toString(), role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })

    res.status(200).json({ msg: "ok", newToken })
})