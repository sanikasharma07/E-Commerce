import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'

const PlaceOrder = () => {
  const [method,setmethod]=useState('cod')
  const [formData,setformData]=useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'', 
    country:'',
    phone:''
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name // name is like name="email" in input tag
    const value=event.target.value
    setformData((prev)=>({...prev,[name]:value}))
  }

  const {navigate,backendURL,token,cartitems,setcartitems,getcartamount,delivery_fee,products}=useContext(ShopContext)
const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
        let orderItems = []

        for (const items in cartitems) {
            for (const item in cartitems[items]) {
                if (cartitems[items][item] > 0) {
                    // Find the product in the database
                    const foundProduct = products.find(product => product._id === items)
                    
                    // FIX: Make sure the product actually exists before cloning it!
                    if (foundProduct) {
                        const itemInfo = structuredClone(foundProduct)
                        itemInfo.size = item
                        itemInfo.quantity = cartitems[items][item]
                        orderItems.push(itemInfo)
                    }
                }
            }
        }

        const orderData = {
            address: formData,
            items: orderItems,
            amount: getcartamount() + delivery_fee
        }

        switch (method) {
            case 'cod':
                const response = await axios.post(backendURL + '/api/order/place', orderData, { headers: { token } })
                if (response.data.success) {
                  toast.success(response.data.message)
                    setcartitems({})
                    navigate('/Orders')
                } else {
                    toast.error(response.data.message)
                }
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }
  return (
  <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t'>
      {/*Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={(e)=>onChangeHandler(e)} name='firstname' value={formData.firstname} className='border broder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={(e)=>onChangeHandler(e)} name='lastname' value={formData.lastname} className='border broder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={(e)=>onChangeHandler(e)} name='email' value={formData.email} className='border broder-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' /> 
        <input required onChange={(e)=>onChangeHandler(e)} name='street' value={formData.street}  className='border broder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={(e)=>onChangeHandler(e)} name='city' value={formData.city} className='border broder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required  onChange={(e)=>onChangeHandler(e)} name='state' value={formData.state} className='border broder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={(e)=>onChangeHandler(e)} name='zipcode' value={formData.zipcode} className='border broder-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip Code' />
          <input required onChange={(e)=>onChangeHandler(e)} name='country' value={formData.country} className='border broder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={(e)=>onChangeHandler(e)} name='phone' value={formData.phone} className='border broder-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>
      {/*Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
       <CartTotal/>
        </div>
        <div className='mt-12'>
           <Title text1={'PAYMENT'} text2={'METHOD'}/>
           {/*Payment Selection Method */}
           <div className='flex gap-3 flex-col lg:flex-row'>
            <div  onClick={()=>setmethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full  ${method==='stripe'?'bg-green-400':'' }`}></p>
            <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>
             <div  onClick={()=>setmethod('razorpay')}className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-400':'' }`}></p>
            <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>
             <div onClick={()=>setmethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':'' }`}></p>
             <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
           </div>
           <div className='w-full text-end mt-8'>
           <button type="submit"  className='text-sm px-16 py-3 bg-black text-white'>PLACE ORDER</button>
           </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
