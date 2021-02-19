const slugify=require('slugify')
const Category =require('../model/category')

//recursive function ....VVI
function createCategories(category,parentId=null){
    let categorys;
    let categoryList=[] ;
    if(parentId==null){
        categorys=category.filter((item)=>item.parentId==undefined)
    }else{
        categorys=category.filter((item)=>item.parentId==parentId)
  }     
  
  for(let cate of categorys){

      categoryList.push({
          _id:cate._id,
          name:cate.name,
          slug:cate.slug,
          children:createCategories(category,cate._id)
      })

  }

        return categoryList;

}

exports.addCategory=(req,res)=>{



    const categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name)
    }   

    if(req.file){
        let  categoryUrl=process.env.API +'/public/' + req.file.filename;
        categoryObj.categoryImage=categoryUrl;
      }

    if(req.body.parentId){
        categoryObj.parentId=req.body.parentId
    }

    const cat=new Category(categoryObj);

    cat.save((error,category)=>{

        if(error) return res.status(400).json({error  });
        if(category) return res.status(201).json({
            category
        })
})

}


exports.getCategory=(req,res)=>{
    Category.find({}).exec((error,category)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(category){

              let categoryList=createCategories(category)

            return res.status(200).json({
                categoryList
            })
        }
    })
}