"use client"

import React from 'react'
import {  Lightbulb, WebcamIcon } from 'lucide-react';
import {Button} from '../../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';



import Webcam from "react-webcam";

function RecordAnswerSection() {

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



    <Button
    variant='outline'

    className='mt-5'
    >
        Record Answer
    </Button>
    
    
    
    
    
    <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
    
    
    
    
    
    
      </div>

 
  )
}

export default RecordAnswerSection