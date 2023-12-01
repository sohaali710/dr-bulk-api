const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const bookEatSmartSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        ref: 'User',
        require: true
    },
    eatSmartId: {
        type: ObjectID,
        ref: 'EatSmart',
        require: true
    },
    // ! Who specifies that? user or dr bulk and then send to them the date
    // startsAt: {
    //     type: Date,
    //     require: true
    // },
    paymentMethod: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('BookEatSmart', bookEatSmartSchema)