import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../utils/MetaData";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteAllCart } from "../../features/cart/cartSlice";
import { deleteOrder } from "../../features/order/orderSlice";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { address, isLoadingAddress } = useSelector((state) => state.address);
 
  const { user } = useSelector((state) => state.user);
  const { cartItems, totalCartCost, isLoadingCart } = useSelector((state) => state.cart);
  const {orderError} = useSelector((state)=>state?.orders);

  const shippingCharge = totalCartCost > 2000 ? 0 : 100;
  const totalTax = (totalCartCost * 0.18).toFixed(2);
  const shippingInfo = `${address?.home}, ${address?.city}, ${address?.state}, ${address?.country}`;
  const finalAmount = Number(totalCartCost) + Number(totalTax) + Number(shippingCharge);


  const handlePayment = async()=>{
      try {
        const config = {headers:{"Content-Type": "application/json"}}
            const  { data: { key } } = await axios.get("/api/v1/payment/getkey");
            const {data:{order}} = await axios.post("/api/v1/payment/create",{amount:finalAmount},config);
            
            const {data:{order:userOrder}} = await axios.post("/api/v1/order/create",{
            orderItems:cartItems?.map((item)=>({
              name:item?.name,
              price:item?.price,
              image:item?.image,
              quantity:item?.quantity,
              product:item?._id
            })),
            shippingInfo:{
              address:address?.home,
              city:address?.city,
              state:address?.state,
              country:address?.country,
              pincode:address?.pincode,
              phoneNo:address?.phone,
            },
            itemsPrice:totalCartCost,
            shippingPrice:totalCartCost > 2000 ? 0 : 100,
            totalPrice:totalCartCost + (totalCartCost>2000?0:100),
           })

           

          const options = {
          key,
          amount: order?.amount,
          currency: "INR",
          name: "E-Shop",
          description: "Test Transaction",
          image: "https://avatars.githubusercontent.com/u/69430454?s=400&u=b433fa6632c969668143efd853a6ed71c38b08d3&v=4",
          order_id: order?.id,
          //callback_url: `http://localhost:3000/api/v1/payment/verify/${userOrder?._id}`,

            handler: async function (response) {
              
              const verify = await axios.post(`/api/v1/payment/verify/${userOrder._id}`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });
              
              try {
                if(verify){
                   dispatch(deleteAllCart());
                   setIsLoadingButton(false)
                }
                navigate("/payment/success");
              }
              catch(error){
                dispatch(deleteOrder(userOrder._id));
                setIsLoadingButton(false);
              }
            },  
          theme:{
            color: "#FFFFFF",
          }
        };

        const razor = new window.Razorpay(options);
        razor.open();
             
      } catch (error) {
        console.log("error", error);
      }
  }


  useEffect(()=>{
    if(orderError){
      toast.error(orderError);
    }
  },[orderError])

  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  },[])

  return (
    isLoadingAddress || isLoadingCart ? <div className="w-full h-screen flex items-center justify-center">
      <Loader/>
    </div>:
    <>
      <MetaData title="Confirm Order" />
      <div className="md:wrapper w-screen h-auto flex lex-col bg-white pb-20">
        <div className="w-full  flex flex-col md:flex-row item-center justify-between">
          <div className="w-full md:w-[70%] flex flex-col p-5">
            <div className="w-full flex flex-col my-6 font-roboto items-center justify-center p-5">
              <div className="w-full text-sm md:text-base flex items-center gap-2 leading-8">
                <p className="font-medium">Name:</p>
                <p className="font-poppins text-slate-600 ">{user?.name}</p>
              </div>
              <div className="w-full text-sm md:text-base flex items-center gap-2 leading-8">
                <p className="font-medium">Phone:</p>
                <p className="font-poppins text-slate-600 ">{address?.phone}</p>
              </div>
              <div className="w-full text-sm md:text-base flex gap-2 leading-8">
                <p className="font-medium">Addresss:</p>
                <p className="font-poppins text-slate-600 ">{shippingInfo}</p>
              </div>
            </div>
            <div className="">
              <h1 className="text-xl font-poppins leading-4 font-medium text-center mb-8">
                Your Cart Items
              </h1>
              <table className="w-full text-xs">
                <thead className="p-5">
                  <tr className="uppercase font-black font-roboto border-y border-solid border-slate-300 text-left">
                    <th className="p-4 text-xm md:text-lg">Product</th>
                    <th className="p-4 text-xm md:text-lg">Price</th>
                    <th className="p-4 text-xm md:text-lg">Quantity</th>
                    <th className="p-4 text-xm md:text-lg">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems?.map((cartItem, index) => (
                      <tr
                        className="text-base  border-b-[1px] border-solid border-gray-400"
                        key={index}
                      >
                        <td className="text-bg-Grey p-5 flex flex-col items-start justify-center">
                          <img
                            src={cartItem.image}
                            alt=""
                            className="w-20 aspect-[9/14] object-contain object-center"
                          />
                          <div>
                            {cartItem.name.substring(0, 12)}
                            {cartItem.name.length > 12 ? "..." : ""}
                          </div>
                        </td>
                        <td className="text-xm md:text-lg text-slate-600 p-3 ">
                          ₹{cartItem?.product?.price}
                        </td>
                        <td className="text-xm md:text-lg text-slate-600 px-8 md:p-10 text-start ">
                          {cartItem.product.stock < cartItem.quantity ? (
                            cartItem.product.stock <= 0 ? (
                              <div className="text-lg text-red-600 font-medium break-words">
                                Out of Stock
                              </div>
                            ) : (
                              <div className="text-lg text-red-600 font-medium break-words">
                                Not Enough stock
                              </div>
                            )
                          ) : (
                            cartItem.quantity
                          )}
                        </td>
                        <td className="text-xm md:text-lg text-slate-600 p-3 text-start">
                          ₹{cartItem.product.price * cartItem.quantity}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full  md:w-[30%] lg:w-[25%] border-l border-gray-200 p-5">
            <h1 className="text-xl font-roboto leading-4 font-medium text-center mb-8">
              Order Summary
            </h1>
            <div className="w-full flex flex-col gap-5 justify-center items-center">
              <div className="w-full flex items-center justify-between">
                <p className="font-medium">Subtotal</p>
                <p className=" text-slate-600">₹{totalCartCost}</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="font-medium">Shipping</p>
                <p className=" text-slate-600">₹{shippingCharge}</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="font-medium">Tax</p>
                <p className="text-slate-600">₹{totalTax}</p>
              </div>
              <div className="w-full border border-slate-500"></div>
              <div className="w-full flex items-center justify-between">
                <p className="font-medium">Grand Total</p>
                <p className="text-slate-600">₹{finalAmount}</p>
              </div>
              <div className="w-full mt-5">
                    <button className="w-full mt-5 text-sm tablet:text-base p-2 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-slate-600 text-white hover:bg-Purple uppercase" type='submit' onClick={()=>{setIsLoadingButton(true);handlePayment()}}>{isLoadingButton?<img className="mx-auto w-7 h-7" src="/Images/icons/buttonLoaderImage..gif" alt=""/>:<>Proceed to Payment</>}</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
