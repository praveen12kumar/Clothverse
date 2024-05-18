import ProductReview from "../models/productReview.models.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import Product from "../models/product.models.js";
import User from "../models/user.models.js";


const createProductReview = asyncHandler(async(req, res)=>{
    const {productId, rating, comment} = req.body;
    const product = await Product.findById(productId);

    if(!product){
        throw new ApiError(404, "Product not found")
    }

    // get the preview review of the user
    const previousReview = await ProductReview.findOne({product:productId, user:req.user._id});
    
    const productReview = await ProductReview.create({
        product:productId,
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    });
    
    if(previousReview){
        await ProductReview.findByIdAndDelete(previousReview._id);
    }

    const productReviews = await ProductReview.find({product:productId});

    let totalRating = 0;

    productReviews.forEach((review)=>{
        totalRating += review.rating;
    })

    product.numberOfReviews = productReviews.length;
    product.ratings = (totalRating / productReviews.length).toFixed(1);

    await product.save({validateBeforeSave:false});

    res.status(200).json(
        new ApiResponse(200, productReview, "Review created successfully")
    )
})



const getProductReviews = asyncHandler(async(req, res)=>{
    const product =await Product.findById(req.params.id);
    if(!product){
        throw new ApiError(404, "Product not found")
    }

    const productReviews = await ProductReview.find({product:req.params.id}).sort({createdAt:-1});

    res.status(200).json(
        new ApiResponse(200, productReviews, "All reviews")
    )
})


const getProductReview = asyncHandler(async(req, res)=>{
    const product =await Product.findById(req.params.id);
    if(!product){
        throw new ApiError(404, "Product not found")
    }

    const productReview = await ProductReview.findOne({product:req.params.id, user:req.user._id});
    if(!productReview){
        throw new ApiError(404, "Review not found")
    }

    res.status(200).json(
        new ApiResponse(200, productReview, "Review fetched successfully")
    )
})


const deleteProductReview = asyncHandler(async(req, res)=>{

    const {productId, reviewId} = req.body;

    const product =await Product.findById(productId);
    if(!product){
        throw new ApiError(404, "Product not found")
    }

    const user = await User.findById(req.user._id);
    if(!user){
        throw new ApiError(404, "User not found")
    };

    const productReview = await ProductReview.findById(reviewId);
    if(!productReview){
        throw new ApiError(404, "Review not found")
    }

    const correctUser = productReview.user.toString() === req.user._id.toString();

    if(!correctUser){
        throw new ApiError(401, "You are not authorized to delete this review")
    }

    const currentRating = Number(product.ratings);
    const nosRating = product.numberOfReviews;
    const rate = productReview.rating;

    const newRating = ((currentRating * nosRating) - rate) / (nosRating - 1);
    
    await ProductReview.findByIdAndDelete(reviewId);

    //const productReviews = await ProductReview.find({product:productId});

    // let totalRating = 0;

    // productReviews.forEach((review)=>{
    //     totalRating += review.rating;
    // });

    // product.numberOfReviews = productReviews.length;
    //product.ratings = (totalRating / productReviews.length).toFixed(1);

    // console.log("ProductRating", product.ratings);

    product.numberOfReviews = product.numberOfReviews -1;
    product.ratings = newRating;

    await product.save({validateBeforeSave:false});

    res.status(200).json(
        new ApiResponse(200, {}, "Review deleted successfully")
    )
})


export {createProductReview, getProductReviews, getProductReview, deleteProductReview};