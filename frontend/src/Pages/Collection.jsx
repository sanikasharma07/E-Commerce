import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'
import SearchBar from '../Components/SearchBar'

const Collection = () => {
  const { products,search,showsearch } = useContext(ShopContext)
  const [showfilter, setShowfilter] = useState(false)
  const [filterProduct, setfilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subcategory, setSubCategory] = useState([])
  const [sortType, setsortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  // FIXED: All logic (filtering AND sorting) is now in one powerful function
  const applyFilter = () => {
    let productsCopy = products.slice();
    if(showsearch && search){
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    // 1. Filter by Category
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    
    // 2. Filter by SubCategory
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subCategory));
    }

    // 3. Sort the remaining products
    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a, b) => a.price - b.price); // Fixed typos
        break;
      case 'high-low':
        productsCopy.sort((a, b) => b.price - a.price); // Fixed high-low math
        break;
      default:
        // 'relavent' does nothing, just keeps default order
        break; 
    }
    
    // 4. Update the screen
    setfilterProduct(productsCopy)
  }

  // FIXED: Added sortType to the array. 
  // Now, if you check a box OR change the dropdown, the screen updates perfectly!
  useEffect(() => {
    applyFilter();
  }, [category, subcategory, sortType, products,search,showsearch])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter options */}
      <div className='min-w-60'>
        <p onClick={() => setShowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`}/>
        </p>
      
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
             <p className='flex gap-2'>
               <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} /> Men
             </p>
             <p className='flex gap-2'>
               <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/> Women
             </p>
             <p className='flex gap-2'>
               <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/> Kids
             </p>
          </div>
        </div>

        {/* subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
             <p className='flex gap-2'>
               <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory}/> Topwear
             </p>
             <p className='flex gap-2'>
               <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
             </p>
             <p className='flex gap-2'>
               <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
             </p>
          </div>
        </div>  
      </div>
        
      {/* right side */}
      <div className='flex-1'>
     
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProduct.map((item) => (
               <ProductItem key={item._id} name={item.name} id={item._id} image={item.image} price={item.price}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection