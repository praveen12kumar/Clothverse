import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../features/product/productSlice';
import Loader from '../../components/Loader/Loader';
import MetaData from '../../utils/MetaData';
import ProductDetail from '../../components/product/ProductDetail';
import { Swiper, SwiperSlide  } from 'swiper/react';
import {Autoplay } from "swiper/modules";
import ReviewCard from '../../components/product/ReviewCard';


const ProductDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const [isActive, setIsActive] = useState(false);

    const {isLoadingProduct, product} = useSelector(state => state.products);
    console.log("Product", product);

    const submitReview = ()=>{

    }

    useEffect(()=>{
        dispatch(getProductDetails(id))
    },[dispatch, id])
    
    

  return (
    isLoadingProduct ? <div className=""><Loader/></div>:
    <>
    <MetaData title={`${product?.name}`} />
    <div className="wrapper font-poppins w-screen flex flex-col gap-5">
        <div className="min-h-[90vh] ">
            <ProductDetail data={product}/>
        </div>
        <div className=" border-solid border-slate-400 border-[1px] py-8">
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 lg:gap-5 mx-auto text-slate-600 text-sm mb-4 p-2 lg:p-5">
                <div className={`cursor-pointer p-[1px] text-[15px] md:mb-2 transition-colors duration-500 hover:underline-offset-[6px] hover:underline text-center hover:text-slate-700 ${isActive===0?'underline-offset-[6px] underline text-black':''}`} onClick={()=>setIsActive(0)}>Description</div>
                <div className={`cursor-pointer p-[1px] text-[15px] md:mb-2 transition-colors duration-500 hover:underline-offset-[6px] hover:underline text-center hover:text-slate-700 ${isActive===1?'underline-offset-[6px] underline text-black':''}`} onClick={()=>setIsActive(1)}>Reviews ({product?.numberOfReviews})</div>
            </div>
            <div className="wrapper w-full">
                <div className={`max-w-[900px] font-poppins text-xs md:text-base  mx-auto text-gray-500 transition-opacity duration-500 ${isActive === 0 ? "block opacity-100" : "hidden opacity-0"}`}>
                    {product?.description}
                </div>
                <div className={`wrapper max-w-7xl mx-auto text-gray-500 text-sm transition-opacity duration-500 ${isActive === 1 ? "block opacity-100" : "hidden opacity-0"}`}>
                    {
                        product?.numberOfReviews > 0 ? (
                            <Swiper className="mySwiper" autoplay ={{delay: 5000,disableOnInteraction: false,}} modules={[Autoplay]}>
                                {product?.reviews.map(review=><SwiperSlide  key={review._id}><ReviewCard review={review}/></SwiperSlide>)}
                            </Swiper>
                        )
                        :
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <p className='text-xl font-roboto text-red-700'>No Reviews Available</p>
                            <p className='text-base font-poppins'>Be the first one to review this product</p>
                        </div>
                    }
                </div>
            </div>
            <div className="">
                        <h1 className="text-xl text-text-black">Add a review</h1>
                        <div className="my-5">
                            {/* <h1 className="flex items-center gap-2">Your Rating : <Rating {...options} value={rating} onChange={(event, newValue) => setRating(newValue)}/></h1> */}
                        </div>
                        {/* <form className="" onSubmit={submitReview}>
                            <h1 className="mb-2">Your review</h1>
                            <textarea name="" id=""  className='w-full h-36 p-3 outline-none border-solid border-grey3 border-[1px] resize-none' value={review} onChange={(e)=>{setReview(e.target.value)}}></textarea>
                            <button  className="mt-5 text-base py-[10px] px-9  transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple">SUBMIT</button>
                        </form> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default ProductDetails