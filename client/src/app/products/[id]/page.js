'use client'

import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import ProductCard from '@/components/productCard/page'
import Breadcrumb from '@/components/breadcrumb/page'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Products({ params }) {
  const [product,setProduct]=useState({})
  const fetchProducts = async()=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        })
         const data = await res.json()
         
        setProduct(data.product)
}
  useEffect(() => {
    
    fetchProducts()
  }, [])

  return (
    
    <>
      <Layout>
        <Breadcrumb page="Product Detail"/>
        <Section heading=" Product Detail" bg=" bg-gray-50">
          <div className="container px-5 lg:py-11 md:py-8 py-5 mx-auto">
          
          <div className="flex flex-wrap -m-4">
              
              {product.title}
              {product.price}
              {product.description}
              
            </div>
          </div>
        </Section>
      </Layout>
    </>
  )
}
