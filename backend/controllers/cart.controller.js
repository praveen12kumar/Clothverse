import Cart from "../models/cart.models.js";
import Product from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createCartItem = asyncHandler(async(req, res)=>{
    const {name, quantity, image,originalPrice, price, discount, productId,} = req.body;
    
    const cartItem = await Cart.findOne({product:productId, user:req.user._id});
    
    if(cartItem){
        throw new ApiError(400, "Cart item already exist")
    }
    
    // Find Product from the Product table
    // const item = await Product.findOne({_id:productId, user:req.user._id})  
    // console.log("item", item);

    const cart = await Cart.create({
        user:req.user._id,
        name, 
        quantity,
        image,
        originalPrice,
        price,
        discount,
        product:productId,
        inCart:true,
    })

    res.status(200).json(
        new ApiResponse(200, cart, "item added successfully")
    )

});

const getCartItemsOfUser = asyncHandler(async(req, res)=>{
    const cart = await Cart.find({user:req.user._id}).populate("product");

    res.status(200).json(
        new ApiResponse(200, cart, "All cart items")
    )
});

const increaseDecreaseCartItemQuantity = asyncHandler(async(req, res)=>{
    const {newQuantity, cartItemId} = req.body;

    let cart = await Cart.findById({user:req.user._id, _id:cartItemId});

    if(!cart){
        throw new ApiError(404, "Cart Item not found")
    }

     cart = await Cart.findByIdAndUpdate({user:req.user._id, _id:cartItemId},
        {quantity:newQuantity}, {new:true})

    res.status(200).json(
        new ApiResponse(200, cart, "")
    )
});


const deleteCartItem = asyncHandler(async(req, res)=>{
    const {cartItemId} = req.body;
    const cartItem = await Cart.findByIdAndDelete({user:req.user._id, _id:cartItemId});

    if(!cartItem){
        throw new ApiError(404, "Cart item not found")
    };

    res.status(200).json(
        new ApiResponse(200, {}, "Item deleted successfully")
    )
});

const deleteAllCartItem = asyncHandler(async(req, res)=>{
    await Cart.deleteMany({user:req.user._id});

    res.status(200).json(
        new ApiResponse(200, {}, "All item deleted successfully")
    )
});






export {
    createCartItem,
    getCartItemsOfUser,
    increaseDecreaseCartItemQuantity,
    deleteCartItem,
    deleteAllCartItem,

};