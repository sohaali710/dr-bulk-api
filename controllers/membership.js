const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utils/ApiError')
const Membership = require('../models/membership')

/**
 * @Desc : Memberships CRUD
 */
exports.addMembership = asyncHandler(async (req, res, next) => {
    let { title, duration, type, price, description, points } = req.body
    // image = image ? req.files[0] : undefined

    const membership = await Membership.create({
        title,
        duration,
        price,
        type,
        description,
        points,
        // image
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

// TODO : test it on postman
// exports.addMembershipImg = asyncHandler(async (req, res, next) => {
//     const { id } = req.params
//     const { images } = req.body

//     const membership = await Membership.findById(id)
//     if (!membership) {
//         return next(new ApiError(404, `No membership for this id ${id}`))
//     }

//     if (!req.files[0]) {
//         next(new ApiError(400, 'Images not found'))
//     }

//     req.files.forEach(file => membership.images.push(file.path))
//     await membership.save()

//     res.status(200).json({ images: membership.images })
// })

// exports.removeMembershipImg = asyncHandler(async (req, res, next) => {
//     const { id } = req.params
//     const { removedImg } = req.body

//     const membership = await Membership.findById(id)
//     if (!membership) {
//         return next(new ApiError(404, `No membership for this id ${id}`))
//     }

//     membership.images = membership.images.filter(img => img != removedImg)
//     await membership.save()

//     res.status(200).json({ images: membership.images })
// })