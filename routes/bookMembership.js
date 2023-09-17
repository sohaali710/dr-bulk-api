const express = require('express')
const router = express.Router()
const { bookMembershipValidator } = require('../utils/validators/bookMembership')
const Auth = require('../middlewares/auth')
const { bookMembership } = require('../controllers/bookMembership')

router
    .route('/')
    .post(bookMembershipValidator, Auth, bookMembership)

module.exports = router