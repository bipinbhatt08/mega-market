const express= require('express')
const router = express.Router()
const { registerNewUser, loginUser } = require('../controllers/user.controller')


router.post('/register',registerNewUser)
router.post('/login',loginUser)

module.exports = router