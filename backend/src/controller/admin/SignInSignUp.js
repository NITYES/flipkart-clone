const User=require('../../model/user');

const jwt=require('jsonwebtoken');

//signup................
exports.signup=(req,res)=>{

    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user){
            res.status(400).json({
                message:"Admin already registered."
            })
        }
    //destructure the req.body
        const {email,
            firstName,
            lastName,
            password } =req.body;
    //create new user 
        const _user=new User({
            email,
            firstName,
            lastName,
            password,
            userName:Math.random().toString(),
            role:"admin"
        })
        //save to the database
        _user.save((err,data)=>{
            if(err){
                return res.status(400).json({
                    message:"something went wrong"
                })
            };
            if(data){
                return res.status(201).json({
                    message:"Admin Created Successfully"
                })
            }
        })
    })
}

//sign in ...........
exports.signin=(req,res)=>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(error){
            return res.status(400).json({
                error,
            })
        } 
        if( user ){

     if(user.authenticate(req.body.password) && user.role=="admin"){
           
        const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});
        const {_id,firstName,lastName,email,role,fullName}=user;

        return res.status(200).json({
            token,
            user:{
                _id,
                  firstName,
                  lastName,
                  email,
                  fullName,
                   role,
            }

        })

     }else{
         return res.status(400).json({
             message:"Invalid Passwords.."
         })
     }
 }else{
            return res.status(401).json({
                message:"something went wrong"
            })
        }
    })
}


//Requiredsign in

