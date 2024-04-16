import Product from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProduct = asyncHandler(async(req, res)=>{
    const {name, description, price, category, images} = req.body;

    if(!name || !description || !price || !category || !images){
        throw new ApiError(400, "All fields are required");
    }

    const product = await Product.create({
        name, 
        description,
        price,
        category,
        images,
    })
   
    res.status(200).json(
        new ApiResponse(200, product, "Product created successfully")
    )
});


const getAllProducts = asyncHandler(async(req, res)=>{
    const product = await Product.find();
    res.status(200).json(
        new ApiResponse(200, product, "All products")
    )
});


const updateProduct = asyncHandler(async(req, res)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        throw new ApiError(404, "product not found")
    }

    product  = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});

    res.status(200).json(
        new ApiResponse(200, product, "product updated successfully")
    )
})

const deleteProduct = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        throw new ApiError(404, "product not found")
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json(
        new ApiResponse(200, "product deleted successfully")
    )
})

const getProductDetails = asyncHandler(async(req, res)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        throw new ApiError(404, "product not found")
    }

    res.status(200).json(
        new ApiResponse(200, product, "product fetched successfully")
    )
});



export {
    createProduct, 
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,


};