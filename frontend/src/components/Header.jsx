import React,{ useState} from 'react'
import { Link } from 'react-router-dom'
import NavItems from './shared/NavItems';
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import SideBar from './SideBar';
import UpperNavBar from './UpperNavBar';
import { useSelector} from 'react-redux';



const Header = () => {
  

  const {totalWishlistItem} = useSelector(state => state.wishlist)
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = ()=>{
    setOpenSideBar(!openSideBar)
  }

  return (
    <>
    <div className="">
      <UpperNavBar/>
    </div>
    <header className='h-16 wrapper flex flex-between bg-slate-400 shadow sticky top-0 z-50'>
      {/* logo */}
      <div className="w-28 md:w-36 lg:w-40">
         <Link to="/">
            <img className='rounded-lg' src={'/Images/logo.png'} alt="logo" />
         </Link>
      </div>
      <div className="hidden md:block">
        <NavItems/>
      </div>

      <div className="flex flex-row gap-6 md:gap-8 ">
        <div className="flex-center cursor-pointer">
          <IoMdSearch className='text-2xl hover:scale-105  hover:text-purple-600 transition-all ease-in duration-300'/>
        </div>

        <div className="flex items-center relative cursor-pointer">
            <FaCartShopping className='text-2xl hover:text-purple-600 transition-all ease-in duration-300'/> 
            <div className="absolute -top-[7px] -right-[8px] bg-purple-700 text-white text-xs rounded-sm min-w-[15px] height-[15px] flex items-center justify-center">
              <span>0</span>
            </div>
        </div>

        <div className="relative hidden md:block cursor-pointer">
            <FaHeart className='text-2xl  hover:text-purple-600 transition-all ease-in duration-300'/> 
            <div className="absolute -top-[7px] -right-[8px] bg-purple-700 text-white text-xs rounded-sm min-w-[15px] height-[15px] flex items-center justify-center">
              <span>{totalWishlistItem}</span>
            </div>
        </div>

        <div className="md:hidden cursor-pointer" onClick={toggleSideBar} >
          <GiHamburgerMenu className='hover:text-Purple transition-all duration-500 text-[22px] sm:text-[26px]'/>
        </div>
      </div>
      {
            openSideBar && <SideBar openSideBar={openSideBar} toggleSideBar={toggleSideBar} />
      }
    </header>
    </>
  )
}

export default Header