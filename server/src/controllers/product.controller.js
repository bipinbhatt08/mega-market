const Product = require("../models/product.model")

exports.addProduct = async(req,res)=>{
    
    await Product.create(req.body)
    res.status(200).json({
        message:"Product added succesfully!"
    })
}