const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const BookEatSmart = require('../models/bookEatSmart')
const User = require('../models/userModel')


exports.bookEatSmart = asyncHandler(async (req, res, next) => {
    let { eatSmartId, paymentMethod } = req.body
    const userId = req.user.userId

    const user = await User.findById(userId)
    if (!user) {
        return next(new ApiError(404, `No user for this id ${id}`))
    }

    // const exist = await BookEatSmart.findOne({ userId })
    // console.log(exist)
    // if (exist) {
    //     return next(new ApiError(404, `This user already has eatSmart.`))
    // }

    const booking = await BookEatSmart.create({
        eatSmartId,
        userId,
        // startsAt,
        paymentMethod
    })

    res.status(200).json({ msg: 'ok', data: booking })
})
exports.getAllBookings = asyncHandler(async (req, res) => {
    const books = await BookEatSmart.find({})
        .populate([
            {
                path: "userId", select: "email phoneNumber name"
            }, {
                path: "eatSmartId", select: "title"
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
    const booking = await BookEatSmart.findById(id)
        .populate([
            {
                path: "userId", select: "email phoneNumber name"
            }, {
                path: "eatSmartId", select: "title"
            }
        ])

    if (!booking) {
        return next(new ApiError(404, `No eatSmart booking for this id ${id}`))
    }

    res.status(200).json({ data: booking })
})

exports.getUserBookings = asyncHandler(async (req, res) => {
    const userId = req.user.userId
    const user = await User.findById(userId)
    if (!user) {
        return next(new ApiError(404, `No user for this id ${id}`))
    }

    const books = await BookEatSmart.find({ userId })
        .populate({ path: "eatSmartId" })
        .sort({ createdAt: -1 })

    res.status(200).json({
        results: books.length,
        data: books
    })
})