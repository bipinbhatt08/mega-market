const express= require('express')
const { createOrder, getMyOrders, getAllOrders, getSingleOrder } = require('../controllers/order.controller')
const router = express.Router()
router.route('/orders').post(createOrder).get(getAllOrders)
router.route('/my-orders/:id').get(getMyOrders)
router.route('/orders/:id').get(getSingleOrder)
module.exports = router