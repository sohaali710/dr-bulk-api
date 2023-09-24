const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const Instructor = require('../models/instructorModel')


exports.addInstructor = asyncHandler(async (req, res, next) => {
    let { name, bio, phoneNumber , image } = req.body
    image = ""
    image = req.file ? req.file.path : undefined

    const instructor = await Instructor.create({
        name,
        bio,
        phoneNumber,
        image
    })

    res.status(201).json({ data: instructor })
})
exports.updateInstructorById = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    
    const updatedData = req.file ? {...req.body , image : req.file.path} : {...req.body }
    const instructor = await Instructor.findOneAndUpdate({ _id: id }, updatedData , { new: true })
    if (!instructor) {
        return next(new ApiError(404, `No instructor for this id ${id}`))
    }

    res.status(200).json({ data: instructor })
})

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

exports.deleteInstructorById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const instructor = await Instructor.findByIdAndDelete(id)

    if (!instructor) {
        return next(new ApiError(404, `No instructor for this id ${id}`))
    }

    res.status(204).send()
})