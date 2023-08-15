const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utils/ApiErrorHandling')
const Category = require('../models/categoryModel')


exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({})

    res.status(200).json({ results: categories.length, data: categories })
})

exports.getCategoryById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findById(id)

    if (!category) {
        // res.status(404).json(`No category for this id ${id}`)
        return next(new ApiError(404, `No category for this id ${id}`))
    }

    res.status(200).json({ data: category })
})

exports.createCategory = asyncHandler(async (req, res) => {
    const { name, slug } = req.body

    const category = await Category.create({ name, slug: slugify(name) })

    res.status(201).json({ data: category })
})

exports.updateCategoryById = asyncHandler(async (req, res, next) => {
    const { name } = req.body
    const { id } = req.params

    const category = await Category.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true } //to return the category after update (the new one)
    )

    if (!category) {
        return next(new ApiError(404, `No category for this id ${id}`))
    }

    res.status(200).json({ data: category })
})

exports.deleteCategoryById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findByIdAndDelete(id)

    if (!category) {
        return next(new ApiError(404, `No category for this id ${id}`))
    }

    res.status(204).send()
})