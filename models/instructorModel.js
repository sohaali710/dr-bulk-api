const mongoose = require('mongoose')

const instructorSchema = new mongoose.Schema({
    name: {
        en: {
            type: String,
            required: [true, "En instructor name is required"],
            unique: [true, "En instructor name is unique"],
            minLength: 2,
            trim: true
        },
        ar: {
            type: String,
            required: [true, "Ar instructor name is required"],
            unique: [true, "Ar instructor name is unique"],
            minLength: 2,
            trim: true
        }
    },
    bio: {
        en: {
            type: String,
            require: [true, "En bio is required"],
            minlength: [10, 'Too short En bio'],
        },
        ar: {
            type: String,
            require: [true, "Ar bio is required"],
            minlength: [10, 'Too short Ar bio'],
        }
    },
    phoneNumber: Number,
    image: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Instructor', instructorSchema)