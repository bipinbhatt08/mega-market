'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Radio, RadioGroup,Input,Textarea} from '@nextui-org/react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { clearCartState } from '@/redux/reducerSlice/cartSlice';
import axios from 'axios';


export default function Checkout() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState("cod")
  const {checkoutProductDetails} = useSelector(state=>state.cart)
  const {userDetails} = useSelector(state=>state.user)
  const {products,grandTotal} = checkoutProductDetails

  const arrProducts = products==null?null:Object.values(products)
  const handlePayement=(order)=>{
    if(order.paymentMethod==='khalti'){
      return handleKhalti(order)
    }
    
  }
  const handleKhalti= async(order)=>{
    const {totalPrice,_id}= order
    const amount = totalPrice *100
    const purchase_order_id = _id
    const purchase_order_name = "MEGA-ORDER"+ _id
    const values = {amount,purchase_order_id,purchase_order_name}
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/khalti/initiate`,values,{
    headers: {
      'Content-Type': 'application/json',
    }
    })
    if(res.status==200){
      window.location.href = res.data.responseUrl
    }
  }

  
  const createOrder = async(values)=>{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`,values,{
    headers: {'Content-Type': 'application/json'}
    })
    const data = res.data
    if(res.status!==200){
      return toast.warning(data.message)
      
    }
    // sendNotification()
    handlePayement(data.order)
    toast.success(data.message)
    dispatch(clearCartState())
    router.push("/orders")
    
    }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNo:'',
      country:'',
      state: '',
      city:'',
      streetAddress:'',
      orderNotes:''
    },
    onSubmit: values => {

    // preparing other data for creating order
    const {firstName,lastName,phoneNo,orderNotes,...shippingAddress}= values
    const receiverDetails={firstName,lastName,phoneNo}
    const paymentMethod = selected
    const totalPrice = grandTotal
    const orderedBy = userDetails._id
    const payload = {receiverDetails,paymentMethod,orderNotes,products,totalPrice,shippingAddress,orderedBy}
    // console.log(payload)
    createOrder(payload)
    
    },
    });


  
    
  return (
    <>
        <Layout>
          <BreadCrumb page="Checkout" />
          <Section heading="Cart" subHeading="Billing Details" bg="bg-gray-100">
           
            <div className="items-center p-5 my-5 bg-white bg-gray-100 rounded lg:flex">
                <div className="lg:w-2/3 lg:pr-4 ">
                <form className="container flex flex-wrap mx-auto bg-white border-gray-500 rounded-md ">
                <h1 className='w-full pt-3 pb-2 mx-2 mb-4 text-lg font-semibold text-gray-500 border-b-2'>Billing Details</h1>
                    <div className='w-1/2 px-2 py-1 '>

                    <Input 
                          type="text" 
                          name="firstName" 
                          onChange={formik.handleChange}
                          value={formik.values.firstName} 
                          variant="bordered" 
                          label="First Name"  
                          size="sm"  
                          radius="sm" 
                          className="mb-3"  
                          // isInvalid={!formik.isValid}
                          errorMessage={formik.errors?.firstName}
                          isRequired/>
                    </div>

                    <div className='w-1/2 px-2 py-1  lg:w-1/2 md:w-1/2'>
                    <Input 
                          type="text" 
                          name="lastName" 
                          onChange={formik.handleChange}
                          value={formik.values.lastName} 
                          variant="bordered" 
                          label="Last Name"  
                          size="sm"  
                          radius="sm" 
                          className="mb-3"  
                          // isInvalid={!formik.isValid}
                          errorMessage={formik.errors?.lastName}
                          isRequired/>
                    </div>
                    <div className='w-1/2 px-2 py-1  lg:w-1/2 md:w-1/2'>
                      <Input 
                          type="text" 
                          name="phoneNo" 
                          onChange={formik.handleChange}
                          value={formik.values.phoneNo} 
                          variant="bordered" 
                          label="Phone Number"  
                          size="sm"  
                          radius="sm" 
                          className="mb-3"  
                          // isInvalid={!formik.isValid}
                          errorMessage={formik.errors?.phoneNo}
                          isRequired/>
                    </div>
                    <div className='w-1/2 px-2 py-1  lg:w-1/2 md:w-1/2'>
                      <Input 
                          type="text" 
                          name="country" 
                          onChange={formik.handleChange}
                          value={formik.values.country} 
                          variant="bordered" 
                          label="Country"  
                          size="sm"  
                          radius="sm" 
                          className="mb-3"  
                          // isInvalid={!formik.isValid}
                          errorMessage={formik.errors?.country}
                          isRequired/>
                    </div>
                    <div className='w-full px-2 py-1 '>
                      <Input 
                          type="text" 
                          name="streetAddress" 
                          onChange={formik.handleChange}
                          value={formik.values.streetAddress} 
                          variant="bordered" 
                          label="Street Address"  
                          size="sm"  
                          radius="sm" 
                          className="mb-3"  
                          // isInvalid={!formik.isValid}
                          errorMessage={formik.errors?.streetAddress}
                          isRequired/>
                    </div>
                    <div className='w-1/2 px-2 py-1  lg:w-1/2 md:w-1/2'>
                      <Input 
                          type="text" 
                          name="city" 
                          onChange={formik.handleChange}
                          value={formik.values.city} 
                          variant="bordered" 
                          label="City"  
                          size="sm"  
                          radius="sm" 
                          className="mb-3"  
                          // isInvalid={!formik.isValid}
                          errorMessage={formik.errors?.city}
                          isRequired/>
                    </div>
                    <div className='w-1/2 px-2 py-1  lg:w-1/2 md:w-1/2'>
                      <Input 
                          type="text" 
                          name="state" 
                          onChange={formik.handleChange}
                          value={formik.values.state} 
                          variant="bordered" 
                          label="State"  
                          size="sm"  
                          radius="sm" 
                          className="mb-3"  
                          // isInvalid={!formik.isValid}
                          errorMessage={formik.errors?.state}
                          isRequired/>
                    </div>
                    <div className='w-full px-2 py-1 '>
                    <Textarea
                    label="Order Notes (Optional)"
                    name='orderNotes'
                    size='sm'
                    variant='bordered'
                    radius="sm" 
                    className="mb-3"  
                    onChange={formik.handleChange}
                    value={formik.values.orderNotes} 
                    
                    />            
                </div>
                  </form>
                  
                </div> 
                <div className="p-3 mt-4 border border-2 border-gray-300 border-dashed rounded lg:w-1/3 lg:mt-0">
                    <h1 className='pt-3 pb-2 mb-4 text-lg font-semibold text-gray-500 border-b-2'>Order summary</h1>
                    <div className="flex items-center justify-between py-2 border-b">
                      <p className='font-semibold text-gray-500 '>Products </p>
                      <p className='font-semibold text-gray-500 '>Quantity</p>
                      <p className='font-semibold text-gray-500 '>Total</p>
                    </div>
                    {arrProducts&& arrProducts.map((product)=>{
                      return (
                        <div className="py-2 lg:flex lg:items-center lg:justify-between " key={product._id}>
                            <div className="flex items-center lg:w-1/3 ">
                              <img src={"http://localhost:5000/productImgs/"+product.productImage}  alt="image" width={50} height={50} className=''/>
                              <Link href={`/products/${product._id}`}><p className='ml-3 hover:text-red-500'>{product.title}</p></Link> 
                            </div>
                            <p className='text-gray-500 '>{product.orderedQuantity}</p> 
                            <p className='text-gray-500 '>{product.orderedQuantity*product.discountedPrice}</p> 
                        </div>
                      )
                    })}
                    <div className="flex items-center justify-between py-3 my-2 border-y ">
                      <p className='font-semibold text-gray-500 '>Sub Total:</p>
                      <p className='font-semibold text-gray-500 '>Rs. {grandTotal?.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between py-2 my-2 border-b ">
                      <p className='font-semibold text-gray-500 '>Shipping:</p>
                      <p className='font-semibold text-gray-500 '>Free shipping</p>
                    </div>
                    <div className='py-2 mt-3' >
                    <div className="flex items-center justify-between ">
                      <p className='font-semibold text-red-500 '> Total</p>
                      <p className='font-semibold text-red-500 '>Rs. {grandTotal?.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col gap-3 py-2 mt-3">
                        <RadioGroup
                          value={selected}
                          onValueChange={setSelected}
                          color='danger'
                          isRequired="true"
                        >
                          <Radio value="cod">Cash on delivery</Radio>
                          <Radio value="khalti">Khalti</Radio>
                        </RadioGroup>
                    </div>
                     <div className="flex justify-around mt-4 itmes-center">
                      <Button as={Link} href='/cart' className='px-3 py-2 mt-3 text-red-500 transition bg-white border border-red-500 rounded  hover:bg-red-400 hover:text-white'>Back to cart</Button>
                      <Button onClick={formik.handleSubmit}  className='px-3 py-2 mt-3 text-white transition bg-red-500 border border-red-500 rounded hover:bg-red-400'>Place Order</Button>
                     </div>
                    </div>
                </div>
            </div>

          </Section>
        </Layout>
    </>
  )
}

