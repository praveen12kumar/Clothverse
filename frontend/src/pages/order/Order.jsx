import React, { useEffect, useState } from 'react'
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearOrdersError, getMyOrders } from '../../features/order/orderSlice';
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbFaceIdError } from "react-icons/tb";
import { Pagination } from 'antd';

const Order = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoadingOrder, orders, totalOrderCount, orderPerPage, orderError} = useSelector((state) => state.orders);
    const [page, setPage] = useState(1);
   
    
    const handlePageChange = (e)=>{
      setPage(e.target.value)
    }
    
    
    useEffect(()=>{
        dispatch(getMyOrders(page));
        window.scrollTo({top:0,behavior:"smooth"});
    },[page, dispatch]);

   
    useEffect(()=>{
        if(orderError){
            toast.error(orderError);
            dispatch(clearOrdersError());
        }
    },[orderError, dispatch]);
    
  return (
    isLoadingOrder?<div className="w-screen h-screen flex"><Loader/></div>:<>
    <MetaData title={'My Orders'}/>
    {orders.length>0?<>
      <div className="font-roboto mt-28 mb-20 text-[13px] min-h-screen p-5 hidden md:block">
        <div className="mx-auto max-w-6xl w-full">
          <h1 className="uppercase text-xl font-black mb-4">Your orders</h1>
          {
            <table className="w-full text-xs border-solid border-grey3 border-[1px]">
              <thead className='p-5'>
                  <tr className='uppercase font-black border-solid border-grey3 border-b-[1px] text-left'>
                    <td className="p-4">Order Id</td>
                    <td className="p-4">Total Cost</td>
                    <td className="p-4">Delivery Status</td>
                    <td className="p-4">Details</td>
                  </tr>
                </thead>
                <tbody className="">
                {
                  orders.map(order=>(
                      <tr className="text-base border-solid border-slate-600 border-b-[1px]" key={order._id}>
                        <td className="text-bg-Grey p-5 break-all">{order._id}</td>
                        <td className="text-bg-Grey p-5 break-all">₹{order.itemsPrice+order.shippingPrice}</td>
                        <td className="text-bg-Grey p-5 break-all">{order.orderStatus}</td>
                        <td className="text-slate-600 p-5 break-all transition-all duration-500 hover:text-cyan-700 text-2xl">
                          <Link to={`/order/${order._id}`}><FaExternalLinkAlt/></Link>
                        </td>
                      </tr>
                  ))
                }
                </tbody>
              </table>
          }
          <div className="mt-10 w-fit mx-auto">
              {
                totalOrderCount>orderPerPage&&
                <Pagination total={(totalOrderCount%orderPerPage===0?Math.trunc(totalOrderCount/orderPerPage):(Math.trunc(totalOrderCount/orderPerPage)+1))} showFirstButton showLastButton page={page} onChange={handlePageChange} />
              
              }
          </div>
        </div>
      </div>
      <div className="font-roboto my-16 text-[13px] p-2 md:p-5 flex flex-col gap-4 md:hidden" >
        <h1 className="uppercase text-xl text-slate-700 font-medium mx-auto">Your orders</h1>
        {
          orders.map(order=>(
            <div className="p-3  border-slate-600 border-[1px] flex flex-col gap-2 rounded-md" key={order._id}>
              <div className="flex justify-between flex-wrap">
                <span className="font-medium w-fit">OrderId :</span>
                <span className="w-fit break-all">{order._id}</span>
              </div>
              <div className="flex justify-between flex-wrap">
                <span className="font-medium w-fit">Delivery Status :</span>
                <span className=" w-fit">{order.orderStatus}</span>
              </div>
              <div className="flex justify-between flex-wrap">
                <span className="font-medium w-fit">Total Pirce :</span>
                <span className=" w-fit break-all">₹{order.itemsPrice+order.shippingPrice}</span>
              </div>
              <Link to={`/order/${order._id}`} className="">
                <button className="w-full mt-3 text-sm p-2 transition-all duration-300  rounded-full bg-black text-white hover:bg-cyan-700 uppercase" >View Details</button>
              </Link>
          </div>
          ))
        }
      </div>
    </>:
    <div className='font-[Poppins] mt-28 mb-20 text-[13px] p-2 md:p-5 flex justify-center items-start'>
      <div className="w-full border-solid border-grey3 border-[1px] flex flex-col items-center h-max p-5">
          <TbFaceIdError className='text-9xl md:text-[250px]'/>
          <span className="text-2xl font-bold">No Orders</span>
          <button className="w-max mt-5 text-xs sm:text-sm tablet:text-base p-3 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple uppercase" onClick={()=>navigate("/products")}>Continue Shopping</button>
      </div>
    </div>}
  </>
  )
}

export default Order