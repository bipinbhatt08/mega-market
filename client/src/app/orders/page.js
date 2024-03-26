'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Table,ConfigProvider } from 'antd';
import Link from 'next/link';
 
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
        const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/my-orders/${userDetails._id}`,{
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
          })
           const data = await res.json()
           
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
             
            <div className="my-5 p-5 bg-white">

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
