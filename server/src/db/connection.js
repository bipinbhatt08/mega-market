// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const connection=async()=>{
const isConnected = await mongoose.connect('mongodb://127.0.0.1:27017/gharJaggaDb');
    if(isConnected){
      console.log("Connected")
    }else{
      console.log("Connection failed")
    }
  }

module.exports = connection