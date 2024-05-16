import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import productSlice from "./features/product/productSlice";
import wishlistSlice from "./features/wishlist/wishlistSlice";
import cartSlice from "./features/cart/cartSlice";
const store = configureStore({
    reducer:{
        user:userSlice,
        products:productSlice,
        cart:cartSlice,
        wishlist:wishlistSlice,
        

    }
});



export default store;