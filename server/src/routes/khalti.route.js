const express= require('express')
const { initiatePayment } = require('../controllers/khalti.controller')

const router = express.Router()
router.route('/payment/khalti/initiate').post(initiatePayment)
module.exports = router