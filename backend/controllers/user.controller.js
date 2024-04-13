import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import User from "../models/user.models.js";

const registerUser = asyncHandler(async(req, res)=>{
    //get user details from frontend
    // validations
    // check for existing user
    // check image for avatar
    // upload to cloudinary
    // create user
    // send response

    const {name, email, password} = req.body;

    if([name, email, password].some((field)=> field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }
    if (!email || !email.includes('@')) {
        throw new ApiError(400,'Please include a valid email' );
    }
    if (!password || password.length < 6) {
        throw new ApiError(400, 'Password must be at least 6 characters long' );
    }

    const existeduser = await User.findOne({email});

    if(existeduser){
        throw new ApiError(409, "Email alreay exists")
    }

    const avatarLocalPath = req.file?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar  = await uploadOnCloudinary(avatarLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file not uploaded")
    }

    

    const user = await User.create({
        name, 
        email,
        password,
        avatar:{
            public_id: avatar.public_id,
            url: avatar.url
        }
    });

    const createdUser =  await User.findById(user._id);
    if(!createdUser){
        return ApiError(500, "Something went wrong while registering user")
    }
   
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});


const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    if (!email || !email.includes('@')) {
        throw new ApiError(403,'Please include a valid email' );
    }
    if (!password || password.length < 6) {
        throw new ApiError(400, 'Password must be at least 6 characters long' );
    }

    // check user 
    const user = await User.findOne({email}).select("+password");
    
    if(!user){
        throw new ApiError(404, "user not found");
    }

    const isPasswordMatched = user.isPasswordCorrect(password);
    
    if(!isPasswordMatched){
        throw new ApiError(401, "Invalid email or password")
    }

    const token = user.generateAccessToken();
    const options = {
        httpOnly : true, // cookies can only be modified by  server
        secure:true 
     }
    return res.status(200).cookie("token", token, options).json(
        new ApiResponse(200, {token, user}, "user logged in successfully")
    )
})

export {
    registerUser,
    loginUser,

};