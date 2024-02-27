
const mongoose = require('mongoose')
const { Schema } = mongoose
const orderSchema = new Schema({
    products: {
        type: Object,
        required: true,
      },
    shippingAddress:{
        type:Object,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    totalPrice:{
        type:String,
        required:true
    },
    orderNotes:{
        type:String
    },
    receiverDetails:{
        type:Object,
        required:true
    },
    orderedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    }
    
})
const Order = mongoose.model('Order',orderSchema)
module.exports = Order