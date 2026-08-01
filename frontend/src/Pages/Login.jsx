import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState,setcurrentState]=useState("Login")
  const {token,settoken,navigate,backendURL}=useContext(ShopContext)
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const submithandler=async(e)=>{
        e.preventDefault();
        try {
          if(currentState==='Login'){
          const response=await axios.post(backendURL+'/api/user/login',{email,password})
           if(response.data.success){
          settoken(response.data.token)
            localStorage.setItem('token',response.data.token)
          
          
        }
        else{
          toast.error(response.data.message) 
        }
          }
        else {
          const response=await axios.post(backendURL+'/api/user/register',{name,email,password})
        if(response.data.success){
          settoken(response.data.token)
            localStorage.setItem('token',response.data.token)
          
          
        }
        else{
          toast.error(response.data.message)
        }
        }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
  }
  useEffect(()=>{
   if(token){
    navigate('/')
   }
  },[token])
  
  return (
    <div>
      <form onSubmit={submithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
          <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState} </p>
            <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
          </div>
{currentState==='Login'?'':<input onChange={(e)=>setname(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
<input onChange={(e)=>setemail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
<input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
<div className='w-full flex justify-between text-sm mt-[-8px]'>
  <p className='cursor-pointer'>Forgot Your Password?</p>
  {
    currentState==='Login'?<p onClick={()=>setcurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>:<p onClick={()=>setcurrentState('Login')} className='cursor-pointer'>Login</p>
  }
</div>
     <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login'?'Sign In':'Sign Up'} </button>
      </form>
    </div>
  )
}

export default Login
