import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../utils/MetaData';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getCartItems } from '../../features/cart/cartSlice';
import CartProductCard from '../../components/product/CartProductCard';
import { TbFaceIdError } from 'react-icons/tb'
import { clearMessage, clearErrors } from '../../features/cart/cartSlice';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoadingCart, cartItems, cartMessage,cartError, cartCount, totalCartCost } = useSelector((state) => state.cart);
    
    
    useEffect(()=>{
        dispatch(getCartItems())
       window.scrollTo({top:0,behavior:"smooth"});
    },[dispatch])


    const totalDiscount = cartItems?.reduce((acc, item)=>{
        return acc + (item.originalPrice - item.price)
    },0);

    useEffect(()=>{
        if(cartMessage){
            toast.success(cartMessage)
            dispatch(clearMessage())
        }
        if(cartError){
            toast.error(cartError)
            dispatch(clearErrors())
        }
    },[cartError, cartMessage])


  return (
    <>
    <MetaData title={"Cart"}/>
    <div className="wrapper w-full flex flex-col md:flex-row justify-center md:justify-between items-center">
            <div className="font-poppins my-10 text-[13px] min-h-[80vh] md:min-h-screen max-w-7xl mx-auto p-2 md:p-5 flex flex-col justify-start grow">
                <h1 className="text-text-black font-bold text-xl sm:text-3xl mb-5 w-full">Your Cart</h1>
                {cartItems?.length>0?
                <div className="lg:wrapper w-full flex flex-col lg:flex-row mx-auto justify-center lg:justify-between items-start gap-3 md:gap-6 lg:gap-20">
                <div className="w-full lg:w-[90%] flex flex-col gap-5">
                {
                    cartItems?.map((cartItem)=>(
                        <CartProductCard data={cartItem} key={cartItem?._id}/>
                    ))
                }
                </div>
                <>
                <div className="w-full md:w-[500px] mt-10 lg:mt-0 bg-white p-5 rounded-lg shadow-md">
                    <h1 className='text-2xl tracking-wider font-semibold py-2 uppercase text-slate-500'>Price Details</h1>
                    <div className="w-full flex flex-col gap-4 border border-slate-500 p-3">
                    <div className="w-full flex justify-between items-center">
                        <p className='text-sm md:text-base text-slate-500'>Price{" "} ({cartCount}{" "}items) </p>
                        <p className='font-roboto md:text-base font-medium text-slate-500'>₹{totalCartCost}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className='text-sm md:text-base text-slate-500'>Discount</p>
                        <p className='font-roboto md:text-base font-medium text-slate-500'>₹{totalDiscount}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className='text-sm md:text-base text-slate-500'>Delivery Charges</p>
                        <p className='font-roboto md:text-base font-medium text-slate-500'>₹100</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className='text-sm md:text-base text-slate-500'>Total Amount</p>
                        <p className='font-roboto md:text-base font-medium text-slate-500'>₹{totalCartCost - totalDiscount}</p>
                    </div>
                    <div className="w-full flex justify-center items-center ">
                        <p className='text-sm md:text-base text-center text-green-600'>You will save <span className='font-medium'>{totalDiscount - 100}</span> on this order</p>
                    </div>
                    </div>
                    <div className="w-full mt-10">
                    <button className='w-full text-xs sm:text-sm tablet:text-base p-3 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-black text-white hover:bg-cyan-700'
                        onClick={()=>navigate("/shipping")}
                    >Place Order</button>
                    </div>
                </div>
                
                </>
                </div>:<div className='flex justify-center items-start'>
                    <div className="w-full border-solid border-grey3 border-[1px] flex flex-col items-center h-max p-2 md:p-5">
                        <TbFaceIdError className='text-[150px] md:text-[250px]'/>
                        <span className="text-2xl font-bold">No items in Your Cart</span>
                        <button className="w-max mt-5 text-xs sm:text-sm md:text-base p-3 md:py-3 md:px-9 transition-colors duration-300  rounded-full bg-black text-white hover:bg-cyan-700 uppercase" onClick={()=>navigate("/products?s=&price=[0]&color=&category=null&page=1&sortBy=null")}>Continue Shopping</button>
                    </div>
                </div>}
            </div>
            
        </div>
    </>
    )
}

export default Cart