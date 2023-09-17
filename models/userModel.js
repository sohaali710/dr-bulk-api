const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    gender: {
        type: String,
        enum: ["M", "F"],
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: undefined
    },
    verifyEmailCode: String,
    verified: {
        type: Boolean,
        default: false
    },
    points: {
        type: Number,
        min: 0
    }
}, {
    timestamps: true
})


// generate token method
userSchema.methods.generateAuthToken = async function () {
    const user = this //syntax sugar
    const token = jwt.sign({ userId: user._id.toString(), role: 'user' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })

    await user.save()
    return token
}

// hash password (before saving the user)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    next()
})


module.exports = mongoose.model('User', userSchema)