import Product from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createProduct = asyncHandler(async(req, res)=>{
    const {name, description,originalPrice,price, discount, category, color, stock} = req.body;
   //console.log(name, description, originalPrice, price, discount, category, color, stock);


    if(!name || !description || !price || !category || !originalPrice || !discount){
        throw new ApiError(400, "All fields are required");
    }
    //Images uploaded to cloudinary

    let uploadImageUrls = [];
    for(let i = 0; i < req.files.length; i++){
        const imageUrl = await uploadOnCloudinary(req.files[i].path);

        uploadImageUrls.push({
            public_id:imageUrl.public_id,
            url:imageUrl.secure_url,
        })
    };




    const product = await Product.create({
        name, 
        description,
        originalPrice,
        price,
        discount,
        stock,
        category:category.toLowerCase(),
        images:uploadImageUrls,
        user:req.user._id,
        color

    })

    res.status(200).json(
        new ApiResponse(200, product, "Product created successfully")
    )
});

const getAllProducts = asyncHandler(async(req, res) => {
    const { search, sort, category, price, rating } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery = {};

    if (search) {
        baseQuery.name = {
            $regex: search,
            $options: "i"
        };
    }
    if (price) {
        baseQuery.price = {
            $lte: Number(price)
        };
    }

    if(rating){
        baseQuery.ratings = {
            $gte: Number(rating)
        }
    }

    if (category) {
        const categoryArray = category.split(','); // Handle multiple categories
        baseQuery.category = { $in: categoryArray };
    }

    const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);

    const [products, filterOnlyProducts] = await Promise.all([
        productsPromise,
        Product.find(baseQuery),
    ]);

    const totalPages = Math.ceil(filterOnlyProducts.length / limit);
    const productCount = await Product.countDocuments();

    res.status(200).json({
        success: true,
        products,
        totalPages,
        productCount,
        message: "All Products"
    });
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


const getLatestProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find().sort({createdAt:-1}).limit(8);

    res.status(200).json(
        new ApiResponse(200, products, "Latest Products" )
    )
})

const getAllCategories = asyncHandler(async(req, res)=>{

    const categories = await Product.distinct("category");
    
    res.status(200).json(
        new ApiResponse(200, categories, "fetched all categories")
    )
});

// create new review or update the review
const createProductReview = asyncHandler(async(req, res)=>{
    const {rating, comment, productId} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString() === req.user._id.toString())
            rev.rating = rating,
            rev.comment = comment
        })
    }
    else{
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating;
    })

    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave:false});
    res.status(200).json(
        new ApiResponse(200, {}, "user reviews successfully")
    );
});

// Get all reviews of a product
const getProductReviews = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        throw new ApiError(404, "Product not found");
    }

    res.status(200).json(
        new ApiResponse(200, product.reviews, "All Reviews of a product")
    )
});

const deleteReview = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        throw new ApiError(404, "Product not found");
    }

    const reviews = product.reviews.filter(rev=>
        rev._id.toString() !== req.query.id.toString()
    )

    let avg = 0;
    reviews.forEach(rev=>{
        avg+=rev.rating;
    })

    const ratings = reviews.length === 0 ? 0 : avg / product.reviews.length

    const numberOfReviews = product.reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, 
        {reviews, ratings, numberOfReviews}, 
        {new:true})

    res.status(200).json(
        new ApiResponse(200, {}, "Review deleted successfully")
    )
})


export {
    createProduct, 
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,
    getLatestProducts,
    getAllCategories,
    createProductReview,
    getProductReviews,
    deleteReview,
};