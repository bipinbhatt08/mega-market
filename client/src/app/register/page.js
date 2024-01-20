'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import { Input, Button} from "@nextui-org/react"
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    password: Yup.string()
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  });
  
  const handleRegister = async(values)=>{
      
      const res = await fetch('http://localhost:5000/register',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
      })
      const data = await res.json()
      if(res.status!==200){
        return toast.warning(data.message)
        
      }
      toast.success(data.message)
      router.push("/login")
      }
  
  
  const formik = useFormik({
    initialValues: {
    username:'',
    email: '',
    password: '',
    confirmPassword:''
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
    handleRegister(values)
    },
    });
  return (
    <>
        <Layout>
          <BreadCrumb page="Sign Up" />
          <Section heading="Sign Up" subHeading="Begin Your Experience "bg="bg-gray-100">
          <div className=" lg:w-1/2 md:w-2/3 sm:w-full container mx-auto py-5 my-5 rounded-lg columns-1  login-form bg-white" >
                <form onSubmit={formik.handleSubmit}>
                  <Input 
                  type="text" 
                  name="username" 
                  onChange={formik.handleChange}
                  value={formik.values.username} 
                  variant="bordered" 
                  label="Username"  
                  size="sm"  
                  radius="sm" 
                  className="mb-3"  
                  // isInvalid={!formik.isValid}
                  errorMessage={formik.errors?.username}
                  isRequired/>
                  <Input 
                  type="email" 
                  name="email" 
                  onChange={formik.handleChange}
                  value={formik.values.email} 
                  variant="bordered" 
                  label="Email"  
                  size="sm"  
                  radius="sm" 
                  className="mb-3"  
                  // isInvalid={!formik.isValid}
                  errorMessage={formik.errors?.email}
                  isRequired/>
                  

                  <Input 
                  type="password" 
                  onChange={formik.handleChange}
                  value={formik.values.password} 
                  name = "password" 
                  variant="bordered" 
                  label="Password"  
                  size="sm"  
                  radius="sm"  
                  className="mb-3 " 
                   // isInvalid={!formik.isValid}
                   errorMessage={formik.errors?.password}
                  isRequired/>
                  <Input 
                  type="password" 
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword} 
                  name = "confirmPassword" 
                  variant="bordered" 
                  label="Confirm Password"  
                  size="sm"  
                  radius="sm"  
                  className="mb-3 " 
                   // isInvalid={!formik.isValid}
                   errorMessage={formik.errors?.confirmPassword}
                  isRequired/>
                  <Button  variant="flat" fullWidth type="submit" className="signUpBtn mt-3 mb-3" >
                    Sign Up
                  </Button>
                  <p className="text-center ">Already have account? <Link href="/login"className="color-red">Login</Link></p>
                </form>
          </div>
          </Section>
        </Layout>
    </>
  )
  }