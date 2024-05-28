import React,{useEffect, useState} from "react";
import MetaData from "../../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { clearUserError, clearUserSuccess } from "../../features/user/userSlice";
import { MdKey } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { resetPassword } from "../../features/user/userSlice";


const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {token} = useParams();

 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const { userError, userSuccess } = useSelector((state) => state.user);

    const handleChangePassword = ()=>{
        dispatch(resetPassword({token,password, confirmPassword}));
        navigate("/login")
    }



  useEffect(()=>{
    if(userError){
        toast.error(userError)
        dispatch(clearUserError());
        return;
    }
    if(userSuccess){
         toast.success(userSuccess);
         dispatch(clearUserSuccess());
         return;
    }
  },[userError, userSuccess,dispatch , navigate])





  return (
    <>
    <MetaData title={"reset password"}/>
    <div className="w-screen h-screen ">
      <div className="max-w-80 mx-auto p-4 mt-32 border border-slate-700 rounded-lg">
        <h3 className="text-center p-medium-20 font-poppins border-b-2 border-slate-500 p-1">
          Reset Password
        </h3>
        <div className="flex flex-col gap-8 mt-4 items-center p-4 ">
         
          <div className="w-full flex items-center border border-slate-500 p-1 rounded-lg">
            <MdKey className="mx-2 text-xl" />
            <input
              type="text"
              placeholder="New Password"
              className="outline-none bg-inherit p-2 font-roboto tracking-wider"
              required
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center border border-slate-500 p-1 rounded-lg">
            <FaLock className="mx-2 text-xl" />
            <input
              type="text"
              placeholder="Confirm Password"
              className="outline-none bg-inherit p-2 font-roboto tracking-wider"
              required
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>
          <button className='w-full text-md bg-slate-700 p-2 px-4 font-poppins font-medium text-white  uppercase tracking-wider rounded-xl hover:bg-cyan-600 hover:border-slate-600 hover:text-slate-200  transition-all ease-in duration-300'
            onClick={handleChangePassword}
          >Update</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
