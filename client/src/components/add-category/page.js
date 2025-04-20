'use client'
import Section from '@/components/sectionLayout/page'
import { Input, Button,Select, SelectItem,Textarea} from "@nextui-org/react"
import React,{useEffect, useRef, useState} from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function AddCategory() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState(null); // Use state to track the file

  const uploadImageRef = useRef(null)

  const handleAddCategory=async(values)=>{
    // const file = uploadImageRef?.current?.files[0]
    const formData = new FormData();
    formData.append('categoryImage', selectedFile);
    formData.append('name', values.name);
    const res = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/categories`,formData,{
      headers: {'Content-Type': 'multipart/form-data'}
      })
        const data = res.data
        if(res.status!==200){
          return toast.warning(data.message)
          
        }
        toast.success(data.message)
        router.push("/admin/dashboard")

  }

  const formik = useFormik({
    initialValues: {
      name: '',
      categoryImage:''
    },
    // validationSchema,
    onSubmit: values => {
    handleAddCategory(values)
    },
    });

    const handleFileChange = (event) => {
      const file = event.currentTarget.files[0];
      setSelectedFile(file); // Set the file in state
    };
  return (
    <>
        
          
         
          <form onSubmit={formik.handleSubmit} className=" lg:px-11 md:px-8 px-5 border-gray-500 rounded-md py-8 container mx-auto bg-white flex flex-wrap ">
          <h2 className=" text-xl  font-semibold text-center   text-red-500 px-2">Add Category</h2>
            <p className="w-full px-2 mt-0 mb-3 ">(all fields are required)</p>  
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
            <div className=' w-full px-2 py-1'>

            <Input
                  type="file" 
                  name="productImage"
                  variant="bordered"
                  size="sm"  
                  radius="sm" 
          
                  className="mb-3 "  
                  ref={uploadImageRef}
                  onChange={handleFileChange}  // Handle file selection

                  />
              </div>

            <div className='w-full px-2 py-1'>
            <Button  variant="flat"   type="submit"  className="signUpBtn  mb-3 rounded-md  " >
              Add Category
            </Button>
            </div>
          </form>
    </>
  )
}
