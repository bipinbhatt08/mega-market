const express= require('express')
const { addCategory, getCategory } = require('../controllers/category.controller')
const router = express.Router()


router.route('/categories').post(addCategory).get(getCategory)
module.exports = router