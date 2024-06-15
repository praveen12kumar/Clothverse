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
import ResetPassword from "./pages/account/ResetPassword";
import ConfirmOrder from "./pages/product/ConfirmOrder";
import Shipping from "./pages/product/Shipping";
import Payment from "./pages/product/Payment";
import Order from "./pages/order/Order";
import PaymentSuccess from "./pages/product/PaymentSuccess";
import OrderDetails from "./pages/order/OrderDetails";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import NewProduct from "./pages/admin/NewProduct";
import OrderList from "./pages/admin/OrderList";
import UpdateProduct from "./pages/admin/UpdateProduct";
import ProcessOrder from "./pages/admin/ProcessOrder";
import UsersList from "./pages/admin/UsersList";
import UpdateUser from "./pages/admin/UpdateUser";


import { getUserDetails } from "./features/user/userSlice";
import { getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";



function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hideHeaderAndFooterPaths = ['/login', '/register',];
  const hideHeaderFooter = hideHeaderAndFooterPaths.includes(location.pathname);
  

  useEffect(()=>{
    dispatch(getUserDetails())
    dispatch(getCartItems())
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
        <Route path="/payment" element={<ProtectedRoute><Payment/></ProtectedRoute>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
        <Route path="/order"  element={<ProtectedRoute><Order/></ProtectedRoute>}/>
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}  ><Dashboard/></ProtectedRoute>}/>
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}  ><ProductList/></ProtectedRoute>}/>
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true}  ><NewProduct/></ProtectedRoute>}/>
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}  ><OrderList/></ProtectedRoute>}/>
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}  ><UsersList/></ProtectedRoute>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/password/update" element={<UpdatePassword/>}/>
        <Route path="/account/update" element={<ProtectedRoute><UpdateAccount/></ProtectedRoute>}/>
        <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
        <Route path="/payment/success" element={<ProtectedRoute><PaymentSuccess/></ProtectedRoute>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
        <Route path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder/></ProtectedRoute>}/>
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>}/>
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    {!hideHeaderFooter && <Footer/>}
    </>
  );
}

export default App;
