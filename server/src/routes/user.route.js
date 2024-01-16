const express= require('express')
const router = express.Router()
const { registerNewUser } = require('../controllers/user.controller')


router.post('/register',registerNewUser)

module.exports = router