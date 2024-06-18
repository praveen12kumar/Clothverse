import React,{useEffect, useState} from 'react'
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearErrors, getAllCategories } from '../../features/product/productSlice';
import DashboardSidebar from '../../components/sidebar/DashboardSidebar';
import { MdOutlineSpellcheck } from "react-icons/md";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaList } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BiSolidColor } from "react-icons/bi";
import { adminCreateProduct } from '../../features/product/productSlice';
import { useNavigate } from 'react-router-dom';



const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(null);
  const [colors, setColors] = useState("");
  const [discount, setDiscount] = useState(null);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [isLoadingButton, setIsLoadingButton] = useState(false)

    const {error, categories} = useSelector(state=> state.products);
   
    const createProductImageChange = (e)=>{
        const files = Array.from(e.target.files);
        setImages([...files])
        console.log("images", images);

        const imagesPreviewUrl = files.map(file=>{
            return URL.createObjectURL(file);
        })
        setImagesPreview(imagesPreviewUrl);
    }
    
    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const price = Math.ceil(originalPrice - (originalPrice * discount)/100)


        const formData = new FormData();
        formData.append('name', name);
        formData.append('originalPrice', originalPrice);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('colors', colors);
        formData.append('discount', discount);
        images.forEach((image)=>{
            formData.append('images', image);
        })

        formData.forEach((element)=>{console.log(element)});
        dispatch(adminCreateProduct(formData)).then(()=>(
            toast.success("Product created successfully")
        ))
        setIsLoadingButton(false)
        navigate("/admin/dashboard")
    }

    

    useEffect(()=>{
        dispatch(getAllCategories());
        window.scrollTo({top:0, behavior:"smooth"});
    },[dispatch])

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    },[error, dispatch])

  return (
    <>
    <MetaData title="Create Product" />
    <div className="w-screen h-auto flex flex-col md:flex-row flex-shrink-0">
        <DashboardSidebar />
        <div className="md:wrapper w-full flex flex-col mt-2">
           <div className="max-w-lg mx-auto">
           <h1 className='text-2xl text-center font-poppins font-medium '>Create Product</h1>
           <form 
           encType='multipart/form-data' 
           onSubmit={createProductSubmitHandler}
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
                    value={colors}
                    onChange={(e)=> setColors(e.target.value)}
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
                    onChange={createProductImageChange}
                    multiple
                />
            </div>
            
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
             onClick={()=>{setIsLoadingButton(true)}}>{isLoadingButton?<img className="mx-auto w-7 h-7" src="/Images/icons/buttonLoaderImage..gif" alt=""/>:<>Create</>}</button>  
            </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default NewProduct