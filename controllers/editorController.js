const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const ApiError = require("../utils/ApiError");

/**
 * @Desc : Editor [access to edit only]
 * @Note : It's with admin model
 */
exports.editorLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) {
        next(new ApiError(401, "Wrong password or email"))
    }

    const token = jwt.sign({ userId: admin._id.toString(), role: 'editor' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })

    res.status(201).json({ msg: 'ok', token })
})
exports.editorChangePassword = asyncHandler(async (req, res, next) => {
    const { email, password, newPassword } = req.body;

    let admin = await Admin.findOne({ email })
    if (!admin) {
        next(new ApiError(401, "Wrong password or email"))
    }

    admin.password = await bcrypt.hash(newPassword, 8)
    await admin.save()

    const newToken = jwt.sign({ userId: admin._id.toString(), role: 'editor' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })

    res.status(200).json({ msg: "ok", newToken })
})