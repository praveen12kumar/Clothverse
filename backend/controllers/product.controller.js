import Product from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";
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
        category:category.toLowerCase(),
        images,
    })
   
    res.status(200).json(
        new ApiResponse(200, product, "Product created successfully")
    )
});


// const getAllProducts = asyncHandler(async(req, res)=>{
//     const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();

//     const products = await apiFeature.query;

//     res.status(200).json(
//         new ApiResponse(200, products, "All products")
//     )
// });


const getAllProducts = asyncHandler(async(req, res)=>{
    const {search, sort, category, price} = req.query;

    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery = {}
    
    if(search){
     baseQuery.name = {
        $regex:search,
        $options:"i"
        }   
    }
    if(price){
        baseQuery.price = {
            $lte:Number(price)
        }
    }

    if(category){
        baseQuery.category = category;
    }

    const productsPromise = Product.find(baseQuery).sort(
        sort && {price: sort === "asc" ? 1: -1}
    ).limit(limit).skip(skip)

   const [products, filterOnlyProducts] = await Promise.all([
    productsPromise, Product.find(baseQuery),
   ])

    const totalPage = Math.ceil(filterOnlyProducts.length / limit);

    res.status(200).json({
       success:true,
       products,
       totalPage,
       message:"All Products"
    })
})


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
    const products = await Product.find({}).sort({createdAt:-1}).limit(8);

    res.status(200).json(
        new ApiResponse(200, products, "Latest Products" )
    )
})

const getAllCategories = asyncHandler(async(req, res)=>{
    
    const categories = await Product.distinct("category");
    console.log("category",categories);
    res.status(200).json(
        new ApiResponse(200, categories, "fetched all categories")
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


};