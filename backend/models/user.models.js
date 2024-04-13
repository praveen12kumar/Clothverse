import mongoose,{Schema} from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        minLength:[6, "Password should be atleast 6 characters long"],
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




userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        id:this._id,
    }, process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

const User = mongoose.model("User", userSchema);

export default User;