import express from "express";
import {addToCart,updateCart,getUsercart} from '../controllers/cartcontroller.js'
import auth from '../middleware/auth.js'

const cartRouter=express.Router();
cartRouter.post('/add',auth,addToCart)
cartRouter.post('/update',auth,updateCart)
cartRouter.post('/get',auth,getUsercart)

export default cartRouter


