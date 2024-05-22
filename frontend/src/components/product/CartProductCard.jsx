import React, { useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, deleteCartItem, getCartItems } from '../../features/cart/cartSlice';
import toast from 'react-hot-toast';
import { clearErrors, clearMessage } from '../../features/cart/cartSlice';


const CartProductCard = ({data}) => {
  const dispatch = useDispatch();
  const {cartError, cartMessage} = useSelector(state => state.cart);

  console.log("data",data)
  
  const handleQuantity = (increase)=>{
    const newQuantity = data?.quantity + increase;

    if(newQuantity < 1){
      toast.error("Quantity cannot be less than 1");
      return;
    }
    dispatch(updateCartItem({
      newQuantity,
      cartItemId:data?._id
    }));
    dispatch(getCartItems());
  }

  const handleRemoveFromCart = ()=>{
    dispatch(deleteCartItem(data?._id))
    dispatch(getCartItems());
  }

  useEffect(()=>{
    if(cartError){
      toast.error(cartError);
      dispatch(clearErrors());
    }
    if(cartMessage){
      toast.success(cartMessage);
      dispatch(clearMessage());
    }
  },[cartError, cartMessage, dispatch]);





  return (
    <div className="w-full h-[200px] shadow-xl flex justify-between gap-2 md:gap-5 lg:gap-10 rounded-md ">
      <div className="flex flex-row bg-white items-start object-cover p-2 relative">
        <img
          className="w-[300px] h-[150px] md:h-[170px] lg:h-[170px]  object-contain hover:scale-105 transition-all duration-300 ease-in"
          src={data?.image}
          alt="product"
        />
      </div>
     
      <div className="w-[70%] p-4">
        <div className="flex  text-sm md:text-base capitalize mb-2 text-text-black">
          <Link
            to={`/product/${data?._id}`}
            className="cursor-pointer line-clamp-1"
          >
            {data?.name}
          </Link>
        </div>
        <div className="text-sm text-text-black flex gap-2">
          <span className="font-semibold whitespace-nowrap">
            ₹{data?.price}
          </span>
          <span className="line-through whitespace-nowrap">
            ₹{data?.originalPrice}
          </span>
          <span className="text-green-600 whitespace-nowrap">
            {data?.discount}% off
          </span>
        </div>
        <div className="flex text-sm md:text-lg border-solid border border-slate-500 w-28 h-10 sm:w-36 sm:h-12 mx-auto mt-5">
              <button
                className="p-1 md:p-3 flex-1 flex justify-center items-center hover:bg-cyan-700 hover:text-white transition-colors duration-500"
                type="button"
                onClick={(e) => handleQuantity(-1)}
                aria-label="decrQuantity"
              >
                <FaMinus />
              </button>
              <div className="p-1 md:p-3 flex-1 flex justify-center items-center bg-slate-200">
                {data?.quantity}
              </div>
              <button
                className="p-1 md:p-3 flex-1 flex justify-center items-center hover:bg-cyan-700 hover:text-white transition-colors duration-500"
                type="button"
                onClick={(e) => handleQuantity(1)}
                aria-label="incQuantity"
              >
                <FaPlus />
              </button>
            </div>
        <div className="mt-5 flex items-center justify-center">
          <button className='w-[50%] text-center  bg-cyan-700 text-white py-2 rounded-md font-poppins font-medium leading-4 transition-colors hover:bg-slate-700 duration-500 ease-in cursor-pointer'
            onClick={handleRemoveFromCart}
          >Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CartProductCard