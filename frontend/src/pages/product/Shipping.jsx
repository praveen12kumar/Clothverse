import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../../utils/MetaData';
import toast from 'react-hot-toast';
import { IoHome } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { MdTransferWithinAStation } from "react-icons/md";
import { clearAddressSuccess, setAddress } from '../../features/address/addressSlice';
import Loader from '../../components/Loader/Loader';

const allStates = ['Andaman & Nicobar','Andhra Pradesh','Arunachal Pradesh', 'Assam','Bihar', 'Chandigarh' ,  'Chattisgarh', 'Dadra & Nagar Haveli'  , 'Daman & Diu'  , 'Delhi'  ,'Goa' , 'Gujarat' , 'Haryana' , 'Himachal Pradesh',  'Jammu & Kashmir', 'Jharkhand' , 'Karnataka' , 'Kerala' , 'Lakshadweep' ,'Madhya Pradesh' , 'Maharashtra', 'Manipur' , 'Meghalaya'  ,'Mizoram', 'Nagaland', 'Odisha ', 'Pondicherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana' , 'Tripura' , 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']


const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItems, isLoadingCart} = useSelector(state=>state.cart);
    const {address, addressSuccess, addressError, isLoadingAddress} = useSelector(state=>state.address);
    


    const [home, setHome] = useState("");
    const [country, setCountry] = useState("India");
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [pincode, setPincode] = useState(null)
    const [phone, setPhone] = useState("");
    const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleCheckout = async(e) => {
    e.preventDefault();
    setIsLoadingButton(true);
    if(cartItems.length < 1){
      toast.error("Cart is empty");
      setIsLoadingButton(false);
      return;
    }
    if(!phone){
      toast.error("Please enter Phone Number");
      setIsLoadingButton(false);
      return;
    }
    if(!home){
      toast.error("Please enter Home number/Building name");
      setIsLoadingButton(false);
      return;
    }
    if(!city){
      toast.error("Please enter City name");
      setIsLoadingButton(false);
      return;
    }
    if(!state){
      toast.error("Please enter State name");
      setIsLoadingButton(false);
      return;
    }
    if(!pincode){
      toast.error("Please enter Pincode");
      setIsLoadingButton(false);
      return;
    }
    // check the stock of the product
    cartItems.forEach((item)=>{
      if(item?.product?.stock < item.quantity){
        toast.error("Insufficient Stock");
        setIsLoadingButton(false);
        return;
      }
    })
    // dispatch the address
    dispatch(setAddress({home, country, state, city, pincode, phone:parseInt(phone,10)}))
    setIsLoadingButton(false);
  }

  useEffect(()=>{
    if(address){
      setHome(address.home);
      setState(address.state);
      setCity(address.city);
      setPincode(address.pincode);
      setPhone(address.phone);
    }
  },[address])

  useEffect(()=>{
    if(addressSuccess){
      dispatch(clearAddressSuccess())
      navigate("/order/confirm");
      return;
    }
    if(addressError){
      toast.error(addressError);
      dispatch(clearAddressSuccess())
    }
  },[addressSuccess, addressError, dispatch, navigate])


  return (

    isLoadingAddress || isLoadingCart ? <div className="w-screen h-screen flex items-center justify-center"><Loader/></div>:

    <>
    <MetaData title="Shipping"/>
    <div className="w-screen h-screen">
      <div className="max-w-lg mx-auto bg-white p-6 my-10 shadow-lg rounded-lg flex flex-col items-center">
        <h1 className='text-xl md:text-2xl font-medium font-poppins text-center text-slate-600 underline underline-offset-4'>Shipping Details</h1>
        <form className="w-full flex flex-col  mb-4 px-10" encType='multipart/form-data' onSubmit={handleCheckout}>
        
        <div className="flex items-center gap-5 border border-slate-600 rounded-md p-2 font-poppins w-full mt-10">
        <IoHome className='text-xl'/>
          <input type="text" placeholder='Home' className='w-full text-sm bg-inherit outline-none'
          value={home} onChange={(e)=>setHome(e.target.value)}
          required/>
       </div>

       <div className="flex items-center gap-5 border border-slate-600 rounded-md p-2 font-poppins w-full mt-5">
        <FaCity className='text-xl'/>
          <input type="text" placeholder='City' className='w-full text-sm bg-inherit outline-none'
          value={city} onChange={(e)=>setCity(e.target.value)}
          required/>
       </div>

       <div className="flex items-center gap-5 border border-slate-600 rounded-md p-2 font-poppins w-full mt-5">
        <FaLocationDot className='text-xl'/>
          <input type="number" placeholder='Pincode' className='w-full text-sm bg-inherit outline-none'
          value={pincode} onChange={(e)=>setPincode(e.target.value)}
          required/>
       </div>

       <div className="flex items-center gap-5 border border-slate-600 rounded-md p-2 font-poppins w-full mt-5">
        <FaPhone className='text-xl'/>
          <input type="number" placeholder='Phone' className='w-full text-sm bg-inherit outline-none'
          value={phone} onChange={(e)=>setPhone(e.target.value)}
          required/>
       </div>

       <div className="flex items-center gap-5 border border-slate-600 rounded-md p-2 font-poppins w-full mt-5">
        <BsGlobeCentralSouthAsia className='text-lg'/>
          <input type="text" placeholder='Phone' readOnly className='w-full text-slate-600 text-sm bg-inherit outline-none'
          value={country}
          required/>
       </div>

              <div  className="flex items-center gap-5 border border-slate-600 rounded-md p-2 font-poppins w-full mt-5">
                <MdTransferWithinAStation className='text-xl'/>
                <select
                  className='w-full bg-inherit text-sm outline-none text-slate-600'
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option className='border-none outline-none' value="">State</option>
                  {
                    allStates.map((state) => (
                      <option className='w-full outline-none border-none text-xs md:text-sm' value={state} key={state}>{state}</option>))
                  }
                </select>
              </div>
            
              <button className="w-full md:w-[80%] mx-auto text-sm md:text-base font-poppins font-medium bg-cyan-700 text-white text-center py-2 rounded-md  cursor-pointer transition-colors ease-in duration-300 mt-5 hover:bg-slate-700 ">{isLoadingButton?<img className="mx-auto w-7 h-7" alt='checkout' src="/Images/icons/buttonLoaderImage..gif"/>:<>Proceed to Checkout</>}</button>

        </form>
      </div>
    </div>
    </>
  )
}

export default Shipping