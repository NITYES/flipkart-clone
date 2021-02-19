const jwt=require('jsonwebtoken');

exports.requiredSignIn=(req,res,next)=>{


    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1]
        const user=jwt.verify(token , process.env.JWT_SECRET)
        console.log(user)
        req.user=user;
        next();
    }
    else{
        return res.status(400).json({
            message:"Authauriztion is required "
        })
    }
   
}

exports.userMiddleware=(req,res,next)=>{

if(req.user.role !== "user"){
    return res.status(401).json({message:"User Access Denied"})
}
next();

}

exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(401).json({message:"Admin Access Denied"})
    }
    next();
}