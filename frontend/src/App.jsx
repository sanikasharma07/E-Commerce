import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Orders from './Pages/Orders'
import Product from './Pages/Product'
import PlaceOrder from './Pages/PlaceOrder'
import Footer from './Components/Footer'
import OurPolicy from './Components/OurPolicy'


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[pvw]'>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Collection' element={<Collection/>} />
      <Route path='/About' element={<About/>} />
      <Route path='/Contact' element={<Contact/>} />
      <Route path='/Cart' element={<Cart/>} />
      <Route path='/Signin' element={<Signin/>} />
      <Route path='Signup' element={<Signup/>} />
      <Route path='/Orders' element={<Orders />} />
      <Route path='/Product/:ProductId' element={<Product/>} />
      <Route path='/PlaceOrder' element={<PlaceOrder/>} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App

