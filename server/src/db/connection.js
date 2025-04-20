// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const connection=async()=>{
  const isConnected = await mongoose.connect(process.env.MONGO_URI);
  if(isConnected){
      console.log("Connected")
    }else{
      console.log("Connection failed")
    }
  }

module.exports = connection