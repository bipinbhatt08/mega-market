import React from 'react'
import { CiHeart } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import {User} from "@nextui-org/react";
import Link from 'next/link';

const page = (props) => {
  return (
    <>
      <div className="p-4 lg:w-1/3">
        <div className="h-full bg-white border property-card  bg-opacity-75 p-2 rounded-lg  overflow-hidden  relative">
            <div className=" w-full  relative ">
                <div className="color-overlay rounded-md"></div>
                <img src={props.imageUrl} alt="" className="h-full w-full object-cover rounded-md"/>
                <div className='flex  w-2/3 absolute top-3 left-3'>
                    <p className=' color-white  text-center text-xs  py-1 px-2 bg-black  rounded-md'>Featured</p>
                    <p className='  color-white   ml-1 py-1 px-2 text-xs  bg-red-500  text-center rounded-md'>For {props.saleOrRent}</p>
                </div>
                <div className='w-full  absolute bottom-3 flex justify-between px-3'>
                    <h2 className="text-lg color-white font-semibold">{props.price}/<span className='text-md'>mo</span></h2>
                    <p className="flex p-2 bg-gray-500 bg-opacity-65 rounded-md flex justify-center align-items-center ok"><CiHeart color='white' size={20} className='cursor-pointer'/></p>
                </div>
            </div>
            <div className="px-2 py-3">
            <p className="text-red-500 text-sm  ">{props.category}</p>
            <p className="font-semibold text-gray-800 py-2">{props.propertyName}</p>
            <div className='flex items-center'>
                <IoLocationOutline color='gray'/>
                <p className="text-gray-500 ml-1 font-light text-sm">{props.location}</p>
            </div>
            <div className="flex items-center text-sm  pt-2 justify-start font-light text-gray-500">
                <p className='mr-3'>Beds: {props.beds}</p>
                <p className='mr-3'>Baths: {props.baths} </p>
                <p className='mr-3'>SqFt: {props.area}</p>
            </div>
            </div>
          <div className="border-t flex  justify-between items-center py-3 px-2 w-full ">
            {/* <div className="flex justify-between items-center ">
                <div className="avatar-container">
                    <img className='w-full h-full object-cover rounded-full' src={props.avatar} alt="" />
                </div>
                <p className='text-gray-500 ml-1 font-light text-sm'>{props.ownerName}</p>
            </div> */}
            <User   
      name={props.ownerName}
      description={(
        <Link href="https://twitter.com/jrgarciadev" size="sm" >
          {props.username}
          @bipinbhatt08
        </Link>
      )}
      avatarProps={{
        src: props.avatar
      }}
    />
            <p className='text-gray-500 ml-1 font-light text-sm'>{props.postedOn} days ago</p>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default page
