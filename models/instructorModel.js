const mongoose = require('mongoose')

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Instructor name is required"],
        unique: [true, "Instructor name is unique"],
        minLength: 2,
        trim: true
    },
    bio: {
        type: String,
        require: [true, "Instructor bio is required"],
        minlength: [10, 'Too short product description'],
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    // image: {
    //     type: String,
    //     default: undefined
    // },
    slug: {
        type: String,
        lowercase: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Instructor', instructorSchema)