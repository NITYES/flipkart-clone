const express=require('express');
const app=express();
const env=require('dotenv');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');

const authRoutes=require('./routes/auth')
const adminauthRoutes=require('./routes/admin/auth')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')




//enviroment variable or you can call  constant
env.config();


// middelware..........
//static file middleware
app.use('/public',express.static(path.join(__dirname,'uploads')))


//middleware body parser   
app.use(express.json());

//route 
app.use('/api',authRoutes);
app.use('/api',adminauthRoutes);     
app.use('/api',categoryRoutes) ;
app.use('/api',productRoutes) 
app.use('/api',cartRoutes) 







     
//mongodb connection 
// mongodb+srv://nityes:<password>@cluster0.gsxwg.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect( `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.gsxwg.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,  
     useUnifiedTopology: true,
     useCreateIndex:true  
    }).then(()=>{
        console.log('mongo db connected and also to atlas ')
    });


app.get("/",(req,res)=>{
res.status(200).json({message:"hai i am from api"})
})
 
app.post('/data',(req,res)=>{
    res.status(200).json({message:req.body})

})


app.listen(process.env.PORT,()=>{
    console.log(`server started listening on ${process.env.PORT}`)
})