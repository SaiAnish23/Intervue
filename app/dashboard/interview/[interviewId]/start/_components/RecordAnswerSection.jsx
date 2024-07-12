"use client"

import React, { useEffect , useState } from 'react'
import {  Lightbulb, WebcamIcon } from 'lucide-react';
import {Button} from '../../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';



import Webcam from "react-webcam";

function RecordAnswerSection() {
     const [userAnswer, setUserAnswer] = useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });


       useEffect(() => {
      
         results.map((result) => (
          setUserAnswer(prevAns=>prevAns+result?.transcript)
         ))
      }
      , [results]);

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

    className='mt-5'

    onClick={ 
        isRecording ? 
        stopSpeechToText : 
        startSpeechToText
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