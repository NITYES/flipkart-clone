const express=require("express");
const { signup, signin } = require("../../controller/admin/SignInSignUp");
const { validateSignUpRequest,validateSignInRequest, isRequestValidated } = require("../../Validators/SignInSignUpForm");
const router=express.Router();

router.post('/admin/signup',validateSignUpRequest,isRequestValidated,signup);

router.post('/admin/signin',validateSignInRequest,isRequestValidated,signin);





module.exports=router; 