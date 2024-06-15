import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import { clearUserError, clearUserSuccess } from '../../features/user/userSlice'
import toast from 'react-hot-toast'
import MetaData from '../../utils/MetaData'
import { logoutUser } from '../../features/user/userSlice'

const Account = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoadingUser, user, userSuccess, userError, isAuthenticated} = useSelector(state=> state.user);
   
    const handleLogout = ()=>{
        dispatch(logoutUser()).then(()=>{
            navigate("/login")
        })
        
    };

    useEffect(()=>{
        if(userError){
            toast.error(userError)
            dispatch(clearUserError());
            return;
        }

        if(userSuccess){
            toast.success(userSuccess)
            dispatch(clearUserSuccess());
            return;
        }
    },[userError, userSuccess, dispatch])

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/login")
        }
        window.scrollTo({top:0,behavior:"smooth"})
    },[isAuthenticated, navigate])

  
    return (
    isLoadingUser?
    <div className="w-screen h-screen bg-slate-100">
        <Loader/>
        </div>
    :<>
        <MetaData title={`${user?.name}'s Profile`}/>
        <h1 className='text-3xl font-poppins font-medium text-cyan-800 pt-8 md:py-8 text-center'>Profile</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-7xl mx-auto md:my-4 md:p-12 mb-10">
            <div className="flex flex-col gap-10 items-center ">
                <div className="py-8 px-5 lg:py-2 ">
                    <img className='w-40 h-40 lg:w-52 lg:h-52 rounded-full shadow-lg border border-slate-300 object-cover' src={user?.avatar?.url} alt="profile" />
                </div>
                <div className="w-full md:w-80 px-10 md:px-4 mx-auto">
                    <Link to="/account/update">
                    <button className='w-full bg-slate-700 p-2 font-poppins text-white p-regular-16 uppercase tracking-wider rounded-xl hover:border hover:bg-cyan-700 hover:text-slate-200 transition-all cursor-pointer ease-in duration-300 '>Edit Profile</button>
                    </Link>
                </div>
                <div className="w-full md:w-80 px-10 md:px-4 mx-auto">
                    <button onClick={handleLogout} className='w-full bg-slate-700 p-2 font-poppins text-white p-regular-16 uppercase tracking-wider rounded-xl hover:border hover:bg-cyan-700  hover:text-slate-100 cursor-pointer transition-all ease-in duration-300 '>Logout</button>
                </div>
            </div>
            <div className="flex flex-col items-start px-10 gap-5">
                <div className="flex flex-col">
                    <p className='text-sm font-medium font-roboto text-slate-600'>Full Name</p>
                    <p className="text-sm  font-poppins">{user?.name}</p>

                </div>
                <div className="flex flex-col ">
                    <p className="text-sm font-medium font-roboto text-slate-600">Email</p>
                    <p className="text-sm  font-poppins">{user?.email}</p>
                </div>
                <div className="flex flex-col ">
                    <p className='text-sm font-medium font-roboto text-slate-600'>Role</p>
                    <p className={`text-sm font-poppins ${user?.role === "admin" ? "text-cyan-600" : "text-slate-600"}` }>{user?.role}</p>
                </div>
                <div className="flex flex-col ">
                    <p className='text-sm font-medium font-roboto text-slate-600'>Joined On</p>
                    <p className={"text-sm font-poppins"}>{user?.createdAt?.toString().substring(0,10)}</p>
                </div>
                <div className="w-full md:w-80 flex flex-col gap-10 mt-5">
                    <Link to='/order'>
                    <button className='w-full text-md bg-slate-700 p-2 px-4 font-poppins text-white  tracking-wider rounded-xl hover:border hover:bg-cyan-700 hover:text-slate-100 transition-all ease-in duration-300 '>My Order</button>
                    </Link>
                    <Link to="/password/update">
                        <button className='w-full text-md bg-slate-700 p-2 px-4 font-poppins text-white  uppercase tracking-wider rounded-xl  hover:bg-cyan-700 transition-all ease-in duration-300'
                        >Change Password</button>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Account