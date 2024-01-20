'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import { Input, Button} from "@nextui-org/react"
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'

export default function Login() {
  
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
    email: '',
    password: ''
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
    handleLogin(values)
    },
    });
  return (
    <>
        <Layout>
          <BreadCrumb page="Login" />
          <Section heading="Login" subHeading="Sign in for personalized features" bg="bg-gray-100">
          <div className=" lg:w-1/2 md:w-2/3 sm:w-full container bg-white py-5 my-5  rounded-lg mx-auto columns-1  login-form" >
                <form onSubmit={formik.handleSubmit} className=''>
                  <Input 
                  type="email" 
                  name="email" 
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber} 
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
                  value={formik.values.phoneNumber} 
                  name = "password" 
                  variant="bordered" 
                  label="Password"  
                  size="sm"  
                  radius="sm"  
                  className="mb-3 " 
                   // isInvalid={!formik.isValid}
                   errorMessage={formik.errors?.password}
                  isRequired/>
                  <Button  variant="flat" fullWidth type="submit" className="signUpBtn mt-3 mb-3" >
                    Sign Up
                  </Button>
                  <p className="text-center ">Don't have account? <Link href="/register"className="color-red">Register</Link></p>
                </form>
          </div>
          </Section>
        </Layout>
    </>
  )
}
