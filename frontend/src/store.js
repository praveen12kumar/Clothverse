import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import productSlice from "./features/product/productSlice";
import wishlistSlice from "./features/wishlist/wishlistSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
        products:productSlice,
        wishlist:wishlistSlice,
        

    }
});



export default store;