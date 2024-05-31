import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    address:null,
    isLoadingAddress:false,
    addressError:null,
    addressSuccess:false,
}


export const setAddress = createAsyncThunk("address/setAddress", async(address, ThunkApi)=>{   
    try{
        const {data} = await axios.get(`https://api.postalpincode.in/pincode/${address?.pincode}`);
        if(!data[0].PostOffice){
            return ThunkApi.rejectWithValue("Please Enter a valid Pincode");
        }
        const pinCodeStatus = data[0].PostOffice[0].State;
        if(pinCodeStatus !== address.state){
            return ThunkApi.rejectWithValue(`PinCode is not available for ${address.state}`);
        }
        localStorage.setItem("address", JSON.stringify(address));
        return ThunkApi.fulfillWithValue(address);
    }
    catch(error){
        return ThunkApi.rejectWithValue("This is currently unavailable. Sorry for inconvenience");
    }
})


const addressSlice = createSlice({
    name:"address",
    initialState,
    reducers:{
        setAddressLoading : (state,action) => {
            state.isLoadingAddress = true;
        },
        clearAddressLoading : (state,action) => {
            state.isLoadingAddress = false;
        },
        clearAddressError : (state,action)=>{
            state.errorAddress = null;
        },
        clearAddressSuccess : (state,action) =>{
            state.successAddress= false;
        },
        loadAddress : (state,action)=>{
            state.address = JSON.parse(localStorage.getItem("address"));
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(setAddress.pending, (state)=>{
            state.isLoadingAddress = true;
        })
        .addCase(setAddress.fulfilled, (state, action)=>{
            state.isLoadingAddress = false;
            state.address = action.payload;
            state.addressSuccess = true;
        })
        .addCase(setAddress.rejected, (state, action)=>{
            state.isLoadingAddress = false;
            state.addressError = action.payload;
        })
    }
});


export const {setAddressLoading, clearAddressLoading, clearAddressError, clearAddressSuccess, loadAddress} = addressSlice.actions;
export default addressSlice.reducer