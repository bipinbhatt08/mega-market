'use client'

import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import ProductCard from '@/components/productCard/page'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function Home() {
  const router = useRouter()
  const {isLoggedIn,userDetails}= useSelector(state=>state.user)
  const [products,setProducts]=useState([])
  if(isLoggedIn && userDetails.role==='admin') return router.push("admin/dashboard") 

  const fetchProducts = async()=>{
    const res = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products`,{
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
        <Section heading="Featured Products" subHeading="Handpicked products by our team" bg=" bg-gray-50">
          <div className="container px-5 lg:py-11 md:py-8 py-5 mx-auto">
          
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
