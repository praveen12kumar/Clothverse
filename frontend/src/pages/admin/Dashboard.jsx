import React, { useState, useEffect, useRef } from "react";
import DashboardSidebar from "../../components/sidebar/DashboardSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import { getAllUsers } from "../../features/user/userSlice";
import { getAdminProducts } from "../../features/product/productSlice";
import { getAdminOrders } from "../../features/order/orderSlice";
import MetaData from "../../utils/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { orders } = useSelector((state) => state.orders);
  const { allUsers } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

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

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
    dispatch(getAdminOrders());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  //   const lineState = {
  //     labels: ["Initial Amount", "Amount Earned"],
  //     datasets: [
  //       {
  //         label: "TOTAL AMOUNT",
  //         backgroundColor: ["tomato"],
  //         hoverBackgroundColor: ["rgb(197, 72, 49)"],
  //         data: [0, totalAmount],
  //       },
  //     ],
  //   };

  const doughnutState = {
    labels: ["OutOfStock", "InStock"],
    datasets: [
      {
        label: "My First Dataset",
        data: [outOfStock, products?.length - outOfStock],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <MetaData title={"Dashboard - Admin Panel"} />
      <div className="w-screen h-screen flex flex-col md:flex-row flex-shrink-0">
        <DashboardSidebar />
        <div className="wrapper flex flex-col">
        <h1 className="hidden md:block text-2xl md:text-center font-poppins font-medium  py-5">
          Dashboard
        </h1>
          <div className="w-full text-xl p-5 flex items-center justify-center bg-cyan-700 text-white font-roboto text-center ">
            <div> 
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
          </div>
          <div className="flex pt-8 justify-center gap-5 md:gap-10 lg:gap-20">
            <Link
              to="/admin/products"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center bg-red-500 text-white p-5 hover:bg-red-600 transition-colors duration-200 ease-in text-center"
            >
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>
            <Link
              to="/admin/orders"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center bg-green-700 text-white p-5 px-6  hover:bg-green-600 transition-colors duration-200 ease-in text-center"
            >
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link
              to="/admin/users"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center bg-slate-600 text-white p-6 px-7 hover:bg-slate-700 transition-colors duration-200 ease-in text-center"
            >
              <p>Users</p>
              <p>{allUsers && allUsers.length}</p>
            </Link>
          </div>

          {/* <div className="">
        <Line data={lineState}/>
      </div> */}

          {/* <div className="">
        <Doughnut data={doughnutState}/>
      </div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// <div className="hidden md:block h-full border border-slate-400 "></div>
