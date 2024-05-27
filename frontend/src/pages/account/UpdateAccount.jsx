import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import MetaData from '../../utils/MetaData';
import { clearUserError, clearUserSuccess, } from '../../features/user/userSlice';
import { updateProfile } from '../../features/user/userSlice';


const UpdateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoadingUser, user, userSuccess, userError, isAuthenticated } = useSelector(state => state.user);
   
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar?.url || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');

  useEffect(() => {
    if (userError) {
      toast.error(userError);
      dispatch(clearUserError());
      return;
    }

    if (userSuccess) {
      toast.success('Profile updated successfully');
      dispatch(clearUserSuccess());
      navigate('/account');
    }
  }, [userError, userSuccess, dispatch, navigate]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);

    formData.forEach((element)=>{
        console.log(element);
    })

    dispatch(updateProfile(formData));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    // Check if a file was selected
    if (file) {
      // Create a URL representing the selected file
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // Set the preview URL once the file has been read
        setAvatarPreview(reader.result);
      };
  
      // Read the file as a Data URL
      reader.readAsDataURL(file);
  
      // Store the file itself for later submission
      setAvatar(file);
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isLoadingUser ? (
    <div className="w-screen h-screen bg-slate-100">
      <Loader />
    </div>
  ) : (
    <>
      <MetaData title={`Update Profile`} />
      <h1 className='text-3xl font-poppins font-medium text-cyan-800 pt-8 md:py-8 text-center'>Update Profile</h1>
      <div className="max-w-7xl mx-auto mb-10 md:my-4 md:p-12">
        <div className="flex flex-col items-center">
          <div className="py-8 px-5 lg:py-2">
            <img
              className="w-40 h-40 lg:w-52 lg:h-52 rounded-full shadow-lg border border-slate-300 object-cover"
              src={avatarPreview}
              alt="Avatar Preview"
            />
          </div>
          <form className="w-full md:w-80 px-10 md:px-4 mx-auto" onSubmit={handleUpdateProfile}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium font-roboto text-slate-600">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border border-slate-300 rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium font-roboto text-slate-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border border-slate-300 rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium font-roboto text-slate-600">Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="p-2 border border-slate-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-700 p-2 font-poppins text-white uppercase tracking-wider rounded-xl hover:border hover:bg-cyan-700 hover:text-slate-200 transition-all cursor-pointer ease-in duration-300"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateAccount;
