const express= require('express')
const router = express.Router()
const { addProduct, getAllProducts, getSingleProduct } = require('../controllers/product.controller')


router.route('/products').post(addProduct).get(getAllProducts)
router.route('/products/:id').get(getSingleProduct)
module.exports = router