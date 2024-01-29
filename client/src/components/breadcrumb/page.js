'use client'
import React from 'react'
import { BreadcrumbItem,Breadcrumbs } from '@nextui-org/react'
const page = (props) => {
  return (
    <>
      <div className="breadcrumb-container ">
        <div className="breadcrumb mx-auto flex flex-col items-center">
            <h1 className='text-center text-black text-4xl font-semibold mb-5' >{props.page}</h1>
            <Breadcrumbs color='danger'>
                <BreadcrumbItem >Home</BreadcrumbItem>
                <BreadcrumbItem >{props.page}</BreadcrumbItem>
            </Breadcrumbs>
        </div>
      </div>
    </>
  )
}

export default page
