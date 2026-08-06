import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/admin_assets/assets'
import { toast } from 'react-toastify'

const Orders = ({token}) => {
     const [orders,setOrders] =useState([])
     const [status,setstatus]=useState('Order Placed')
     const getOrders=async()=>{
      if(!token){
        return null;
      }
      try{
  const response=await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
  console.log(response.data.orders) 
  setOrders(response.data.orders.reverse())

      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
     }
     const statushandler=async (event,orderId)=>{
      try {
        const response= await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
        if(response.data.success) await getOrders()
      } catch (error) {
           console.log(error)
        toast.error(error.message)
      }
     }
     useEffect(()=>{
getOrders()
     },[token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          // FIX 1: Changed { to ( to return the JSX automatically
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
             <div>
               <div>
                {/* FIX 2: Wrapped this map inside { } so React knows it's code */}
                {
                  order.items.map((item, itemIndex) => {
                    if (itemIndex === order.items.length - 1) {
                      return <p className='py-0.5' key={itemIndex}>{item.name} x {item.quantity} <span> {item.size} </span></p>
                    } else {
                      // Added this so the other items render too!
                      return <p className='py-0.5' key={itemIndex}>{item.name} x {item.quantity} <span> {item.size} ,</span></p>
                    }
                  })
                } 
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstname + " " + order.address.lastname}</p>
           
<div>
  <p>{order.address.street + ","}</p>
  <p>{order.address.city + ", " + order.address.state + ", " +order.address.country+ ", " +order.address.zipcode}</p>

</div>
<p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items:{order.items.length}</p>
              <p className='mt-3'>Method :{order.paymentMethod}</p>
              <p>Payment: {order.paymentStatus?"Done":"Pending"}</p>
              <p>Date :{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select onChange={(event)=>statushandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
             </div>
          ))
        } 
      </div>
    </div>
  )
}

export default Orders