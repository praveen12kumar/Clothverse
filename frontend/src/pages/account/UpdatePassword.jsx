import React,{useEffect, useState} from "react";
import MetaData from "../../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearUserError, clearUserSuccess } from "../../features/user/userSlice";
import { MdKey } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { updateUserPassword } from "../../features/user/userSlice";


const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPasssword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const { userError, userSuccess } = useSelector((state) => state.user);

    const handleChangePassword = ()=>{
        const formData = new FormData();
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPasssword);
        formData.append("confirmPassword", confirmPassword);

        dispatch(updateUserPassword(formData)).then(
            navigate("/account")
        )
    }



  useEffect(()=>{
    if(userError){
        toast.error(userError)
        dispatch(clearUserError());
        return;
    }
    if(userSuccess){
         toast.success(userSuccess);
         dispatch(clearUserSuccess);
         navigate("/account");
    }
  },[userError, userSuccess,dispatch , navigate])





  return (
    <>
    <MetaData/>
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-sm mx-auto p-4 -mt-32 border border-slate-700 rounded-lg">
        <h3 className="text-center p-medium-20 font-poppins border-b-2 border-slate-500 p-1">
          Change Password
        </h3>
        <div className="flex flex-col gap-8 mt-4 items-center p-4 ">
          <div className="w-full flex items-center border border-slate-500 p-1 rounded-lg">
            <MdKey className="mx-2 text-xl" />
            <input
              type="text"
              placeholder="Old Password"
              className="outline-none bg-inherit p-2 font-roboto tracking-wider"
              required
              value={oldPassword}
              onChange={(e)=>setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center border border-slate-500 p-1 rounded-lg">
            <MdKey className="mx-2 text-xl" />
            <input
              type="text"
              placeholder="New Password"
              className="outline-none bg-inherit p-2 font-roboto tracking-wider"
              required
              value={newPasssword}
              onChange={(e)=> setNewPassword(e.target.value)}
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

export default UpdatePassword;
