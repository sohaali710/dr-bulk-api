const express = require('express')
const router = express.Router()
const { bookEatSmartValidator, getBookingByIdValidator } = require('../utils/validators/bookEatSmart')
const Auth = require('../middlewares/auth')
const { bookEatSmart, getAllBookings, getBookingById, getUserBookings } = require('../controllers/bookEatSmart')
const AdminAuth = require('../middlewares/adminAuth')

router
    .route('/')
    .get(AdminAuth, getAllBookings)
    .post(bookEatSmartValidator, Auth, bookEatSmart)

router.route('/user-booking')
    .get(Auth, getUserBookings)

router.route('/:id')
    .get(getBookingByIdValidator, getBookingById)


module.exports = router