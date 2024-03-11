const express= require('express')
const { createNotification, getNotifications } = require('../controllers/notification.controller')
const router = express.Router()
router.route('/notification').post(createNotification).get(getNotifications)
module.exports = router