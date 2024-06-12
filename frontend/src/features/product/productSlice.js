import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoadingProduct: false,
    products:[],
    product:null,
    error:null,
    productsCount:0,
    categories:[],
    totalPages:0
}


export const getAllProducts = createAsyncThunk("products/getAllProducts", async(params, ThunkApi)=>{
    const {search, price, category, sort, page, rating} = params;
    //console.log("PAGE",search, price,category, sort, page, rating);
    const query = new URLSearchParams();

    if (search) query.append('search', search);
      if (sort) query.append('sort', sort);
      if (category) query.append('category', category);
      if (price) query.append('price', price);
      if (page) query.append('page', page);
      if(rating) query.append('rating', rating);

    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.get(`/api/v1/products?${query}`, config)
        return data;

    } catch (error) {
        return ThunkApi.rejectWithValue(error.response.data)
    }
})


export const adminCreateProduct = createAsyncThunk("products/adminCreateProduct", async(formData, ThunkApi)=>{
    try{
        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const {data} = await axios.post("/api/v1/admin/product/new", formData, config);
        console.log("data", data);
        return data.data;
    }catch(error){
        return ThunkApi.rejectWithValue(error.response.data)
    }
})


export const getProductDetails = createAsyncThunk("products/getProductDetails", async(id, ThunkApi)=>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.get(`/api/v1/products/${id}`, config);
        //console.log(data); 
        return data.data;

    } catch (error) {
        return ThunkApi.rejectWithValue(error.response.data)
    }
})


export const getAllCategories = createAsyncThunk("products/getAllCategories", async(data, ThunkApi)=>{
    try {
        const {data} = await axios.get("/api/v1/products/categories");
        return data.data;
    } catch (error) {
        console.log(error);
        return ThunkApi.rejectWithValue(error.response.data)
    }
})


export const getAdminProducts = createAsyncThunk("products/getAdminProducts", async(data, ThunkApi)=>{
    try {
        const {data} = await axios.get("/api/v1/admin/products/all");
        return data.data;
    } catch (error) {
        console.log(error);
        return ThunkApi.rejectWithValue(error.response.data.message)
    }
})

export const deleteProduct = createAsyncThunk("products/deleteProduct", async(id, ThunkApi)=>{
    try {
       
        const {data} = await axios.delete(`/api/v1/admin/product/${id}`); 
        //console.log("data", data);  
        return data.data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error.response.data.message)
    }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async ({id,formData}, ThunkApi) => {
    console.log(id);
    try {
        // Iterate over FormData entries
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        const {data} = await axios.put(`/api/v1/admin/product/${id}`, formData, config);
        console.log("data", data);
        return data.data;
    } catch (error) {
        console.error('Error updating product:', error);
        return ThunkApi.rejectWithValue(error.response.data.message);
    }
});



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
            state.isLoadingProduct = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productCount;
            state.totalPages = action.payload.totalPages
        })
        .addCase(getAllProducts.rejected, (state, action)=>{
            state.isLoadingProduct = false;
            state.error = action.payload;
        })

        // create product
        .addCase(adminCreateProduct.pending, (state)=>{
            state.isLoadingProduct = true;
        })
        .addCase(adminCreateProduct.fulfilled, (state, action)=>{
            state.isLoadingProduct = false;
            state.products = [...state.products, action.payload];
        })
        .addCase(adminCreateProduct.rejected, (state, action)=>{
            state.isLoadingProduct = false;
            state.error = action.payload.message;
        })

        // get product details
        .addCase(getProductDetails.pending, (state)=>{
            state.isLoadingProduct = true;
        })
        .addCase(getProductDetails.fulfilled, (state, action)=>{
            state.isLoadingProduct = false;
            state.product = action.payload;
        })

        .addCase(getProductDetails.rejected,(state, action)=>{
            state.isLoadingProduct = false;
            state.error = action.payload
        })

        .addCase(getAllCategories.pending, (state)=>{
            state.isLoadingProduct = true;
        })
        .addCase(getAllCategories.fulfilled, (state, action)=>{
            state.isLoadingProduct = false;
            state.categories = action.payload;
        })
        .addCase(getAllCategories.rejected, (state, action)=>{
            state.isLoadingProduct = false;
            state.error = action.payload
        })

        .addCase(getAdminProducts.pending, (state)=>{
            state.isLoadingProduct = true;
        })
        .addCase(getAdminProducts.fulfilled, (state, action)=>{
            state.isLoadingProduct = false;
            state.products = action.payload;
        })
        .addCase(getAdminProducts.rejected, (state, action)=>{
            state.isLoadingProduct = false;
            state.error = action.payload
        })

        // delete Product
        .addCase(deleteProduct.pending, (state)=>{
            state.isLoadingProduct = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action)=>{
            state.isLoadingProduct = false;
            state.products = state.products.filter((product)=> product._id !== action.payload._id)
        })
        .addCase(deleteProduct.rejected, (state, action)=>{
            state.isLoadingProduct = false;
            state.error = action.payload;
        })

        // update product
        .addCase(updateProduct.pending, (state)=>{
            state.isLoadingProduct = true;
        })
        .addCase(updateProduct.fulfilled, (state, action)=>{
            state.isLoadingProduct = false;
            state.products = state.products.map((product)=> product._id === action.payload._id ? action.payload : product)
        })
        .addCase(updateProduct.rejected, (state, action)=>{
            state.isLoadingProduct = false;
            state.error = action.payload;
        })

    }
});

export const {clearErrors} = productSlice.actions;
export default productSlice.reducer;
