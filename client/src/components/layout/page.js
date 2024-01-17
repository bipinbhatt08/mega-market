import React from 'react'
import Navbar from "@/components/navBar/page"
import Footer from '@/components/footer/page'
import Breadcrumb from '@/components/breadcrumb/page'
const page = ({children}) => {
  return (
    <div>
      <Navbar/>
        {children}
      <Footer/>
    </div>
  )
}

export default page
