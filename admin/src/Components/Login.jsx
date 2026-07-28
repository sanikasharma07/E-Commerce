import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({settoken}) => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const submithandler = async (e) => {
    e.preventDefault()
    try {
       const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
       if(response.data.success) {
     settoken(response.data.token)
       }
       else{
        toast.error(response.data.message)
       }
    } catch (error) {
       console.log(error)
        toast.error(error.message)
    }
  }



  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        
        {/* FIX: Form handles the submit, enabling the "Enter" key */}
        <form onSubmit={submithandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                {/* FIX: Passed 'e' into the arrow function */}
                <input 
                  onChange={(e) => setemail(e.target.value)} 
                  value={email} 
                  className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                  type="email" 
                  placeholder='your@gmail.com' 
                  required 
                />
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                {/* FIX: Passed 'e', and fixed the 'rounded:md' typo */}
                <input 
                  onChange={(e) => setpassword(e.target.value)} 
                  value={password}  
                  className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                  type="password" 
                  placeholder='your password' 
                  required 
                />
            </div>
            {/* FIX: Removed onClick, it just needs type='submit' now */}
            <button className='mt-2 w-full py-2 px-4 bg-black text-white rounded-md' type='submit'>
              Login
            </button>
        </form>
      </div>
    </div>
  )
}

export default Login
