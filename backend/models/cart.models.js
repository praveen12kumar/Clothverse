import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
    },
    itemColor:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    originalPrice:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
        default:0,
    },
    inCart:{
        type:Boolean,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    }
});


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;