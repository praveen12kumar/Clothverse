import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoadingCart:false,
    cartItems:[],
    cartMessage:null,
    cartError:null,
    cartCount:0,
    totalCartCost:0,
}


export const addCartItem = createAsyncThunk("cart/addCartItem", async(cartData, ThunkAPI)=>{
    try {
        const config = {
            header:{
                "Content-type":"application/json"
            }
        };
        const {data} = await axios.post("/api/v1/cart", cartData, config);
        console.log("cart data", data);
        return data;
    } catch (error) {
        console.log(error);
        return ThunkAPI.rejectWithValue(error.response.data.message);
    }
});


export const getCartItems = createAsyncThunk("cart/getCartItems", async(data, ThunkAPI)=>{
    try {
        const {data} = await axios.get("/api/v1/cart",);
        //console.log("cart data", data);
        return data.data;
    } catch (error) {
        console.log(error);
        return ThunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async(cartItemId, ThunkAPI)=>{
    try {
        const config = {
            header:{
                "Content-type":"application/json"
            }
        };
        await axios.delete("/api/v1/cart", {...config, data:{cartItemId}});
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteAllCart = createAsyncThunk("cart/deleteAllCart", async(data, ThunkAPI)=>{
    try{
        const {data} = await axios.delete("/api/v1/cart/all");
        console.log("cart data", data);
        return data; 
    }
    catch(error){
        return ThunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async(cartData, ThunkAPI)=>{
    try {
        const config = {
            header:{
                "Content-type":"application/json"
            }
        };
        const {data} = await axios.put("/api/v1/cart",{...cartData}, config);
        // console.log("data", data);
        return data.data;
    } catch (error) {
        
        return ThunkAPI.rejectWithValue(error.response.data.message);
    }
})


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        clearErrors:(state)=>{
            state.cartError = null;
        },
        clearMessage:(state)=>{
            state.cartMessage = null;
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(addCartItem.pending, (state)=>{
            state.isLoadingCart = true;
        })
        .addCase(addCartItem.fulfilled, (state, action) => {
            state.isLoadingCart = false;
            state.cartItems.push(action.payload.data);
            state.cartMessage = action.payload.message;
            state.cartCount = state.cartItems.length;
        })
        .addCase(addCartItem.rejected, (state, action)=>{
            state.isLoadingCart = false;
            state.cartError = action.payload;
        })

        .addCase(getCartItems.pending,(state)=>{
            state.isLoadingCart = true;
        })
        .addCase(getCartItems.fulfilled,(state, action)=>{
            state.isLoadingCart = false;
            state.cartItems = action.payload;
            state.cartCount = state.cartItems?.length;
            state.totalCartCost = state.cartItems?.reduce((acc, item)=>{
                return acc + item?.product?.price * item?.quantity
            },0)
        })
        .addCase(getCartItems.rejected,(state,action)=>{
            state.isLoadingCart = false;
            state.cartError = action.payload.message;
        })

        .addCase(deleteCartItem.pending, (state)=>{
            state.isLoadingCart = true;
        })
        .addCase(deleteCartItem.fulfilled, (state, action)=>{
            state.isLoadingCart = false;
            state.cartMessage = "Cart item deleted"
        })
        .addCase(deleteCartItem.rejected, (state, action)=>{
            state.isLoadingCart = false;
            state.cartError = action.payload.message;
        })

        .addCase(updateCartItem.pending, (state)=>{
            state.isLoadingCart = true;
        })
        .addCase(updateCartItem.fulfilled, (state, action)=>{
            state.isLoadingCart = false;
            state.cartMessage = "Cart item updated";
            state.cartItems = state.cartItems.filter((item)=> item._id !== action.payload._id);
            state.cartItems.push(action.payload);
        })
        .addCase(updateCartItem.rejected, (state, action)=>{
            state.isLoadingCart = false;
            state.cartError = action.payload;
        })
        // delete all cart items
        .addCase(deleteAllCart.pending, (state)=>{
            state.isLoadingCart = true;
        })
        .addCase(deleteAllCart.fulfilled, (state, action)=>{
            state.isLoadingCart = false;
            state.cartItems = [];
            state.cartCount = 0;
            state.totalCartCost = 0;
        })
        .addCase(deleteAllCart.rejected, (state, action)=>{
            state.isLoadingCart = false;
            state.cartError = action.payload.message;
        })
        
    }
});

export const {clearErrors, clearMessage} = cartSlice.actions;
export default cartSlice.reducer;










