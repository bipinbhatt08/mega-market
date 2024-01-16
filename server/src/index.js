const express = require('express')
const app = express()

//dotenv
require('dotenv').config()
const port = process.env.PORT

//database connection
const connection = require("./db/connection")
connection()

//parsing
app.use(express.json())

const userRoute = require('./routes/user.route.js')
app.use('',userRoute)
app.listen(port, () => {
  console.log(`GharJagga app listening on port ${port}`)
})