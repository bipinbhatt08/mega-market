const express= require('express')
const router = express.Router()
const multer  = require('multer')

var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const allow = [ 'image/jpeg','image/png','image/jpg','']
    if(!allow.includes(file.mimetype)){
      cb(new Error("Invalid file type. Only supports: jpeg,png and jpg"))
      return
    }
    cb(null, "uploads/productImgs/");
  },
  filename: function (req, file, cb) {
    cb(null, (Date.now() + "-" + file.originalname).replace(" ",""));
  },
});
  
const upload = multer({ storage: storage })

const { addProduct, getAllProducts, getSingleProduct, getProductOfAdmin } = require('../controllers/product.controller')


router.route('/products').post(upload.single('productImage'),addProduct).get(getAllProducts)

router.route('/products/:id').get(getSingleProduct)
router.route('/admin/products').get(getProductOfAdmin)
module.exports = router