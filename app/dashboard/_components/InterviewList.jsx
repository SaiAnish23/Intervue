"use client"

import React , {useEffect, useState} from 'react'


  import {Button} from '../../../components/ui/button'


import { db } from '../../../utils/db'
import { uuid } from 'drizzle-orm/pg-core';
import { mockInterview } from '../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';


 
 


function InterviewList() {


    const {user} = useUser()

    const [interviewList, setInterviewList] = useState([])

    useEffect(() => {
        GetInterviewList()
    }, [ 
        interviewList
    ])

    const GetInterviewList =async ()=>{
        // console.log(user?.primaryEmailAddress)
        const res = await db.select().from(mockInterview).where(eq(mockInterview.createdBy ,user?.primaryEmailAddress.emailAddress)).orderBy(desc(mockInterview.createdAt))
        // console.log(res)
        setInterviewList(res)
    }

    GetInterviewList()


  return (
    <div>
       <h2
       className='font-medium text-lg' 
       >
        Previous Mock Interviews
       </h2>




       <div
       
        className='grid grid-cols-1 md:grid-cols-3 gap-3'
       >
              {
                interviewList.map((interview , index) => {
                     return (
                          <div
                          key={index}
                          className='border shadow-sm rounded-lg p-3 my-3'
                          >

                            <h2
                            className='text-blue-500 font-bold'
                            >
                                {interview?.jobPosition}
                            </h2>
                             <h2
                                className= 'text-sm text-gray-500'
                             >
                                {interview?.jobDesc}
                             </h2>
                             <h2
                                className= 'text-xs text-gray-500'
                             >
                                Created At : {interview?.createdAt}
                             </h2>


                             <div
                             
                                className='flex justify-between mt-3 gap-5'
                             >  
                                 <Link
                                    href={`/dashboard/interview/${interview?.mockId}`}
                                        className='w-full'
                                 >
                                 <Button
                                size = 'sm'
                                  className='w-full'
                             
                            
                                >
                                    Start 
                                </Button>
                                 </Link>


                                 <Link 
                                    href={`/dashboard/interview/${interview?.mockId}/feedback`}
                                    className='w-full'
                                    >

<Button
                                variant = 'outline'
                                size = 'sm'
                              
                                className='w-full'
                                >
                                    FeedBck
                                </Button>

                                    </Link>
                              


                              
                             </div>



                            
                          </div>
                     )
                })

                }
       </div>
  
    </div>
  )
}

export default InterviewList