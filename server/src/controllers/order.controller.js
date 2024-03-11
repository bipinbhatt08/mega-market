const { io } = require('../index.js');
const Order = require("../models/order.model")
exports.createOrder=async(req,res)=>{
    try {
        await Order.create(req.body)
        io.emit('newOrder', { message: 'New order created!' });
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
        const orders = await Order.find({orderedBy:userId})
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
exports.getAllOrders =async(req,res)=>{
    try {
        const orders = await Order.find().populate('orderedBy')
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