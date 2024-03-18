'use client'

import { Input, Button,Select, SelectItem,Textarea, useDisclosure} from "@nextui-org/react"
import React,{useEffect, useRef, useState} from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/react";

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const Form =(props)=>{
  const handleAddCategory=async(values)=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/categories`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
      })
        const data = await res.json()
        if(res.status!==200){
           toast.warning(data.message)
          return
          
        }
        toast.success(data.message)
        props.setIsCategoryAdded(!props.isCategoryAdded)
       props.onClose()
        

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

  
  return(
    <div className=''>
  <form onSubmit={formik.handleSubmit} className="   px-2 border-gray-500 rounded-md py-2 container mx-auto bg-white flex flex-wrap ">
  <h2 className=" text-xl  font-semibold text-center mb-1 color-black p-3">Create New Category</h2>
    <div className=' w-full  '>

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
    <div className='w-full  '>
      <Button  variant="flat"   type="submit"  className="signUpBtn  mb-3 rounded-md  "  >
       Add 
      </Button>
      <Button className=' ml-3 text-red-500 border border-red-500 bg-white rounded-md  hover:bg-red-50  ' variant="flat" onPress={props.onClose}>
       Cancel
      </Button>
    </div>
  </form>
  </div>
  ) 
}
const FormModal =({onClose,isOpen,onOpenChange,setIsCategoryAdded,isCategoryAdded})=>{
  return  <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
  <ModalContent>
    {(onClose) => (
      <>
        <ModalBody>
          <Form onClose={onClose} setIsCategoryAdded={setIsCategoryAdded} isCategoryAdded={isCategoryAdded}/>
        </ModalBody>
      </>
    )}
  </ModalContent>
</Modal>
}
export default function EditProduct({productId,onClose,productEdited,setProductEdited}) {
  const [categories,setCategories]=useState()
  const uploadImageRef = useRef(null)
  const [product,setProduct]=useState({})
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isCategoryAdded,setIsCategoryAdded]=useState(false)
  const {userDetails} = useSelector(state=>state.user)
  const router = useRouter()

  const handleEdit=async(values)=>{
    const formData = new FormData()
    const file = uploadImageRef?.current?.files[0]
    formData.append('productImage',file)
    formData.append('addedBy',userDetails._id)
    for(let item in values){
      formData.append(item,values[item])
    }
    
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,{
        method: 'PATCH',
        body: formData
        })
        const data = await res.json()
        if(res.status!==200){
          return toast.warning(data.message)
          
        }
        toast.success(data.message)
        fetchProduct()
        onClose()
        setProductEdited(!productEdited)

        router.push('/admin/dashboard')

  }
  
  const formik = useFormik({
    initialValues: {
      title: "",
      description:"" ,
      price: "",
      discount: "",
      category:"",
      quantity:""
    },
    // validationSchema,
    onSubmit: values => {
    handleEdit(values)
    },
    });
  const fetchCategories = async()=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/categories`,{
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
      })
       const data = await res.json()
       
      if(res.status!==200){
        return toast.warning(data.message)
      }
      setCategories(data.categories) 
  }
  const fetchProduct = async()=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,{
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
      })
       const data = await res.json()
       
      if(res.status!==200){
        return toast.warning(data.message)
      }
      setProduct(data.product) 
  }
  useEffect(() => {
    formik.setValues({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      discount: product.discount || "",
      category: product.category|| "",
      quantity: product.quantity || ""
    });
  }, [product]);
  useEffect(()=>{
    fetchProduct()
  },[])

  useEffect(()=>{
     fetchCategories()
     
  },[isCategoryAdded])
  return (
    <>
         
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
            
            <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-2 py-1'>
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
            <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-2 py-1'>
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
            <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-2 py-1'>
              <Input 
                  type="number" 
                  name="quantity" 
                  onChange={formik.handleChange}
                  value={formik.values.quantity} 
                  variant="bordered" 
                  label="Quantity"  
                  size="sm"  
                  radius="sm" 
                  className="mb-3"  
                  // isInvalid={!formik.isValid}
                  errorMessage={formik.errors?.quantity}
                  isRequired/>
            </div>
            <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-2 py-1'>
              <Input
                  type="file" 
                  name="productImage"
                  variant="bordered"
                  size="sm"  
                  radius="sm" 
          
                  className="mb-3 "  
                  ref={uploadImageRef}
                  />
            </div>
            <div className=' lg:w-full md:w-full w-full px-2 py-1 flex justify-start items-center'>
              <Select
                isRequired
                placeholder="Select category"
                size="sm"  
                radius="sm" 
                className="mb-3"  
                label="Category"
                name='category'
                variant='bordered'
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                {categories && categories.length > 0 ? (
                categories.map((category) => (
                 <SelectItem key={category._id} value={category._id}>
                   {category.name}
                 </SelectItem>
                 ))
               ) : (
                <SelectItem isDisabled>No items</SelectItem>
  )}
            </Select>
            <Button  variant="flat" onPress={onOpen}    className=" ml-3 text-red-500 border border-red-500 bg-white mb-3 rounded-md  hover:bg-red-50 " >
              Add new
            </Button>
            <FormModal isOpen={isOpen} onOpenChange={onOpenChange} setIsCategoryAdded={setIsCategoryAdded} isCategoryAdded={isCategoryAdded}/>
            </div>
            <div className='w-full px-2 py-1'>
            <Button  variant="flat"   type="submit"  className="signUpBtn  mb-3 rounded-md  " >
              Save
            </Button>
            </div>
          </form>
    </>
  )
}
