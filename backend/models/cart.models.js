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
    image:{
        type:String,
        required:true,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    }
});


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;