const express= require('express')
const { initiatePayment, verifyPidx } = require('../controllers/khalti.controller')

const router = express.Router()
router.route('/payment/khalti/initiate').post(initiatePayment)
router.route('/payment/khalti/verify').post(verifyPidx)
module.exports = router