'use client'

import Layout from '@/components/layout/page'
import Breadcrumb from '@/components/breadcrumb/page'
import { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/reducerSlice/cartSlice'
import { useRouter } from "next/navigation"


export default function Products({ params }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [product,setProduct]=useState({})

  const fetchProducts = async()=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        })
         const data = await res.json()
        setProduct(data.product)
  }

  const handleAddTocart = ()=>{
    dispatch(addToCart({productDetails:product}))
    router.push('/cart')
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    
    <>
      <Layout>
        <Breadcrumb page="Product Detail"/>\
        <section className="text-gray-600 body-font overflow-hidden">
          <div className=" py-20 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-sm title-font text-red-500 tracking-widest px-1">{product?.category?.toUpperCase()}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{product.title}</h1>
                <div className="flex mb-4">
                  <a className="flex-grow text-red-500 border-b-2 border-red-500 py-2 text-lg px-1">Description</a>
                  
                </div>
                <p className="leading-relaxed mb-4">{product.description}</p>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Price</span>
                  <span className="ml-auto text-gray-900">Rs. {product.price}/-</span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Available Quantity</span>
                  <span className="ml-auto text-gray-900">{product.quantity}</span>
                </div>
                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-gray-500"> Discount</span>
                  <span className="ml-auto text-gray-900">{product.discount!==0?product.discount:0}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="title-font font-medium text-2xl text-gray-900">Rs. {product.dicount!==0?(product.price*(100-product.discount)*0.01).toFixed(2):product.price}/-</h2>
                  <div className='flex justify-between align-center '>
                    <button className='border border-red-500 text-white bg-red-500 rounded text-sm mr-2  py-1 px-2' onClick={handleAddTocart}>Add to cart  </button>

                    <CiHeart color='red' size={28} className='cursor-pointer border border-red-500 rounded hover:bg-red-100  hover:text-white ' />
                  </div>

                </div>
              </div>
              <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.imageUrl}/>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
