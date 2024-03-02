const express= require('express')
const { createOrder, getMyOrders, getAllOrders } = require('../controllers/order.controller')
const router = express.Router()
router.route('/orders').post(createOrder).get(getAllOrders)
router.route('/orders/:id').get(getMyOrders)
module.exports = router