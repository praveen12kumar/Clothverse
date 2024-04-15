import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/mailer.js";
import {sendForgotEmail} from "../utils/sendEmail.js";

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

    // send verification email
    await sendEmail({email, emailType:"VERIFY", userId:createdUser._id});
   
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

    const isPasswordMatched = await user.isPasswordCorrect(password);
    
    if(isPasswordMatched === false){
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


const logout = asyncHandler(async(req, res, next) => {
        // Clear the "token" cookie
        res.clearCookie("token", {
            expires: new Date(Date.now()),
            httpOnly: true
        });
    
        res.status(200).json(
            new ApiResponse(200, "Logged Out")
    );
});
    


const changeUserPassword = asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword} = req.body;
    
    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.isPasswordCorrect(oldPassword);

    if(!isMatch){
        throw new ApiError(400, "Invalid Password");
    }
   
    user.password = newPassword;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Password updated successfully")
    )
})


const getCurrentUser = asyncHandler(async(req, res)=>{
    return res.status(200).json(
        new ApiResponse(200, req.user, "current user fetched successfully")
    )
});



const verifyEmail = asyncHandler(async(req, res)=>{
    const {token} = req.body;
    console.log(token);

    const user =  await User.findOne({verifyToken:token, verifyTokemExpiry:{$gt: Date.now()}});

    if(!user){
        throw new ApiError(400, "Invalid token")
    }

    user.isverified = true;
    user.verifyToken = undefined;
    user.verifyTokemExpiry = undefined;

    await user.save();

    return res.status(200).json(
        new ApiResponse(200,{}, "Email verified successfully")
    )
})

// const forgotPassword = asyncHandler(async(req, res)=>{
//     const {email} = req.body;
//     const user = await User.findOne({email});

//     if(!user){
//         throw new ApiError(404, "User not found");
//     }

//     try {
//         await sendEmail({email, emailType:"RESET", userId:user._id});

//         return res.status(200).json(
//             new ApiResponse(200, {}, "Check your gmail to reset the password")
//         );

//     } catch (error) {
//         user.forgotPasswordToken = undefined;
//         user.forgotPasswordTokenExpiry = undefined;
//         await user.save({validateBeforeSave:false});
        
//         throw new ApiError(500, error.message);
//     }
// })


const forgotPassword = asyncHandler(async(req, res)=>{
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const forgotToken = user.generateForgotPasswordToken();

    await user.save({validateBeforeSave:false});

    const forgotPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${forgotToken}`;

    const message = `Your password for forgot token is:- \n\n ${forgotPasswordUrl} \n\n If you have not requested this email then, Please ignore it.`;

    try {
        await sendForgotEmail({
            email:user.email,
            subject: `Ecommerce Password Recovery`,
            message
        });
        res.status(200).json(
            new ApiResponse(200, `Email sent to ${user.email} successfully`)
        )
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save({validateBeforeSave:false});

        throw new ApiError(500, error.message)
    }

})




export {
    registerUser,
    loginUser,
    logout,
    changeUserPassword,
    getCurrentUser,
    verifyEmail,
    forgotPassword

};