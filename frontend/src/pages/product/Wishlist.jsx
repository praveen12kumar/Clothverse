import React, { useEffect } from 'react'
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { clearWishlistSuccess } from '../../features/wishlist/wishlistSlice';
import WishlistProductCard from '../../components/product/WishlistProductCard';
import { TbFaceIdError } from 'react-icons/tb'

const Wishlist = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { wishlistItems, isLoadingWishlist, wishlistMessage } = useSelector((state) => state.wishlist);
    
    useEffect(()=>{
        if(!isLoadingWishlist && wishlistMessage){
            toast.success(wishlistMessage)
        }
        dispatch(clearWishlistSuccess());
        window.scrollTo({top: 0, behavior: 'smooth'});
    },[wishlistMessage, isLoadingWishlist, dispatch]);
     

  return (
    isLoadingWishlist ? <Loader/>:
    <>
    <MetaData title={"Wishlist"}/>
    <div className="flex justify-center items-center">
            <div className="font-[Poppins] my-10 text-[13px] min-h-[80vh] md:min-h-screen max-w-6xl p-2 md:p-5 flex flex-col justify-start grow">
                <h1 className="text-text-black font-bold text-xl sm:text-3xl mb-5 md:mb-10 w-full">Your WishList</h1>
                {wishlistItems.length>0?<div className="lg:wrapper w-full flex flex-wrap justify-center items-center gap-3 md:gap-6 lg:gap-10">
                {
                    wishlistItems.map((FavItem)=>(
                        <WishlistProductCard data={FavItem} key={FavItem._id}/>
                    ))
                }
                </div>:<div className='flex justify-center items-start'>
                    <div className="w-full border-solid border-grey3 border-[1px] flex flex-col items-center h-max p-2 md:p-5">
                        <TbFaceIdError className='text-[150px] md:text-[250px]'/>
                        <span className="text-2xl font-bold">No items in Your Wishlist</span>
                        <button className="w-max mt-5 text-xs sm:text-sm md:text-base p-3 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-black text-white hover:bg-cyan-700 uppercase" onClick={()=>navigate("/products?s=&price=[0]&color=&category=null&page=1&sortBy=null")}>Continue Shopping</button>
                    </div>
                </div>}
            </div>
        </div>
    </>
  )
}

export default Wishlist