const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({

     name:{
         type:String,
         trim:true,
         required:true
     },
     slug:{
         type:String,
         unique:true,
         required:true,
     },
     categoryImage:{
         type:String
     },
     parentId:{
         type:String,
     }

},{timestamps:true})

module.exports=mongoose.model("Category",categorySchema)