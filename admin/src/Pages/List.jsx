import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify' // Good idea to import toast for errors!
import { currency } from '../App'

// FIX 1: Accept the token prop
const List = ({ token }) => { 
  const [list, setlist] = useState([])

  const fetchlist = async () => {
   try {
    // FIX 2: Send the token in the headers
    const response = await axios.get(backendUrl + '/api/product/list', {
        headers: { token }
    })
    
    // Check your console to see exactly how your backend sends the array back!
    
    if(response.data.success) {
        // Assuming your backend sends the array as "products" or "data"
        setlist(response.data.products) 
    } else {
        toast.error(response.data.message)
    }

   } catch (error) {
     console.log(error)
     toast.error(error.message)
   } 
  }

const remove=async(id)=>{
try {
    const response= await axios.post(backendUrl+'/api/product/remove',{id:id},{headers:{token}})
    if(response.data.success) {
        // Assuming your backend sends the array as "products" or "data"
       
        toast.success(response.data.message)
         await fetchlist()
    } else {
        toast.error(response.data.message)
    }
} catch (error) {
  console.log(error)
  toast.error(error.message)
}
}

  useEffect(() => {
     fetchlist();
  }, []) // We only run this once when the component mounts

  return (
    <>
      
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/*list table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center '>Action</b>
        </div>
        {/* We will map through the 'list' here next! */}
        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index} >
   <img className='w-12' src={item.image[0]} alt="" />
   <p>{item.name}</p>
   <p>{item.category} </p>
   <p>{currency}{item.price} </p>
   <p  onClick={()=>remove(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List