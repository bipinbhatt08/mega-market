'use client'

import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import PropertyCard from '@/components/propertyCard/page'
import ProductCard from '@/components/productCard/page'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '@/redux/reducerSlice/countSlice'
import { addToCart } from '@/redux/reducerSlice/cartSlice'
export default function Home() {
  // const {count}= useSelector(state=>state.count)
  const dispatch = useDispatch()

  const productDetails={
    _id: 234359,
    title: "DRI Duck Men's Cheyenne Jacket",
    price: 200,
    category:"Clothing",
    description: "Product text-gray-800text-gray-800text-gray-800text-gray-800text-gray-800",
    imageUrl: "https://m.media-amazon.com/images/I/71tnZVQPTNL._AC_UL320_.jpg"
  }
  return (
    
    <>
      <Layout>
      
        <Section heading="Featured Products" subHeading="Handpicked products by our team" bg=" bg-gray-50">
        <div className="container px-5 lg:py-11 md:py-8 py-5 mx-auto">
        
          <div className="flex flex-wrap -m-4">
          <ProductCard productDetails={productDetails}/>
          <ProductCard productDetails={{ 
            _id: 4,
            title: "DRI Duck ",
            price: 20,
            category:"Clthing",
            description: "Product text-gray-800text-gray-800text-gray-800text-gray-800text-gray-800",
            imageUrl: "https://i.ebayimg.com/00/s/MTIwMFgxMjAw/z/5hcAAOSwSStdkBh5/$_12.JPG?set_id=880000500F"}}/>
          </div>
          
        </div>
        </Section>

        
      </Layout>
    </>
  )
}
