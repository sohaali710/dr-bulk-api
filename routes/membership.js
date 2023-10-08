const express = require('express')
const router = express.Router()
const { addMembershipValidator, getMembershipValidator, updateMembershipValidator, deleteMembershipValidator, editorUpdateValidator } = require('../utils/validators/membership')
const { getMemberships, getVIPMemberships, addMembership, getMembershipById, updateMembershipById, deleteMembershipById, editorUpdateMembership } = require('../controllers/membership')
const AdminAuth = require('../middlewares/adminAuth')
const EditorAuth = require('../middlewares/editorAuth')
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

router.route('/editor/:id')
    .put(editorUpdateValidator, EditorAuth, editorUpdateMembership)

module.exports = router