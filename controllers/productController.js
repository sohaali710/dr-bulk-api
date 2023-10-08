const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utils/ApiError')
const Product = require('../models/productModel')


exports.getProducts = asyncHandler(async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 20 // max number of items (students) per page
    const skip = (page - 1) * limit

    const productsPerPage = await Product.find({})
        .skip(skip)
        .limit(limit)
        .populate({ path: "category", select: "name" })
    // .populate({ path: "category", select: "name -_id" })

    const productsNo = await Product.countDocuments()
    const numberOfPages = (productsNo % limit == 0) ? productsNo / limit : Math.floor(productsNo / limit) + 1;

    res.status(200).json({
        results: productsPerPage.length,
        pagination: {
            currentPage: page,
            limit,
            numberOfPages
        },
        data: productsPerPage
    })
})

exports.getProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id).populate({ path: "category", select: "name" })

    if (!product) {
        return next(new ApiError(404, `No product for this id ${id}`))
    }

    res.status(200).json({ data: product })
})

exports.createProduct = asyncHandler(async (req, res, next) => {
    let { title, slug, category, description, price, points, images } = req.body

    if (!req.files[0]) {
        next(new ApiError(400, 'Images required. Please upload at least one image.'))
    }

    images = []
    req.files.forEach(file => images.push(file.path))

    const product = await Product.create({
        title,
        slug,
        category,
        description,
        price,
        points,
        images
    })
    console.log(product)

    res.status(201).json({ data: product })
})

exports.updateProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params

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

exports.addProductImg = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { images } = req.body

    const product = await Product.findById(id)
    if (!product) {
        return next(new ApiError(404, `No product for this id ${id}`))
    }

    if (!req.files[0]) {
        next(new ApiError(400, 'Images not found'))
    }

    req.files.forEach(file => product.images.push(file.path))
    await product.save()

    res.status(200).json({ images: product.images })
})

exports.removeProductImg = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { removedImg } = req.body

    const product = await Product.findById(id)
    if (!product) {
        return next(new ApiError(404, `No product for this id ${id}`))
    }

    product.images = product.images.filter(img => img != removedImg)
    await product.save()

    res.status(200).json({ images: product.images })
})

/** Access by Editor */
exports.editorUpdateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    let { title, slug, category, description, points } = req.body

    const product = await Product.findOneAndUpdate({ _id: id }, { title, slug, category, description, points }, { new: true })
    if (!product) {
        return next(new ApiError(404, `No product for this id ${id}`))
    }

    res.status(200).json({ data: product })
})