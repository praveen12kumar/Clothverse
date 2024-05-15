import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistItems:[],
    isLoadingWishlist:false,
    totalWishlistItem:0,
    wishlistMessage:null
}

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        setLoadingWishlist:(state)=>{
            state.isLoadingWishlist= true;
        },
        clearLoadingWishlist:(state)=>{
            state.isLoadingWishlist = false;
        },
        setWishlistItem:(state, action)=>{
            const prevList = JSON.parse(localStorage.getItem("wishlistItems"));
            localStorage.setItem("wishlistItems", JSON.stringify(prevList?[...prevList,action.payload]:[action.payload]));
            state.isLoadingWishlist = false;
            state.wishlistMessage = "Item added successfully"
        },
        getWishlistItem:(state)=>{
            const items = JSON.parse(localStorage.getItem("wishlistItems"));
            state.wishlistItems = items?items:[];
            state.totalWishlistItem = state.wishlistItems.length;
            state.isLoadingWishlist = false;
        },
        deleteWishlistItem:(state, action)=>{
            const items = JSON.parse(localStorage.getItem("wishlistItems"));
            localStorage.setItem("wishlistItems", JSON.stringify(items.filter((item)=>item._id !== action.payload )));
            state.wishlistMessage = "Item removed successfully";
            state.isLoadingWishlist = false;
        },
        clearWishlistSuccess:(state)=>{
            state.wishlistMessage = null;
        }
    }
});


export const {setLoadingWishlist, clearLoadingWishlist, setWishlistItem, getWishlistItem, deleteWishlistItem, clearWishlistSuccess} = wishlistSlice.actions;

export default wishlistSlice.reducer;