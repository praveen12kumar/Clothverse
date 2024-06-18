import React, { useEffect, useState } from 'react'
import MetaData from '../../utils/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import DashboardSidebar from '../../components/sidebar/DashboardSidebar'
import { MdOutlineSpellcheck } from "react-icons/md";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaList } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BiSolidColor } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getAllCategories, getProductDetails, updateProduct } from '../../features/product/productSlice';
import Loader from "../../components/Loader/Loader";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();

    const {product, error, categories, isLoadingProduct} = useSelector(state=> state.products)
    console.log("product", product);

    const [name, setName] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [color, setColor] = useState("");
    const [discount, setDiscount] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const [oldImages, setOldImages] = useState([])


    const updateProductImageChange = (e)=>{
        const files = Array.from(e.target.files);
        setImages([...files])
        console.log("images", images);

        const imagesPreviewUrl = files.map(file=>{
            return URL.createObjectURL(file);
        })
        setImagesPreview(imagesPreviewUrl);
    }
    

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const price = Math.ceil(originalPrice - (originalPrice * discount)/100)


        const formData = new FormData();
        formData.append('name', name);
        formData.append('originalPrice', originalPrice);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('colors', color);
        formData.append('discount', discount);
        images.forEach((image)=>{
            formData.append('images', image);
        })
        dispatch(updateProduct({id,formData})).then(()=>(
            toast.success("Product updated successfully")
        ))
        setIsLoadingButton(false)
        setOldImages([]);
        navigate("/admin/products")
    }


   // Fetch product details when the component mounts or the ID changes
useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getAllCategories());
    window.scrollTo({top:0,behavior:"smooth"});
  }, [dispatch, id]);
  
  // Set local state when product details are fetched
  useEffect(() => {
    if (product && product._id === id) {
      setName(product?.name);
      setOriginalPrice(product?.price);
      setDescription(product?.description);
      setCategory(product?.category);
      setStock(product?.stock);
      setDiscount(product?.discount);
      setOldImages(product?.images);
      setColor(product?.color);
    }
  }, [product, id]); // Depend on product only
  
      

   useEffect(()=>{
    if(error){
        toast.error(error);
        dispatch(clearErrors())
    }
   })


  return (
        isLoadingProduct ? <div className="w-full h-screen flex justify-center items-center"><Loader/></div> :
        <>
    <MetaData title="Create Product" />
    <div className="w-screen h-auto flex flex-col md:flex-row flex-shrink-0">
        <DashboardSidebar />
        <div className="md:wrapper w-full flex flex-col mt-2">
           <div className="max-w-lg mx-auto">
           <h1 className='text-2xl text-center font-poppins font-medium '>Create Product</h1>
           <form 
           encType='multipart/form-data' 
           onSubmit={updateProductSubmitHandler}
           className='flex flex-col gap-4 p-4'
           >
            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit ">
                <MdOutlineSpellcheck/>
                <input type="text" className="w-full text-sm bg-inherit text-slate-600 outline-none" 
                    placeholder='Product Name'
                    required
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
            </div>

            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit">
                <MdOutlineCurrencyRupee/>
                <input type="number" className="w-full text-sm bg-inherit text-slate-600 outline-none"
                    placeholder='Price'
                    required
                    value={originalPrice}
                    onChange={(e)=> setOriginalPrice(e.target.value)}
                />
            </div>

            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit">
                <MdOutlineDescription/>
                <textarea type="text" className="w-full text-sm bg-inherit text-slate-600 outline-none"
                    placeholder='Description'
                    cols="30"
                    rows="1"
                    required
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                />
            </div>

            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit">
                <BiCategory/>
                <select
                    required
                    className='w-full bg-inherit text-slate-600 outline-none'
                    value={category}
                    onChange={(e)=> setCategory(e.target.value)}
                >
                    <option className='text-slate-600 font-poppins text-xs md:text-sm uppercase' value="">Choose Category</option>
                    {
                        categories?.map((item)=>(
                            <option className='text-slate-600 font-poppins text-xs md:text-sm uppercase pl-10' 
                            key={item} 
                            value={item}>
                                {item}</option>
                        ))
                    }
                </select>
            </div>

            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit">
                <RiDiscountPercentLine/>
                <input type="number" className="w-full text-sm bg-inherit text-slate-600 outline-none"
                    placeholder='Discount'
                    required
                    value={discount}
                    onChange={(e)=> setDiscount(e.target.value)}
                />
            </div>
            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit">
                <BiSolidColor/>
                <input type="text" className="w-full text-sm bg-inherit text-slate-600 outline-none"
                    placeholder='Color'
                    required
                    value={color}
                    onChange={(e)=> setColor(e.target.value)}
                />
            </div>
            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit">
                <FaList/>
                <input type="number" className="w-full text-sm bg-inherit text-slate-600 outline-none"
                    placeholder='Stock'
                    required
                    value={stock}
                    onChange={(e)=> setStock(e.target.value)}
                />
            </div>
            

            <div className="w-[90%] mx-auto md:w-full flex items-center gap-4 border border-slate-400 p-2 rounded-lg bg-inherit">
                <FaImage/>
                <input type="file"
                    name='images'
                    className=""
                    onChange={updateProductImageChange}
                    multiple
                />
            </div>
            <>
           {
            oldImages &&  <div className="flex  p-2 rounded-lg">
            {
                oldImages?.map((item, index)=>(
                    <img key={index} src={item?.url} alt="Product Preview" className="w-20 h-20 bg-inherit object-contain object-center"/>
                ))
            }
            </div>
           }
           </>
           <>
           {
            imagesPreview &&  <div className="flex  p-2 rounded-lg">
            {
                imagesPreview.map((item, index)=>(
                    <img key={index} src={item} alt="Product Preview" className="w-20 h-20 bg-inherit object-contain object-center"/>
                ))
            }
            </div>
           }
           </>

            <button className="w-[90%] mx-auto md:w-full text-sm tablet:text-base p-2 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-slate-600 text-white hover:bg-cyan-700 uppercase" type='submit'
             onClick={()=>{setIsLoadingButton(true)}}>{isLoadingButton?<img className="mx-auto w-7 h-7" src="/Images/icons/buttonLoaderImage..gif" alt=""/>:<>Update</>}</button>  
            </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default UpdateProduct
