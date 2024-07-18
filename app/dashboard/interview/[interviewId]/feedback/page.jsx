"use client"
import React, { useEffect  , useState} from 'react'
import { UserAnswer } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { db } from '../../../../../utils/db'
import { mockInterview} from "../../../../../utils/schema"
import { Collapsible  ,

    CollapsibleTrigger,
    CollapsibleContent 

} from '../../../../../components/ui/collapsible'
import { ChevronDown, ChevronsUpDown } from 'lucide-react'
import { Button } from '../../../../../components/ui/button'
// import { useRouter } from 'next/router'
import Link from 'next/link'


const page = ({params}) => {
    const [feedback, setFeedback] = useState([])

    // const router = useRouter()
    useEffect(() => {
        // console.log(params.interviewId) 
        getFeedback()
    } , [])
   const getFeedback = async () => { 

    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef , params.interviewId))
    console.log(result[0]) 
    setFeedback(result)

    

   
   }



 
 
 
    return (
    <div
    className='p-10'
    >

        <div className="text-3xl font-bold text-green-500">

             Congratulations

        </div>
           
           <h2
              className='text-2xl font-bold'
           >
            Here is your interview feedback
           </h2>

           <h2
            className='text-blue-700 text-lg my-3 '
           >
            Your Overall interview rating  

             <strong 
                
              
             >
                4.5/5
             </strong>
           </h2>
            

            <h2
              className='text-sm text-gray-500'
            >
                Find below the detailed feedback of your interview with correct answers and explanations
            </h2>
              

              {
                feedback && feedback.map((item , index) => (
              
                    <Collapsible 
                    key={index}
                    className='mt-7'
                    >
  <CollapsibleTrigger
  
   className='bg-gray-200 p-3 my-3 rounded-lg  text-left  flex justify-between gap-10 w-full '
  >

         {
              item.question 
         }

         <ChevronsUpDown
         
            className='h-5 w-5'
         />
  </CollapsibleTrigger>
  <CollapsibleContent>
      <div
       className='flex flex-col gap-2'
      >
            <h2
             className='text-red-500 p-2 border  rounded-large'
            >
            <strong>
                Rating :
            </strong>
            {item.rating}
            </h2>


            <h2
            className='p-2 border rounded-lg bg-red-50 text-sm'
             >
                <strong>
                    Your Answer
                </strong>
                
                 {
                        item.userAnswer

                 }
                 
            </h2>


            
            <h2
            className='p-2 border rounded-lg bg-green-50 text-sm'
             >
                <strong>
                   Correct Answer
                </strong>
                
                 {
                        item.correctAns

                 }
                 
            </h2>


            <h2
            className='p-2 border rounded-lg bg-blue-50 text-sm'
             >
                <strong>
                   Feedback :
                </strong>
                
                 {
                        item.feedback


                 }
                 
            </h2>

          
      </div>
  </CollapsibleContent>
</Collapsible>
                
                ))
              }


              <Link
              
              href='/'
              >
              <Button
              className='mt-10'
              >
                Go Home
              </Button>
                            </Link>

            



    </div>
  )
}

export default page