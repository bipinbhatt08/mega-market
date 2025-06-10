'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Table,ConfigProvider, Steps } from 'antd';
import Link from 'next/link';
import axios from 'axios';

const OrderDetailsContainer = ({order}) => {
  const arrProducts = Object.values(order.products)
  return (
    <div className='p-2 mt-10'>
      <h1 className='pb-5 mb-5 text-2xl font-semibold text-red-500'>Order Details</h1>
      <Steps order={order} />
      <h1 className='mt-5 mb-3 text-lg font-semibold underline'>Order Id : {order._id}</h1>

      <div className="flex flex-wrap gap-x-5 ">
        <p ><span className="font-semibold">Total Type Of Products:</span> {Object.keys(order.products).length}</p>
        <p ><span className="font-semibold">Total Cost:  </span> Rs.{order.totalPrice}</p>
        <p ><span className="font-semibold">Payment Method: </span> {order.paymentMethod} </p>
        <p ><span className="font-semibold">Receiver Name: </span> {order.receiverDetails.firstName +" "+ order.receiverDetails.lastName }</p>
        <p ><span className="font-semibold">Shipping Address: </span>{order.shippingAddress.streetAddress+", "+ order.shippingAddress.city + ", " + order.shippingAddress.state  + ", "+order.shippingAddress.country }</p>
        <p ><span className="font-semibold">Total Cost:  </span> Rs.{order.totalPrice}</p>
        <p ><span className="font-semibold">Payment Method: </span> {order.paymentMethod} </p>
        <p ><span className="font-semibold ">Order Notes: </span><i className='bg-red-200 '> {order.orderNotes}  </i></p>
      </div>
      <div class="lg:flex   my-5 bg-white rounded">
                <div class="lg:w-full lg:pr-4  ">
                  <div className="items-center justify-between hidden pb-2 border-b-2 lg:flex border-b-gray-300 ">
                          <p className='w-1/3 font-semibold text-gray-500'>Product</p>
                          <p className='font-semibold text-gray-500 '>Quantity</p>
                          <p className='font-semibold text-gray-500 '>Rate</p>
                          <p className='font-semibold text-gray-500'>Total</p>
                  </div>
                  {arrProducts.length==0 && 
                  
                  <p className="pt-5 mx-auto text-center">No itmes in cart</p>
                  
                  }
                  {arrProducts&& arrProducts.map((product)=>{
                    return (
                      <div className="py-2 border-b lg:flex lg:items-center lg:justify-between border-b-gray-300 " key={product._id}>
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
  )
}


// const data = [
//   {
//     key: '1',
//     receiverName: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
// ];

const ShowDataTable = ({orders,handleViewDetail}) =>{
  const columns = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    
    
    {
      title: 'Receiver Name',
      dataIndex: 'receiverName',
      key: 'receiverName',
    },
    
    {
      title: 'Receiver Contact',
      dataIndex: 'receiverContact',
      key: 'receriverContact',
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shippingAddr',
      key: 'shippingAddr',
    },
    
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Order Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Total Cost(Rs)',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    
    
    {
      title: 'Action',
      key: 'action',
      dataIndex: "action"
    },
  ]
  const data = orders.map((order)=>{
    // if(order.status==="Delivered"){
    //   return null
    // }
    const obj = {
      key:order._id,
      sn: orders.indexOf(order)+1,
      receiverName: order.receiverDetails.firstName +" "+ order.receiverDetails.lastName ,    
      receiverContact: order.receiverDetails.phoneNo,
      status:order.status,
      shippingAddr:order.shippingAddress.streetAddress+", "+ order.shippingAddress.city + ", " + order.shippingAddress.state  + ", "+order.shippingAddress.country,
      totalPrice:order.totalPrice,
      action : <Button onClick={()=>handleViewDetail(order)} className='signUpBtn'>View Detail</Button>,
      paymentMethod:order.paymentMethod

    }
    return obj
  })
  return (
  <Table columns={columns} dataSource={data} pagination={{position:['none']} } scroll={{x:5}}  />
)


}



export default function Order() {

 const router = useRouter()
  const {userDetails} = useSelector(state=>state.user)
  const [orders,setOrders] = useState([])
  const [isOrderDetailDivOpen,setIsOrderDetailDivOpen]= useState(false)
  const[orderProps,setOrderProps]=useState({})

  const fetechOrders = async()=>{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/my-orders/${userDetails._id}`,{
          headers: {'Content-Type': 'application/json'}
          })
           const data =  res.data
           
          if(res.status!==200){
            return 
          }
          setOrders(data.orders)
      }
  
  useEffect(()=>{
    fetechOrders()
  },[])
  const  handleViewDetail =(order)=>{
    router.push(`/orders/${order._id}`)
  } 

  return (
    <>
        <Layout>
          <BreadCrumb page="My Orders" />
          <Section heading="Orders" subHeading="All the details about your order" bg="bg-gray-100">
             
            <div className="p-5 my-5 bg-white">

              <ConfigProvider
                theme={{
                  token: {
                    // Seed Token
                    colorPrimary: 'rgb(255,90,95)',
                  },
                }}
              >
                <ShowDataTable orders={orders} handleViewDetail={handleViewDetail}/>
                {isOrderDetailDivOpen?<OrderDetailsContainer order={orderProps} />:null}
              </ConfigProvider> 
            </div>
          </Section>
        </Layout>
    </>
  )
}
