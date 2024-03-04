const express= require('express')
const router = express.Router()
const { registerNewUser, loginUser, getAllUsers } = require('../controllers/user.controller')


router.post('/register',registerNewUser)
router.post('/login',loginUser)
router.get('/users',getAllUsers)

module.exports = router