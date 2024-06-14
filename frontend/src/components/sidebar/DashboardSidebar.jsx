import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdOutlineExpandLess } from "react-icons/md";
import { MdOutlineExpandMore } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Effect to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-full md:w-[30%] md:min-h-screen md:text-lg flex flex-wrap md:flex-col py-5 md:pt-28 gap-4 md:gap-16  text-slate-50 font-medium font-poppins items-center justify-center md:justify-start bg-cyan-700 ">
      <div className="">
          <Link className="flex items-center gap-1 hover:text-cyan-100 transition-colors duration-300 ease-in" to="/admin/dashboard">
            <span>
              <MdDashboard />
            </span>
            <p>Dashboard</p>
          </Link>
        </div>

        <div ref={dropdownRef} className="relative inline-block text-left hover:text-cyan-100 transition-colors duration-300 ease-in">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center items-center gap-1 w-full rounded-md  "
          >
            Products
            <span className="text-xl">
              {isOpen ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
            </span>
          </button>
          {isOpen && (
            <div className="origin-top-right absolute right-0 left-4 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all ease-out duration-500 transform opacity-100 scale-100">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  to="/admin/products"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  <span className="mb-1">
                    <MdPostAdd />
                  </span>{" "}
                  All
                </Link>
                <Link
                  to="/admin/product"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  <span>
                    <IoMdAdd />
                  </span>{" "}
                  Create
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="">
          <Link to="/admin/orders" className="flex items-center gap-2 hover:text-cyan-100 transition-colors duration-300 ease-in">
            <span>
              <FaList />
            </span>
            <p>Orders</p>
          </Link>
        </div>

        <div className="">
          <Link to="/admin/users" className="flex items-center gap-2 hover:text-cyan-100 transition-colors duration-300 ease-in">
            <span>
              <FaUsers />
            </span>
            <p>Users</p>
          </Link>
        </div>
        <div>
          <Link to="/admin/reviews" className="flex items-center gap-2 hover:text-cyan-100 transition-colors duration-300 ease-in">
            <span>
              <MdRateReview />
            </span>
            <p>Reviews</p>
          </Link>
        </div> 
        
    </div>
  );
};

export default DashboardSidebar;
