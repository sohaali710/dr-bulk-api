const express = require('express')
const router = express.Router()
const { addMembershipValidator, getMembershipValidator, updateMembershipValidator, deleteMembershipValidator } = require('../utils/validators/membership')
const { getMemberships, getVIPMemberships, addMembership, getMembershipById, updateMembershipById, deleteMembershipById } = require('../controllers/membership')
const AdminAuth = require('../middlewares/adminAuth')
const EditorAdminAuth = require('../middlewares/editorAdminAuth')

router
    .route('/')
    .get(getMemberships)
    .post(addMembershipValidator, AdminAuth, addMembership)

router.route('/:id')
    .get(getMembershipValidator, getMembershipById)
    .put(updateMembershipValidator, EditorAdminAuth, updateMembershipById)
    .delete(deleteMembershipValidator, AdminAuth, deleteMembershipById)

router.get('/VIP/private-training', getVIPMemberships)

module.exports = router