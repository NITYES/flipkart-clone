



const express=require("express");
const { signup, signin } = require("../controller/UserSignInSignUp");
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require("../Validators/SignInSignUpForm");

const router=express.Router();

router.post('/signup',validateSignUpRequest,isRequestValidated,signup);

router.post('/signin',validateSignInRequest,isRequestValidated,signin);

// router.post('/profile',requiredSignIn,(req,res)=>{

//     res.status(200).json({
//         message:"successfull"
//     })

// })



module.exports=router;