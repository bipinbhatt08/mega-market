const express= require('express')
const router = express.Router()
const { addProduct, getAllProducts } = require('../controllers/product.controller')


router.route('/products').post(addProduct).get(getAllProducts)

module.exports = router