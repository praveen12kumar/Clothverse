import React from 'react'
import CategoryCard from './CategoryCard'
const CategoryMenu = () => {
  return (
    <div className='w-full  bg-white py-8 md:py-12 lg:py-16' >
        <div className="flex flex-col max-w-7xl h-full mx-auto  ">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4">
                <CategoryCard title={"Women"} subTitle={"new Trend"} Image={"/Images/banner-01.jpg"} />
                <CategoryCard title={"Men"} subTitle={"new Trend"} Image={"/Images/banner-02.jpg"} />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <CategoryCard title={"Watches"} subTitle={`new ${new Date().getFullYear()}`} Image={"/Images/banner-07.jpg"} />
            <CategoryCard title={"Bags"} subTitle={`new ${new Date().getFullYear()}`} Image={"/Images/banner-08.jpg"} />
            <CategoryCard title={"Footwares"} subTitle={`new ${new Date().getFullYear()}`} Image={"/Images/shoe.png"} />
            </div>
        </div>
    </div>
  )
}

export default CategoryMenu