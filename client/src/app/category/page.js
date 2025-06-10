'use client'

import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import Breadcrumb from '@/components/breadcrumb/page'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
export default function Products() {
  const [categories,setCategories]=useState([])
  const fetchCategories = async()=>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`,{
       
        headers: {'Content-Type': 'application/json'}
        })
         const data = res.data
         
        if(res.status!==200){
          return toast.warning(data.message)
        }
        setCategories(data.categories)
}
 
  useEffect(() => {
    
    fetchCategories()
  }, [])

  return (
    
    <>
      <Layout>
        <Breadcrumb page="Categories"/>
        <Section heading="Categories" subHeading="All The Categories " bg=" bg-gray-50">
        <div className="bg-white dark:bg-gray-900 dark:text-gray-100">
          <div className="container px-4 py-16 mx-auto lg:px-8 lg:my-12 xl:max-w-7xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
             {
                categories.map((category)=>{
                    return <Link
                    key={category._id}
                    href="/login"
                    className="relative block overflow-hidden transition ease-out group active:opacity-75 sm:col-span-2 md:col-span-1"
                  >
                    <img
                      src="https://cdn.tailkit.com/media/placeholders/photo-PDX_a_82obo-700x700.jpg"
                      alt="Product Image"
                      className="transition ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition ease-out bg-black/25 group-hover:bg-black/0" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="px-4 py-3 text-sm font-semibold tracking-wide uppercase transition ease-out rounded-3xl bg-white/95 group-hover:bg-rose-600 group-hover:text-white dark:border-gray-800 dark:bg-gray-900/90">
                        {category.name}
                      </div>
                    </div>
                  </Link>
                })
             }
              
            </div>
          </div>
        </div>
        </Section>
      </Layout>
    </>
  )
}
