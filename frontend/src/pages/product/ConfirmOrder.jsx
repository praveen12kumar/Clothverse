import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../../utils/MetaData";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { address } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.user);
  const { cartItems, totalCartCost } = useSelector((state) => state.cart);
  const shippingCharge = totalCartCost > 2000 ? 0 : 200;
  const totalTax = (totalCartCost * 0.18).toFixed(2);
  const shippingInfo = `${address?.home}, ${address?.city}, ${address?.state}, ${address?.country}`;
  const finalAmount = Number(totalCartCost) + Number(totalTax) + Number(shippingCharge);
  return (
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
                <button className="w-full p-3 bg-orange-600 text-white rounded-lg cursor-pointer hover:bg-cyan-700 transition-colors duration-300 ease-in"
                    onClick={()=> navigate("/process/payment")}
                >Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
