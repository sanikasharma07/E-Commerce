import {Orders} from '../models/ordermodel.js'
import { User } from '../models/usermodel.js' // FIX 2: Imported the User model!

// placing orders using COD method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        
        const orderdata = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD", // Good practice to track the method
            payment: false,       // COD means they haven't paid yet!
            date: Date.now()      // Date.now() is usually preferred for MongoDB timestamps
        }
        
        const newOrder = new Orders(orderdata)
        await newOrder.save() // FIX 1: Matched the exact capitalization
        
        // Clears the user's cart after a successful order
        await User.findByIdAndUpdate(userId, { cartData: {} })
        
        res.json({ success: true, message: "Order placed successfully" })
        
    } catch (error) {
        console.log(error)
        // Returning error.message makes debugging much easier later!
        res.json({ success: false, message: error.message }) 
    }
}


// placing orders using stripe method
const placeOrderStripe = async (req, res) => {
    
}


// placing orders using razorpay method
const placeOrderRazorpay = async (req, res) => {
    
}

// All Orders data for admin panel 
const getAllOrders = async (req, res) => {
    try{
    const orders= await Orders.find({})
    res.json({ success: true, orders })
    }catch(error){
           console.log(error)
    res.json({ success: false, message: error.message }) 
    }
}


// User order for frontend
const userOrders = async (req, res) => {
try{
  const {userId}=req.body
  const orders=await Orders.find({userId}).sort({date:-1})
  res.json({ success: true, orders })
}catch(error){
    console.log(error)
    res.json({ success: false, message: error.message })
}
}


// update staus
const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, getAllOrders, userOrders, updateStatus }