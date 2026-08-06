import { Product } from "../models/abc.js"
import {v2 as cloudinary,v2} from 'cloudinary'


// for adding product
const addProduct=async(req,res)=>{
try {
   console.log("--- INCOMING REQUEST ---");
      console.log("BODY DATA:", req.body);
      console.log("FILE DATA:", req.files);
      const{name,sizes,description,price,category,subCategory,bestseller}=req.body
      const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]
  if(!image1 && !image2 && !image3 && !image4){
   return res.json({status:false,message:"Please enter atleast one image"})
  }
 const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)


 let imagesURL=await Promise.all(
    images.map(async(item)=>{
        let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
        return result.secure_url
    })
 )
 const productData={
    name,
    description,
    category,
    price:Number(price),
    subCategory,
    bestseller:Boolean(bestseller),
        sizes:JSON.parse(sizes),
        image: imagesURL,
        
 }
 const product=new Product(productData)
 await product.save()
  res.json({status:true,message:"Product added"})
} catch (error) {
    res.json({status:false,message:error.message})
}


}

// for list all products
const listProducts=async(req,res)=>{
   try {
    const products= await Product.find({});
    res.json({success:true,products})
   } catch (error) {
      res.json({status:false,message:error.message})
   }
}

// for removing product
const removeProduct=async(req,res)=>{
try {
    await Product.findByIdAndDelete(req.body.id)
     res.json({success:true,message:"Product removed"})

} catch (error) {
     res.json({status:false,message:error.message})
}
}

// for single product info
const singleProduct=async(req,res)=>{
try {
      const info=await Product.findById(req.body.id)
      res.json({success:true,info})
} catch (error) {
     res.json({status:false,message:error.message})
}
}

export {addProduct,removeProduct,singleProduct,listProducts}