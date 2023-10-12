const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    drBulkSpotlit: {
        en: {
            type: String,
            required: [true, "En spotlit is required"],
            unique: [true, "En spotlit is unique"],
            minLength: 10,
            trim: true
        },
        ar: {
            type: String,
            required: [true, "Ar spotlit is required"],
            unique: [true, "Ar spotlit is unique"],
            minLength: 10,
            trim: true
        }
    },
    gymAbout: {
        en: {
            type: String,
            require: [true, "En about is required"],
            minlength: [10, 'Too short En about'],
        },
        ar: {
            type: String,
            require: [true, "Ar about is required"],
            minlength: [10, 'Too short Ar about'],
        }
    },
    image: String
}, {
    timestamps: true
})

module.exports = mongoose.model('About', aboutSchema)