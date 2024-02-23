const { default: mongoose } = require("mongoose")
const Order = require("../models/order.model")
exports.createOrder=async(req,res)=>{
    try {
        await Order.create(req.body)
        res.status(200).json({
            message:"Order placed successfully."
        })
    } catch (error) {
        console.log("ERROR",error)
    }
}