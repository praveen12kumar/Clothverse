import React,{useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { MdFace6 } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaImage } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { registerUser } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-hot-toast"
import { clearUserError, clearUserSuccess, } from '../../features/user/userSlice';


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, userError, userSuccess} = useSelector(state=> state.user);
    const fileRef = useRef(null);

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        avatar:""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [pass, setPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Create a FormData object
        const formData = new FormData();
    
        // Append all the fields to the FormData object
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('avatar', user.avatar); // This is the file
       
        // Dispatch the action with the FormData object
        dispatch(registerUser(formData));
    
        // Reset the user state
        setUser({
            name: "",
            email: "",
            password: "",
            avatar: ""
        });
       
        navigate("/login");
        
    };
    
    const showPassword = ()=>{
        setPass(!pass)
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.name.length > 0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])

    useEffect(()=>{
        if(userError){
            toast.error(userError);
            dispatch(clearUserError());
        }
        if(isAuthenticated){
            navigate("/login");
            return;
        }
        if(userSuccess && !isAuthenticated){
            toast.success(userSuccess)
            dispatch(clearUserSuccess())
        }
    },[userError, userSuccess, isAuthenticated, navigate, dispatch])




  return (
    <div className='max-w-xs md:max-w-sm  mx-auto mt-24 h-auto shadow-lg bg-slate-100 border border-slate-500 p-10 rounded-lg'>
        <h1 className='text-center text-3xl font-roboto font-medium'>Create your Account</h1>
        <form className='flex flex-col mt-8' >
        <div className="flex items-center border-2 border-slate-400 px-2 p-1 rounded-lg mb-6">
            <MdFace6 className='text-lg'/>
            <input className='w-full outline-none font-poppins px-2 py-1 bg-inherit' placeholder='Name' required type="text" value={user.name} onChange={(e)=> setUser({...user, name:e.target.value})} />
        </div>

        <div className="flex items-center border-2 border-slate-400 px-2 p-1 rounded-lg mb-1">
            <MdEmail/>
            <input className='w-full font-poppins outline-none px-2 py-1 bg-inherit' placeholder='Email' required type="text" value={user.email} onChange={(e)=> setUser({...user, email:e.target.value})} />
        </div>
        <p className='text-xs text-slate-300 m-0 mb-2'>Please Verify the email</p>
        <div className="flex items-center border-2 border-slate-400 px-2 p-1 rounded-lg mb-6">
            <RiLockPasswordFill/>
            <input className='w-full outline-none font-poppins px-2 py-1 bg-inherit'placeholder='Password' required type={pass ? "text" : "password"} value={user.password} onChange={(e)=> setUser({...user, password:e.target.value})} />
            <span className='cursor-pointer' onClick={showPassword}>{user.password && !pass ? <FaEye/> : <FaEyeSlash/>}</span>
        </div>

        <div className="flex items-center border-2 border-slate-400 px-2 p-1 rounded-lg">
            <FaImage onClick={()=> fileRef.current.click()} />
            
            <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=> setUser({...user, avatar:e.target.files[0]})} />
        </div>

        </form>
        <div className="flex items-center justify-center">
        <button onClick={handleSubmit} className='bg-slate-500 px-8 py-1 mt-6 text-white rounded-2xl p-medium-18 font-poppins tracking-wider uppercase hover:bg-inherit hover:text-slate-700 hover:border border-slate-700 transition-all ease-in duration-300 hover:scale-105'>
            {buttonDisabled ? "Fill Details": "Create Account"}
        </button>
        </div>
        <div className="flex justify-center mt-4">
          <p>Already have Account <span onClick={()=>navigate("/login")} className='text-cyan-600'>Login</span></p>
        </div>
    </div>
  )
}

export default Register