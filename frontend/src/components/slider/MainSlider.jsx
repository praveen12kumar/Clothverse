import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "./mainSlider.css";

import { Link } from "react-router-dom";

const MainSlider = () => {
  return (
    <div className="z-10">
      <Swiper
        lazy={true}
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, EffectFade, Navigation]}
        className="mySwiper MainSlider"
      >
        <SwiperSlide>
          {({ isActive }) => (
            <div className="min-h-[500px] h-[calc(100vh-100px)] w-full relative bg-red-500">
              <img
                src={"/Images/slide-01.jpg"}
                alt="banner-1"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="w-full h-full z-10 absolute left-0 top-0 flex justify-center items-center">
                <div className=" px-8 md:px-20  lg:px-40 w-full">
                  <h1
                    className={`capitalize md:pl-10 font-poppins text-lg lg:text-2xl leading-relaxed md:text-lg my-5 text-slate-700 ${isActive ? "animate-bounce duration-200 opacity-100 " : "-translate-y-1/4 opacity-0"}`}
                  >
                    Women Collection {new Date().getFullYear()}
                  </h1>
                  <h1 className={`uppercase tracking-wider text-4xl md:text-6xl lg:text-7xl text-cyan-800  font-roboto font-bold ${isActive && "animate-slideInFromLeft"}`}>
                    New Season
                  </h1>
                  <button
                    className={`mt-8 md:m-5 lg:m-10 transition-opacity delay-[1600ms]  font-poppins ${isActive && "animate-zoomIn"}`}
                  >
                    <Link 
                      to='/products?price=[0]&color=&category=women&sortBy={"createdAt":-1}&page=1&sortBy=null'
                      className=" text-slate-50 rounded-full uppercase w-fit bg-cyan-700  py-3 px-9 transition-colors duration-500 hover:bg-black"
                    >
                      SHOP NOW
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <div className="min-h-[500px] h-[calc(100vh-100px)] w-full relative">
              <img
                src={"/Images/slide-02.jpg"}
                alt="banner-1"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="w-full h-full z-10 absolute left-0 top-0 flex justify-center items-center">
                <div className=" px-8 md:px-20  lg:px-40 w-full">
                  <h1
                    className={`capitalize md:pl-10 font-poppins text-lg lg:text-2xl leading-relaxed md:text-lg my-5 text-slate-700 ${isActive ? "animate-bounce duration-200 opacity-100 " : "-translate-y-1/4 opacity-0"}`}
                  >
                    men Collection {new Date().getFullYear()}
                  </h1>
                  <h1 className={`uppercase tracking-wider text-4xl md:text-6xl lg:text-7xl text-cyan-800  font-roboto font-bold ${isActive && "animate-fadeIn"}`}>
                    New Season
                  </h1>
                  <button
                    className={`mt-8 md:m-5 lg:m-10 transition-opacity delay-[1600ms]  font-poppins ${isActive && "animate-slideUp"}`}
                  >
                    <Link 
                      to='/products?price=[0]&color=&category=men&sortBy={"createdAt":-1}&page=1&sortBy=null'
                      className=" text-slate-50 rounded-full uppercase w-fit bg-cyan-700  py-3 px-9 transition-colors duration-500 hover:bg-black"
                    >
                      SHOP NOW
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>

        <SwiperSlide>
          {({ isActive }) => (
            <div className="min-h-[500px] h-[calc(100vh-100px)] w-full relative ">
              <img
                src={"/Images/slide-03.jpg"}
                alt="banner-1"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="w-full h-full z-10 absolute left-0 top-0 flex justify-center items-center">
                <div className=" px-8 md:px-20  lg:px-40 w-full">
                  <h1
                    className={`capitalize md:pl-10 font-poppins text-lg lg:text-2xl leading-relaxed md:text-lg my-5 text-slate-700 ${isActive ? "animate-bounce duration-200 opacity-100 " : "-translate-y-1/4 opacity-0"}`}
                  >
                    Footware Collection {new Date().getFullYear()}
                  </h1>
                  <h1 className={`uppercase tracking-wider text-4xl md:text-6xl lg:text-7xl text-cyan-800  font-roboto font-bold ${isActive && "animate-zoomIn"}`}>
                    Latest Sneakers
                  </h1>
                  <button
                    className={`mt-8 md:m-5 lg:m-10 transition-opacity delay-[1600ms]  font-poppins ${isActive && "animate-slideUp"}`}
                  >
                    <Link 
                      to='/products?price=[0]&color=&category=footware&sortBy={"createdAt":-1}&page=1&sortBy=null'
                      className=" text-slate-50 rounded-full uppercase w-fit bg-cyan-700  py-3 px-9 transition-colors duration-500 hover:bg-black"
                    >
                      SHOP NOW
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>

        
      </Swiper>
    </div>
  );
};

export default MainSlider;
