import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ProductModal from '../modals/ProductModal';
import { useDispatch, useSelector } from "react-redux";
import {setLoadingWishlist, deleteWishlistItem, getWishlistItem, setWishlistItem, clearWishlistSuccess } from "../../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";


const ProductCard = ({ data }) => {
  const dispatch = useDispatch();

  const {wishlistItems, isLoadingWishlist, wishlistMessage} = useSelector(state=> state.wishlist);

  const [liked, setLiked] = useState(false);
  const [quickShow, setQuickShow] = useState(false);
  const [modalData, setModalData] = useState(data);

  const [showProductModal, setShowProductModal] = useState(false);
  
  useEffect(()=>{
    dispatch(setLoadingWishlist());
    dispatch(getWishlistItem());
  },[dispatch])
  

  const handleLiked = () => {
    if(liked){
      dispatch(deleteWishlistItem(data._id));
    }
    else{
      dispatch(setWishlistItem(data));
    }
    dispatch(getWishlistItem());
    setLiked(!liked);
  };

  useEffect(()=>{
    if(!isLoadingWishlist && wishlistMessage){
      toast.success(wishlistMessage);
    }
    dispatch(clearWishlistSuccess());
  },[liked, dispatch]);

  useEffect(()=>{
    let isLiked = false;
    wishlistItems.forEach((item)=>{
      if(item._id === data?._id){
        setLiked(true);
        isLiked = true;
      }
    })

    if(!isLiked) setLiked(false);
  },[wishlistItems, data?._id])


  return (
    <>
    <div 
      className="w-[150px] h-[280px] md:w-48 md:h-[350px] lg:w-56 bg-white shadow-xl flex flex-col gap-2 rounded-md hover:-translate-y-3 transition-all duration-300 ease-in"
      onMouseEnter={() => setQuickShow(true)} // Show Quick View on hover
      onMouseLeave={() => setQuickShow(false)} // Hide Quick View on hover out
    >
      <div className="flex flex-row items-start object-cover p-2 relative">
        <img className="w-[120px] h-[120px] md:w-[150px] md:h-[170px] lg:h-[200px] object-contain hover:scale-105 transition-all duration-300 ease-in" src={data?.images[0]?.url} alt="product" />
        <div className="absolute top-3 right-3 cursor-pointer text-xl md:text-2xl flex items-center"
            onClick={handleLiked}
          >
            {liked? <FaHeart className="text-cyan-600" /> : <FaRegHeart className="text-cyan-600" />}
        </div>
      </div>
      <hr />
      <div className="mt-4 flex flex-col gap-1 px-3 lg:px-5 ">
        <div className="flex justify-between text-sm md:text-base capitalize text-slate-800" >
          <Link
            to={`/product/${data?._id}`}
            className="cursor-pointer line-clamp-1 font-medium font-poppins "
          >
            {data?.name}
          </Link>
        </div>
        <div className="flex mb-2 gap-1 items-center font-roboto">
          <div className="bg-green-600 text-xs md:text-sm rounded-sm p-1 text-white font-semibold flex items-center gap-1">
            <span>{data?.ratings?.toFixed(1)}</span>
            <FaStar className="text-xs md:text-sm" />
          </div>
          <p className="text-xs md:text-sm">({data?.numberOfReviews})</p>
        </div>
        <div className="flex justify-between flex-wrap md:flex-nowrap items-center text-sm font-roboto text-text-black gap-1">
          <span className="font-semibold whitespace-nowrap">
            ₹{data?.price}
          </span>
          <span className="line-through whitespace-nowrap">
            ₹{data?.originalPrice}
          </span>
          <span className="text-[10px] text-green-600 whitespace-nowrap">
            ({data?.discount}% off)
          </span>
        </div>
        {/* Conditionally render the Quick View div based on quickShow state */}
        {quickShow && (
        <div 
          className="w-24 text-xs md:text-sm text-white font-roboto font-medium text-center mx-auto p-2  rounded-2xl shadow-lg bg-purple-700 cursor-pointer absolute bottom-5 left-[50%] 
          transform -translate-x-1/2 transition-all duration-100 animate-fadeIn ease-in-out"
          style={{ opacity: quickShow? 1: 0,   }}
          onClick={()=>setShowProductModal(!showProductModal)}
        >
          Quick View
        </div>
      )}
      </div>
    </div>
    {
        showProductModal && <ProductModal modalData={modalData} setModalData={setModalData} setShowProductModal={setShowProductModal} showProductModal={showProductModal}/>
    }
    </>
  );
};

export default ProductCard;
