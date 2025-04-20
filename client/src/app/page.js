'use client'

import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import ProductCard from '@/components/productCard/page'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import axios from 'axios';
import Link from 'next/link';
export default function Home() {
  const router = useRouter()
  const {isLoggedIn,userDetails}= useSelector(state=>state.user)
  const [products,setProducts]=useState([])
  const fetchProducts = async()=>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`,{
        headers: {'Content-Type': 'application/json'}
        })
         const data = res.data
         
        if(res.status!==200){
          return toast.warning(data.message)
        }
        setProducts(data.products)
} 
  useEffect(() => {
    
    fetchProducts()
  }, [])
  return (
    
    <>
      <Layout>
      <section class="px-3 py-5 bg-neutral-100 lg:py-10">
        <div class="grid lg:grid-cols-2 items-center justify-items-center gap-5">
            <div class="order-2 lg:order-1 flex flex-col justify-center items-center">
                <p class="text-4xl font-bold md:text-7xl text-red-600">20% OFF</p>
                <p class="text-4xl font-bold md:text-7xl">DASHAIN OFFER</p>
                <p class="mt-2 text-sm md:text-lg">For limited time only!</p>

                <Link href="/products"   li class="text-lg md:text-2xl bg-red-500 text-white py-2 px-5 mt-10 hover:bg-red-400">Shop Now</Link>
            </div>
            <div class="order-1 lg:order-2">
                <img class="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]" src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt=""/>
            </div>
        </div>
      </section>
        <Section heading="Featured Products" subHeading="Handpicked products by our team" bg=" bg-gray-50">
          <div className="container px-5 py-5 mx-auto lg:py-11 md:py-8">
          
            <div className="flex flex-wrap -m-4">
              {
                products.map((product)=>{
                  return (
                    <ProductCard
                    productDetails={product}
                    />
                  )
                })
              }
            </div>
          </div>
        </Section>
      </Layout>
    </>
  )
}
