const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "*"
  }
})
module.exports.io = io;
io.on('connection', (socket) => {
  console.log('a user connected');
})

const cors = require('cors')


const allowedOrigins = ['http://localhost:3000', 'https://mega-market-flame.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

//dotenv
require('dotenv').config()
const port = process.env.PORT

//database connection
const connection = require("./db/connection")
connection()


app.use(express.static('uploads'));
//parsing
app.use(express.json())

const userRoute = require('./routes/user.route.js')
const productRoute = require('./routes/product.route.js')
const categoryRoute = require('./routes/category.route.js')
const orderRoute = require('./routes/order.route.js')
const notificationRoute = require('./routes/notification.route.js')
const khaltiRoute = require('./routes/khalti.route.js')
app.use('',userRoute)
app.use('',productRoute)
app.use('',categoryRoute)
app.use('',orderRoute)
app.use('',notificationRoute)
app.use('',khaltiRoute)

server.listen(port, () => {
  console.log(`Ecommerce  app listening on port ${port}`)
})