"use client"

import React, { useEffect , useState } from 'react'
import {  Lightbulb, WebcamIcon } from 'lucide-react';
import {Button} from '../../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { chatSession } from '../../../../../../utils/GeminiModel'
import { db } from '../../../../../../utils/db'
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserAnswer } from '../../../../../../utils/schema';





import Webcam from "react-webcam";
import { toast } from 'sonner';

function RecordAnswerSection({mockInterviewQuestions , activeQuestion , interview}) {
     const [userAnswer, setUserAnswer] = useState("");
     const [record , setRecord] = useState(false)
     const {user} = useUser()
     const [loading, setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });


       useEffect(() => {
          // console.log(results)
         results.map((result) => (
          setUserAnswer(prevAns=>prevAns+result?.transcript)
         ))
      }
      , [results]);
       

        useEffect(() => { 

             if(!isRecording && userAnswer?.length > 10){
               UpdateUserAnswer()
             }

        } ,[userAnswer])




     const SaveUserAnswer = async ()=>{
      if(isRecording){
              stopSpeechToText()
                // console.log(userAnswer)
              

              // const feedback = "Question:"+

             

         }else{
              startSpeechToText()
         }
     }
     

     const UpdateUserAnswer = async ()=>{
      console.log(userAnswer?.length )
      setLoading(true)
      if(userAnswer?.length < 10){
        setLoading(false)
        toast('Please record atleast 10 seconds of answer')
        return ;
      }

      const feedbackPrompt = "Question: "+mockInterviewQuestions[activeQuestion].question + ",Answer: "+userAnswer+",Depends on the question and user answer for given interview question please give rating for anser and feedback of improvement in just just 3 to 5 lines to improve it in JSON format with rating field and feedback field. Just give me the JSON format of the feedback and rating"
      const result = await chatSession.sendMessage(feedbackPrompt);
       
      console.log(result.response.text())
const MockJsonResp = (result.response.text()).replace('```json' , '').replace('```' , '')
// console.log(MockJsonResp)
const jsonResp = JSON.parse(MockJsonResp)

const resp = await  db.insert(UserAnswer).values({ 
  mockIdRef : interview?.mockId,
  question : mockInterviewQuestions[activeQuestion]?.question,
  correctAns : mockInterviewQuestions[activeQuestion]?.answer,
  userAnswer : userAnswer,
  feedback : jsonResp.feedback,
  rating : jsonResp.rating,
  userEmail : user?.primaryEmailAddress?.emailAddress,
  createdAt : moment().format('DD-MM-YYYY')
})
console.log(jsonResp)

if(resp){
  toast('Answer Recorded Successfully')
  setUserAnswer('')
  setResults([])
}else{
  setResults([])

  toast('Error Recording Answer')
}


  setLoading(false)
      }


  return (  


  <div>
       <div 
    className='flex flex-col items-center justify-center mt-7 p-7 bg-black shadow-md rounded-lg border'
    >

<WebcamIcon 
  className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'
 />

  <Webcam 
    mirrored={true}
    style={{
       height:300,
        width:'100%',
        zIndex:10
    }}
  
   />


    </div> 


    <div className='flex flex-col items-center justify-center mt-5'>



    <Button
    variant='outline'
    disabled={loading}

    className='mt-5'

    onClick={ 
       SaveUserAnswer
    }
    > {
        isRecording  ?
        <h2
        className='flex items-center justify-center text-red-600'
        >
          <Mic/> Recording...
        </h2>
        :
        'Record Answer'
    
    }
    </Button>
    
    
    
    

    </div>
    
    
    
    
       <Button
        className='mt-5'
        onClick={()=>alert(userAnswer)}
        variant='outline'
       >


          Show User Answer

       </Button>
    
      </div>

 
  )
}

export default RecordAnswerSection