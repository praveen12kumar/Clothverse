import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../../utils/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { getAdminProducts, clearErrors, deleteProduct } from '../../features/product/productSlice';
import toast from 'react-hot-toast';
import DashboardSidebar from '../../components/sidebar/DashboardSidebar';
import Loader from '../../components/Loader/Loader';

const ProductList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8);
    const [totalPage, setTotalPage] = useState(0);
    const {error, products, isLoadingProduct} = useSelector(state=> state.products);
    
    const handlePageChange = (e)=>{
        setCurrentPage(e)
    }

    const handleNextClick = ()=>{
        if(currentPage < totalPage){
            setCurrentPage(currentPage+1)
        }

    }

    const handlePreviousClick = ()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
        }
    }

    const preDisable = currentPage === 1;
    const nextDisable = currentPage === totalPage;

    const startIndex = (currentPage-1)*productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const itemsToDisplay = products.slice(startIndex, endIndex);
    
    const deleteProductHandler = (id)=>{
        console.log("delete prdocut");
        dispatch(deleteProduct(id)).then(()=>{
            toast.success('Product deleted successfully')
            dispatch(getAdminProducts());
        })   
    }
    
    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }

        dispatch(getAdminProducts())
        setTotalPage(Math.ceil(products.length/productsPerPage))
    },[dispatch, error,productsPerPage])

    
  return (
    isLoadingProduct ? <div className="h-screen w-screen flex justify-center items-center"><Loader/></div> :
    <>
    <MetaData title={'Admin - All Products'} />
    <div className="w-screen min-h-screen flex-shrink-0">
        <div className="flex flex-col md:flex-row">
            <DashboardSidebar />
            <div className="wrapper flex flex-col">
            <h1 className='text-2xl text-center font-poppins font-medium pl-5 py-5'>All Products</h1>
            <div className="md:hidden">
                {/* // mobile view */}
                {
                    itemsToDisplay && itemsToDisplay?.map((item)=>(
                        <div className="w-full flex flex-col gap-2 border border-slate-500 rounded-lg p-2 my-4" key={item?._id}>
                            <div className="w-full text-xs font-poppins flex items-center justify-between">
                                <p className='text-sm font-medium font-roboto'>Product ID</p>
                                <p>{item?._id}</p>
                            </div>
                            <div className="w-full text-xs font-poppins flex items-center justify-between gap-10">
                                <p className='whitespace-nowrap text-sm font-medium font-roboto'>Product Name</p>
                                <p className='line-clamp-1 truncate overflow-hidden'>{item?.name}</p>
                            </div>
                            <div className="w-full flex justify-between">
                                <div className="text-xs font-poppins flex flex-col items-center justify-between">
                                    <p className='text-sm font-medium font-roboto'>Stock</p>
                                    <p>{item?.stock}</p>
                                </div>
                                <div className="text-xs font-poppins flex flex-col items-center justify-between">
                                    <p className='text-sm font-medium font-roboto'>Price</p>
                                    <p className='font-roboto'>₹{item?.price}</p>
                                </div>
                                <div className=" text-xs font-poppins flex flex-col items-center justify-between">
                                    <p className='text-sm font-medium font-roboto'>Actions</p>
                                    <div className="flex gap-2">
                                        <Link to={`/admin/product/${item?._id}`}><span className='text-lg text-green-600 cursor-pointer'><MdEdit/></span></Link>
                                        <span className='text-lg text-red-600 cursor-pointer' onClick={()=>deleteProductHandler(item?._id)} ><MdDelete/></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="hidden md:block">
                {/* // desktop view */}
               <div className="flex items-center justify-between text-base font-medium font-roboto bg-orange-600 p-4 text-white">
                    <p className='w-40 text-center'>Product ID</p>
                    <p className='max-w-[450px] w-[400px]  text-center'>Product Name</p>
                    <p className='w-24 text-center'>Stock</p>
                    <p className='w-24 text-center'>Price</p>
                    <p className='w-24 text-center'>Actions</p>
               </div>
               <div className="">
                {
                    itemsToDisplay && itemsToDisplay?.map((item)=>(
                        <div className="my-5 font-poppins flex items-center gap-10 border border-slate-400 p-3 hover:bg-gray-400 hover:text-white transition-colors duration-300 ease-in rounded-md">
                            <p className='text-[12px]'>{item?._id}</p>
                            <p className='max-w-[450px] w-[400px]  text-[12px] font-poppins  truncate overflow-hidden'>{item?.name}</p>
                            <p className='w-24 text-[12px] text-center'>{item?.stock}</p> 
                            <p className='w-24 text-[12px] text-center font-roboto'>₹{item?.price}</p>
                            <div className="flex items-center">
                                <Link to={`/admin/product/${item?._id}`}><span className='text-lg text-green-600 cursor-pointer'><MdEdit/></span></Link>
                                <span className='text-lg text-red-600 cursor-pointer ml-5' onClick={()=>deleteProductHandler(item?._id)} ><MdDelete/></span>
                            </div>
                        </div>
                    ))
                }
               </div>

            </div>
            </div>
        </div>
        <div className='w-full flex items-center justify-center my-10'>
                        <button 
                        className={`w-10 h-10 rounded-full text-sm mx-1 border border-cyan-700 text-slate-400 hover:bg-slate-400 hover:text-white transition-colors duration-300 ease-in ${currentPage === preDisable && 'bg-slate-400 text-white'}   disabled:${currentPage === preDisable}`}
                        onClick={handlePreviousClick}>Prev
                        </button>
                {
                    Array.from({length:totalPage},(_,index)=>{
                        return (
                        <button 
                        className={`w-10 h-10 rounded-full mx-1 border border-cyan-700 text-slate-400 hover:bg-slate-400 hover:text-white transition-colors duration-300 ease-in ${currentPage === index+1 && 'bg-slate-400 text-white'}   disabled:${currentPage === index+1}`}
                        key={index}
                        onClick={()=>handlePageChange(index+1)}>{index+1}
                        </button>)
                    })
                }
                <button 
                        className={`w-10 h-10 rounded-full text-sm mx-1 border border-cyan-700 text-slate-400 hover:bg-slate-400 hover:text-white transition-colors duration-300 ease-in ${currentPage === nextDisable && 'bg-slate-400 text-white'}   disabled:${currentPage === nextDisable}`}
                        onClick={handleNextClick}>Next
                        </button>
        </div>
    </div>
    </>
  )
}

export default ProductList