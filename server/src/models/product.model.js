
const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchem = new Schema({
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount:{
        type:Number,
        required: true
      },
      productImage:{
        type: String,
        required: true,
      },
      quantity:{
        type:Number,
        required: true
      }
})

const Product = mongoose.model('Product',productSchem)
module.exports = Product