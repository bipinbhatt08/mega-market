'use client'
import React, { useEffect, useState } from 'react'
import {Spinner} from "@nextui-org/react";
import axios from 'axios';
import { IoMdCheckmark } from "react-icons/io";
import { useRouter } from 'next/navigation';

const KhaltiSuccess = () => {
    const router = useRouter()
    const { pidx } = router.query
    alert(pidx)

     const [loading,setLoading] = useState(true)
     setTimeout(()=>{
        setLoading(!loading)
     },2000)
    const verifyPidx = async()=>{
      try {
        const response = await axios.post("/payment/khalti/verify",{pidx})
        if(response.status === 200){
            setLoading(false)
            router.push('/orders')
        }
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
        verifyPidx()
    },[])
    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                  <Spinner label="Payment Verifying..." color="secondary"  labelColor="secondary" size='lg' />
        </div>

            )
    }else{
        return(
            
            <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-secondary text-center mx-auto flex items-center justify-center"> <IoMdCheckmark  size={44} /></h2>
                <h2 className="text-secondary text-lg">Verified Successfully!!!</h2>
            </div>
        </div>
        )
    }

}

export default KhaltiSuccess