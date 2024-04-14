import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";


const isAuthenticatedUser = asyncHandler(async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ApiError(401, "Please login to access this resource"));
    }

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user =  await User.findById(decodedData.id);

    next();
})


export {isAuthenticatedUser};
