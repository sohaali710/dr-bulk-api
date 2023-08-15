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

// check email and password in login route
// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email })
//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!user || !isMatch) {
//         return next(new ApiError("Incorrect email or password"))
//     }

//     return user
// }

// hash password (before saving the user)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    next()
})


module.exports = mongoose.model('User', userSchema)