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


export default function Checkout() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState("cod")
  const {checkoutProductDetails} = useSelector(state=>state.cart)
  const {userDetails} = useSelector(state=>state.user)
  const {products,grandTotal} = checkoutProductDetails

  const arrProducts = products==null?null:Object.values(products)

  const createOrder = async(values)=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/orders`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
    })
    const data = await res.json()
    if(res.status!==200){
      return toast.warning(data.message)
      
    }
    // sendNotification()
    toast.success(data.message)
    router.push("/orders")
    dispatch(clearCartState())
    
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
           
            <div className="lg:flex p-5  my-5 bg-white rounded bg-gray-100 items-center">
                <div className="lg:w-2/3 lg:pr-4  ">
                <form className="  border-gray-500 rounded-md  container mx-auto bg-white flex flex-wrap ">
                <h1 className='font-semibold text-lg text-gray-500 border-b-2 mb-4 pb-2 mx-2 pt-3 w-full'>Billing Details</h1>
                    <div className=' w-1/2 px-2 py-1'>

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

                    <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-2 py-1'>
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
                    <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-2 py-1'>
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
                    <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-2 py-1'>
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
                    <div className=' w-full px-2 py-1'>
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
                    <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-2 py-1'>
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
                    <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-2 py-1'>
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
                    <div className=' w-full px-2 py-1 '>
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
                <div className="lg:w-1/3 p-3 mt-4 lg:mt-0 border border-gray-300 border-2 border-dashed rounded">
                    <h1 className='font-semibold text-lg text-gray-500 border-b-2 mb-4 pb-2 pt-3'>Your order</h1>
                    <div className="flex items-center justify-between py-2 border-b">
                      <p className='font-semibold  text-gray-500 '>Products </p>
                      <p className='font-semibold  text-gray-500 '>Quantity</p>
                      <p className='font-semibold  text-gray-500 '>Total</p>
                    </div>
                    {arrProducts&& arrProducts.map((product)=>{
                      return (
                        <div className="lg:flex lg:items-center lg:justify-between  py-2 ">
                            <div className="flex items-center lg:w-1/3  ">
                              <img src={"http://localhost:5000/productImgs/"+product.productImage}  alt="image" width={50} height={50} className=''/>
                              <p className='ml-3'>{product.title} </p>
                            </div>
                            <p className='  text-gray-500 '>{product.orderedQuantity}</p> 
                            <p className='  text-gray-500'>{product.orderedQuantity*product.discountedPrice}</p> 
                        </div>
                      )
                    })}
                    <div className="flex items-center justify-between py-3 border-y my-2 ">
                      <p className='font-semibold  text-gray-500 '>Sub Total:</p>
                      <p className='font-semibold  text-gray-500 '>Rs. {grandTotal?.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b my-2 ">
                      <p className='font-semibold  text-gray-500 '>Shipping:</p>
                      <p className='font-semibold  text-gray-500 '>Free shipping</p>
                    </div>
                    <div className='mt-3 py-2' >
                    <div className="flex items-center justify-between ">
                      <p className='font-semibold  text-red-500 '> Total</p>
                      <p className='font-semibold  text-red-500 '>Rs. {grandTotal?.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col gap-3 mt-3 py-2">
                        <RadioGroup
                          value={selected}
                          onValueChange={setSelected}
                          color='danger'
                          isRequired="true"
                        >
                          <Radio value="cod">Cash on delivery</Radio>
                          <Radio value="esewa">E-sewa</Radio>
                          <Radio value="khalti">Khalti</Radio>
                        </RadioGroup>
                    </div>
                     <div className="flex itmes-center justify-around mt-4">
                      <Button as={Link} href='/cart' className=' text-red-500 border border-red-500 py-2 px-3 mt-3 bg-white rounded hover:bg-red-400 hover:text-white  transition'>Back to cart</Button>
                      <Button onClick={formik.handleSubmit}  className='text-white border border-red-500 py-2 px-3 mt-3 bg-red-500 rounded hover:bg-red-400  transition'>Place Order</Button>
                     </div>
                    </div>
                </div>
            </div>

          </Section>
        </Layout>
    </>
  )
}

