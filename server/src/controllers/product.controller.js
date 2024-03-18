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
        const {title,price,description,discount,category,quantity,addedBy} = req.body
        const productImage= req.file?.filename 
        await Product.create({
            title,
            price,
            description,
            discount,
            category,
            quantity,
            addedBy,
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
exports.getProductOfAdmin= async(req,res)=>{
    try {
        const {addedBy} = req.query
        const products = await Product.find({addedBy}).populate('category')
        if(products.length===0){
            return res.status(403).json({
                message:"No products found"
            })
        }
        res.status(200).json({
            message:"Product fetched succesfully",
            products
        })
    } catch (error) {
        console.log("Internal Server Error:",error)
    }
}

exports.deleteProduct = async(req,res)=>{
    try {
        const {id}=req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
          }
        const product = await Product.findById(id).populate('category')
        if(!product){
           return res.status(404).json({
                message:"No Product Found"
            })
        }
        await Product.findByIdAndDelete(id)
        res.status(200).json({
            message:"Product Deleted succesfully",
        })
    } catch (error) {
        console.log("ERROR",error)
    }
}
exports.editProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const { title, price, description, discount, category, quantity, addedBy } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
          }
        let product = await Product.findById(id)
        if(!product){
           return res.status(404).json({
                message:"No Product Found"
            })
        }
       
        product.title = title;
        product.price = price;
        product.description = description;
        product.discount = discount;
        product.category = category;
        product.quantity = quantity;
        // Update product image if available

        if (req.file && req.file.filename) {
            product.productImage = req.file.filename;
        }
        await product.save();
        res.status(200).json({
            message:"Product Edited succesfully",
        })
    } catch (error) {
        console.log("ERROR",error)
    }
}