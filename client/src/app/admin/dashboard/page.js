'use client'
import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { IoMdNotifications, IoIosLogOut } from 'react-icons/io';
import { SiSimpleanalytics } from "react-icons/si";
import { LiaUsersSolid } from "react-icons/lia";
import { MdPayments } from "react-icons/md";

import { MdProductionQuantityLimits } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { Layout, Menu, Button, theme, Table, Steps } from 'antd';
import { Avatar, Badge, DropdownItem, DropdownMenu,Dropdown,DropdownTrigger } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logout } from '@/redux/reducerSlice/userSlice';
import { useRouter } from 'next/navigation';
const { Header, Sider, Content } = Layout;


import { socket } from '@/socket';
const App = () => {

  const router = useRouter()
  const {isLoggedIn,userDetails}= useSelector(state=>state.user)
  const [products,setProducts]=useState([])
  const [orders,setOrders] = useState([])
  const [users,setUsers] = useState([])
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('4'); 
  const [notificationCount,setNotificationCount]=useState(0)
  const [n,setN]=useState()
  const dispatch = useDispatch()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchProducts = async()=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/admin/products?addedBy=${userDetails._id}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        })
         const data = await res.json()
         
        if(res.status!==200){
          return 
        }
       setProducts(data.products)
  }
  const fetchUsers = async()=>{
  const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/users`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
    })
     const data = await res.json()
     
    if(res.status!==200){
      return 
    }
    setUsers(data.users)
  }
  const fetchOrders = async()=>{
  const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/orders`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
    })
     const data = await res.json()
     
    if(res.status!==200){
      return 
    }
    setOrders(data.orders)
  }
  const DisplayProducts = ({products}) =>{
    const columns = [
      {
        title: 'S.N.',
        dataIndex: 'sn',
        key: 'sn',
      },
      
      
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      
      {
        title: 'Stock ',
        dataIndex: 'stockQty',
        key: 'stockQty',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discoutn',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Sold',
        dataIndex: 'sale',
        key: 'sale',
      },
      
      {
        title: 'Action',
        key: 'action',
        dataIndex: "action"
      },
    ]
    const data = products.map((product,id)=>{
      const obj = {
        key:product._id,
        sn: id +1 ,
        title:product.title ,
        price: product.price,
        stockQty:product.quantity,
        discount:product.discount,
        category:product.category,
        sale:'40',
        action :  <><Button onClick={()=>alert("order")} className='signUpBtn'>Delete</Button><Button onClick={()=>alert("order")} className='signUpBtn'>Edit</Button></>,
      }
      return obj
    })
    return (
    <Table columns={columns} dataSource={data} pagination={{position:['none']} } scroll={{x:5}}  />
  )
  }
  const DisplayOrders =()=>{
   
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
      <div className='mt-10 p-2'>
        <h1 className='text-2xl font-semibold text-red-500 mb-5 pb-5'>Order Details</h1>
        <Step order={order} />
        <h1 className='text-lg font-semibold mt-5 mb-3 underline'>Order Id : {order._id}</h1>
  
        <div className="flex gap-x-5  flex-wrap ">
          <p ><span className="font-semibold">Total Type Of Products:</span> {Object.keys(order.products).length}</p>
          <p ><span className="font-semibold">Total Cost:  </span> Rs.{order.totalPrice}</p>
          <p ><span className="font-semibold">Payment Method: </span> {order.paymentMethod} </p>
          <p className='w-full'><span className="font-semibold ">Order Notes: </span><i className='bg-red-200 '> {order.orderNotes}  </i></p>
          <h1 className='text-lg font-semibold mt-5 mb-3 underline w-full'>Receiver Detail:</h1>

          <p ><span className="font-semibold">Receiver Name: </span> {order.receiverDetails.firstName +" "+ order.receiverDetails.lastName }</p>
          <p ><span className="font-semibold">Shipping Address: </span>{order.shippingAddress.streetAddress+", "+ order.shippingAddress.city + ", " + order.shippingAddress.state  + ", "+order.shippingAddress.country }</p>
          
          <h1 className='text-lg font-semibold mt-5 mb-3 underline w-full'>Sender Detail:</h1>
          <p ><span className="font-semibold">Sender Name: </span> {order.orderedBy.username }</p>

          
        </div>
        <div class="lg:flex   my-5 bg-white rounded">
                  <div class="lg:w-full lg:pr-4  ">
                    <div className="lg:flex items-center justify-between border-b-2 pb-2  border-b-gray-300 hidden ">
                            <p className='font-semibold  text-gray-500  w-1/3'>Product</p>
                            <p className='font-semibold  text-gray-500 '>Quantity</p>
                            <p className='font-semibold  text-gray-500 '>Rate</p>
                            <p className='font-semibold  text-gray-500'>Total</p>
                    </div>
                    {arrProducts.length==0 && 
                    
                    <p className="text-center mx-auto pt-5">No itmes in cart</p>
                    
                    }
                    {arrProducts&& arrProducts.map((product)=>{
                      return (
                        <div className="lg:flex lg:items-center lg:justify-between border-b border-b-gray-300 py-2 ">
                            <div className="flex items-center lg:w-1/3  ">
                              <img src={"http://localhost:5000/productImgs/"+product.productImage}  alt="image" width={70} height={70} className=''/>
                              <p className='ml-3 hover:text-red-500 transition '> <Link href={'/products/'+product._id}>{product.title}</Link>  </p>
                            </div>
                            
                            <p className='  text-gray-500 '>{product.orderedQuantity}</p>
                            <p className='  text-gray-500 '>{product.discountedPrice}</p>
                      
                            <p className='  text-gray-500'>{(product.orderedQuantity * product.discountedPrice).toFixed(2)}</p>
                           
                    </div>
                      )
                    })}
                  </div> 
              </div>
  
      </div>
    )
  }

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
      const data = orders.map((order,id)=>{
        // if(order.status==="Delivered"){
        //   return null
        // }
        const obj = {
          key:order._id,
          sn: id+1,
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
         <ShowDataTable orders={orders} handleViewDetail={handleViewDetail}/>
          {isOrderDetailDivOpen?<OrderDetailsContainer order={orderProps} />:null}
      </>
    )
  }
  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key)
  }
  const DisplayUsers = () => {
    return (
      <div>
        
      </div>
    )
  }
  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <div>
          Analytics
          </div>
      case '2':
        return <><DisplayProducts products={products}/></>
      case '3':
        return <div>Categories Content</div>
      case '4':
        return <div><DisplayOrders/></div>
      case '5':
        return <div>
          <DisplayUsers/>
        </div>
      default:
        return <div>Default Content</div>
    }
  };
  const handleLogout =()=>{
    // toast.warning("hello")
    dispatch(logout())
  }
  useEffect(()=>{
    fetchProducts()
    fetchOrders()
    fetchUsers()
    socket.on("connection")
    socket.on('newOrder', (data) => {
      console.log('New order received:', data);
      setN(data.message)
      // setNotificationCount(notificationCount+1)
  });
  },[])
  
  if(!isLoggedIn)return router.push("/login")
  return (
  <div>
      <Header className="justify-between p-0 pr-5 px-2" style={{ display: 'flex', alignItems: 'center'}}>
        <div className="flex items-center justify-start">
          <img src="/gharJaggaLogo.png" alt="" height={70} width={70} />
          <p className="text-white">MEGA MARKET</p>
        </div>
        <h2 className="text-white text-lg font-semibold ml-5">Hello  <span className='text-danger'>{userDetails.username}</span>!, Welcome </h2>
        <div className="flex justify-between items-center gap-5 "> 
          <Dropdown placement="bottom-">
            <DropdownTrigger>
            <div className='p-0 m-0  flex items-center '>
            <Badge content={notificationCount.toString()} shape="circle" color="danger" size="md">
            <IoMdNotifications size={30} color="white" className="cursor-pointer"  />
            </Badge>
            </div>
            </DropdownTrigger>
            
            <DropdownMenu aria-label="Profile Actions" variant="flat" 
                onAction={(key) => alert(key)}>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">{n}</p>
              </DropdownItem>
            </DropdownMenu>

          </Dropdown>
            <Dropdown placement="bottom-">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="danger"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userDetails.email}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            padding: '5px',
            height:'auto'
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<SiSimpleanalytics/>}>
              Analytics
            </Menu.Item>
            <Menu.Item key="2" icon={<MdProductionQuantityLimits />}>
              Products
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Categories
            </Menu.Item>
            <Menu.Item key="4" icon={<FaShippingFast />}>
              Orders
            </Menu.Item>
            <Menu.Item key="5" icon={<LiaUsersSolid />}>
              Customers
            </Menu.Item>

            <Menu.Item key="6" icon={<MdPayments />}>
              Payments
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="  ">
          <Header style={{ padding: 0, background: 'white' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            
            <Button onClick={()=>router.push("/admin/add-product")}>Add Product</Button>
            <Button onClick={()=>router.push("/admin/add-category")} className='ml-3'>Add Category</Button>
          </Header>
          <Content
            style={{
              margin: ' 10px ',
              padding: "5px",
              minHeight: 280,
              overflow:"initial",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div
            style={{
              // padding: 24,
              
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}

          </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
