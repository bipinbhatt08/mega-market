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

exports.getMyOrders =async(req,res)=>{
    try {
        const userId = req.params.id
        const orders = await Order.find({orderedBy:userId}).populate('orderedBy')
        if(orders.length===0){
            return res.status(404).json({
                message:"No orders found"
    
            })
        }
        res.status(200).json({
            message:"Order feteched successfully.",
            orders
        })
    } catch (error) {
        console.log("ERROR",error)
    }
}