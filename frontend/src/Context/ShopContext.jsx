import { createContext, useEffect, useState } from "react"
import { products } from "../assets/forever-assets/assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showsearch, setShowSearch] = useState(false);
    const [cartitems, setcartitems] = useState({})
   const updatequantity= async(itemId,size,quantity)=>{
        let cartdata=structuredClone(cartitems)
        cartdata[itemId][size]=quantity;
        setcartitems(cartdata)
   }

    const addtocart = async (itemId, size) => {
        let cartData = structuredClone(cartitems)
        
        if (!size) {
            toast.error('Select Product Size')
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else cartData[itemId][size] = 1
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }   
        setcartitems(cartData)
    }

    // FIXED: Renamed loop variables for clarity and fixed the object targeting!
    const getCartCount = () => {
        let totalCount = 0;
        
        for (const itemId in cartitems) {
            // Added 'const' here
            for (const size in cartitems[itemId]) {
                try {
                    // Correctly targets [itemId][size]
                    if (cartitems[itemId][size] > 0) {
                        totalCount += cartitems[itemId][size];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const value = {
        products, currency, delivery_fee, search, setSearch, showsearch, setShowSearch, cartitems, addtocart, getCartCount,updatequantity
    }
    
    return (
        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider