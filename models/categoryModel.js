const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Category name is required"],
        unique: [true, 'Category must be unique'],
        minlength: [3, 'Too short category name'],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true
    }
}, {
    timestamps: true
})

const categoryModel = mongoose.model('Category', categorySchema)
module.exports = categoryModel