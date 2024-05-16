import React, {useRef} from 'react'
import { IoClose } from "react-icons/io5";
import ProductDetail from '../product/ProductDetail';


const ProductModal = ({modalData, setModalData, showProductModal, setShowProductModal}) => {
    const modalRef = useRef();

    const HideModal=(e)=>{
        if(e.target!== modalRef.current&&!modalRef.current.contains(e.target)){
        setShowProductModal(false);
        setModalData(null);
        };
    }
  return (
    <div className={`fixed top-20 lg:top-25 left-0 w-screen h-5/6 bg-inherit z-[1200] py-7 md:py-10 overflow-y-scroll transition-all duration-300 ${showProductModal?'visible opacity-100':'invisible opacity-0' }`} onClick={HideModal}>
        <div className='w-[90vw] lg:w-[78vw] bg-slate-100 min-h-[60vh] shadow rounded-md p-5 mx-auto flex flex-col relative'>
        <button className='text-3xl absolute top-5 right-5' onClick={() => setShowProductModal(false)}><IoClose/></button>
        {showProductModal && <div className='grow flex flex-col' ref={modalRef}>
              <ProductDetail data={modalData}/>
            </div>}
        </div>
    </div>
  )
}

export default ProductModal
