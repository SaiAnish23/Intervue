"use client"

import React, { useEffect , useState } from 'react'
import { db } from '../../../../utils/db'
import { mockInterview} from '../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { get } from 'http';
import {  Lightbulb, WebcamIcon } from 'lucide-react';

import Webcam from "react-webcam";
import {Button} from '../../../../components/ui/button'
import Link from 'next/link';





function page( {params}) {

    const [interview, setInterview]  = useState()
    const[WebcamE, setWebcamE] = useState(false)



     useEffect(() => { 
        console.log(params.interviewId)
        } , [])


    const GetDetails = async () => { 

         const result = await db.select().from(mockInterview).where(eq(mockInterview.mockId , params.interviewId))
        //  console.log(result[0])
   
         setInterview(result[0])
        
        }
 

    GetDetails()
   



  return (
    <div
     className='my-10 flex justify-center flex-col items-center'
    >
         <h2 className="font-bold text-2xl">

          Lets get started with the interview
         </h2>


         <div
          className='grid grid-cols-1 md:grid-cols-2 gap-8'
         >
                <div 
              
              className='flex flex-col items-center justify-center my-7 p-7 bg-white shadow-md rounded-lg border'
             >

              <div>
              <h2 
                className='text-lg'
               >
                 <strong>
                   Job Role /Job Position : 
                 </strong>
                 {interview?.jobPosition}
               </h2>



               <h2
                 className='text-lg'
               >
                 <strong>
                   Job Description : 
                 </strong>
                 {interview?.jobDesc}
               </h2>
                
                <h2
                 className='text-lg'
                >
                   <strong>
                     Job Experience : 
                   </strong>
                   {interview?.jobExp}

                </h2>




              </div>



              <div
              className='flex flex-col items-center justify-center my-7 p-7 bg-yellow-100 border-yellow-300 shadow-md rounded-lg border'
              > 
              <h2
              className='
                flex gap-2 items-center '
              >
                <Lightbulb /> <strong>Information</strong>
              </h2>
               
                <h2
                
                 className='text-yellow-500'
                >
                 Enable your webcam and microphone to start the interview , It has 5 questions which you can answer and at last yoou will get your report 
                </h2>
              </div>

            
               


                    

             </div> 

             <div>
             <div>

{
  WebcamE ?  <Webcam 
  
    onUserMedia={() => setWebcamE(true)}
    onUserMediaError={() => setWebcamE(false)}
    mirrored={true}
    style={{
       height:300,
        width:300
    }}
  /> :
  < >

   <div
    className='flex flex-col items-center  *:
    justify-center my-7 p-7 bg-white shadow-md rounded-lg border
    ' 
   >
   <WebcamIcon 
  className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'
 />
 <Button 
  className='bg-primary text-center'
  onClick={() => setWebcamE(true)}
 >
    Enable Webcam and Microphone
 </Button>

   </div>
  
 </>

}







</div>
             </div>
             


             
  
         </div>


            <div
            className='flex justify-end items-end'
            >
               <Link
               
               href = {`/dashboard/interview/${params.interviewId}/start`}
               >

<Button
              >
                Start Interview
              </Button>
               
               </Link>
             
            </div>


    </div>
  )
}

export default page