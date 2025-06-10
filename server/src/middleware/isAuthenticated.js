const jwt = require("jsonwebtoken")
const {promisify} = require("util")
const User = require("../models/user.model")

const isAuthenticated = async (req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        return res.status(403).json({
            message : "Please login"
        })
    }
    
  try {
    const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
    const doesUserExist =  await User.findOne({_id : decoded.id})
    console.log(decoded)

   if(!doesUserExist){
    return res.status(404).json({
        message : "User doesn't exists with that token/id"
    })
   }
   req.user  = doesUserExist
   next()
  } catch (error) {
    res.status(500).json({
        message : error.message
    })
  }


}


module.exports = isAuthenticated