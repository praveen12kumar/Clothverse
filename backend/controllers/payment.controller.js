import { asyncHandler } from "../utils/asyncHandler.js";
import { instance } from "../server.js";
import crypto from "crypto";
import Order from "../models/order.models.js";
import {Payment} from "../models/payment.models.js";
import Cart from "../models/cart.models.js";



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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const {order_id} = req.params;
  const orderId = order_id;
  
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_PAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;


  if (isAuthentic) {
    
    await Order.findByIdAndUpdate(orderId, {paymentInfo:{
      paymentId:razorpay_payment_id,
      orderId:razorpay_order_id,
      status:"done"
    }}
  )

  
    
    return res.status(200).json({ message: "Order Placed Successfully" });
  } else {
    res.status(400).json({
      success: false,
      message:"Invalid signature sent!",
    });
  }
}; 