import { Lightbulb } from 'lucide-react'
import React from 'react'

function QuestionSection({mockInterviewQuestions , activeQuestion , setActiveQuestion}) {

    // console.log(mockInterviewQuestions)
  return (
    <div
    className='p-5 border rounded-lg'
    > 

       <div
       
       className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
       >
                  {
            mockInterviewQuestions && mockInterviewQuestions.map((question , index) => ( 
                <div
                key={index}
                className='my-5'
                >
                    <h2
                     className={`p-2 cursor-pointer text-center border rounded-full ${activeQuestion === index ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        onClick={() => setActiveQuestion(index)}
                   >
                        Question #{index+1}
                    </h2>
                </div>
            ))
        }

         

         


       </div>


       <h2
       
         className='text-sm  my-5 md:text-lg '
       > {
             mockInterviewQuestions && mockInterviewQuestions[activeQuestion].question}
         </h2>


         <div
         className='border p-5 rounded-lg bg-yellow-100 border-yellow-300 shadow-md flex flex-col items-center justify-center my-7'
         >
            <h2
            className='flex gap-2 items-center'
            >
                <Lightbulb/>
                <strong>
                    Information
                </strong>


            </h2>

            <h2
            className='tmy-2 text-sm text-primary'
            >
                             Enable your webcam and microphone to start the interview , It has 5 questions which you can answer and at last yoou will get your report 

            </h2>
         </div>


    

    </div>

  )
}

export default QuestionSection