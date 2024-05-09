import React,{useRef, useState} from 'react'
import MetaData from '../../utils/MetaData'
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";



const ContactUs = () => {
    const emailMessageRef = useRef();
    const [isSendingEmail, setIsSendingEmail] = useState(false);
  return (
    <>
        <MetaData/>
        <div className="w-full h-60 relative mt-10">
        <img
          className="w-full h-full object-cover"
          src={"/Images/bg-01.jpg"}
          alt="background"
        />
        <h1
          className="absolute top-[50%] left-[50%] text-4xl -translate-x-10 -translate-y-5 
            text-white font-poppins font-medium 
        "
        >
          Contact
        </h1>
      </div>
      <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-20 my-10">
        <div className="flex flex-col gap-8 border-2 border-slate-500 p-5 md:p-10 lg:p-16 rounded-md ">
            <h1 className='text-2xl text-center font-roboto font-medium'>Send Us Message</h1>
            <div className="flex items-center border border-slate-300 rounded-lg p-1">
                <MdEmail className='text-xl'/>
                <input className='w-full bg-inherit py-1 px-3 outline-none' type="text"
                placeholder='Your Email Address'
                />
            </div>
            <div className="">
                <textarea  ref={emailMessageRef} name="message" id="" cols="30" rows="8" placeholder='How can we Help?' className="bg-inherit resize-none w-full border-solid border-grey3 border-slate-500 rounded-md border-2 p-5 outline-none"></textarea>
            </div>
            <div className="">
                <button className="border-none text-white tracking-wider font-medium bg-slate-600  text-lg font-poppins w-full p-2 cursor-pointer transition-all ease-in duration-500 rounded-xl outline-none  hover:bg-cyan-700 hover:text-white hover:border-2 hover:border-slate-600" type='submit' disabled={isSendingEmail}>{isSendingEmail?<img className="mx-auto w-5 h-5" src="/Images/icons/buttonLoaderImage..gif" alt='button'/>:<>SUBMIT</>}</button>
            </div>
        </div>
        <div className="flex flex-col justify-start gap-20 border-2 border-slate-500 p-5 md:p-10 lg:p-16 rounded-md">
            <div className="flex gap-10 justify-start">
                <div className="">
                    <FaLocationDot className='text-xl'/>
                </div>
                <div className="flex flex-col -mt-2">
                <p className='text-xl font-medium font-roboto'>Address</p>
                <p>560, Friends Colony Etawah</p>
                </div>
               
            </div>
            <div className="flex gap-10 justify-start">
                <div className="">
                    <FaPhoneAlt className='text-xl'/>
                </div>
                <div className="flex flex-col -mt-2">
                <p className='text-xl font-medium font-roboto'>Lets Talk</p>
                <p>+918130221540</p>
                </div>
               
            </div>
            <div className="flex gap-10 justify-start">
                <div className="">
                    <MdEmail className='text-xl'/>
                </div>
                <div className="flex flex-col -mt-2">
                <p className='text-xl font-medium font-roboto'>Sale Support</p>
                <p>praveenshakya1@gmail.com</p>
                </div>
               
            </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs