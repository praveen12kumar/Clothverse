import React, { useEffect, useState } from 'react'
import MetaData from '../../utils/MetaData';
import Loader from '../../components/Loader/Loader';
import { getSingleUser, updateUserRole, clearUserError } from '../../features/user/userSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../../components/sidebar/DashboardSidebar';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaShield } from "react-icons/fa6";



const UpdateUser = () => {
    const {id} = useParams();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, userError, isLoadingUser} =  useSelector(state=> state.user)
    
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isLoadingButton, setIsLoadingButton] = useState(false);

    useEffect(()=>{
        if(user && user._id !== id){
            dispatch(getSingleUser(id));
        }
        else{
            setName(user?.name);
            setEmail(user?.email);
            setRole(user?.role);
        }
        
    },[dispatch, id])

    useEffect(()=>{
        if(userError){
            toast.error(userError)
            dispatch(clearUserError())
        }
    },[dispatch, userError])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        formData.set("name", name);
        formData.set("email", email);
        formData.set("role", role);
    
        dispatch(updateUserRole({id, formData})).then(()=>{
            toast.success("User updated successfully");
            setIsLoadingButton(false);
            navigate("/admin/users")
        })
      };

  return (
    isLoadingUser ? <div className="w-screen h-screen flex justify-center items-center"><Loader/></div> : 
    <>
        <MetaData title="update user" />
    <div className="w-full h-auto  flex flex-col md:flex-row ">
        <DashboardSidebar />
        <div className="md:wrapper w-full flex flex-col mt-2 ">
           <div className="w-full md:max-w-lg mx-auto my-8">
           <h1 className='text-2xl text-center font-poppins font-medium '>Update User</h1>
           <form 
           encType='multipart/form-data' 
           onSubmit={updateUserSubmitHandler}
           className='flex flex-col gap-8 p-4'
           >
            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit ">
                <FaUser/>
                <input type="text" className="w-full text-sm bg-inherit text-slate-600 outline-none" 
                    placeholder='Name'
                    required
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
            </div>

            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit">
                <MdEmail/>
                <input type="text" className="w-full text-sm bg-inherit text-slate-600 outline-none"
                    placeholder='Email'
                    required
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </div>

            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit">
                <FaShield/>
                <select
                    required
                    className='w-full bg-inherit text-slate-600 outline-none'
                    value={role}
                    onChange={(e)=> setRole(e.target.value)}
                >
                    <option className='text-slate-600 font-poppins text-xs md:text-sm uppercase' value="">Choose Category</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            <button className="w-[90%] mx-auto md:w-full text-sm tablet:text-base p-2 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-slate-600 text-white hover:bg-cyan-700 uppercase" type='submit'
             onClick={()=>{setIsLoadingButton(true)}}>{isLoadingButton?<img className="mx-auto w-7 h-7" src="/Images/icons/buttonLoaderImage..gif" alt=""/>:<>Update</>}</button>  
            </form>
            </div>
        </div>
    </div> 
    </>
  )
}

export default UpdateUser