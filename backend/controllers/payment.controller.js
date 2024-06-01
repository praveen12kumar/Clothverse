// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { instance } from "../server.js";


// export const getPaymentApiKey = (req,res) =>{
//     res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
// }



// export const checkout = asyncHandler(async(req, res)=>{
//     const options = {
//         amount: Number(req.body.amount) * 100,
//         currency: "INR",
//     };
    
//     const order = await instance.orders.create(options);
   
//     res.status(200).json(
//         new ApiResponse(200, order, "Order created Successfully")
//     )
// })