const express = require('express')
const router = express.Router()
const { bookMembershipValidator, getBookingByIdValidator } = require('../utils/validators/bookMembership')
const Auth = require('../middlewares/auth')
const { bookMembership, getAllBookings, getBookingById, getUserBookings } = require('../controllers/bookMembership')
const AdminAuth = require('../middlewares/adminAuth')

router
    .route('/')
    .get(AdminAuth, getAllBookings)
    .post(bookMembershipValidator, Auth, bookMembership)

router.route('/:id')
    .get(getBookingByIdValidator, getBookingById)

router.route('/user-booking')
    .get(Auth, getUserBookings)

module.exports = router