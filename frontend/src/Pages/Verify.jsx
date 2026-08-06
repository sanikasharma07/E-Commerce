import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    // FIX 1: Changed backendUrl to backendURL (capital URL)
    const { navigate, token, setcartitems, backendURL } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    
    const verifyPayment = async () => {
        try {
             if (!token) {
              return null;
             }
             
             // Used the correct backendURL here
             const response = await axios.post(backendURL + '/api/order/verify', { success, orderId }, { headers: { token } })
             
             if (response.data.success) {
              setcartitems({})
              // FIX 2: Added the missing 'e' to navigate
              navigate('/Orders') 
             } else {
              navigate('/Cart')
             }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
    }

    useEffect(() => {
       verifyPayment()  
    }, [token])
    
  return (
    <div>
      
    </div>
  )
}

export default Verify