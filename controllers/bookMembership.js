const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const Membership = require('../models/membership')
const bookMembership = require('../models/bookMembership')
const User = require('../models/userModel')


exports.bookMembership = asyncHandler(async (req, res, next) => {
    let { membershipId, startsAt, paymentMethod } = req.body
    const userId = req.user.userId
    console.log(req.user)
    const user = await User.findById(userId)
    if (!user) {
        return next(new ApiError(404, `No user for this id ${id}`))
    }

    const exist = await bookMembership.findOne({ userId })
    console.log(exist)
    if (exist) {
        return next(new ApiError(404, `This user already has membership.`))
    }

    const booking = await bookMembership.create({
        membershipId,
        userId,
        startsAt,
        paymentMethod
    })
    console.log(booking)

    res.status(200).json({ msg: 'ok', data: booking })
})