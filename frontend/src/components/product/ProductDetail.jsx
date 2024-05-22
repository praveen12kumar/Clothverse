import React, { useEffect, useState } from "react";
import ImageSlider from "../slider/ImageSlider";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { FaStar } from "react-icons/fa";
import {
  setLoadingWishlist,
  setWishlistItem,
  getWishlistItem,
  deleteWishlistItem,
} from "../../features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../../utils/MetaData";
import toast from "react-hot-toast";
import { addCartItem, clearMessage } from "../../features/cart/cartSlice";



const ProductDetail = ({ data }) => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoadingWishlist, wishlistItems } = useSelector(
    (state) => state.wishlist
  );

  const {isLoadingCart, cartItems, cartMessage, cartError} = useSelector(state => state.cart)
  
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  
  const inCart = cartItems?.some((item)=> item?.product.toString() === data?._id.toString());

  const handleAddToCart = () => {
    if(quantity < 1){
      toast.error("Quantity cannot be less than 1");
        return;
    }

    dispatch(addCartItem({
      name: data?.name,
      quantity,
      image: data?.images[0]?.url,
      price: data?.price,
      originalPrice:data?.originalPrice,
      discount:data?.discount,
      productId:data?._id
    })).then(()=>{
    toast.success(cartMessage)
    dispatch(clearMessage())
    }) 
  };

  const handleLiked = () => {
    if (liked) {
      dispatch(deleteWishlistItem(data._id));
    } else {
      dispatch(setWishlistItem(data));
    }
    dispatch(getWishlistItem());
    setLiked(!liked);
  };


  // useEffect(()=>{
  //   if(cartError){
  //     toast.error(cartError);
  //     dispatch(clearErrors());
  //   }
  //   if(cartMessage){
  //     toast.success(cartMessage);
  //     dispatch(clearMessage());
  //   }
  // },[dispatch, cartError, cartMessage])



  useEffect(() => {
    dispatch(setLoadingWishlist());
    dispatch(getWishlistItem());
  }, [dispatch]);

  useEffect(() => {
    let isLiked = false;
    wishlistItems.some((item) =>{
      if (item?._id === data?._id) {
        setLiked(true);
        isLiked = true;
      }
    });

    if (!isLiked) {
      setLiked(false);
    }
  }, [wishlistItems, data?._id]);



  return (
    <>
      <MetaData title={`${data?.name}`}/>
      {isLoadingWishlist || isLoadingCart ? (
        <div className="w-screen h-screen flex">
          <Loader />
        </div>
      ) : (
      
        <div className="flex flex-col lg:flex-row justify-center items-center bg-white  p-2  lg:p-7 gap-5 md:gap-10 h-full">
          <div className="w-full  lg:w-[40%] p-8 md:p-6 lg:p-4">
            <ImageSlider
              productImages={data?.images}
              key={data?._id}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col items-start gap-2 p-5 lg:p-10">
            <h1
              className="text-xl font-poppins font-medium break-keep capitalize"
              onClick={() => navigate(`/product/${data?._id}`)}
            >
              {data?.name}
            </h1>
            <div className="font-roboto text-base md:text-lg text-text-black flex gap-2 items-center">
              <span className="font-semibold lg:text-2xl tracking-wider">₹{data?.price}</span>
              <span className="line-through text-slate-500">
                ₹{data?.originalPrice}
              </span>
              <span className="text-green-600 text-sm">
                {data?.discount}% off
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-500  md:mb-5 line-clamp-2">
              {data?.description}
            </p>
            <div className="text-sm md:text-base mb-1 flex flex-col font-roboto gap-1">
            <p className="font-normal">Category: <span className="font-medium font-poppins"> {data?.category}</span> </p>
            <p className="font-normal">Color: <span className="font-medium font-poppins">{data?.color}</span></p>
            <p>Status: {" "}
              <b className={`font-poppins text-base ${data?.stock > 0 ? "text-green-600" : "text-red-600"}`}>{data?.stock > 0 ? "In Stock" : "Out of Stock"}</b>
              </p>
            </div>
            <div className="bg-green-600 text-xs md:text-sm rounded-sm p-1 text-white font-semibold flex items-center gap-1">
              <span>{data?.ratings?.toFixed(1)}</span>
              <FaStar className="text-xs md:text-sm" />
            </div>

            <div className="w-full flex flex-col font-poppins lg:flex-row gap-4 md:gap-6 mt-5 lg:mt-10">
              {data?.stock > 0 ? (
                <div className="w-full flex justify-center mx-auto ">
                 {
                  inCart ?  <button
                  type="button"
                  className="w-full md:w-[70%]  mx-auto text-sm md:text-base py-3 px-10 md:px-9 rounded-full  transition-all duration-300 hover:bg-slate-700 text-white bg-cyan-700"
                  onClick={()=>navigate("/cart")}
                >
                  Go to Cart
                </button>:
                 <button
                 type="button"
                 className="w-full md:w-[70%]  mx-auto text-sm md:text-base py-3 px-10 md:px-9 rounded-full  transition-all duration-300 hover:bg-slate-700 text-white bg-cyan-700"
                 onClick={handleAddToCart}
               >
                 Add to Cart
               </button>
                 }
                </div>
              ) : (
                <div className="text-lg mt-5">
                  <p className="w-full text-center text-red-600 font-medium">
                    Out of Stock
                  </p>
                </div>
              )}
              <div
                onClick={handleLiked}
                className={`w-full flex justify-center mx-auto `}
              >
                {liked ? (
                  <button className="w-full md:w-[70%] mx-auto text-sm md:text-base py-3 px-10 md:px-9 rounded-full  transition-all duration-300 hover:bg-slate-700 text-white bg-cyan-700">
                    Remove from Wishlist
                  </button>
                ) : (
                  <button className="w-full md:w-[70%] mx-auto text-sm md:text-base py-3 px-10 md:px-9 rounded-full  transition-all duration-300 hover:bg-cyan-700 text-white bg-slate-700">
                    Add to Wishlist
                  </button>
                )}
              </div>
              
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;


