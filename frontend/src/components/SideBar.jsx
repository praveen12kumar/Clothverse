import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import NavItems from './shared/NavItems';
import { IoSearch } from "react-icons/io5";

const SideBar = ({openSideBar, toggleSideBar }) => {
//  const sidebarRef = useRef(null);
 const containerControls = useAnimationControls();

 // Animation variants for opening and closing the sidebar
 const sidebarVariants = {
    close:{
        y:-30,
        x:200,
        opacity:0
    },
    open:{
        y:0,
        x:0,
        opacity:1,
        transition:{
            duration:0.4,
            staggeredChildren:0.4,
        }
    },
 };

 // Function to handle clicks outside the sidebar


 // Add event listener for clicks outside the sidebar
 useEffect(() => {
   if(openSideBar){
    containerControls.start("open")
   }
   else{
    containerControls.start("close")
   }
 },[openSideBar, toggleSideBar, containerControls]);


 return (
    <motion.div
      className='w-60 min-h-screen p-2 absolute top-0 right-0 bg-slate-700'
      variants={sidebarVariants}
      initial='close'
      animate={containerControls}
    >
      <div className="w-full h-16 relative">
        <p className='absolute right-2 mt-2 text-md p-medium-16 text-white' onClick={toggleSideBar}>Close</p>
      </div>

      <div className="flex items-center bg-inherit border-b-2">
        <input type="text" placeholder='Search' className='w-44 bg-inherit outline-none p-regular-16 px-2' />
        <span><IoSearch className='text-white'/></span>
      </div>

      <div className="p-10">
        <NavItems flexCol={"flex-col"}/>
      </div>

      <div className="pl-10 text-white p-medium-16">Logout</div>
    </motion.div>
  
 );
};

export default SideBar;
