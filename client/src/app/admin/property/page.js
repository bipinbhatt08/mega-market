'use client'
import styles from './styles.module.css'
import Layout from '@/components/layout/page'
import Section from '@/components/sectionLayout/page'
import BreadCrumb from "@/components/breadcrumb/page"
import { Input, Button} from "@nextui-org/react"
import { FileUploader } from "react-drag-drop-files";
import {CheckboxGroup, Checkbox} from "@nextui-org/react";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'

export default function AddProperty() {
  
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
          <BreadCrumb page="Add Property" />
          <Section heading="Add Property" subHeading="Create New Property Listing" bg="bg-gray-100">
          <div className='mt-5'>
          <form onSubmit={formik.handleSubmit} className={`${styles.listingForm} lg:px-11 md:px-8 px-5 border-gray-500 rounded-md py-8 container mx-auto bg-white flex flex-wrap `}>
          <h2 className=" text-xl  font-semibold text-center mb-1 color-black p-3">All fields are required</h2>
            <div className=' w-full px-3 py-2'>
              <label htmlFor="title" className=''>Property Title</label> <br />
              <input type="text" name='title' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' w-full px-3 py-2 '>
              <label htmlFor="title" className=''>Property Description</label> <br />
              <textarea type="text" name='description' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className='lg:w-1/3 md:w-1/3 w-1/2 px-3 py-2 '>
              <label htmlFor="title" className=''>Rent or Sale</label> <br />
              <select type="text" name='rentOrSale' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' >
                <option value="rent" >Rent</option>
                <option value="sale">Sale</option>
              </select>
            </div>
            
            <div className=' lg:w-1/3 md:w-1/3 w-1/2 px-3 py-2'>
              <label htmlFor="title" className=''>Rooms</label> <br />
              <input type="number" name='rooms' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' lg:w-1/3 md:w-1/3 w-1/2 px-3 py-2'>
              <label htmlFor="title" className=''>Bathrooms</label> <br />
              <input type="number" name='bathrooms' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' lg:w-1/3 md:w-1/3 w-1/2 px-3 py-2'>
              <label htmlFor="title" className=''>Price</label> <br />
              <input type="number" name='price' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' lg:w-1/3 md:w-1/3 w-1/2 px-3 py-2'>
              <label htmlFor="title" className=''>Property Age</label> <br />
              <input type="number" name='age' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' lg:w-1/3 md:w-1/3 w-1/2 px-3 py-2'>
              <label htmlFor="title" className=''>Area(sqft)</label> <br />
              <input type="number" name='area' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-3 py-2'>
              <label htmlFor="title" className=''>Location</label> <br />
              <input type="text" name='location' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-3 py-2'>
              <label htmlFor="title" className=''>City</label> <br />
              <input type="text" name='city' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' lg:w-1/2 md:w-1/2 w-1/2 px-3 py-2'>
              <label htmlFor="title" className=''>State</label> <br />
              <input type="text" name='state' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            
            <div className=' lg:w-1/2 md:w-1/2 w-full px-3 py-2'>
              <label htmlFor="title" className=''>Google Maps Latitude</label> <br />
              <input type="text" name='latitude' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' lg:w-1/2 md:w-1/2 w-full px-3 py-2'>
              <label htmlFor="title" className=''>Google Maps longitude</label> <br />
              <input type="text" name='longitude' className='w-full p-3 mt-1 border-1 text-black border-gray-500 rounded-md text-sm' />
            </div>
            <div className=' lg:w-1/3 md:w-1/2 w-2/3 px-3 py-2'>
              <label htmlFor="title" className=''>Property Media</label> <br />
              <FileUploader   multiple="true" label="Click Here Or Drop Files To Upload" required="true" />
            </div>
            <div className=' w-full px-3 py-2'>
              <label htmlFor="title" >Select Property Feature</label> <br />
              <CheckboxGroup
                orientation="horizontal"
                color="secondary"
                defaultValue={["sydney"]}
                className='mt-1'
                >
                <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
                <Checkbox value="sydney">Sydney</Checkbox>
                <Checkbox value="san-francisco">San Francisco</Checkbox>
                <Checkbox value="london">London</Checkbox>
                <Checkbox value="tokyo">Tokyo</Checkbox>
              </CheckboxGroup>
            </div>
            <div className='w-full px-3 py-2'>
            <Button  variant="flat"   type="submit"  className="signUpBtn mt-3 mb-3 rounded-md  " >
              Submit Property
            </Button>

            </div>
          </form>

          </div>
          </Section>
        </Layout>
    </>
  )
}
