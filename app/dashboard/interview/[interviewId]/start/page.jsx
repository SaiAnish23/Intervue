"use client";

import React , {useState , useEffect} from 'react'
import { db } from '../../../../../utils/db'
import { mockInterview} from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';

import  QuestionSection  from '../start/_components/QuestionSection'
import RecordAnswerSection from '../start/_components/RecordAnswerSection'
import {Button} from '../../../../../components/ui/button'


function page({params}) {

    const [interview, setInterview]  = useState()
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState()
    const [activeQuestion, setActiveQuestion] = useState(0)

    useEffect(() => {
        console.log(params.interviewId)
        GetDetails()
    }
    , [])


    const GetDetails = async () => { 

        const result = await db.select().from(mockInterview).where(eq(mockInterview.mockId , params.interviewId))
        console.log(result[0])

        const jsonMockResp = JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp)
        setMockInterviewQuestions(jsonMockResp)
  
        setInterview(result[0])
       
       }


 
  return (
    <div>

        <div
        className='grid grid-cols-1 md:grid-cols-2 p-5 gap-5'
        >

          {/* Questions */}


          <QuestionSection mockInterviewQuestions={mockInterviewQuestions} 
          activeQuestion={activeQuestion} 
          setActiveQuestion={setActiveQuestion}
          classNamem=''
          />




          {/*  Video /audio compoement */}
          <RecordAnswerSection 
           mockInterviewQuestions={mockInterviewQuestions} 
           activeQuestion={activeQuestion} 
           interview={interview}
           
          />



          <div 
          className='flex justify-end gap-6 mt-5'
          > {
            activeQuestion > 0  &&  <Button>
            Previos Question
          </Button>
          }
           
               {
            activeQuestion < mockInterviewQuestions?.length - 1 &&  <Button> 
            Next Question
          </Button>
               }
          


             <Button>
              Submit Interview
             </Button>
          </div>






        </div>


    </div>
  )
}

export default page