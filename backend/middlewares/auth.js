import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";


const isAuthenticatedUser = asyncHandler(async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(res.status(404).json({success:false, message:"Please login to access this resource"}));
    }

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user =  await User.findById(decodedData.id);

    next();
})


const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ApiError(
            403, `Role: ${req.user.role} is not allowed to access this resouce `,
          )
        );
      }
  
      next();
    };
  };
export {isAuthenticatedUser, authorizeRoles};
