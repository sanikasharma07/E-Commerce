import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets'
import NewsLetterBox from '../Components/NewsLetterBox'

const About = () => {
  return (
    <div>
<div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text-2={'US'} />
    </div>
    <div className='my-10 flex flex-col md:flex-row gap-16'>
     <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
     <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
     <p>Forever is a clothing brand built around timeless style, effortless comfort, and everyday confidence. We believe great fashion shouldn't be limited by trends—it should be something you can wear, love, and come back to again and again.</p>
     <p>From everyday essentials to statement pieces, Forever brings together modern designs and versatile styles made to fit seamlessly into your wardrobe. Because some styles fade, but the ones that truly feel like you are Forever.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>At Forever, our mission is to make timeless, comfortable, and stylish clothing that helps everyone express who they are—confidently, effortlessly, and every day.</p>
     </div>
    </div>
    <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'}/>
       </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Quality Assurance:</b>
           <p className='text-gray-600'>We believe great style starts with great quality. Every Forever piece is carefully crafted and checked to ensure comfort, durability, and a finish you can trust.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Convinience:</b>
           <p className='text-gray-600'>Shop effortlessly with a smooth, simple experience designed to make finding your perfect style quick and easy.</p>
        </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Exceptional Customer Service:</b>
           <p className='text-gray-600'>We're here for you every step of the way, providing friendly, responsive support to make every Forever experience a great one.</p>
        </div>
      </div>
   <NewsLetterBox/>
    </div>
    
  )
}

export default About
