'use client'

import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import PropertyCard from '@/components/propertyCard/page'
import ProductCard from '@/components/productCard/page'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '@/redux/reducerSlice/countSlice'
export default function Home() {
  // const {count}= useSelector(state=>state.count)
  const dispatch = useDispatch()
  return (
    <>
      <Layout>
      
        <Section heading="Featured Products" subHeading="Handpicked products by our team" bg=" bg-gray-50">
        <div className="container px-5 lg:py-11 md:py-8 py-5 mx-auto">
        
          <div className="flex flex-wrap -m-4">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
          </div>
          
        </div>
        </Section>

        
      </Layout>
    </>
  )
}
