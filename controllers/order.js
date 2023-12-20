const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const Order = require('../models/order')
const User = require('../models/userModel')


exports.createOrder = asyncHandler(async (req, res, next) => {
    let { items, bill, paymentMethod } = req.body
    const userId = req.user.userId

    const user = await User.findById(userId)
    if (!user) {
        return next(new ApiError(404, `No user for this id ${id}`))
    }

    const order = await Order.create({
        userId,
        items,
        bill,
        paymentMethod
    })

    res.status(200).json({ msg: 'ok', data: order })
})
exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate({ path: "userId", select: "email phoneNumber name" })

    res.status(200).json({
        results: orders.length,
        data: orders
    })
})

// with user auth
exports.getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user.userId
    const user = await User.findById(userId)
    if (!user) {
        return next(new ApiError(404, `No user for this id ${id}`))
    }

    const userOrders = await Order.find({ userId })

    res.status(200).json({
        results: userOrders.length,
        data: userOrders
    })
})
exports.getOrderById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const order = await Order.findById(id)
        .populate({ path: "userId", select: "email" })

    if (!order) {
        return next(new ApiError(404, `No order for this id ${id}`))
    }

    res.status(200).json({ data: order })
})