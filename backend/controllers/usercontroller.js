import { User } from "../models/usermodel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from "validator/lib/isEmail.js";
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user login 
const loginUser= async (req,res)=>{
try {
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(!user) {
     res.json({status:false,message:"User with this email dosen't exists!"})
    }
    if(user.email!=email){
         res.json({status:false,message:"Password or email-id is wrong"})
    }
    const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch){
         res.json({status:false,message:"Password or email-id is wrong"})
    }
    const token= createToken(user._id)
    res.json({success:true,token})
} catch (error) {
     res.json({status:false,message:error.message})
}
}

// Route for user registration

const registerUser=async (req,res)=>{
   try {
    const {name,email,password}=req.body;

    // checking if user already exists
    const exists=await User.findOne({email})

    if(exists){
        return res.json({success:false,message:"User Already Exists"})
    }
    // validating email format and strong passowrd
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please Enter a Valid Email"})
    }
     if(password.length<8){
        return res.json({success:false,message:"Min Length of Password should be 8"})

    }

    // hashing user password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser= new User({
        name,
        email,
       password: hashedPassword,
    })


    const user=await newUser.save()
      const token= createToken(user._id)

      res.json({success:true,token})
   } catch (error) {
    res.json({success:false,message:error.message})
   }
}

//Route for admin login
const adminLogin=async (req,res)=>{
try {
    const {email,password}=req.body
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please Enter a Valid Email"})
    }
    if(email!=process.env.ADMIN_EMAIL || password!=process.env.ADMIN_PASSWORD )
        return res.json({success:false,message:"Invalid Credentials"})
    const token=jwt.sign(email+password,process.env.JWT_SECRET)
     res.json({success:true,token})
} catch (error) {
    res.json({success:false,message:error.message})
}
}

export {loginUser,registerUser,adminLogin}