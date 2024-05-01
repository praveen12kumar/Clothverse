import Home from "./pages/Home";
import Header from "./components/Header";
import {Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Header/>
    <Routes>
        
        <Route path="/" element={<Home/>}/>

    </Routes>
    <Footer/>
    </>
  );
}

export default App;
