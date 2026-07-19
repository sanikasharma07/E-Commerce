import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestseller,setBestseller]=useState([])
    useEffect(()=>{
       const bestproducts= products.filter((product)=> product.bestseller===true)
       setBestseller(bestproducts.slice(0,5))
    },[products])
  return (
    <div className='my-10' >
      <div className='text-center text-3xl py-8' >
      <Title text1={'BEST'} text2={'SELLER'}></Title>
      <p className='w-3/4 m-auto text-xs sm:text-sm md_text_base text-gray-600' >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum unde voluptatum nemo blanditiis pariatur magnam.</p>
      </div>
   <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
    {
    bestseller.map((item,index)=>(
    <ProductItem key={index} id={item._id} name={item.name}  image={item.image} price={item.price} /> // better to use item._id as key
    ))
  }
   </div>

    </div>
  )
}

export default BestSeller
