'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import { Input, Button,Link} from "@nextui-org/react"
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

export default function Home() {
  return (
    <>
      <Layout> 
      <BreadCrumb page="Register" />
        <Section heading="Register" subHeading="Create your account">
        <div className=" lg:w-1/2 md:w-2/3 sm:w-full container mx-auto columns-1 px-5 login-form" >
            <Formik
              initialValues={{
                username: '',
                password: '',
                email: '',
              }}
              
              validationSchema={SignupSchema}
              onSubmit={values => {
                // same shape as initial values
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Input type="text" name="username" variant="bordered" label="Username"  size="sm"  radius="sm"  className="mb-3 " borderColor="red" isRequired />
                  <Input type="email" email="email" variant="bordered" label="Email"  size="sm"  radius="sm" className="mb-3"  isRequired/>
                  {errors.email && touched.email ? <div>{errors.email}</div> : null}
                  <Input type="password" name = "password" variant="bordered" label="Password"  size="sm"  radius="sm"  className="mb-3 " isRequired/>
                  <Input type="password"  name="confirmPassword" variant="bordered" label="Confirm Password"  size="sm"  radius="sm" className="mb-3 "  isRequired/>
                  <Button  variant="flat" fullWidth type="submit" className="signUpBtn mt-3 mb-3" >
                    Sign Up
                  </Button>
                  <p className="text-center ">Already have account? <Link href="/login"className="color-red">Login</Link></p>
                </Form>
              )}
            </Formik>
          </div>
          </Section>
      </Layout>
    </>
  )
}
      
