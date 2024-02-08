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
        const {title,price,description,discount,category} = req.body
        
        await Product.create({
            title,
            price,
            description,
            discount,
            category,
            imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx09klQ8vzKAIrXgsYx8atQ1yCAvcIxpHLaRYyPgeLwg&s"
        })
    
        res.status(200).json({
            message:"Product created succesfully"
        })
    } catch (error) {
        console.log(error)
    }

}