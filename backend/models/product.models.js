import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:[true, "Please Enter product Name"]
    },
    description:{
        type:String,
        required:[true, "Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true, "Please Enter product Price"],
        maxLength:[8, "Price can not exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    category:{
        type:String,
        required:[true, "Please Enter product Category"],
    },

    stock:{
        type:Number,
        required:[true, "Please Enter product Stock"],
        maxLength:[4, "Stock cannot exceed 4 digits "]
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

    
})

const Product = mongoose.model("Product", productSchema);

export default Product;