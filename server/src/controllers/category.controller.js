const Category = require("../models/category.model")

exports.addCategory=async(req,res)=>{
    const categoryExists =  await Category.findOne({name:req.body.name})
    if(categoryExists){
        return res.status(400).json({
            message:"Category already exists"
        })
    }
    await Category.create(req.body)
    res.status(200).json({
        message:"Category added successfully"
    })
}
exports.getCategory = async(req,res)=>{
    const categories =  await Category.find()
    if(categories.length==0){
        return res.status(404).json({
            message:"No categories"
        })
    }
    res.status(200).json({
        message:"Category fetched successfully",
         categories
    })

}