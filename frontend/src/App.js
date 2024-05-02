import Home from "./pages/Home";
import Header from "./components/Header";
import {Routes, Route, useLocation  } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./pages/profile/Login";
import Register from "./pages/profile/Register";


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
        
    </Routes>
    {!hideHeaderFooter && <Footer/>}
    </>
  );
}

export default App;
