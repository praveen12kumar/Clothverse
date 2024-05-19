import React from 'react'
import { Rate } from 'antd';

const ReviewCard = ({review}) => {
  return (
    <div className='w-full min-h-60 flex flex-col items-center  bg-white p-4 shadow-lg rounded-lg'>
        <div className="w-12 h-12 md:w-14 md:h-14 shadow object-contain">
            <img src={review?.image} alt="user" className='w-full h-full rounded-full' />
        </div>
        <div className="w-full flex flex-col items-center mt-2 md:mt-3 gap-2">
            <h1 className='text-sm font-poppins font-medium md:text-base'>{review?.name}</h1>
            <p className='flex items-center gap-1 mb-2'>Rating: <Rate allowHalf value={review?.rating}/></p>
            <div className="font-roboto md:text-base text-slate-600 text-center break-keep">{review?.comment}</div>
        </div>
    </div>
  )
}

export default ReviewCard