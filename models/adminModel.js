const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
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
        minLength: 8,
        trim: true
    }
}, {
    timestamps: true
})


// generate token method
adminSchema.methods.generateAdminAuthToken = async function () {
    const admin = this //syntax sugar
    const token = jwt.sign({ userId: admin._id.toString(), role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })

    await admin.save()
    return token
}

// hash password (before saving the user)
// adminSchema.pre('save', async function (next) {
//     const admin = this
//     if (admin.isModified('password')) {
//         admin.password = await bcrypt.hash(admin.password, 8)
//     }
//     next()
// })


const adminModel = mongoose.model('Admin', adminSchema)
module.exports = adminModel