'use client'

import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import ProductCard from '@/components/productCard/page'
import Breadcrumb from '@/components/breadcrumb/page'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Products() {
  const [products,setProducts]=useState([])
  const fetchProducts = async()=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        })
         const data = await res.json()
         
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
        <Breadcrumb page="Products"/>
        <Section heading="Products" subHeading="All The Products " bg=" bg-gray-50">
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
