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
exports.addProduct = async(req,res)=>{
    try {
        const {title,price,description,discount,category,quantity} = req.body

        const productImage= req.file?.filename 
        await Product.create({
            title,
            price,
            description,
            discount,
            category,
            quantity,
            productImage
        })
    
        res.status(200).json({
            message:"Product created succesfully"
        })
    } catch (error) {
        console.log(error)
    }

}

exports.getSingleProduct = async(req,res)=>{

    try {
        console.log(req)
        const {id} = req.params
        const product = await Product.findById(id)

        if(!product){
           return res.status(404).json({
                message:"No Product Found"
            })
        }
        res.status(200).json({
            message:"Product fetched succesfully",
            product
        })
    } catch (error) {
        console.log(error)
    }
}