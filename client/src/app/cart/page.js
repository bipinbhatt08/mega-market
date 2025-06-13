'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {  addToCheckoutProductDetails, removeFromCart } from '@/redux/reducerSlice/cartSlice';
import { FaPlus,FaMinus } from "react-icons/fa6";
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';



export default function Cart() {
  const router = useRouter()
  const dispatch = useDispatch()
  const {products} = useSelector(state=>state.cart)

  const [qty,setQty]= useState({})
  const [totalPrice,setTotalPrice]= useState({})
  const [grandTotal,setGrandTotal]= useState()

  
  const arrProducts = Object.values(products)
  
//to set the quantity selected and the total price initially
  useEffect(() => {
    const initialQtyState = {}
    const initialTotal = {}
    arrProducts.forEach(product => {
      initialQtyState[product._id] = 1
      initialTotal[product._id]= product.discountedPrice
    });
    setQty(initialQtyState)
    setTotalPrice(initialTotal)
  },[])



  const handleClick =(id,operator,availableStock,price)=>{
    let quantity = qty[id]
    if(operator==="+" && quantity<availableStock )quantity++
    else if(operator==="-" && quantity>1) quantity--

     setQty(prevState => ({
        ...prevState,
        [id]: quantity
    }))
     setTotalPrice(prevState => ({
        ...prevState,
        [id]: (quantity* price).toFixed(2)
    }))
    
  }
  useEffect(() => {
    let totalAmount = 0
    const totalPriceArr = Object.values(totalPrice)
    totalPriceArr.forEach(item => totalAmount += parseFloat(item))
    setGrandTotal(totalAmount)
  }, [totalPrice])

  const handleRemove =(id)=>{
    dispatch(removeFromCart(id))



    setTotalPrice(prevState => {
      const updatedTotalPrice = { ...prevState };
      delete updatedTotalPrice[id];
      return updatedTotalPrice;
    });
  }
  const handleProceedToCheckout=()=>{

    if(grandTotal===0){
      return toast.warning("There must be items in the cart to proceed")
    }
    const updatedProducts ={}
    for (let product in products) {
      for (let id in qty) {
        if (id === product) {
          updatedProducts[product] = {
            ...products[product],
            orderedQuantity: qty[id]
          }
        }
      }
    }
    const checkoutProductDetails = {products:updatedProducts,grandTotal}
    dispatch(addToCheckoutProductDetails(checkoutProductDetails))
    router.push('/checkout')
  }

  return (
    <>
        <Layout>
          {/* <BreadCrumb page="Cart" /> */}
          <Section heading="Cart" subHeading="Products In Your Cart" bg="bg-gray-100">
           
            <div class="lg:flex p-5  my-5 bg-white rounded">
                <div class="lg:w-2/3 lg:pr-4  ">
                  <div className="items-center justify-between hidden pb-2 border-b-2 lg:flex border-b-gray-300 ">
                          <p className='w-1/5 font-semibold text-gray-500'>Product</p>
                          <p className='font-semibold text-gray-500 '>Quantity</p>
                          <p className='font-semibold text-gray-500 '>Price</p>
                          <p className='font-semibold text-gray-500'>Total</p>
                          <p className='font-semibold text-gray-500'>Action</p>
                  </div>
                  {arrProducts.length==0 && 
                  
                  <p className="pt-5 mx-auto text-center">No itmes in cart</p>
                  
                  }
                  {arrProducts&& arrProducts.map((product)=>{
                    return (
                      <div className="py-2 border-b lg:flex lg:items-center lg:justify-between border-b-gray-300 " key={product._id}>
                          <div className="flex items-center lg:w-1/5 ">
                            <img src={process.env.NEXT_PUBLIC_API_URI+'/productImgs/'+product.productImage}  alt="image" width={50} height={50} className=''/>
                            <p className='ml-3'>{product.title} </p>
                          </div>
                          <div className='flex items-center justify-between p-2 text-gray-500 border-gray-400 rounded border-1'style={{width:"100px"}}>
                                <button onClick={()=>handleClick(product._id,'-',product.quantity,product.discountedPrice)}><FaMinus/></button> <p className='px-1'>{qty[product._id]}/{product.quantity}</p> <button className="cursor-pointer" onClick={()=>handleClick(product._id,'+',product.quantity,product.discountedPrice)}><FaPlus/></button>
                          </div>
                          <p className='text-gray-500 '>{product.discountedPrice}</p>
                          
                          <p className='text-gray-500 '>{totalPrice[product._id]}</p>
                          <div className=''>
                              <button className='px-2 py-1 text-white transition bg-red-500 rounded hover:bg-red-400' onClick={()=>handleRemove(product._id)} >remove</button>
                          </div>
                  </div>
                    )
                  })}
                </div> 
                <div class="lg:w-1/3 p-3 mt-4 lg:mt-0 border border-gray-300 border-2 border-dashed rounded">
                    <h1 className='pt-3 pb-2 mb-4 text-lg font-semibold text-gray-500 border-b-2'>Cart Total</h1>
                    <div className="flex items-center justify-between py-2 border-b">
                      <p className='font-semibold text-gray-500 '>Sub Total:</p>
                      <p className='font-semibold text-gray-500 '>Rs. {grandTotal}</p>
                    </div>
                    <div className='py-2 border-b' >
                      <p className='font-semibold text-gray-500'>Shipping</p>
                      will be added later
                      will be added later
                      will be added later
                      will be added later
                      will be added later
                      will be added later
                      will be added later
                      will be added later
                    </div>
                    <div className='py-2 mt-3' >
                    <div className="flex items-center justify-between ">
                      <p className='font-semibold text-red-500 '> Total</p>
                      <p className='font-semibold text-red-500 '>Rs. {grandTotal}</p>
                    </div>
                     <div className="flex justify-center mt-4 itmes-center">
                     <Button onClick={handleProceedToCheckout}className='px-3 py-2 mx-auto text-red-500 transition bg-white border border-red-500 rounded hover:bg-red-500 hover:text-white'>Proceed to checkout</Button>
                     </div>
                    </div>
                </div>
            </div>

          </Section>
        </Layout>
    </>
  )
}
