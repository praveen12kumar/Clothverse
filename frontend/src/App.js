import Home from "./pages/Home";
import Header from "./components/Header";
import {Routes, Route, useLocation  } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import Account from "./pages/account/Account";

function App() {
  const location = useLocation();
  const hideHeaderAndFooterPaths = ['/login', '/register'];
  const hideHeaderFooter = hideHeaderAndFooterPaths.includes(location.pathname);
  return (
    <>
    {!hideHeaderFooter && <Header/>}
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<Account/>}/>
        
    </Routes>
    {!hideHeaderFooter && <Footer/>}
    </>
  );
}

export default App;
