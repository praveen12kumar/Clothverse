import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, clearErrors } from '../../features/product/productSlice';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/product/ProductCard';
import NoProduct from '../../components/product/NoProduct';
import ReactPaginate from 'react-paginate';
import './product.css'; // Create and import a CSS file for pagination styling if needed

const Product = () => {
    const dispatch = useDispatch();
    const { isLoadingProduct, products, error, productsCount } = useSelector(state => state.products);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Define how many items you want per page

    useEffect(() => {
        dispatch(getAllProducts({ page: currentPage }));
    }, [dispatch, currentPage]);

    const handlePageChange = ({selected}) => {
        console.log("current page",currentPage);
        setCurrentPage(selected + 1 ); // `react-paginate` uses zero-based indexing
        console.log("current page",currentPage);
    };

    return (
        <>
            <MetaData title={"products"} />

            {isLoadingProduct ? (
                <div className="w-screen h-screen flex items-center justify-center"><Loader /></div>
            ) : (
                <div className="wrapper flex flex-col items-center font-poppins my-4 lg:my-8">
                    <div className="w-full">
                        <h1 className='text-4xl my-8 font-roboto font-extrabold leading-tight text-center'>All Products</h1>
                    </div>
                    <>
                        {isLoadingProduct ? (
                            <div className="w-full h-[50vh] flex"><Loader /></div>
                        ) : (
                            <div className="transition-all duration-500">
                                {productsCount === 0 ? (
                                    <NoProduct />
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 tablet:grid-cols-3 lg:grid-cols-4 gap-7">
                                        {products.map((item) => (
                                            <ProductCard data={item} key={item._id} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                    <div className="mt-10 font-poppins">
                        {productsCount > itemsPerPage && (
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                pageCount={Math.ceil(productsCount / itemsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageChange}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                disabledClassName={'disabled'}
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
