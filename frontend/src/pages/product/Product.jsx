import React, { useEffect, useState } from "react";
import MetaData from "../../utils/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, clearErrors} from "../../features/product/productSlice";
import { getAllCategories } from "../../features/product/productSlice";
import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/product/ProductCard";
import NoProduct from "../../components/product/NoProduct";
import ReactPaginate from "react-paginate";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import clsx from 'clsx';
import "./product.css"; // Create and import a CSS file for pagination styling if needed
import toast from "react-hot-toast";

const Dropdown = ({ label, active, index, setActive, children }) => (
  <div className="w-56 md:w-40 h-10 text-slate-400 hover:text-slate-100 transition-colors ease-in duration-1000 
  flex items-center justify-between  px-5 border border-gray-300 rounded shadow-lg relative">
    <p className="text-xs">{label}</p>
    <p onClick={() => setActive(active === index ? null : index)}>
      {active === index ? <FaAngleUp /> : <FaAngleDown />}
    </p>
    <div
      className={clsx(
        "w-auto h-auto p-2 absolute top-10 left-0 z-50 bg-slate-600 rounded-md transition-all duration-1000",
        { 
          'opacity-100 transform translate-y-0': active === index,
          'opacity-0 transform -translate-y-2 pointer-events-none': active !== index,
        }
      )}
    >
      {children}
    </div>
  </div>
);

const Product = () => {
  const dispatch = useDispatch();
  
  const [active, setActive] = useState(null);
  const [price, setPrice] = useState(5000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState(null);
  const [priceOrder, setPriceOrder] = useState('');
  const [keyword, setKeyword] = useState("")


  const { isLoadingProduct, products, error, productsCount, categories, totalPages } = useSelector((state) => state.products);
  console.log("products", products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Define how many items you want per page

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(cat => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handlePriceOrderChange = (event) => {
    setPriceOrder(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submit logic here if needed
    dispatch(getAllProducts({
        page: currentPage,
        search: keyword,
        category: selectedCategories.join(','),
        price: price,
        rating: rating,
        sort: priceOrder
    })).then(()=>{
      setKeyword("");
    })
  };

  const handleClickFilter = ()=>{
     setPrice(5000);
     setCurrentPage(1)
     setKeyword("")
     setSelectedCategories([])
     setPriceOrder("")
     setRating("")
  }

  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage,category:selectedCategories  }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, currentPage, selectedCategories]);

  

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearErrors())
    }
    dispatch(getAllCategories());
  }, [dispatch, error]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1); // `react-paginate` uses zero-based indexing
  };

  return (
    <>
      <MetaData title={"products"} />

      {isLoadingProduct ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="wrapper flex flex-col gap-5 font-poppins my-4 ">
          <h1 className="text-3xl my-4 font-roboto font-extrabold leading-tight text-center">
            All Products
          </h1>

          <div className="w-full bg-slate-700 flex gap-3 p-10 border rounded mb-10">
            <form onSubmit={handleSubmit} className="w-full flex flex-row items-center justify-center flex-wrap gap-5">
              <div className="w-56 md:w-40 h-10 font-poppins border border-gray-300 rounded shadow-lg">
                <input type="text" placeholder="Search..." className="w-full px-4 py-2 outline-none bg-inherit " onChange={(e)=> setKeyword(e.target.value)} />
              </div>
              <div className="w-56 md:w-40 h-10 flex items-center border border-gray-300 rounded shadow-lg px-3">
                <input type="range" min={100} defaultValue={2000} max={400000} value={price} className="w-full h-[1px] px-4 py-2 cursor-pointer" onChange={(e) => setPrice(e.target.value)} />
              </div>
              
              <Dropdown label="Category" active={active} index={1} setActive={setActive}>
                <div className="w-56  p-4 font-roboto text-sm flex flex-col items-start justify-center gap-2 text-white">
                  {categories?.map((category) => (
                    <label key={category} className="text-slate-200 capitalize flex gap-1 items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      /> {category}
                    </label>
                  ))}
                </div>
              </Dropdown> 

              <Dropdown label="Rating" active={active} index={3} setActive={setActive}>
                <div className="w-56  p-4 font-roboto text-sm flex flex-col gap-2 text-white">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className="block">
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={rating === star}
                        onChange={handleRatingChange}
                      /> {star} Stars and Above
                    </label>
                  ))}
                </div>
              </Dropdown>
              
              <Dropdown label="Sort" active={active} index={4} setActive={setActive}>
                <div className="w-56  p-4 font-roboto text-sm flex flex-col gap-2 text-white">
                  <label className="block">
                    <input
                      type="radio"
                      name="sort"
                      value="asc"
                      checked={priceOrder === "asc"}
                      onChange={handlePriceOrderChange}
                    /> Price - Low to High
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="sort"
                      value="des"
                      checked={priceOrder === "des"}
                      onChange={handlePriceOrderChange}
                    /> Price - High to Low
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="sort"
                      value="rating-high-to-low"
                      checked={priceOrder === "rating-high-to-low"}
                      onChange={handlePriceOrderChange}
                    /> Rating - High to Low
                  </label>
                </div>
              </Dropdown>
              
              <div className="">
                <button className="w-56 md:w-40 h-10 font-poppins font-medium tracking-wider bg-white rounded-md text-slate-700 transition-all ease-in duration-300 hover:bg-cyan-700 hover:text-white">Filter</button>
              </div>
              <div className="">
                <button className="w-56 md:w-40 h-10 font-poppins font-medium tracking-wider bg-white rounded-md text-slate-700 transition-all ease-in duration-300 hover:bg-cyan-700 hover:text-white" onClick={handleClickFilter}>Clear Filter</button>
              </div>
            </form>
          </div>

          <div className="transition-all duration-500">
            {productsCount === 0 ? (
              <NoProduct />
            ) : (
              <div className="lg:wrapper w-full flex flex-wrap justify-center items-center gap-3 md:gap-6 lg:gap-10">
                {products.map((item) => (
                  <ProductCard data={item} key={item._id} />
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-10 font-poppins">
            {productsCount > itemsPerPage && (
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                disabledClassName={"disabled"}
                forcePage={currentPage - 1} // Zero-based index for ReactPaginate
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;











//price, category: selectedCategories, sort:priceOrder, rating: rating, search: keyword