import Order from "../models/order.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../models/product.models.js";

const newOrder = asyncHandler(async(req,res)=>{
    const {shippingInfo, orderItems, 
        itemsPrice, shippingPrice,totalPrice
    } = req.body;
   

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user:req.user._id,
    });

    

    res.status(200).json(
        {
            success:true,
            order,
            message:"Order created successfully",
        }
    )
});



const getOrderDetails = asyncHandler(async(req, res)=>{
    const order = await Order.findOne({_id:req.params.id, user:req.user._id});
    
    if(!order){
        throw new ApiError(404, "Order not found");
    }

    res.status(200).json(
        new ApiResponse(200, order, "single order")
    )
});


// get logged in user Order
const myOrders = asyncHandler(async(req, res)=>{
    const orderPerPage = 10;
    let orders = await Order.find({user:req.user._id,}).sort("createdAt");
    
    const totalOrders = orders.length;
    orders = await Order.find({user:req.user._id, "paymentInfo.status":"done"}).sort({"createdAt":-1}).skip(orderPerPage*(req.query.page-1)).limit(orderPerPage);


    res.status(200).json(
       {
        success:true,
        orders,
        totalOrders,
        orderPerPage,
       }
    )
});

//\get all Orders --Admin
const getAllOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.shippingPrice
    });

    res.status(200).json(
        new ApiResponse(200, {orders,totalAmount}, "All Orders")
    )
});



async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    
    product.stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }

// update Order Status -- Admin
const updateOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      throw new ApiError(404, "order not found")
    };
  
    if (order.orderStatus === "Delivered") {
      throw new ApiError(400, "You have already delivered this order")
    };
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json(
        new ApiResponse(200,{}, "success")
    );
  });
  

  
  // delete Order -- Admin
  const deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      throw new ApiError(404, "Order not found with this Id");
    }
  
    await order.deleteOne();
  
    res.status(200).json(
        new ApiResponse(200, "successfully deleted")
    );
  });


export {
    newOrder,
    getOrderDetails,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,

}