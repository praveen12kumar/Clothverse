import mongoose,{Schema} from "mongoose";

const reviewSchema = new Schema({
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
    },
    image:{
        type:String,
    },
    comment:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const ProductReview = mongoose.model("ProductReview",reviewSchema);
export default ProductReview;