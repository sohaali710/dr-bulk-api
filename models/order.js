const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        ref: 'User',
        require: true
    },
    items: [
        {
            productId: {
                type: ObjectID,
                ref: 'Product',
                require: true
            },
            quantity: {
                type: Number,
                require: true,
                min: 0
            }
        }
    ],
    bill: {
        type: Number,
        require: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'canceled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)