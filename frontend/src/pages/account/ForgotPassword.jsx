import React, { useEffect, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { clearUserError, clearUserSuccess } from '../../features/user/userSlice';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { forgotPassword } from '../../features/user/userSlice';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {isLoadingUser, userSuccess, userError} = useSelector(state=> state.user);    


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData));

    }

    useEffect(()=>{
        if(userSuccess){
            toast.success(userSuccess)
            dispatch(clearUserSuccess())
        }
        if(userError){
            toast.error(userError);
            dispatch(clearUserError());
        }
    },[dispatch, userError, userSuccess])

  return (
   isLoadingUser ? <div className='w-screen h-screen flex items-center justify-center'><Loader/></div>:
   <div className='h-screen w-screen'>
   <div className="max-w-80 h-[400px] mx-auto bg-white p-6 mt-28 shadow-lg rounded-lg">
   <h1 className='text-3xl font-medium font-poppins text-center text-slate-600 underline underline-offset-4 '>Forgot Password</h1>
   <form className="w-full flex flex-col gap-10 justify-center" onSubmit={handleSubmit}>
       <div className="flex items-center gap-5 border border-slate-600 rounded-md p-3 font-poppins w-full mt-20">
       <MdEmail className='text-2xl'/>
       <input type="text" placeholder='Email' className='w-full bg-inherit outline-none'
       onChange={(e)=>setEmail(e.target.value)}
       />
       </div>
       <div className="w-full">
           <button className='w-full text-lg font-poppins font-medium bg-slate-600 text-white py-2 rounded-md hover:bg-cyan-700 cursor-pointer transition-colors ease-in duration-300'>Send</button>
       </div>
   </form>
   </div>
</div>
  )
}

export default ForgotPassword