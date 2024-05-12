import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoadingProduct: false,
    products:[],
    error:null,
    productsCount:0
}


export const getAllProducts = createAsyncThunk("products/getAllProducts", async(params, ThunkApi)=>{
    const {search, price, category, sort, page} = params;
    const query = new URLSearchParams();

    if (search) query.append('search', search);
      if (sort) query.append('sort', sort);
      if (category) query.append('category', category);
      if (price) query.append('price', price);
      if (page) query.append('page', page);

    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.get(`/api/v1/products?${query}`, config)
        console.log("all products",data);
        return data;

    } catch (error) {
        return ThunkApi.rejectWithValue(error.response.data)
    }
})


const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        clearErrors:(state)=>{
            state.error = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllProducts.pending, (state)=>{
            state.isLoadingProduct = true;
        })
        .addCase(getAllProducts.fulfilled, (state, action)=>{
            console.log('action',action);
            state.isLoadingProduct = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productCount;
        })
        .addCase(getAllProducts.rejected, (state, action)=>{
            state.isLoadingProduct = false;
            state.error = action.payload;
        })
    }
});

export const {clearErrors} = productSlice.actions;
export default productSlice.reducer;
