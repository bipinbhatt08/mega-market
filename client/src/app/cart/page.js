'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'



export default function Cart() {
  const dispatch = useDispatch()
  const {products} = useSelector(state=>state.cart)
  const router = useRouter()
  const arrProducts = Object.values(products)


  return (
    <>
        <Layout>
          <BreadCrumb page="Cart" />
          <Section heading="Cart" subHeading="Products In Your Cart" bg="bg-white">
          <div className="  flex justify-between align-center bg-gray-100 py-5 my-5  rounded-lg mx-auto   login-form" >
                     {JSON.stringify(arrProducts)}
          </div>
          </Section>
        </Layout>
    </>
  )
}
