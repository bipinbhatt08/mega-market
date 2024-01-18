'use client'

import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import PropertyCard from '@/components/propertyCard/page'
export default function Home() {
  return (
    <>
      <Layout>
        <Section heading="Featured Properties" subHeading="Handpicked properties by our team" bg=" bg-gray-50">
        <div className="container px-5 lg:py-11 md:py-8 sm:py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            <PropertyCard 
            imageUrl="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            avatar="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            postedOn="5" 
            ownerName="Bipin Bhatt" 
            price="25,000" 
            location="Maitidevi, Kathmandu, Nepal" 
            baths="4" 
            beds="4" 
            saleOrRent="Rent"
            category="Apartment"
            area="1230"
            />
          </div>
        </div>
        </Section>

        
      </Layout>
    </>
  )
}
