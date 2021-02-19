const express=require('express');
const router=express.Router();
const {addCategory,getCategory}=require('../controller/category');
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

router.post('/category/create',requiredSignIn,adminMiddleware,upload.single('categoryImage'),addCategory)
router.get('/category/getcategories',getCategory)


module.exports=router;