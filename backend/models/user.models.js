import mongoose,{Schema} from "mongoose";
import validator from "validator";

const userSchema =  new Schema({
    name:{
        type:String,
        required:[true, "Please Enter your name"],
        maxLength:[30, "Name cannot exceed 30 characters"],
        minLength:[5, "Name must have more the 5 characters"],
    },
    email:{
        type:String,
        required:[true, "Please Enter your email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, "Please Enter a valid email"]
    },
    password:{
        type:String,
        required:[true, "Please Enter your Password"],
        minLength:[8, "Password should be atleast 8 characters long"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date
});


const User = mongoose.model("User", userSchema);

export default User;