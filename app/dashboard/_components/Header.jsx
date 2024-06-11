"use client";

import React from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs'

import { usePathname } from 'next/navigation';


function Header() {

   const pathname = usePathname();

  return (
    <div 
    className='flex p-4  items-center justify-between bg-white shadow-md'
    >

         <Image src={'/logo.svg'} alt="logo" width={160} height={100} />

         <ul
         className='flex space-x-4 '
         >
              <li
                // className='font-bold text-black cursor-pointer hover:text-blue-700'
                className={`font-bold text-black cursor-pointer hover:text-blue-700 ${pathname === '/dashboard' ? 'text-blue-700' : ''}`}
              >Dashboard</li>
              <li
                className={`font-bold text-black cursor-pointer hover:text-blue-700 ${pathname === '/questions' ? 'text-blue-700' : ''}`}

              >Questions</li>
              <li
                            className={`font-bold text-black cursor-pointer hover:text-blue-700 ${pathname === '/questions' ? 'text-blue-700' : ''}`}

              >How it Works</li>
         </ul>

         <UserButton/>

 
    </div>
  )
}

export default Header