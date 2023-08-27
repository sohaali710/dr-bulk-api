const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const Instructor = require('../models/instructorModel')


exports.getInstructors = asyncHandler(async (req, res) => {
    const instructors = await Instructor.find({})

    res.status(200).json({ results: instructors.length, data: instructors })
})

exports.getInstructorById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const instructor = await Instructor.findById(id)

    if (!instructor) {
        return next(new ApiError(404, `No instructor for this id ${id}`))
    }

    res.status(200).json({ data: instructor })
})

exports.addInstructor = asyncHandler(async (req, res, next) => {
    const { name, slug, bio, phoneNumber } = req.body

    const instructor = await Instructor.create({
        name,
        slug,
        bio,
        phoneNumber
    })

    res.status(201).json({ data: instructor })
})

exports.updateInstructorById = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const instructor = await Instructor.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!instructor) {
        return next(new ApiError(404, `No instructor for this id ${id}`))
    }

    res.status(200).json({ data: instructor })
})

exports.deleteInstructorById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const instructor = await Instructor.findByIdAndDelete(id)

    if (!instructor) {
        return next(new ApiError(404, `No instructor for this id ${id}`))
    }

    res.status(204).send()
})

// TODO : test it on postman
// exports.addInstructorImg = asyncHandler(async (req, res, next) => {
//     const { id } = req.params
//     const { image } = req.body

//     const instructor = await Instructor.findById(id)
//     if (!instructor) {
//         return next(new ApiError(404, `No instructor for this id ${id}`))
//     }

//     if (!req.file[0]) {
//         next(new ApiError(400, 'Image not found'))
//     }

//     instructor.image=req.file
//     await instructor.save()

//     res.status(200).json({ image: instructor.image })
// })
