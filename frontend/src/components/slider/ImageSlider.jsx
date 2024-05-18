import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import 'swiper/css/autoplay';
import {Autoplay,  EffectFade, Navigation } from "swiper/modules";
import "./imageslider.css";

const ImageSlider = ({productImages}) => {
    

  return (
   <>
    <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        autoplay={{
            delay:10000,
            disableOnInteraction:false,
        }}
        navigation={true}
        modules={[Autoplay, EffectFade, Navigation]}
        className='mySwiper ProductImageSlider h-full w-full'
    >

    {
        productImages?.map((image)=>(
            <SwiperSlide key={image?.url}>
                {({isActive})=>(
                    <div className="relative w-full h-full shadow-lg">
                        <img  src={image?.url} alt="product slides" 
                        className='object-contain object-center  w-full h-full'
                        />
                    </div>
                )}
            </SwiperSlide>
        ))
    }

    </Swiper>
   </>
  )
}

export default ImageSlider