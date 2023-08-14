const mongoose = require('mongoose')
const validator = require('validator')
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
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password musn\'t contain password')
            }
        }
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


// check email and password in login route
// adminSchema.statics.findByCredentials = async (email, password) => {
//     const admin = await Admin.findOne({ email })

//     if (!admin) {
//         //when throw an error, it trigger the catch block in admin route
//         throw new Error('Unable to log in')
//     }

//     const isMatch = await bcrypt.compare(password, admin.password)

//     if (!isMatch) {
//         throw new Error('Unable to login')
//     }

//     return admin
// }


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