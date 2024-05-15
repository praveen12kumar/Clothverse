import React from 'react'
import ProductCard from './ProductCard';

const OverviewProducts = ({data}) => {
    const overArray = [];
    
    
    for(let i = 0; i < 4; i++){
        overArray.push(data[i])
    }

    

  return (
    <>
    <div className='w-full mt-10 md:mt-15 lg:mt-20 flex flex-row flex-wrap justify-center items-center gap-2 md:gap-6 lg:gap-10'>
        {
            overArray?.map((item)=> <ProductCard data={item} />)
        }
    </div>
    
    </>
  )
}

export default OverviewProducts