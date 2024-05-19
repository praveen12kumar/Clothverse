import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoadingUser:true,
    user:{},
    userError:null,
    userSuccess:null,
    isAuthenticated:false,
}

export const registerUser = createAsyncThunk("user/registerUser", async (user, ThunkAPI) => {
    console.log(user);

    try {
        // Since we're sending a FormData object, we don't need to manually set the Content-Type header.
        // The browser will automatically set it to multipart/form-data and include the correct boundary.
        const config = {};

        // Directly pass the FormData object to axios.post.
        // No need to spread the user object into a new object.
        const { data } = await axios.post("/api/v1/users/register", user, config);
        return data;

    } catch (error) {
        console.log(error);
        return ThunkAPI.rejectWithValue(error.response.data);
    }
});


export const loginUser = createAsyncThunk("user/loginUser", async(user, ThunkAPI)=>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post("/api/v1/users/login", user, config);
        return data.user;

    } catch (error) {
        console.log(error);
        return ThunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Logout user
export const logoutUser = createAsyncThunk("user/logoutUser", async(data, ThunkAPI)=>{
    try {
        await axios.post("/api/v1/users/logout");
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data);
    }
});


export const updateUserPassword = createAsyncThunk("user/updateUserPassword", async(formData, ThunkAPI)=>{
    try {
        
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post("/api/v1/users/change-password", formData, config);
        
        return data.data;
        

    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data);
    }
})



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        clearUserError:(state)=>{
            state.userError = null;
        },
        clearUserSuccess:(state)=>{
            state.userSuccess = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.isLoadingUser = true;
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.isAuthenticated = true;
            state.isLoadingUser = false;
            state.user = action.payload;
            state.userSuccess = "Signed Up Successfully"
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.isLoadingUser = false;
            state.isAuthenticated = false;
            state.userError = action.payload
        })

        // Login User
        .addCase(loginUser.pending,(state)=>{
            state.isLoadingUser = true;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isAuthenticated = true;
            state.isLoadingUser = false;
            state.user = action.payload;
            state.userSuccess = "Logged in Successfully";
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.isAuthenticated = false;
            state.isLoadingUser = false;
            state.userError = action.payload;
        })
        // Logout user
        .addCase(logoutUser.pending,(state)=>{
            state.isLoadingUser = true;
        })
        .addCase(logoutUser.fulfilled, (state, action)=>{
            state.isAuthenticated = false;
            state.isLoadingUser = false;
            state.user = null;
            state.userSuccess = "Logged out successfully";
        })
        .addCase(logoutUser.rejected,(state, action)=>{
            state.isLoadingUser = false;
            state.isAuthenticated = false;
            state.userError = action.payload;
        })

        // change-password
        .addCase(updateUserPassword.pending, (state)=>{
            state.isLoadingUser = true;
        })
        .addCase(updateUserPassword.fulfilled, (state, action)=>{
            state.isLoadingUser = false;
            state.isAuthenticated = true;
            state.userSuccess = "Password Updated Successfully";
            state.user = action.payload;
        })
        .addCase(updateUserPassword.rejected, (state, action)=>{
            state.isLoadingUser = false;
            state.userError = action.payload; 
        })

    }
})


export default userSlice.reducer;
export const {clearUserError, clearUserSuccess} = userSlice.actions;