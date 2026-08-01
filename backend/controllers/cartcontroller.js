import { User } from "../models/usermodel.js"


// addProducts
const addToCart= async(req,res)=>{
try{
const {userId,itemId,size}=req.body
const userData=await User.findById(userId)
let cartData= await userData.cartData
if(cartData[itemId]){
    if(cartData[itemId][size]){
        cartData[itemId][size]+=1
    }
    else cartData[itemId][size]=1
}
else{
    cartData[itemId]={}
cartData[itemId][size]=1
}
await User.findByIdAndUpdate(userId,{cartData})
res.json({success:true,message:"Added to cart"})
}catch(error){
console.log(error)
res.json({success:false,message:error.message})
}
}

//updata products
const updateCart=async(req,res)=>{
 try {
    const {itemId,size,userId,quantity}=req.body
    const userData=await User.findById(userId)
    let cartData= await userData.cartData
    cartData[itemId][size]=quantity;
    await User.findByIdAndUpdate(userId,{cartData})
res.json({success:true,message:"Cart Updated"})
 } catch (error) {
    console.log(error)
res.json({success:false,message:error.message})
 }
}




// get user cart data
const getUsercart=async(req,res)=>{
   try {
    const {userId}=req.body
   const userData= await User.findById(userId)
    const cartData= await userData.cartData
    res.json({success:true,cartData})
   } catch (error) {
        console.log(error)
res.json({success:false,message:error.message})
   }
}

export {addToCart,updateCart,getUsercart}