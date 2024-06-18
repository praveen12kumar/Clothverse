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

const Order = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoadingOrder, orders, totalOrderCount, orderError} = useSelector((state) => state.orders);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(8);
    const [totalPage, setTotalPage] = useState(0);
    
    const handlePageChange = (e)=>{
      setCurrentPage(e)
    }
    const handleNextClick = ()=>{
        if(currentPage < totalPage){
            setCurrentPage(currentPage+1)
        }
    }

    const handlePreviousClick = ()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
        }
    }
    const prevDisable = currentPage === 1;
    const nextDisable = currentPage === totalPage;
    const startIndex = (currentPage-1)*ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const itemsToDisplay = orders.slice(startIndex, endIndex);
    
    
    useEffect(()=>{
        dispatch(getMyOrders());
        setTotalPage(Math.ceil(totalOrderCount/ordersPerPage));
       
    },[dispatch, totalOrderCount, ordersPerPage]);

   
    useEffect(()=>{
        if(orderError){
            toast.error(orderError);
            dispatch(clearOrdersError());
        }
    },[orderError, dispatch]);
    
  return (
    isLoadingOrder?<div className="w-screen h-screen flex"><Loader/></div>:<>
    <MetaData title={'My Orders'}/>
    {orders?.length>0?<>
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
                  itemsToDisplay && itemsToDisplay?.map(order=>(
                      <tr className="text-base border-solid border-slate-600 border-b-[1px] hover:bg-gray-400 hover:text-white transition-colors duration-200 ease-in" key={order?._id}>
                        <td className="text-bg-Grey p-5 break-all">{order?._id}</td>
                        <td className="text-bg-Grey p-5 break-all">₹{order?.itemsPrice+order?.shippingPrice}</td>
                        <td className={`text-bg-Grey p-5 break-all ${order?.orderStatus==="Delivered"?"text-green-600":"text-red-600"}`}>{order?.orderStatus}</td>
                        <td className="text-slate-600 p-5 break-all transition-all duration-500 hover:text-cyan-700 text-2xl">
                          <Link to={`/order/${order?._id}`}><FaExternalLinkAlt/></Link>
                        </td>
                      </tr>
                  ))
                }
                </tbody>
              </table>
          }
          <>{
          orders.length > ordersPerPage && <div className="w-full flex items-center justify-center my-10">
              <button 
                className={`w-10 h-10 rounded-full text-sm mx-1 border border-cyan-700 text-slate-400 hover:bg-slate-400 hover:text-white transition-colors duration-300 ease-in ${currentPage === prevDisable && 'bg-slate-400 text-white'}   disabled:${currentPage === prevDisable}`}
                onClick={handlePreviousClick}>Prev
              </button>
              {
                orders.length > ordersPerPage && Array.from({length:totalPage},(_,index)=>{
                    return(
                      <button 
                        className={`w-10 h-10 rounded-full mx-1 border border-cyan-700 text-slate-400 hover:bg-slate-400 hover:text-white transition-colors duration-300 ease-in ${currentPage === index+1 && 'bg-slate-400 text-white'}   disabled:${currentPage === index+1}`}
                        key={index}
                        onClick={()=>handlePageChange(index+1)}>{index+1}
                        </button>
                    )
                })
              }
               <button 
                  className={`w-10 h-10 rounded-full text-sm mx-1 border border-cyan-700 text-slate-400 hover:bg-slate-400 hover:text-white transition-colors duration-300 ease-in ${currentPage === nextDisable && 'bg-slate-400 text-white'}   disabled:${currentPage === nextDisable}`}
                  onClick={handleNextClick}>Next
              </button>
          </div>
          }
          </>
        </div>
      </div>
      <div className="font-roboto my-16 text-[13px] p-2 md:p-5 flex flex-col gap-4 md:hidden" >
        <h1 className="uppercase text-xl text-slate-700 font-medium mx-auto">Your orders</h1>
        {
          itemsToDisplay && itemsToDisplay?.map(order=>(
            <div className="p-3  border-slate-600 border-[1px] flex flex-col gap-2 rounded-md " key={order?._id}>
              <div className="flex justify-between flex-wrap">
                <span className="font-medium w-fit">OrderId :</span>
                <span className="w-fit break-all">{order?._id}</span>
              </div>
              <div className="flex justify-between flex-wrap">
                <span className="font-medium w-fit">Delivery Status :</span>
                <span className={`w-fit ${order?.orderStatus==="Delivered"?"text-green-600":"text-red-600"} `}>{order?.orderStatus}</span>
              </div>
              <div className="flex justify-between flex-wrap">
                <span className="font-medium w-fit">Total Pirce :</span>
                <span className=" w-fit break-all">₹{order?.itemsPrice+order?.shippingPrice}</span>
              </div>
              <Link to={`/order/${order?._id}`} className="">
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