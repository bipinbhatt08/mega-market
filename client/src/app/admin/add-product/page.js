'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import { Input, Button,Select, SelectItem,Textarea} from "@nextui-org/react"
import { FileUploader } from "react-drag-drop-files";
import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify'

export default function AddProduct() {

  const handleAddProduct=async(values)=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
        })
        const data = await res.json()
        if(res.status!==200){
          return toast.warning(data.message)
          
        }
        toast.success(data.message)
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      discount: '',
      category: '',
      imageUrl:''
    },
    // validationSchema,
    onSubmit: values => {
    console.log(values)
    handleAddProduct(values)
    },
    });
  return (
    <>
        <Layout>
          <BreadCrumb page="Add Product" />
          <Section heading="Add Product" subHeading="Add a new product" bg="bg-gray-100">
          <div className='mt-5'>
          <form onSubmit={formik.handleSubmit} className=" lg:px-11 md:px-8 px-5 border-gray-500 rounded-md py-8 container mx-auto bg-white flex flex-wrap ">
          <h2 className=" text-xl  font-semibold text-center mb-1 color-black p-3">All fields are required</h2>
            <div className=' w-full px-2 py-1'>

            <Input 
                  type="text" 
                  name="title" 
                  onChange={formik.handleChange}
                  value={formik.values.title} 
                  variant="bordered" 
                  label="Title"  
                  size="sm"  
                  radius="sm" 
                  className="mb-3"  
                  // isInvalid={!formik.isValid}
                  errorMessage={formik.errors?.title}
                  isRequired/>
            </div>
            <div className=' w-full px-2 py-1 '>
                <Textarea
                label="Product Description"
                name='description'
                size='sm'
                variant='bordered'
                radius="sm" 
                className="mb-3"  
                onChange={formik.handleChange}
                value={formik.values.description} 
                isRequired
                />            
              </div>
            
            <div className=' lg:w-1/3 md:w-1/3 w-1/2 px-2 py-1'>
            <Input 
                  type="number" 
                  name="price" 
                  onChange={formik.handleChange}
                  value={formik.values.price} 
                  variant="bordered" 
                  label="Price"  
                  size="sm"  
                  radius="sm" 
                  className="mb-3"  
                  // isInvalid={!formik.isValid}
                  errorMessage={formik.errors?.price}
                  isRequired/>
            </div>
            <div className=' lg:w-1/3 md:w-1/3 w-1/2 px-2 py-1'>
              <Input 
                  type="number" 
                  name="discount" 
                  onChange={formik.handleChange}
                  value={formik.values.discount} 
                  variant="bordered" 
                  label="Discount"  
                  size="sm"  
                  radius="sm" 
                  className="mb-3"  
                  // isInvalid={!formik.isValid}
                  errorMessage={formik.errors?.discount}
                  isRequired/>
            </div>
            {/* <div className=' lg:w-1/3 md:w-1/2 w-2/3 px-2 py-1'>
              <label htmlFor="title" className=''>Property Media</label> <br />
              <FileUploader   multiple="true" label="Click Here Or Drop Files To Upload" required="true" />
            </div> */}
            <div className=' lg:w-1/3 md:w-1/3 w-full px-2 py-1'>
              <Select
                isRequired
                placeholder="Select category"
                size="sm"  
                radius="sm" 
                className="mb-3"  
                name='category'
                variant='bordered'
                onChange={formik.handleChange}
              >
                  <SelectItem key="clothing" value="clothing">
                    Clothing
                  </SelectItem>
            </Select>
            </div>
            <div className='w-full px-2 py-1'>
            <Button  variant="flat"   type="submit"  className="signUpBtn  mb-3 rounded-md  " >
              Add Product
            </Button>
            </div>
          </form>
          </div>
          </Section>
        </Layout>
    </>
  )
}
