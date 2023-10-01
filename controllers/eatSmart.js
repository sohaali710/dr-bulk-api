const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const EatSmart = require('../models/eatSmart')

/**
 * @Desc : EatSmart CRUD (online weekly or monthly classes with Dr Bulk)
 */
exports.addEatSmart = asyncHandler(async (req, res, next) => {
    let { title, duration, type, price, description, points } = req.body

    const eatSmart = await EatSmart.create({
        title,
        duration,
        price,
        type,
        description,
        points,
        // image
    })

    res.status(201).json({ data: eatSmart })
})
exports.updateEatSmartById = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const eatSmart = await EatSmart.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!eatSmart) {
        return next(new ApiError(404, `No eatSmart for this id ${id}`))
    }

    res.status(200).json({ data: eatSmart })
})

exports.getEatSmarts = asyncHandler(async (req, res) => {
    const eatSmarts = await EatSmart.find({})

    res.status(200).json({
        results: eatSmarts.length,
        data: eatSmarts
    })
})
/** VIP EatSmarts from Dr Bulk [private training] */
exports.getVIPEatSmarts = asyncHandler(async (req, res) => {
    const VIPEatSmarts = await EatSmart.find({ type: 'VIP' })
    console.log(VIPEatSmarts)

    res.status(200).json({
        data: VIPEatSmarts
    })
})
exports.getEatSmartById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const eatSmart = await EatSmart.findById(id)

    if (!eatSmart) {
        return next(new ApiError(404, `No eatSmart for this id ${id}`))
    }

    res.status(200).json({ data: eatSmart })
})

exports.deleteEatSmartById = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    const eatSmart = await EatSmart.findByIdAndDelete(id)

    if (!eatSmart) {
        return next(new ApiError(404, `No eatSmart for this id ${id}`))
    }

    res.status(204).send()
})

// TODO : test it on postman
// exports.addEatSmartImg = asyncHandler(async (req, res, next) => {
//     const { id } = req.params
//     const { images } = req.body

//     const eatSmart = await EatSmart.findById(id)
//     if (!eatSmart) {
//         return next(new ApiError(404, `No eatSmart for this id ${id}`))
//     }

//     if (!req.files[0]) {
//         next(new ApiError(400, 'Images not found'))
//     }

//     req.files.forEach(file => eatSmart.images.push(file.path))
//     await eatSmart.save()

//     res.status(200).json({ images: eatSmart.images })
// })

// exports.removeEatSmartImg = asyncHandler(async (req, res, next) => {
//     const { id } = req.params
//     const { removedImg } = req.body

//     const eatSmart = await EatSmart.findById(id)
//     if (!eatSmart) {
//         return next(new ApiError(404, `No eatSmart for this id ${id}`))
//     }

//     eatSmart.images = eatSmart.images.filter(img => img != removedImg)
//     await eatSmart.save()

//     res.status(200).json({ images: eatSmart.images })
// })