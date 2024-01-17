'use client'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import { Input, Button,Link} from "@nextui-org/react"
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

export default function Home() {
  return (
    <>
        <Layout>
          <BreadCrumb page="Login" />
          <Section heading="Login" subHeading="Sign in for personalized features ">
          <div className=" lg:w-1/2 md:w-2/3 sm:w-full container mx-auto columns-1 px-5 login-form" >
            <Formik
              initialValues={{
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
                  <Input type="email" email="email" variant="bordered" label="Email"  size="sm"  radius="sm" className="mb-3"  isRequired/>
                  {errors.email && touched.email ? <div>{errors.email}</div> : null}
                  <Input type="password" name = "password" variant="bordered" label="Password"  size="sm"  radius="sm"  className="mb-3 " isRequired/>
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
