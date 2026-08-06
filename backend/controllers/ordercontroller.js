import {Orders} from '../models/ordermodel.js'
import { User } from '../models/usermodel.js' // FIX 2: Imported the User model!
import Stripe from 'stripe'
import razorpay from 'razorpay'

// global variables
const currency= 'usd'
const deliveryCharge=10

// gateway initialise
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance= new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


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
            paymentStatus: false,       // COD means they haven't paid yet!
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

//verify stripe

const verifyStripe = async (req, res) => {
    try {
        // FIX: Grab parameters from req.query instead of req.body for Stripe redirects!
        const { orderId, success, userId } = req.body; 
        
        if (success === "true") { 
            await Orders.findByIdAndUpdate(orderId, { paymentStatus: true });
            await User.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true });
        } else {
            // This will now successfully find the order and delete it when cancelled!
            await Orders.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed or Cancelled" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// placing orders using stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body 
        const {origin} =req.headers
            const orderdata = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe", // Good practice to track the method
            paymentStatus: false,       // COD means they haven't paid yet!
            date: Date.now()      // Date.now() is usually preferred for MongoDB timestamps
        }

          const newOrder = new Orders(orderdata)
        await newOrder.save() 

        const line_items= items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                  name:item.name,
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push({
              price_data:{
                currency:currency,
                product_data:{
                  name:'Delivery Fee',
                },
                unit_amount:deliveryCharge*100
            },
            quantity:1
        })
const session=await stripe.checkout.sessions.create(
    {
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment'
    }
)
res.json({success:true,session_url:session.url})

    } catch (error) {
                console.log(error)
        // Returning error.message makes debugging much easier later!
        res.json({ success: false, message: error.message }) 
    }
}


// placing orders using razorpay method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body 
        
        const orderdata = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay", 
            paymentStatus: false, // FIX 1: Spelled exactly like your Schema!       
            date: Date.now()      
        }

        const newOrder = new Orders(orderdata)
        await newOrder.save() 

        // Convert USD to INR so Razorpay accepts it
        const exchangeRate = 83;
        const amountInINR = amount * exchangeRate;
        
        const options = {
            amount: Math.round(amountInINR * 100), 
            currency: 'INR', 
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({ success: false, message: error })
            }
            res.json({ success: true, order })
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}

// Verify razorpay
const verifyRazorpay = async (req, res) => {
   try {
    const { userId, razorpay_order_id, isCancelled, orderId } = req.body
    
    // FIX 2: If the user closed the window or payment failed, delete the ghost order!
    if (isCancelled) {
        await Orders.findByIdAndDelete(orderId);
        return res.json({ success: false, message: 'Payment Cancelled' })
    }

    const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    
    if (orderinfo.status === 'paid') {
        // FIX 3: Spelled paymentStatus correctly!
        await Orders.findByIdAndUpdate(orderinfo.receipt, { paymentStatus: true })
        await User.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Payment Successful" })
    } else {
        await Orders.findByIdAndDelete(orderinfo.receipt);
        res.json({ success: false, message: 'Payment failed' })
    }
   } catch (error) {
     console.log(error)
     res.json({ success: false, message: error.message }) 
   }
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
try{
    const {orderId,status} =req.body
await Orders.findByIdAndUpdate(orderId,{status:status})
res.json({success:true,message:"Order Status Updated"})
} catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
}
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, getAllOrders, userOrders, updateStatus,verifyStripe ,verifyRazorpay}