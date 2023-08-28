const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const categorySchema = new mongoose.Schema({
    name: {
        en: {
            type: String,
            require: [true, "En category name is required"],
            unique: [true, 'En category must be unique'],
            minlength: [3, 'Too short en category name'],
            trim: true
        },
        ar: {
            type: String,
            require: [true, "Ar Category name is required"],
            unique: [true, 'Ar Category must be unique'],
            minlength: [3, 'Too short ar category name'],
            trim: true
        },
        // type: String,
        // require: [true, "Category name is required"],
        // unique: [true, 'Category must be unique'],
        // minlength: [3, 'Too short category name'],
        // trim: true
    },
    // nameEn: {
    //     type: String,
    //     require: [true, "En category name is required"],
    //     unique: [true, 'En category must be unique'],
    //     minlength: [3, 'Too short en category name'],
    //     trim: true

    // },
    // nameAr: {
    //     type: String,
    //     require: [true, "Ar Category name is required"],
    //     unique: [true, 'Ar Category must be unique'],
    //     minlength: [3, 'Too short ar category name'],
    //     trim: true
    // },
    slug: {
        type: String,
        lowercase: true
    }
}, {
    timestamps: true
})

const categoryModel = mongoose.model('Category', categorySchema)
module.exports = categoryModel