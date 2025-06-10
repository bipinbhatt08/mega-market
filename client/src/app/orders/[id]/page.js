'use client'
import { ConfigProvider, Steps } from "antd"
import Link from "next/link"
import { toast } from "react-toastify"
import Layout from "@/components/layout/page"
import BreadCrumb from "@/components/breadcrumb/page"
import axios from "axios"
const { useState, useEffect } = require("react")

const SingleOrder = ({params}) => {
   const  Step= (props) => {
        const orderStatus = ['Pending', 'Processing', 'Shipped', 'Delivered']
        const [current, setCurrent] = useState(orderStatus.indexOf(props.order.status));
        
        return (
          <>
          <ConfigProvider
                theme={{
                  token: {
                    // Seed Token
                    colorPrimary: 'rgb(255,90,95)',
                  },
                }}
              >
                 <Steps
            
            current={current}
            size='Default'
            items={[
              {
                title: 'Pending',
                description:"Order is waiting for confirmation",
              },
              {
                title: 'Processing',
                description:"Order is being prepared for shipment.",
              },
              {
                title: 'Shipped',
                description:"Order has been dispatched for delivery",
              },
              {
                title: 'Delivered',
                description:"Order has been successfully delivered",
              },
            ]}
          />
              </ConfigProvider> 
           
      
            
          </>
        );
      };
      
    const [order,setOrder] = useState()
    const fetechOrder = async()=>{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`,{
          
          headers: {'Content-Type': 'application/json'}
          })
           const data = res.data
           
          if(res.status!==200){
            return 
          }
          setOrder(data.order)
          console.log(data.order)
      }

      useEffect(()=>{
        fetechOrder()
      },[])
    const arrProducts = order!==undefined?Object.values(order?.products):[]
    return (
        order&&<Layout >
        <BreadCrumb page="Order Detail" />
       <div className='container p-2 mx-auto mt-10'>
        <h1 className='pb-5 mb-5 text-2xl font-semibold text-red-500'>Order Details</h1>
        <Step order={order} />
        <h1 className='mt-5 mb-3 text-lg font-semibold underline'>Order Id : {order._id}</h1>
  
        <div className="flex items-center justify-between gap-5 ">
            <div className="flex flex-col flex-wrap ">
                <p ><span className="font-semibold">Total Type Of Products:</span> {Object.keys(order.products).length}</p>
                <p ><span className="font-semibold">Total Cost:  </span> Rs.{order.totalPrice}</p>
                <p ><span className="font-semibold">Payment Method: </span> {order.paymentMethod} </p>
                <p ><span className="font-semibold">Receiver Name: </span> {order.receiverDetails.firstName +" "+ order.receiverDetails.lastName }</p>
                <p ><span className="font-semibold">Shipping Address: </span>{order.shippingAddress.streetAddress+", "+ order.shippingAddress.city + ", " + order.shippingAddress.state  + ", "+order.shippingAddress.country }</p>
            </div>
            <div className="w-1/3 p-5 bg-yellow-200 border border-gray-300 rounded-lg shadow-md ">
                <h2 className="mb-3 text-xl font-semibold text-red-500">Order Notes</h2>
                <p className="text-gray-700">{order.orderNotes}</p>
            </div>
        </div>
        <div class="lg:flex   my-5 bg-white rounded">
                  <div class="lg:w-full lg:pr-4  ">
                    <div className="items-center justify-between hidden pb-2 border-b-2 lg:flex border-b-gray-300 ">
                            <p className='w-1/3 font-semibold text-red-500'>Product</p>
                            <p className='font-semibold text-red-500 '>Quantity</p>
                            <p className='font-semibold text-red-500 '>Rate</p>
                            <p className='font-semibold text-red-500'>Total</p>
                    </div>
                    {arrProducts.length==0 && 
                    
                    <p className="pt-5 mx-auto text-center">No itmes in cart</p>
                    
                    }
                    {arrProducts&& arrProducts.map((product)=>{
                      return (
                        <div key={product._id} className="py-2 border-b lg:flex lg:items-center lg:justify-between border-b-gray-300 ">
                            <div className="flex items-center lg:w-1/3 ">
                              <img src={"http://localhost:5000/productImgs/"+product.productImage}  alt="image" width={150} height={150} className=''/>
                              <p className='ml-3 transition hover:text-red-500 '> <Link href={'/products/'+product._id}>{product.title}</Link>  </p>
                            </div>
                            
                            <p className='text-gray-500 '>{product.orderedQuantity}</p>
                            <p className='text-gray-500 '>{product.discountedPrice}</p>
                      
                            <p className='text-gray-500 '>{(product.orderedQuantity * product.discountedPrice).toFixed(2)}</p>
                           
                    </div>
                      )
                    })}
                  </div> 
              </div>
  
      </div>
      </Layout>
    )
  }
  export default SingleOrder 