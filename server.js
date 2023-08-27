var express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
const multer = require('multer')
const cors = require('cors');
var app = express();

const { dbConnection } = require('./db/mongoose');
const ApiError = require('./utils/ApiError')
const globalErrorHandling = require('./middlewares/errorHandlingMiddleware')
const upload = require('./middlewares/fileUpload')

const adminRoute = require('./routes/adminRoute')
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')
const instructorRoute = require('./routes/instructorRoute')

const PORT = process.env.PORT

// Middlewares
app.use(express.json())
app.use(express.static('public'))//to mention express that the frontend (static files) are in public folder
app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`mode: ${process.env.NODE_ENV}`)
}

// Connect with database
dbConnection()

// file upload
app.post('/api/products', upload.array('images'))
app.post('/api/products/add-img/:id', upload.array('images'))

// app.post('/api/instructors/add-img/:id', upload.single('image'))

// Mount Routes
app.use('/api/admins', adminRoute);
app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/instructors', instructorRoute);
app.all("*", (req, res, next) => {
    next(new ApiError(400, `Can't find this route: ${req.originalUrl}`))
})

// Global error handling middleware
app.use(globalErrorHandling)

const server = app.listen(PORT, () => console.log('Server runs on : http://localhost:' + PORT));

// handle rejections outside express (ex. dbConnection error)
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection error: ${err}`)
    server.close(() => {
        console.error(`Shutting down.....`)
        process.exit(1)
    })
})