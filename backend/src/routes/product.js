const express=require('express');
const router=express.Router();
const Category=require('../model/category')
const {addProducts}=require('../controller/product');
const { requiredSignIn ,adminMiddleware } = require('../Common-middleware');
const multer=require("multer");
const shortid=require('shortid');
const path=require('path')


//upload middleware........
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  }) 
   
  var upload = multer({ storage: storage })




router.post('/product/create',requiredSignIn,adminMiddleware,upload.array('productPictures'),addProducts);
// router.get('/product/getproduct',getProducts);


module.exports=router;        