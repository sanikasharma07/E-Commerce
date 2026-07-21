import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const {search,setSearch,showsearch,setShowSearch}=useContext(ShopContext)
    const [visible,setvisible]=useState(false)
    const location=useLocation();
    useEffect(()=>{
    if(location.pathname.includes('Collection') )
        setvisible(true)
    else setvisible(false)
    },[location])
  return showsearch && visible ?  (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 my-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input onChange={(e)=>setSearch(e.target.value)} value={search} className='flex-1 outline-none bg-inherit text-sm ' type="text" placeholder='Search' />
        <img src={assets.search_icon} className='w-4' alt="" />
        </div>
      <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer ' alt="" />
    </div>
  ):null
}

export default SearchBar
