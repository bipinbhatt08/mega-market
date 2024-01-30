const Product = require("../models/product.model")

exports.addProduct = async(req,res)=>{
    
    await Product.create(req.body)
    res.status(200).json({
        message:"Product added succesfully!"
    })
}

exports.getAllProducts = async(req,res)=>{
    const products = await Product.find()
    if(products.length===0){
        return res.status(403).json({
            message:"No products found"
        })
    }
    res.status(200).json({
        message:"Product fetched succesfully",
        products
    })
}