const express = require('express')
const router = express.Router()
const { addMembershipValidator, getMembershipValidator, updateMembershipValidator, deleteMembershipValidator } = require('../utils/validators/membership')
const { getMemberships, addMembership, getMembershipById, updateMembershipById, deleteMembershipById, removeMembershipImg, addMembershipImg } = require('../controllers/membership')
const AdminAuth = require('../middlewares/adminAuth')

router
    .route('/')
    .get(getMemberships)
    .post(addMembershipValidator, AdminAuth, addMembership)

router.route('/:id')
    .get(getMembershipValidator, getMembershipById)
    .put(updateMembershipValidator, AdminAuth, updateMembershipById)
    .delete(deleteMembershipValidator, AdminAuth, deleteMembershipById)

// router.post('/add-img/:id', addMembershipImgValidator, AdminAuth, addMembershipImg)
// router.delete('/remove-img/:id', removeMembershipImgValidator, AdminAuth, removeMembershipImg)

module.exports = router