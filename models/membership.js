const mongoose = require('mongoose')

const membershipSchema = new mongoose.Schema({
    title: {
        en: {
            type: String,
            require: [true, "En name is required"],
            unique: [true, 'En must be unique'],
            minlength: [3, 'Too short en product name'],
            trim: true
        },
        ar: {
            type: String,
            require: [true, "Ar name is required"],
            unique: [true, 'Ar must be unique'],
            minlength: [3, 'Too short ar product name'],
            trim: true
        }
    },
    description: {
        en: {
            type: String,
            require: [true, "En description is required"],
            minlength: [10, 'Too short en product description'],
        },
        ar: {
            type: String,
            require: [true, "Ar description is required"],
            minlength: [10, 'Too short ar description'],
        }
    },
    duration: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Normal', 'Silver', 'Gold','Diamond','VIP']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    points: {
        type: Number,
        min: 0
    },
    // image: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Membership', membershipSchema)