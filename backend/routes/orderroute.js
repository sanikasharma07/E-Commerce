import express from "express";
import { placeOrder,placeOrderRazorpay,placeOrderStripe,getAllOrders, userOrders, updateStatus,verifyStripe,verifyRazorpay } from "../controllers/ordercontroller.js";
import adminAuth  from "../middleware/adminauth.js";
import auth from "../middleware/auth.js";

const orderRouter=express.Router();


//Admin features
orderRouter.post("/list", adminAuth,getAllOrders);
orderRouter.post("/status", adminAuth,updateStatus);

//Payment methods
orderRouter.post("/razorpay", auth,placeOrderRazorpay);
orderRouter.post("/stripe", auth, placeOrderStripe);
orderRouter.post("/place",auth ,placeOrder);

// user features
orderRouter.post("/userorders",auth,userOrders);

// verify payment
orderRouter.post("/verify",auth,verifyStripe)
orderRouter.post("/verifyRazorpay",auth,verifyRazorpay)

export default orderRouter;
 