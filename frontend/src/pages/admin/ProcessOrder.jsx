import React,{useEffect, useState} from 'react'
import MetaData from '../../utils/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import {useParams } from 'react-router-dom'
import { getOrderDetails, clearOrdersError } from '../../features/order/orderSlice'
import toast from 'react-hot-toast';
import DashboardSidebar from '../../components/sidebar/DashboardSidebar';
import { MdAccountTree } from "react-icons/md";
import { updateOrder } from '../../features/order/orderSlice'
import { useNavigate } from 'react-router-dom'

const ProcessOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} =  useParams();
    
    const [status, setStatus] = useState("");
    const [isLoadingButton, setIsLoadingButton] = useState(false);


    const {order, isLoadingOrder, orderError} = useSelector(state=> state.orders);
    const {user} = useSelector(state => state.user);
   

    const updateOrderSubmitHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('status', status);
        formData.forEach((e)=> console.log(e));

        dispatch(updateOrder({id, formData})).then(()=>{
            toast.success('Order updated successfully');
            dispatch(getOrderDetails(id));
        })
        setIsLoadingButton(false);
        navigate("/admin/orders");
    }

    useEffect(()=>{
        if(orderError){
            toast.error(orderError);
            dispatch(clearOrdersError());
        }
    },[orderError, dispatch])

    useEffect(()=>{
        dispatch(getOrderDetails(id));
        window.scrollTo({top:0,behavior:"smooth"});
    },[dispatch, id])




  return (
    isLoadingOrder ? <div className="w-screen h-screen flex"><Loader/></div> : 
    <>
        <MetaData title={'Process Order'}/>
        <div className="w-screen min-h-screen flex flex-col bg-white pb-20">
        <div className="w-full  flex flex-col md:flex-row item-center justify-between">
            <DashboardSidebar/>
          <div className="w-full flex flex-col p-5 gap-5">
            <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full flex flex-col">
            <div className="w-full flex flex-col font-roboto items-center justify-center p-6">
              <div className="w-full text-sm md:text-base flex items-center gap-2 leading-6">
                <p className="font-medium">Name:</p>
                <p className="font-poppins text-slate-600 ">{user?.name}</p>
              </div>
              <div className="w-full text-sm md:text-base flex items-center gap-2 leading-6">
                <p className="font-medium">Phone:</p>
                <p className="font-poppins text-slate-600 ">{order?.shippingInfo?.phoneNo}</p>
              </div>
              <div className="w-full text-sm md:text-base flex gap-2 leading-6">
                <p className="font-medium">Addresss:</p>
                <p className="font-poppins text-slate-600 ">{order?.shippingInfo?.address}{" "}{order?.shippingInfo?.city}{" "}{order?.shippingInfo?.state}" "{order?.shippingInfo?.country}</p>
              </div>
              <div className="w-full text-sm md:text-base flex gap-2 leading-6">
                <p className="font-medium">Pincode</p>
                <p className="font-poppins text-slate-600 ">{order?.shippingInfo?.pincode}</p>
              </div>
            </div>
            <div className="w-full flex flex-col p-5 mb-5 text-sm md:text-base gap-2">
                <h1 className='text-xl font-poppins leading-4 font-medium'>Payment</h1>
                <p className={`text-base text-green-600 font-poppins font-medium ${order?.paymentInfo?.status === "done" ? "text-green-600" : "text-red-600"}`}>{order?.paymentInfo?.status === "done" ? "PAID" : "NOT PAID"}</p>
                <p className='flex items-center gap-2'><span className='font-medium'>Amount</span><span className='font-poppins text-slate-600'>{order?.totalPrice}</span></p>
                <p className='flex items-center gap-2'><span className='font-medium'>PaymentID</span><span className='font-poppins text-slate-600'>{order?.paymentInfo?.paymentId}</span></p>
            </div>
            <div className="w-full flex flex-col p-5 mb-5 text-sm md:text-base gap-2">
                <h1 className='text-xl font-poppins leading-4 font-medium'>Order Status</h1>
                <p className={`text-base text-green-600 font-poppins font-medium ${order?.orderStatus === "Delivered" ? "text-green-600" : "text-red-600"}`}>{order?.orderStatus}</p>
                
            </div>
            </div>
            <>
            {
                order?.orderStatus === "Delivered" ? "" :
                <div className="w-full lg:w-[40%] flex justify-center lg:justify-start p-5 border border-slate-400 md:border-none">
                <form className='flex flex-col gap-5' onSubmit={updateOrderSubmitHandler}>
                    <h1 className='text-xl font-poppins leading-4 font-medium'>Process Order</h1>
                    <div className="w-full border border-slate-400 p-2 flex items-center gap-1">
                        <MdAccountTree/>
                        <select className='outline-none' onChange={(e)=> setStatus(e.target.value)}>
                        <option className='font-roboto text-sm' value="">Choose Category</option>
                      {order?.orderStatus === "Processing" && (
                        <option className='text-sm text-slate-600' value="Shipped">Shipped</option>
                      )}

                      {order?.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                    </div>

                    <button className='w-full bg-orange-600 text-white p-2 rounded-sm font-poppins font-medium hover:bg-cyan-700 transition-colors duration-300 ease-in' 
                    type='submit' disabled={isLoadingButton ? true : false || status === "" ? true : false}>Process</button>
                </form>
            </div>
            }
            </>
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
                  {order &&
                    order?.orderItems?.map((orderItem, index) => (
                      <tr
                        className="text-base  border-b-[1px] border-solid border-gray-400"
                        key={index}
                      >
                        <td className="text-bg-Grey p-5 flex flex-col items-start justify-center">
                          <img
                            src={orderItem?.image}
                            alt=""
                            className="w-20 aspect-[9/14] object-contain object-center"
                          />
                          <div>
                            {orderItem?.name.substring(0, 12)}
                            {orderItem.name.length > 12 ? "..." : ""}
                          </div>
                        </td>
                        <td className="text-xm md:text-lg text-slate-600 p-3 ">
                          ₹{orderItem?.price}
                        </td>
                        <td className="text-xm md:text-lg text-slate-600 px-8 md:p-10 text-start ">
                          {
                            orderItem?.quantity
                          }

                        </td>
                        <td className="text-xm md:text-lg text-slate-600 p-3 text-start">
                          ₹{orderItem?.price * orderItem.quantity}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>


          </div>

          </div>
    </>
  )
}

export default ProcessOrder