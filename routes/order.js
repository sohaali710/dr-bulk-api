const express = require('express')
const router = express.Router()
const Auth = require('../middlewares/auth')
const AdminAuth = require('../middlewares/adminAuth')
const { getAllOrders, createOrder, getOrderById, getUserOrders } = require('../controllers/order')
const { getOrderByIdValidator, createOrderValidator } = require('../utils/validators/order')

router
    .route('/')
    .get(AdminAuth, getAllOrders)
    .post(createOrderValidator, Auth, createOrder)

router.route('/:id')
    .get(getOrderByIdValidator, getOrderById)

router.route('/user-orders')
    .get(Auth, getUserOrders)


module.exports = router