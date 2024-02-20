'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import { Input, Button,Select, SelectItem,Textarea} from "@nextui-org/react"
import React,{useEffect, useRef, useState} from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function AddProduct() {
  const router = useRouter()
  const handleAddCategory=async(values)=>{
    
    
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/categories`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
      })
        const data = await res.json()
        if(res.status!==200){
          return toast.warning(data.message)
          
        }
        toast.success(data.message)
        router.push("/admin/add-product")

  }

  const formik = useFormik({
    initialValues: {
      name: '',
      
    },
    // validationSchema,
    onSubmit: values => {
    handleAddCategory(values)
    },
    });

  
  return (
    <>
        <Layout>
          <BreadCrumb page="Add Category" />
          <Section heading="Add Category" subHeading="Add a new category" bg="bg-gray-100">
          <div className='mt-5'>
          <form onSubmit={formik.handleSubmit} className=" lg:px-11 md:px-8 px-5 border-gray-500 rounded-md py-8 container mx-auto bg-white flex flex-wrap ">
          <h2 className=" text-xl  font-semibold text-center mb-1 color-black p-3">All fields are required</h2>
            <div className=' w-full px-2 py-1'>

            <Input 
                  type="text" 
                  name="name" 
                  onChange={formik.handleChange}
                  value={formik.values.name} 
                  variant="bordered" 
                  label="Name"  
                  size="sm"  
                  radius="sm" 
                  className="mb-3"  
                  // isInvalid={!formik.isValid}
                  errorMessage={formik.errors?.name}
                  isRequired/>
            </div>
            <div className='w-full px-2 py-1'>
            <Button  variant="flat"   type="submit"  className="signUpBtn  mb-3 rounded-md  " >
              Add Category
            </Button>
            </div>
          </form>
          </div>
          </Section>
        </Layout>
    </>
  )
}
