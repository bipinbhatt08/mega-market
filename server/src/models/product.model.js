
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
        type: String,
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
      imageUrl:{
        type: String,
        required: true,
      }
})

const Product = mongoose.model('Product',productSchem)
module.exports = Product