const express= require('express')
const { createOrder, getMyOrders } = require('../controllers/order.controller')
const router = express.Router()
router.route('/orders').post(createOrder)
router.route('/orders/:id').get(getMyOrders)
module.exports = router