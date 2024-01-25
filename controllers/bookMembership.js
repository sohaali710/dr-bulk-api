const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const BookMembership = require('../models/bookMembership')
const User = require('../models/userModel')


exports.bookMembership = asyncHandler(async (req, res, next) => {
    const { membershipId, startsAt, paymentMethod } = req.body
    const userId = req.user.userId
    const user = await User.findById(userId)
    if (!user) {
        return next(new ApiError(404, `No user for this id ${id}`))
    }

    // const exist = await BookMembership.findOne({ userId })
    // console.log(exist)
    // if (exist) {
    //     return next(new ApiError(404, `This user already has membership.`))
    // }

    const booking = await BookMembership.create({
        membershipId,
        userId,
        startsAt,
        paymentMethod
    })

    res.status(200).json({ msg: 'ok', data: booking })
})
exports.getAllBookings = asyncHandler(async (req, res) => {
    const books = await BookMembership.find({})
        .populate([
            {
                path: "userId", select: "email phoneNumber name"
            }, {
                path: "membershipId", select: "title"
            }
        ])
        .sort({ createdAt: -1 })

    res.status(200).json({
        results: books.length,
        data: books
    })
})
exports.getBookingById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const booking = await BookMembership.findById(id)
        .populate([
            {
                path: "userId", select: "email phoneNumber name"
            }, {
                path: "membershipId", select: "title"
            }
        ])

    if (!booking) {
        return next(new ApiError(404, `No membership booking for this id ${id}`))
    }

    res.status(200).json({ data: booking })
})

exports.getUserBookings = asyncHandler(async (req, res) => {
    const userId = req.user.userId
    const user = await User.findById(userId)
    if (!user) {
        return next(new ApiError(404, `No user for this id ${id}`))
    }

    const books = await BookMembership.find({ userId })
        .populate({ path: "membershipId" })
        .sort({ createdAt: -1 })

    res.status(200).json({
        results: books.length,
        data: books
    })
})