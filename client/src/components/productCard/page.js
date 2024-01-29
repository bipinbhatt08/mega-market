import React from 'react'
import { CiHeart } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import {User} from "@nextui-org/react";
import Link from 'next/link';
import { FaCartPlus , FaHeart} from "react-icons/fa";

const page = (props) => {
  return (
    <>
      <div className="p-4 lg:w-1/3 ">
        <div className=" bg-white border product-card  bg-opacity-75 p-2 rounded-lg  overflow-hidden  relative">
            <div className="product-image-container py-3 relative  ">
                    <img className="h-full w-full object-contain"src="https://m.media-amazon.com/images/I/71tnZVQPTNL._AC_UL320_.jpg"/>
                <div className='flex  w-2/3 absolute top-3 left-3'>
                    {/* <p className=' color-white  text-center text-xs  py-1 px-2 bg-black  rounded-md'>Featured</p> */}
                    <p className='  color-white   ml-1 py-1 px-2 text-xs  bg-red-500  text-center rounded-md'>20% Off</p>
                </div>
            </div>

            <div className="p-2 border-t ">
                <p className="text-red-500 text-sm pt-1 ">Clothing</p>
                <div className="py-1">
                    <h1 className='font-semibold text-gray-800'>DRI Duck Men's Cheyenne Jacket</h1>
                    <h2 className='py-1 text-grey-500 font-semibold'> Rs 200/-</h2>
                    <p className='text-sm'>Product text-gray-800text-gray-800text-gray-800text-gray-800text-gray-800</p>
                </div>
                <div className="border-t flex  justify-between items-center pt-3  w-full ">
                    <CiHeart color='red' size={28} className='cursor-pointer bg'/>
                    <button className='border border-red-500 text-white bg-red-500 rounded text-sm  py-1 px-2'>Add to cart  </button>
                </div>
            </div>
        </div>

      </div>
      
    </>
  )
}

export default page
