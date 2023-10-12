const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const About = require('../models/aboutModel')


exports.addAbout = asyncHandler(async (req, res, next) => {
    let { drBulkSpotlit, gymAbout, image } = req.body
    // image = ""
    image = req.file ? req.file.path : undefined

    let about = await About.findOne()
    if (about) {
        about.drBulkSpotlit = drBulkSpotlit
        about.gymAbout = gymAbout
        about.image = image
        await about.save()
    } else {
        about = await About.create({
            drBulkSpotlit,
            gymAbout,
            image
        })
    }

    res.status(201).json({ data: about })
})

exports.getAbout = asyncHandler(async (req, res, next) => {
    const about = await About.findOne()

    if (!about) {
        return next(new ApiError(404, `No about found`))
    }

    res.status(200).json({ data: about })
})