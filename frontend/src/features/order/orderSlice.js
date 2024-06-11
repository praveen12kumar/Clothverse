import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoadingOrder:false,
    orders:[],
    order:null,
    orderError:false,
    totalOrderCount:0,
    orderPerPage:0,
}

export const getMyOrders = createAsyncThunk("orders/getMyOrders", async (page, {rejectWithValue})=>{
    try {
        const query = `/api/v1/orders/me?page=${page?page:1}`;
        const {data} = await axios.get(query);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})


export const getOrderDetails = createAsyncThunk("orders/getOrderDetails", async (id, {rejectWithValue})=>{
    try {
        const {data} = await axios.get(`/api/v1/order/${id}`);
        console.log(data);
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id, {rejectWithValue})=>{
    try {
        const {data} = await axios.delete(`/api/v1/order/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const getAdminOrders = createAsyncThunk("orders/getAdminOrders", async (page, {rejectWithValue})=>{
    try {
       
        const {data} = await axios.get("/api/v1/admin/orders");
        console.log(data);
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})


const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{
        clearOrdersError:(state)=>{
            state.orderError = false;
        }
    },
    extraReducers:builder=>{
        builder
        .addCase(getMyOrders.pending, (state)=>{
            state.isLoadingOrder = true;
        })
        .addCase(getMyOrders.fulfilled, (state, action)=>{
            state.isLoadingOrder = false;
            state.orders = action.payload.orders?action.payload.orders:[];
            state.orderPerPage = action.payload.orderPerPage;
            state.totalOrderCount = action.payload.totalOrders;
        })
        .addCase(getMyOrders.rejected, (state, action)=>{
            state.isLoadingOrder = false;
            state.orderError = action.payload;
        })

        .addCase(getOrderDetails.pending, (state)=>{
            state.isLoadingOrder = true;
        })
        .addCase(getOrderDetails.fulfilled, (state, action)=>{
            state.isLoadingOrder = false;
            state.order = action.payload;
        })
        .addCase(getOrderDetails.rejected, (state, action)=>{
            state.isLoadingOrder = false;
            state.orderError = action.payload;
        })
        .addCase(deleteOrder.pending, (state)=>{
            state.isLoadingOrder = true;
        })
        .addCase(deleteOrder.fulfilled, (state, action)=>{
            state.isLoadingOrder = false;
            state.orders = state.orders.filter(order=>order._id !== action.payload._id);
            state.totalOrderCount = state.orders.length;
        })
        .addCase(deleteOrder.rejected, (state, action)=>{
            state.isLoadingOrder = false;
            state.orderError = action.payload;
        })

        .addCase(getAdminOrders.pending, (state)=>{
            state.isLoadingOrder = true;
        })
        .addCase(getAdminOrders.fulfilled, (state, action)=>{
            state.isLoadingOrder = false;
            state.orders = action.payload;
        })
        .addCase(getAdminOrders.rejected, (state, action)=>{
            state.isLoadingOrder = false;
            state.orderError = action.payload;
        })
    }
})

export const {clearOrdersError} = orderSlice.actions;
export default orderSlice.reducer