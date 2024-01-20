import React, { useEffect, useState } from 'react'

const page = (props) => {
 

  return (
    <div>
      <section className= {` mx-auto  form-container p-5 w-full ${props.bg}`}  >
            <h2 className="tracking-widest text-md  font-sm text-center mb-1 lg:mt-5 color-red">{props.heading}</h2>
            <h1 className="sm:text-2xl text-xl font-medium text-gray-900  text-center mb-0">{props.subHeading}</h1>
            {props.children}
        </section>
    </div>
  )
}

export default page
