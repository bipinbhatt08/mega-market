'use client'

import Layout from '@/components/layout/page'
import Breadcrumb from '@/components/breadcrumb/page'
import { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/reducerSlice/cartSlice'
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';
import axios from 'axios';


export default function Products({ params }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [product,setProduct]=useState({})
  const discountedPrice = product.dicount!==0?(product.price*(100-product.discount)*0.01).toFixed(2):product.price

  const fetchProduct = async()=>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,{
        
        headers: {'Content-Type': 'application/json'}
        })
         const data = res.data
         if(res.status!==200){
          return toast.warning(data.message)
          
        }
        setProduct(data.product)
  }

  const handleAddTocart = ()=>{
    const productDetails = {...product,discountedPrice }
    dispatch(addToCart({productDetails}))
    router.push('/cart')
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    
    <>
      <Layout>
        <Breadcrumb page="Product Detail"/>\
        <section className="overflow-hidden text-gray-600 body-font">
          <div className="py-20 mx-auto ">
            <div className="flex flex-wrap mx-auto lg:w-4/5">
              <div className="w-full mb-6 lg:w-1/2 lg:pr-10 lg:py-6 lg:mb-0">
                <h2 className="px-1 text-sm tracking-widest text-red-500 title-font">{product?.category?.name.toUpperCase()}</h2>
                <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font">{product.title}</h1>
                <div className="flex mb-4">
                  <a className="flex-grow px-1 py-2 text-lg text-red-500 border-b-2 border-red-500">Description</a>
                  
                </div>
                <p className="mb-4 leading-relaxed">{product.description}</p>
                <div className="flex py-2 border-t border-gray-200">
                  <span className="text-gray-500">Price</span>
                  <span className="ml-auto text-gray-900">Rs. {product.price}/-</span>
                </div>
                <div className="flex py-2 border-t border-gray-200">
                  <span className="text-gray-500">Available Quantity</span>
                  <span className="ml-auto text-gray-900">{product.quantity}</span>
                </div>
                <div className="flex py-2 mb-6 border-t border-b border-gray-200">
                  <span className="text-gray-500"> Discount</span>
                  <span className="ml-auto text-gray-900">{product.discount!==0?product.discount:0}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-medium text-gray-900 title-font">Rs. {discountedPrice}/-</h2>
                  <div className='flex justify-between align-center '>
                    <button className='px-2 py-1 mr-2 text-sm text-white bg-red-500 border border-red-500 rounded' onClick={handleAddTocart}>Add to cart  </button>

                    <CiHeart color='red' size={28} className='border border-red-500 rounded cursor-pointer hover:bg-red-100 hover:text-white ' />
                  </div>

                </div>
              </div>
              <img alt="ecommerce" className="object-cover object-center w-full h-64 rounded lg:w-1/2 lg:h-auto" src={process.env.NEXT_PUBLIC_API_URI+'/productImgs/'+product.productImage} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
