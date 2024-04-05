import Link from 'next/link'
import React from 'react'
import { Button } from '@nextui-org/react'

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-red-500 mb-8">404 Error</h1>
      <Button
        as={Link}
        href="/"
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
      >
        GO TO HOME
      </Button>
    </div>
  )
}

export default NotFound
