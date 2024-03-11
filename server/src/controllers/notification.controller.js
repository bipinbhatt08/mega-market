const Notification = require("../models/notification.mode")

exports.createNotification = async(req,res)=>{
    try {
        await Notification.create(req.body)
        res.status(200).json({
            message:"Notification created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal sever error"
        })
    }
}
exports.getNotifications = async(req,res)=>{
    try {
        const notifications = await Notification.find()
        res.status(200).json({
            message:"Notification fetched successfully",
            notifications
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal sever error"
        })
    }
}