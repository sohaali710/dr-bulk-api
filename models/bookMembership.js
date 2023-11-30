const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const bookMembershipSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        ref: 'User',
        require: true
    },
    membershipId: {
        type: ObjectID,
        ref: 'Membership',
        require: true
    },
    startsAt: Date,
    paymentMethod: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('BookMembership', bookMembershipSchema)