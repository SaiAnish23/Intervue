"use client"

import React , {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from  '../../../components/ui/dialog';

  import {Button} from '../../../components/ui/button'

  import { Input } from "../../../components/ui/input"

  import { Textarea } from "../../../components/ui/textarea"
  import { run } from '../../../utils/GeminiModel'
  import { chatSession } from '../../../utils/GeminiModel'
import { LoaderCircle } from 'lucide-react';

import { db } from '../../../utils/db'
import { uuid } from 'drizzle-orm/pg-core';
import { mockInterview } from '../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

 
 


function AddNewInterview() {

    const [dialogOpen, setDialogOpen] = useState(false)

    const [jobPosition, setJobPosition] = useState()
    const [jobDescription, setJobDescription] = useState()
    const [yearsOfExperience, setYearsOfExperience] = useState()
    const [loading, setLoading] = useState(false)
    const [jsonResp, setJsonResp] = useState()
    const {user} = useUser()

    const router = useRouter()

     const handleSubmit = async (e) => { 
          e.preventDefault()
          setLoading(true)

          // console.log(jobPosition, jobDescription, yearsOfExperience)

       let prompt =   "Given the job position as '" + jobPosition + "', the job description as '" + jobDescription + "', and the required years of experience as '" + yearsOfExperience + "', please generate five interview questions and their corresponding answers in JSON format. The questions should be tailored to understand the candidate's skills, experiences, and fit for the role. No Need to gove answers"
        // console.log(prompt)
        // const result =  run(prompt)
        const result = await chatSession.sendMessage(prompt);

        console.log(result.response.text())

        const MockJsonResp = (result.response.text()).replace('```json' , '').replace('```' , '')
        // console.log(MockJsonResp)
        const jsonResp = JSON.parse(MockJsonResp)
        console.log(jsonResp)
        setJsonResp(jsonResp)

         
           if(jsonResp){

         const resp = await  db.insert(mockInterview).values({
          mockId :  uuidv4(),
          jsonMockResp : JSON.stringify(jsonResp),
          jobPosition : jobPosition,
          jobDesc : jobDescription,
          jobExp : yearsOfExperience,
          createdBy : user?.primaryEmailAddress?.emailAddress,
          createdAt : moment().format('DD-MM-YYYY')

         }).returning({mockId:mockInterview.mockId})

          console.log(resp)


          if(resp){
            setDialogOpen(false)
            router.push(`/dashboard/interview/${resp[0]?.mockId}`)
          }

        } else {
          console.log('Error')
        }



        setLoading(false)
     }
  return (
    <div>

             <div
             className='bg-white p-10 border shadow-md cursor-pointer hover:shadow-lg rounded-lg text-center hover:scale-105'
              onClick={() => setDialogOpen(true)}
             >

                <h2 className="font-bold">

                    + Add New Interview
                </h2>
             </div>



             <Dialog 
             open={dialogOpen}
             >
  
  <DialogContent  
   className='max-w-2xl'
  >
    <DialogHeader>
      <DialogTitle
      className='text-2xl'
      >
              Tell us moore about your job Interviewing</DialogTitle>
      <DialogDescription>


        <form
        
        onSubmit={handleSubmit}
        >
                    
        <div>
          

          <h2>
            Add Detials about your job position/role , job description and years of experience
          </h2>


          <div
          className='mt-7 my-2'
          >
            <label htmlFor="">
              Job Position/Role
              <Input placeholder="Ex . Full stack developer"   required 
              onChange={(e) => setJobPosition(e.target.value)}
              />
            </label>
          </div>



          <div
          className=' my-3'
          >
            <label htmlFor="">
              Job Description / Tech Stack(In short)
              <Textarea placeholder="Ex . React , Nodejs , Springboot" required
              onChange={(e) => setJobDescription(e.target.value)}
              />
            </label>
          </div>






          <div
          className=' my-3'
          >
            <label htmlFor="">
              Tears of Experienc
              <Input type="number" placeholder="Ex.5" required
              onChange={(e) => setYearsOfExperience(e.target.value)}
              />
            </label>
          </div>

       </div>



       <div
        className='flex justify-end'
        >
            <Button
            className='bg-destructive mt-2'
            onClick={() => setDialogOpen(false)}
            >
                Cancel
            </Button>


            <Button
            className='bg-primary mt-2 mx-2'
            type = "submit" 
            disabled={loading}
            >
               {
                loading ?  
                <>
                <LoaderCircle 
                 className='animate-spin'
                /> 'Generating Questions' </> : 'Start Interview'
                 
               }
              Start Interview

            </Button>
        </div>




        </form>
    
          






  
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview