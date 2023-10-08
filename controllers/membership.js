const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const Membership = require('../models/membership')

/**
 * @Desc : Memberships CRUD
 */
exports.addMembership = asyncHandler(async (req, res, next) => {
    const { title, duration, type, price, description, points } = req.body

    const membership = await Membership.create({
        title,
        duration,
        price,
        type,
        description,
        points
    })

    res.status(201).json({ data: membership })
})
exports.updateMembershipById = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const membership = await Membership.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!membership) {
        return next(new ApiError(404, `No membership for this id ${id}`))
    }

    res.status(200).json({ data: membership })
})

exports.getMemberships = asyncHandler(async (req, res) => {
    const memberships = await Membership.find({})

    res.status(200).json({
        results: memberships.length,
        data: memberships
    })
})
/** VIP Memberships from Dr Bulk [private training] */
exports.getVIPMemberships = asyncHandler(async (req, res) => {
    const VIPMemberships = await Membership.find({ type: 'VIP' })
    console.log(VIPMemberships)

    res.status(200).json({
        data: VIPMemberships
    })
})
exports.getMembershipById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const membership = await Membership.findById(id)

    if (!membership) {
        return next(new ApiError(404, `No membership for this id ${id}`))
    }

    res.status(200).json({ data: membership })
})

exports.deleteMembershipById = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    const membership = await Membership.findByIdAndDelete(id)

    if (!membership) {
        return next(new ApiError(404, `No membership for this id ${id}`))
    }

    res.status(204).send()
})

/** Access by Editor */
exports.editorUpdateMembership = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { title, duration, type, description, points } = req.body

    const membership = await Membership.findOneAndUpdate({ _id: id }, { title, duration, type, description, points }, { new: true })
    if (!membership) {
        return next(new ApiError(404, `No membership for this id ${id}`))
    }

    res.status(200).json({ data: membership })
})