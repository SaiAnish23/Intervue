import React from 'react'
// import { UserButton } from '@clerk/nextjs'
import AddNewInterview from './_components/AddNewInterview';

function page() {
  return (
    <div
    className='p-10'
    > 

      <h2
      className='text-2xl font-bold text-black'
      >
        Dashboard
      </h2>
        <h2
         className='text-gray-500'
        >
          Create Ai Mockup Interview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 my-5">
          <AddNewInterview/>
  
        </div>


    </div>
  )
}

export default page