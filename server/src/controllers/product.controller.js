const { default: mongoose } = require("mongoose")
const Product = require("../models/product.model")


exports.getAllProducts = async(req,res)=>{
    const products = await Product.find().populate('category')
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
        await Product.create(req.body)
        res.status(200).json({
            message:"Product created succesfully"
        })
    } catch (error) {
        console.log(error)
    }

}

exports.getSingleProduct = async(req,res)=>{

    try {
        // console.log(req)
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
          }
        const product = await Product.findById(id).populate('category')
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
        console.log("ERROR",error)
    }
}