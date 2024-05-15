import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistItems:[],
    isLoadingWishList:false,
    totalWishListItem:0,
    wishlistMessage:null
}

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        setLoadingWishlist:(state)=>{
            state.isLoadingWishList= true;
        },
        clearLoadingWishlist:(state)=>{
            state.isLoadingWishList = false;
        },
        setWishListItem:(state, action)=>{
            const prevList = JSON.parse(localStorage.getItem("wishlistItems"));
            localStorage.setItem("wishlistItems", JSON.stringify(prevList?[...prevList,action.payload]:[action.payload]));
            state.isLoadingWishList = false;
            state.wishlistMessage = "Item added successfully"
        },
        getWishListItem:(state, action)=>{
            const items = JSON.parse(localStorage.getItem("wishlistItems"));
            state.wishlistItems = items?items:[];
            state.totalWishListItem = state.wishlistItems.length;
            state.isLoadingWishList = false;
        },
        deleteWishListItem:(state, action)=>{
            const items = JSON.parse(localStorage.getItem("wishlistItems"));
            localStorage.setItem("wishlistItems", JSON.stringify(items.filter((item)=>item !== action.payload )));
            state.wishlistMessage = "Item removed successfully";
            state.isLoadingWishList = false;
        },
        clearWishlistSuccess:(state)=>{
            state.wishlistMessage = null;
        }
    }
});


export const {setLoadingWishlist, clearLoadingWishlist, setWishListItem, getWishListItem, deleteWishListItem, clearWishlistSuccess} = wishlistSlice.reducer;

export default wishlistSlice.reducer;