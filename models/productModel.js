const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Product name is required"],
        unique: [true, 'Product must be unique'],
        minlength: [3, 'Too short product name'],
        trim: true
    },
    category: {
        type: ObjectID,
        ref: 'Category',
        required: [true, "Product must be belong to category"]
    },
    description: {
        type: String,
        require: [true, "Product description is required"],
        minlength: [10, 'Too short product description'],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [1, "Price should be positive number"]
    },
    points: {
        type: Number
    },
    // imageCover: {
    //     type: String,
    //     required: [true, "Product imageCover is required"]
    // },
    images: {
        type: [String],
        required: [true, "Product images is required"]
    },
    slug: {
        type: String,
        lowercase: true
    }
}, {
    timestamps: true
})

const productModel = mongoose.model('Product', productSchema)
module.exports = productModel