const User = require("../models/user.model")

exports.registerNewUser = async(req,res)=>{
    try {
        const {username,email,password}= req.body
        if(!username||!email||!password){
           return res.status(400).json({
                message:"Username, email and password are required"
            })
        }
    
        const userExist = await User.findOne({email,username})
        if(userExist){
            return res.status(400).json({
                message:"User already exist"
            })
        }
        await User.create({username,email,password})
        res.status(200).json({
            message:"User registered successfully"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:"Internal server error"
        })
    }
}