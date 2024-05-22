import React,{useState, useEffect} from 'react'
import MainSlider from '../components/slider/MainSlider'
import CategoryMenu from '../components/categoryMenu/CategoryMenu'
import MetaData from '../utils/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../features/product/productSlice'
import Loader from '../components/Loader/Loader'
import OverviewProducts from '../components/product/OverviewProducts'
import { getCartItems } from '../features/cart/cartSlice'

const storeOverview = [
  {name:"Best Seller",sortBy: '{"sold":-1,"_id":-1}' },
  {name : "Newest",sortBy: '{"createdAt":-1,"_id":-1}' },
  { name : "Discount" ,sortBy : '{"meta.discount":-1,"_id":-1}' },
  { name : "Top Rate", sortBy : '{"rating":-1,"_id":-1}' }
]

const Home = () => {
  const [isActive, setIsActive] = useState(0);
  const dispatch = useDispatch();
  const {isLoadingProduct, products} = useSelector(state => state.products);


  useEffect(()=>{
    window.scrollTo({top:0, behavior:"smooth"})
  },[]);


  useEffect(()=>{
    dispatch(getAllProducts({page:1}))
    dispatch(getCartItems())
  },[dispatch])

  return (
    <>
    <MetaData title={"Clothverse"}/>
    <div className='z-10'>
      <MainSlider/>
      <CategoryMenu/>

      <div className="wrapper flex flex-col items-center font-poppins my-4 lg:my-8">
        <div className="w-full">
          <h1 className='text-4xl my-8 font-roboto font-extrabold leading-tight text-center'>Store Overview</h1>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8  my-2 ">
          {
            storeOverview.map((cond, index)=>(
              <h2 className={`text-sm md:text-base lg:text-lg  cursor-pointer hover:underline  hover:underline-offset-4 hover:text-slate-600 
                transition-colors ease-in duration-1000 ${isActive === index ? "text-slate-700 font-medium underline underline-offset-4" :"text-slate-500"}
              `} key={index} onClick={()=> setIsActive(index)} >{cond.name}</h2>
            ))
          }
          </div>
          {
            isLoadingProduct ? <div className="w-full h-[40vh] flex"><Loader/></div>:
            <OverviewProducts data = {products}/>
          }
        </div>


      </div>

    </div>
    </>
  )
}

export default Home