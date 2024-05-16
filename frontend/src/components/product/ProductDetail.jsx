import React,{useEffect, useState} from 'react'
import ImageSlider from '../slider/ImageSlider'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader';
import { FaStar } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";


const ProductDetail = ({data}) => {

  const dispatch = useDispatch();
  const {isLoadingWishlist, wishlistItems} = useSelector(state => state.wishlist);
  const [ quantity,setQuantity ] = useState(0);
  const [liked, setLiked] = useState(false);

  


  const handleQuantity = ()=>{

  }

  const handleAddToCart = ()=>{

  }

  const handleLiked = ()=>{
    setLiked(!liked);
  }

  useEffect(()=>{
    let isLiked = false;
    wishlistItems.some(item => {
      if(item?._id === data?._id){
        setLiked(true);
        isLiked = true;
      }
    })

    if(!isLiked){
      setLiked(false);
    }
  },[wishlistItems, data?._id])





  return (
    <>
      {
        isLoadingWishlist ? <div className="">
          <Loader/>
        </div> :
        <div className="flex flex-col justify-center items-center bg-white lg:flex-row p-2  lg:p-7 gap-5 md:gap-10 h-full">
          <div className="w-full  lg:w-[40%] p-8 md:p-6 lg:p-4">
          <ImageSlider productImages={data?.images} key={data?._id} className="w-full h-full"/>
          </div>
          <div className="flex flex-col items-start">
            <h1 className='text-xl font-poppins font-medium break-keep capitalize'>{data?.name}</h1>
            <div className="font-roboto text-base md:text-lg my-1 md:my-3 text-text-black flex gap-2 items-center">
            <span className='font-semibold'>₹{data?.price}</span>
            <span className='line-through text-slate-500'>₹{data?.originalPrice}</span>
            <span className='text-green-600 text-sm'>{data?.discount}% off</span>
          </div>
          <p className="text-xs md:text-sm text-gray-500 mb-5 md:mb-10 line-clamp-3">{data?.description}</p>
          <div className="bg-green-600 text-xs md:text-sm rounded-sm p-1 text-white font-semibold flex items-center gap-1">
            <span>{data?.ratings?.toFixed(1)}</span>
            <FaStar className="text-xs md:text-sm" />
          </div>
          <div className="flex text-sm md:text-lg border-solid border border-slate-500 w-28 h-10 sm:w-36 sm:h-12 mx-auto mt-5">
              <button className="p-1 md:p-3 flex-1 flex justify-center items-center hover:bg-cyan-700 hover:text-white transition-colors duration-500" type='button' onClick={(e)=>handleQuantity(-1)} aria-label="decrQuantity"><FaMinus/></button>
              <div className="p-1 md:p-3 flex-1 flex justify-center items-center bg-slate-200">{quantity}</div>
              <button className="p-1 md:p-3 flex-1 flex justify-center items-center hover:bg-cyan-700 hover:text-white transition-colors duration-500" type='button' onClick ={(e)=>handleQuantity(1)} aria-label="incQuantity"><FaPlus/></button>
          </div>
            <div className="w-full flex flex-col font-poppins lg:flex-row gap-4 md:gap-6 mt-5 lg:mt-9">
            {
              data?.stock > 0 ? 
              <div className="w-full flex justify-center mx-auto ">
                <button type='button' className='w-full md:w-[70%] mx-auto text-sm md:text-base py-3 px-10 md:px-9 rounded-full  transition-all duration-300 hover:bg-slate-700 text-white bg-cyan-600'onClick={handleAddToCart} >Add to Cart</button>
              </div> 
              :<div className='text-lg mt-5'>
              <p className="w-full text-center text-red-600 font-medium">Out of Stock</p>
            </div>
            }
            <div onClick={handleLiked} className={`w-full flex justify-center mx-auto `}>
              {
                liked ? 
                <button className='w-full md:w-[70%] mx-auto text-sm md:text-base py-3 px-10 md:px-9 rounded-full  transition-all duration-300 hover:bg-slate-700 text-white bg-cyan-700'>Go to Wishlist</button>
                :
                <button className='w-full md:w-[70%] mx-auto text-sm md:text-base py-3 px-10 md:px-9 rounded-full  transition-all duration-300 hover:bg-cyan-700 text-white bg-slate-700'>Add to Wishlist</button>
              }
              </div>

            </div>
          </div>
        </div>
        
      }
    </>
    
  )
}

export default ProductDetail