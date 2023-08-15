const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utils/ApiError')
const Product = require('../models/productModel')


exports.getProducts = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 20 // number of items (products) to skip per page
    const skip = (page - 1) * limit

    const products = await Product.find({})
        .skip(skip)
        .limit(limit)
        .populate({ path: "category", select: "name" })
    // .populate({ path: "category", select: "name -_id" })

    res.status(200).json({ results: products.length, page, data: products })
})

exports.getProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id).populate({ path: "category", select: "name" })

    if (!product) {
        return next(new ApiError(404, `No product for this id ${id}`))
    }

    res.status(200).json({ data: product })
})

exports.createProduct = asyncHandler(async (req, res) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title)
    }

    const product = await Product.create(req.body)

    res.status(201).json({ data: product })
})

exports.updateProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    if (req.body.title) {
        req.body.slug = slugify(req.body.title)
    }

    const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true })

    if (!product) {
        return next(new ApiError(404, `No product for this id ${id}`))
    }

    res.status(200).json({ data: product })
})

exports.deleteProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
        return next(new ApiError(404, `No product for this id ${id}`))
    }

    res.status(204).send()
})