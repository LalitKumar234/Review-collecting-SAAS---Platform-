import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='w-full h-screen border flex flex-col items-center justify-center text-slate-700'>
      <h1 className='text-[5rem]'><span className='text-red-400'>404</span> Error!</h1>
      <p>Oops! The page does'nt exists</p>
      <Link to="/" className='bg-[#0092E2] text-white px-4 py-2 rounded-md mt-10'>
        Continue to dashboard
      </Link>
    </div> 
  )
}

export default ErrorPage