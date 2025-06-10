const express= require('express')
const { addCategory, getCategory } = require('../controllers/category.controller')
const isAuthenticated = require('../middleware/isAuthenticated')
const router = express.Router()

router.route('/categories').post(addCategory).get(getCategory)
module.exports = router