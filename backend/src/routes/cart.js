const express=require('express');
const router=express.Router();
const {addItemToCart}=require('../controller/cart');
const { requiredSignIn ,userMiddleware } = require('../Common-middleware');

router.post('/user/cart/addtocart',requiredSignIn,userMiddleware,addItemToCart)

module.exports=router;  