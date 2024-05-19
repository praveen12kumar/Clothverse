import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    isLoadingProductReview:true,
    productReviews:[],
    productReview:null,
    productReviewMessage:null,
    productReviewError:null
}


export const addProductReview = createAsyncThunk("productReview/addProductReview", async(formData, ThunkAPI)=>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post("/api/v1/product/review", {...formData}, config);
        // console.log("Review Data", data);
        return data.productReview;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data);
    }
});


export const getProductReviews = createAsyncThunk("productReview/getProductReview", async(id, ThunkAPI)=>{
    try {
        const {data} = await axios.get(`/api/v1/product/reviews/${id}`);
        return data.data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data);
    }
})


export const getMyProductReview = createAsyncThunk("productReview/getMyProductReview", async(id, ThunkAPI)=>{
    
    try {
        const {data} = await axios.get(`/api/v1/product/review/${id}`);
        // console.log("Review Data", data);
        return data.data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data);
    }
});


export const deleteProductReview = createAsyncThunk("productReview/deleteProductReview", async(reviewData, ThunkAPI)=>{
    try {
        const {data} = await axios.delete(`/api/v1/product/review`, {...reviewData});
        console.log("Review Data", data);
        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data);
    }
});


const productReviewSlice = createSlice({
    name:"productReview",
    initialState,
    reducers:{
        clearErrors:(state)=>{
            state.productReviewError = null;
        },
        clearSuccess:(state)=>{
            state.productReviewMessage = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addProductReview.pending, (state)=>{
            state.isLoadingProductReview = true;
        })
        .addCase(addProductReview.fulfilled, (state, action)=>{
            state.isLoadingProductReview = false;
            state.productReview = action.payload;
            state.productReviewMessage = "Review added successfully";
        })
        .addCase(addProductReview.rejected, (state, action)=>{
            state.isLoadingProductReview = false;
            state.productReviewError = action.payload;
        })

        .addCase(getProductReviews.pending, (state)=>{
            state.isLoadingProductReview = true;
        })
        .addCase(getProductReviews.fulfilled, (state, action)=>{
            state.isLoadingProductReview = false;
            state.productReviews = action.payload;
        })
        .addCase(getProductReviews.rejected, (state, action)=>{
            state.isLoadingProductReview = false;
            state.productReviewError = action.payload;
        })

        .addCase(getMyProductReview.pending, (state)=>{
            state.isLoadingProductReview = true;
        })
        .addCase(getMyProductReview.fulfilled, (state, action)=>{
            state.isLoadingProductReview = false;
            state.productReview = action.payload;
        })
        .addCase(getMyProductReview.rejected, (state, action)=>{
            state.isLoadingProductReview = false;
            state.productReviewError = action.payload;
        })

        .addCase(deleteProductReview.pending, (state)=>{
            state.isLoadingProductReview = true;
        })
        .addCase(deleteProductReview.fulfilled, (state, action)=>{
            state.isLoadingProductReview = false;
            state.productReview = action.payload;
            state.productReviewMessage = "Review deleted successfully";
        })
        .addCase(deleteProductReview.rejected, (state, action)=>{
            state.isLoadingProductReview = false;
            state.productReviewError = action.payload;
        })
    }
})


export const {clearErrors, clearSuccess} = productReviewSlice.actions;
export default productReviewSlice.reducer