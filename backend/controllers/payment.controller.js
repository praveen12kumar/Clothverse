import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { instance } from "../server.js";
import crypto from "crypto";
import Order from "../models/order.models.js";

export const getPaymentApiKey = (req,res) =>{
    res.status(200).json({ key: process.env.RAZOR_PAY_API });
}



export const createOrderId = asyncHandler(async(req, res)=>{
    const options = {
        amount: Number(req.body.amount) * 100,
        currency: "INR",
    };
    
    const order = await instance.orders.create(options);

    res.status(200).json(
    {
        success: true,
        order,
    }
    )
})

export const paymentVerification = async (req, res) => {
    const {orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      await Order.findByIdAndUpdate(orderId, {payment:{
        paymentId:razorpay_payment_id,
        orderId:razorpay_order_id,
        status:"done"
      }})
  
      return res.status(200).json({ message: "Order Placed Successfully" });
    } else {
      res.status(400).json({
        success: false,
        message:"Invalid signature sent!",
      });
    }
  };