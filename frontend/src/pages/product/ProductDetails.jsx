import React,{useEffect, useState} from 'react'
import {Rate} from "antd";

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../features/product/productSlice';
import Loader from '../../components/Loader/Loader';
import MetaData from '../../utils/MetaData';
import ProductDetail from '../../components/product/ProductDetail';
import { Swiper, SwiperSlide  } from 'swiper/react';
import {Autoplay } from "swiper/modules";
import ReviewCard from '../../components/product/ReviewCard';
import { getProductReviews, addProductReview, getMyProductReview } from '../../features/product/productReviewSlice';
import OverviewProducts from '../../components/product/OverviewProducts';



const ProductDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const [isActive, setIsActive] = useState(0);
    const [review, setReview] = useState(null);
    const [rating, setRating] = useState(0);
    const {isAuthenticated} = useSelector(state => state.user);
    const {isLoadingProduct, product, products} = useSelector(state => state.products);
    const { isLoadingProductReview, productReviews} = useSelector(state => state.productReview);
    

    const submitReview = (e)=>{
        e.preventDefault();
        const formData = {
            productId:id,
            rating,
            comment:review,
        }
        dispatch(addProductReview(formData)).then(()=>{
            dispatch(getProductReviews(id));
        })
        
        setRating(0);
        setReview("");
        
    }

    const handleRatingChange = (value)=>{
        setRating(value);
    }

    useEffect(()=>{
        if(isAuthenticated){
            dispatch(getMyProductReview(id));
        }
    },[id, dispatch, isAuthenticated])

    useEffect(()=>{
        dispatch(getProductDetails(id))
        dispatch(getProductReviews(id));
       
    },[dispatch, id])
    
    // useEffect(()=>{
    //     if(!isLoadingProduct){
    //         dispatch(getAllProducts({page:1, sort:"asc"}))
            
    //     }
    // },[isLoadingProduct, dispatch])

    

  return (
    isLoadingProduct ? <div className=""><Loader/></div>:
    <>
    <MetaData title={`${product?.name}`} />
    <div className="wrapper font-poppins w-screen flex flex-col gap-5">
        <div className="min-h-[90vh] ">
            <ProductDetail data={product}/>
        </div>
        <div className="border-solid border-slate-400 border-[1px] py-8">
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 lg:gap-5 mx-auto text-slate-600 text-sm mb-4 p-2 lg:p-5">
                <div className={`cursor-pointer p-[1px] text-[15px] md:mb-2 transition-colors duration-500 hover:underline-offset-[6px] hover:underline text-center hover:text-slate-700 ${isActive===0?'underline-offset-[6px] underline text-black':''}`} onClick={()=>setIsActive(0)}>Description</div>
                <div className={`cursor-pointer p-[1px] text-[15px] md:mb-2 transition-colors duration-500 hover:underline-offset-[6px] hover:underline text-center hover:text-slate-700 ${isActive===1?'underline-offset-[6px] underline text-black':''}`} onClick={()=>setIsActive(1)}>Reviews ({product?.numberOfReviews})</div>
            </div>
            <div className="w-full">
                <div className={`max-w-[900px] font-poppins text-xs md:text-base p-5  mx-auto text-gray-500 transition-opacity duration-500 ${isActive === 0 ? "block opacity-100" : "hidden opacity-0"}`}>
                    {product?.description}
                </div>
                <div className={`max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto text-gray-500 text-sm transition-opacity duration-500 ${isActive === 1 ? "block opacity-100" : "hidden opacity-0"}`}>
                    {isLoadingProductReview ? <div className="w-full"><Loader/></div>:<>
                    {
                        product?.numberOfReviews > 0 ? (
                            <Swiper className="mySwiper" autoplay ={{delay: 5000,disableOnInteraction: false,}} modules={[Autoplay]}>
                                {productReviews?.map(review=><SwiperSlide  key={review._id}><ReviewCard review={review}/></SwiperSlide>)}
                            </Swiper>
                        )
                        :
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <p className='text-xl font-roboto text-red-700'>No Reviews Available</p>
                            <p className='text-base text-cyan-600 font-poppins'>Be the first one to review this product</p>
                        </div>
                    }
                    </>
                }     
                </div>
            </div>
        </div>
        <div className="w-full h-auto wrapper bg-white flex flex-col items-center justify-center gap-3 shadow-lg ">
                        <h1 className="text-xl font-semibold underline underline-offset-4 text-text-black">Add a review</h1>
                        <div className="my-5">
                            <h1 className="flex text-xl items-center gap-2"><span className='text-base font-medium'>Your Rating</span> : <Rate allowHalf value={rating} onChange={handleRatingChange}/></h1>
                        </div>
                        <form className="w-[90%] md:w-[70%] mx-auto flex flex-col items-center" onSubmit={submitReview}>
                            <h1 className="font-roboto font-medium  mb-2">Your review</h1>
                            <textarea name="" id=""  className='w-full h-36 p-3 outline-none border-solid border-grey3 border-[1px] resize-none' value={review} onChange={(e)=>{setReview(e.target.value)}}></textarea>
                            <button  className="mt-5 text-base py-[10px] px-9   transition-all duration-300  rounded-full bg-slate-700 text-white hover:bg-cyan-800">SUBMIT</button>
                        </form>
            </div>
            <div className="p-2 md:p-5 block">
            <h1 className="w-fit mx-auto mb-4 md:mb-8 text-2xl md:text-3xl font-black text-center">Related Products</h1>
            {isLoadingProduct?<div className="h-[40vh] w-full flex"><Loader/></div>:<OverviewProducts data={products}/>}
        </div>
    </div>
    </>
  )
}

export default ProductDetails