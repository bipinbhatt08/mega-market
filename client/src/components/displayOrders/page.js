'use client'
import Link from "next/link"
import { useState } from "react"

const { Steps, Table, Pagination, Button } = require("antd")

const DisplayOrders =({orders,pageCount,orderCount,setPageCount})=>{
   
    const [isOrderDetailDivOpen,setIsOrderDetailDivOpen]= useState(false)
    const[orderProps,setOrderProps]=useState({})

    const  handleViewDetail =(order)=>{ 
      setIsOrderDetailDivOpen(!isOrderDetailDivOpen)
      setOrderProps(order)
    } 
      
  const OrderDetailsContainer = ({order}) => {
    const arrProducts = Object.values(order.products)
    const Step = (props) => {
      const orderStatus = ['Pending', 'Processing', 'Shipped', 'Delivered']
      const [current, setCurrent] = useState(orderStatus.indexOf(props.order.status));
      const onChange = (value) => {
        console.log('onChange:', value);
        if(value<current) return
        setCurrent(value);
        // changeStatus(value)
    };
      return (
        <>
          <Steps
              onChange={onChange}
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
    
          
        </>
      );
    };
    return (
      <div className='p-2 mt-10'>
        <h1 className='pb-5 mb-5 text-2xl font-semibold text-red-500'>Order Details</h1>
        <Step order={order} />
        <h1 className='mt-5 mb-3 text-lg font-semibold underline'>Order Id : {order._id}</h1>
  
        <div className="flex flex-wrap gap-x-5 ">
          <p ><span className="font-semibold">Total Type Of Products:</span> {Object.keys(order.products).length}</p>
          <p ><span className="font-semibold">Total Cost:  </span> Rs.{order.totalPrice}</p>
          <p ><span className="font-semibold">Payment Method: </span> {order.paymentMethod} </p>
          <p className='w-full'><span className="font-semibold ">Order Notes: </span><i className='bg-red-200 '> {order.orderNotes}  </i></p>
          <h1 className='w-full mt-5 mb-3 text-lg font-semibold underline'>Receiver Detail:</h1>

          <p ><span className="font-semibold">Receiver Name: </span> {order.receiverDetails.firstName +" "+ order.receiverDetails.lastName }</p>
          <p ><span className="font-semibold">Shipping Address: </span>{order.shippingAddress.streetAddress+", "+ order.shippingAddress.city + ", " + order.shippingAddress.state  + ", "+order.shippingAddress.country }</p>
          
          <h1 className='w-full mt-5 mb-3 text-lg font-semibold underline'>Sender Detail:</h1>
          <p ><span className="font-semibold">Sender Name: </span> {order.orderedBy.username }</p>

          
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
                              <img src={process.env.NEXT_PUBLIC_API_URI+'/productImgs/'+product.productImage}  alt="image" width={70} height={70} className=''/>
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

    const ShowDataTable = ({orders,handleViewDetail,pageCount}) =>{
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
      const data = orders.map((order,id)=>{
        // if(order.status==="Delivered"){
        //   return null
        // }
        const obj = {
          key:order._id,
          // sn: pageCount *5 -5+  +id+1,
          sn:pageCount*5+id-4,
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
  
    return (
      <>
         <ShowDataTable orders={orders} handleViewDetail={handleViewDetail} pageCount={pageCount}/>
         <Pagination defaultCurrent={pageCount} total={orderCount} onChange={(e)=>setPageCount(e)} pageSize={5}/>
          {isOrderDetailDivOpen?<OrderDetailsContainer order={orderProps} />:null}
      </>
    )
  }

  export default DisplayOrders