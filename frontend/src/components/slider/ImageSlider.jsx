import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import 'swiper/css/autoplay';
import {  EffectFade, Navigation } from "swiper/modules";
import "./imageslider.css";

const ImageSlider = ({productImages}) => {
    console.log("Product Image", productImages);

  return (
   <>
    <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        navigation={true}
        modules={[EffectFade, Navigation]}
        className='mySwiper ProductImageSlider h-full w-full'
    >

    {
        productImages?.map((image)=>(
            <SwiperSlide key={image?.url}>
                {({isActive})=>(
                    <div className="relative w-full h-full">
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