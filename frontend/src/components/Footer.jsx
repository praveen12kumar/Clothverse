import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
 return (
    <footer className="w-full px-10 bg-gray-800 text-white p-6 md:p-14 lg:px-24 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        {/* Row 1 */}
        <div className="mb-4 md:mb-0">
          <h3 className='font-bold font-roboto uppercase text-lg mb-2'>Categories</h3>
          <ul className='flex flex-col items-start gap-2 '>
              <li className='text-slate-200 text-sm cursor-pointer font-poppins hover:text-cyan-500 transition-colors ease-in duration-200'>Women</li>
              <li className='text-slate-200 text-sm cursor-pointer font-poppins hover:text-cyan-500 transition-colors ease-in duration-200'>Men</li>
              <li className='text-slate-200 text-sm cursor-pointer font-poppins hover:text-cyan-500 transition-colors ease-in duration-200'>Bags</li>
              <li className='text-slate-200 text-sm cursor-pointer font-poppins hover:text-cyan-500 transition-colors ease-in duration-200'>Footwears</li>
              <li className='text-slate-200 text-sm cursor-pointer font-poppins hover:text-cyan-500 transition-colors ease-in duration-200'>Watches</li>
          </ul>
        </div>

        {/* Row 2 */}
        <div className="mb-4 md:mb-0 md:px-8">
          <h3 className="font-bold font-roboto text-lg mb-2 uppercase">Help</h3>
          <ul className='flex flex-col items-start gap-2'>
              <li className='text-slate-200 text-sm cursor-pointer font-poppins hover:text-cyan-500 transition-colors ease-in duration-200'>Track Orders</li>
              <li className='text-slate-200 text-sm cursor-pointer font-poppins hover:text-cyan-500 transition-colors ease-in duration-200'>Contact</li>
              <li className='text-slate-200 text-sm cursor-pointer font-poppins hover:text-cyan-500 transition-colors ease-in duration-200'>FAQs</li>
              
          </ul>
        </div>

        {/* Row 3 */}
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold font-roboto text-lg mb-2 uppercase">Get In Touch</h3>
            <ul className='flex flex-col items-start gap-2'>
            <Link to="https://github.com/praveen12kumar" target='_' className="flex items-center gap-2 cursor-pointer">
              <FaGithub className='text-lg hover:text-purple-500 transition-colors ease-in duration-200'/> <span className='text-slate-200 text-sm font-poppins'>Github</span>
            </Link>
            <Link to="https://www.linkedin.com/in/praveen-kumar-88644bbb/" target='_' className="flex items-center gap-2 cursor-pointer">
              <FaLinkedin className='text-lg hover:text-blue-400 transition-colors ease-in duration-200'/> <span className='text-slate-200 text-sm font-poppins'>LinkedIn</span>
            </Link>
            <Link to="https://www.instagram.com/kumarpraveen1/" target='_' className="flex items-center gap-2 cursor-pointer">
              <FaInstagramSquare className='text-lg hover:text-red-500 transition-colors ease-in duration-200'/> <span className='text-slate-200 text-sm font-poppins'>Instagrm</span>
            </Link>
            </ul>
        </div>

        {/* Row 4 */}
        <div className="mb-4 md:mb-0 md:px-8">
          <h3 className="font-bold font-roboto text-lg mb-2 uppercase">Newsletter</h3>
          <div className="flex flex-col items-start gap-6">
            <input type="text" className='w-52 border-b bg-inherit font-poppins text-sm tracking-wide' placeholder='example@gmail.com' />
            <button className='bg-slate-400 px-6 py-2 rounded-2xl p-medium-18 font-poppins tracking-wider uppercase hover:bg-inherit hover:border border-slate-300 transition-all ease-in duration-300 hover:scale-105'>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-8 mt-20">
        
          <img src={'Images/gpay2.png'} className="w-8 h-8 object-contain" alt="googlepay"/>
          <img src={'Images/Phonepe3.webp'} className="w-8 h-8 object-contain" alt='phone pay'/>
          <img src={'Images/paytm.jpg'} className="w-7 h-7 object-contain" alt='paytm'/>
          <img src={'Images/viza.jpg'} className="w-8 h-8 object-contain" alt='visa' />
          <img src={'Images/masterCard2.png'} className="w-8 h-8 object-contain " alt='master card'/>
      
      </div>
    </footer>
 );
};

export default Footer;
