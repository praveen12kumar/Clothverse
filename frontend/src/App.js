import Home from "./pages/Home";
import Header from "./components/Header";
import {Routes, Route, useLocation  } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import Account from "./pages/account/Account";
import UpdatePassword from "./pages/account/UpdatePassword";
import About from "./pages/about/About";
import ContactUs from "./pages/contact/ContactUs";
import HelpFAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/product/ProductDetails";
import Product from "./pages/product/Product";
import Wishlist from "./pages/product/Wishlist";
import Cart from "./pages/product/Cart";
import UpdateAccount from "./pages/account/UpdateAccount";
import ForgotPassword from "./pages/account/ForgotPassword";

import { getUserDetails } from "./features/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hideHeaderAndFooterPaths = ['/login', '/register'];
  const hideHeaderFooter = hideHeaderAndFooterPaths.includes(location.pathname);


  useEffect(()=>{
    dispatch(getUserDetails())
  },[dispatch]);



  
  return (
    <>
    {!hideHeaderFooter && <Header/>}
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product" element={<Product/>}/>   
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/help" element={<HelpFAQ/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/forgot/password" element={<ForgotPassword/>}/>
        <Route path="/password/update" element={<UpdatePassword/>}/>
        <Route path="/account/update" element={<ProtectedRoute><UpdateAccount/></ProtectedRoute>}/>
       
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    {!hideHeaderFooter && <Footer/>}
    </>
  );
}

export default App;
