const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema({
    title: {
        en: {
            type: String,
            require: [true, "En Product name is required"],
            unique: [true, 'En Product must be unique'],
            minlength: [3, 'Too short en product name'],
            trim: true
        },
        ar: {
            type: String,
            require: [true, "Ar Product name is required"],
            unique: [true, 'Ar Product must be unique'],
            minlength: [3, 'Too short ar product name'],
            trim: true
        }
    },
    category: {
        type: ObjectID,
        ref: 'Category',
        required: [true, "Product must be belong to category"]
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