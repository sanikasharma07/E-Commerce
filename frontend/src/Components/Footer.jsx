import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit officiis, impedit culpa qui consectetur labore.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit officiis, impedit culpa qui consectetur labore.
          </p>
        </div>
        
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
              <li className='cursor-pointer hover:text-black'><Link to='/' onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
              <li className='cursor-pointer hover:text-black'><Link to='/About' onClick={() => window.scrollTo(0, 0)}>About Us</Link></li>
              <li className='cursor-pointer hover:text-black'><Link to='/Delivery' onClick={() => window.scrollTo(0, 0)}>Delivery</Link></li>
              
              {/* FIXED: Now uses an anchor link to scroll to an ID on the home page */}
              <li><a href='/#privacy' className='cursor-pointer hover:text-black'>Privacy Policy</a></li>
          </ul>
        </div>
        
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
              <li>+1-212-456-7890</li>
              <li><a href="mailto:abc@gmail.com" className='cursor-pointer hover:text-black'>abc@gmail.com</a></li>
          </ul>
        </div>
      </div>
      
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com-All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer